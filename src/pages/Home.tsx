import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import '../index.css'
import MainCard from "@/components/MainCard";
import { OpenWeatherIconsToLucide } from "@/utility/openWeatherIconsToLucide";
import SecondaryCard from "@/components/SecondaryCard";
import TemperatureChart from "@/components/TemperatureChart";
import { type SearchResult } from "@/components/SearchBar";

const units = "metric"
const key = `7e780ac4265fd768b39167e356d06bfa`

export default function Home() {
    const [data, setData] = useState<any>(null)
    const [forecastData, setForecastData] = useState<any>(null)

    const { selectedLocation } = useOutletContext<{ selectedLocation: SearchResult | null }>();
    const routerState = useLocation().state as { location?: SearchResult };

    const defaultCity = {
        name: "Warsaw",
        country: "PL",
        lat: 52.2297,
        lon: 21.0122,
    }

    const activeLocation = selectedLocation || routerState?.location || defaultCity

    useEffect(() => {
        if (activeLocation) {
            const redirectedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${activeLocation.lat}&lon=${activeLocation.lon}&units=${units}&appid=${key}`
            const redirectedUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${activeLocation.lat}&lon=${activeLocation.lon}&units=${units}&appid=${key}`

            fetch(redirectedUrl)
                .then(response => response.json())
                .then(json => setData(json))
                .catch(err => console.error(`ERROR: ${err}`))

            fetch(redirectedUrlForecast)
                .then(response => response.json())
                .then(json => setForecastData(json))
                .catch(err => console.error(`ERROR: ${err}`))
            return
        }
    }, [selectedLocation, routerState])

    const chartData = forecastData ? forecastData.list.slice(0, 8).map((entry: any) => ({
        time: (entry.dt_txt).slice(8, 16),
        value: entry.main.temp,
        icon: OpenWeatherIconsToLucide[entry.weather[0].icon],
    })) : []

    if(!data) return null
    
    return (
        <div className="flex gap-4 p-2">
            <div className="flex flex-col gap-4 w-2/8">
                <MainCard data={data} />
                <SecondaryCard data={data} />
            </div>
            <TemperatureChart chartData={chartData} />
        </div>
    )
}
import { useEffect, useState } from "react";
import { type SearchResult } from "@/components/SearchBar";

const BOOKMARKS_KEY = 'bookmarks'
const apiKey = import.meta.env.VITE_API_KEY

export interface Bookmark extends SearchResult {
    weather: {
        temp: number
        feelsLike: number
        icon: string
        description: string
    } | null
    lastUpdated: number
} 

export interface useBookmarksReturn {
    bookmarks: Bookmark[]
    isBookmarked: (city: SearchResult) => Boolean
    addBookmark: (ccity: SearchResult) => void
    removeBookmark: (ccity: SearchResult) => void
    updateBookmarkWeather: (city: SearchResult, weatherData: any) => void
}

export default function useBookmarks(): useBookmarksReturn {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(BOOKMARKS_KEY)
        if(stored) {
            setBookmarks(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
    }, [bookmarks])

    function isBookmarked(city: SearchResult) {
        return bookmarks.some(c => c.lat === city.lat && c.lon === city.lon)
    }
    
    function addBookmark(city: SearchResult) {
        if(!isBookmarked(city)) {
            setBookmarks(prev => [
                ...prev, 
                {
                    ...city,
                    weather: null,
                    lastUpdated: 0,
                },
            ])
            
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
            fetch(url)
            .then(response => response.json())
            .then(weatherData => {
                updateBookmarkWeather(city, weatherData)
            })
            .catch(err => console.error(`Bookmark weather fetch ERROR: ${err}`))
        }
    }

    function removeBookmark(city: SearchResult) {
        setBookmarks(prev => prev.filter(c => !(c.lat === city.lat && c.lon === city.lon)))
    }

    function updateBookmarkWeather(city: SearchResult, weatherData: any) {
        setBookmarks(prev => 
            prev.map(b => 
                b.lat === city.lat && b.lon === city.lon
                    ? {
                        ...b,
                        weather: {
                            temp: weatherData.main.temp,
                            feelsLike: weatherData.main.feels_like,
                            icon: weatherData.weather[0].icon,
                            description: weatherData.weather[0].description,
                        },
                        lastUpdated: Date.now(),
                    }
                : b
            )
        )
    }

    return {
        bookmarks, isBookmarked, addBookmark, removeBookmark, updateBookmarkWeather
    }
}
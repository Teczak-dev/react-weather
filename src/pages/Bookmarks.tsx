import MainCard from "@/components/MainCard"
import { useIsMobile } from "@/hooks/use-mobile"
import { type useBookmarksReturn } from "@/hooks/useBookmarks"
import { useOutletContext } from "react-router-dom"

export default function Favorites() {
    const { bookmarks } = useOutletContext<useBookmarksReturn>()

    const isMobile = useIsMobile()

    return(
        <div className="flex flex-wrap w-full">
            {!!bookmarks && bookmarks.map(city => (
                <div className={`m-2 ${isMobile ? "w-full" : "w-32/100"}`}>  
                    <MainCard key={`${city.lat} ${city.lon}`} bookmark={city} />
                </div>
            ))}
        </div>
    )
}
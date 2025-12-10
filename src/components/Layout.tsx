import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { NavigationSidebar } from "./NavigationSidebar";
import ThemeToggle from "./ThemeToggle";
import SearchBar, { type SearchResult } from "./SearchBar";
import { useState } from "react";

export default function Layout() {
    const apiKey = '7e780ac4265fd768b39167e356d06bfa';
    const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null) 

    return (
        <div className="flex flex-col">
            <SidebarProvider>
                <NavigationSidebar />
                <div className="w-full p-2">
                    <div className="flex items-center justify-between h-12">
                        <SidebarTrigger />
                        <SearchBar apiKey={apiKey} onSelectLocation={loc => {
                                setSelectedLocation(loc)
                            }
                        } />
                        <ThemeToggle />
                    </div>
                    <main className='w-full'>
                        <Outlet context={{ selectedLocation }}/>
                    </main>
                    </div>
            </SidebarProvider>
        </div>
    )
}
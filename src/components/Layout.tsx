import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { NavigationSidebar } from "./NavigationSidebar";
import ThemeToggle from "./ThemeToggle";
import SearchBar, { type SearchResult } from "./SearchBar";
import { useState } from "react";
import useBookmarks from "@/hooks/useBookmarks";

export default function Layout() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [selectedLocation, setSelectedLocation] =
        useState<SearchResult | null>(null);
    const bookmarkState = useBookmarks();

    return (
        <div className="flex flex-col">
            <SidebarProvider>
                <NavigationSidebar />
                <div className="w-full p-2">
                    <div className="flex items-center justify-between p-1">
                        <SidebarTrigger />
                        <SearchBar
                            apiKey={apiKey}
                            onSelectLocation={(loc) => {
                                setSelectedLocation(loc);
                            }}
                        />
                        <ThemeToggle />
                    </div>
                    <main className="w-full">
                        <Outlet
                            context={{ selectedLocation, ...bookmarkState }}
                        />
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}

import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
    return (
        <div>
            <Navigation />

            <main className='min-h-10/12'>
                <Outlet />
            </main>

            <footer>
                dupa
            </footer>
        </div>
    )
}
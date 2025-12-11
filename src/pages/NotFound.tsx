import { Link } from "react-router-dom";
import {
    FileQuestionMark,
    CloudRainWind,
    Snowflake,
    Sun,
    Moon,
} from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex justify-center align-middle space-x-4 mb-8">
                <Sun size={48} className="text-gray-400" />
                <CloudRainWind size={48} className="text-gray-400" />
                <FileQuestionMark size={64} className="text-gray-400" />
                <Snowflake size={48} className="text-gray-400" />
                <Moon size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl">404 - Page not found</h1>
            <p className="text-gray-500">
                The page you are looking for does not exist.
            </p>
            <Link to="/">Back to home page</Link>
        </div>
    );
}

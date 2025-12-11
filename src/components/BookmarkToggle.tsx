import type { useBookmarksReturn } from "@/hooks/useBookmarks";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useOutletContext } from "react-router-dom";

export default function BookmarkToggle({ location }: { location: any }) {
    const { isBookmarked, addBookmark, removeBookmark } =
        useOutletContext<useBookmarksReturn>();

    return (
        <Button
            variant="outline"
            onClick={() =>
                isBookmarked(location)
                    ? removeBookmark(location)
                    : addBookmark(location)
            }
        >
            <Bookmark fill={isBookmarked(location) ? "currentColor" : "none"} />
        </Button>
    );
}

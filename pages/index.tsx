import { useState, useEffect } from "react";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import { getUserVideos } from "../lib/api";
import Link from "next/link";

const userID = "elmer_cruz";

export default function HomePage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getUserVideos(userID);
                setVideos(data);
                console.log(data.videos)
            } catch (err) {
                setError("Failed to load videos.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return( 
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">For You</h1>

            {loading && <p>Loading videos...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && videos.length===0 && (
                <p className="text-gray-500">No videos uploaded yet...</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video}/>
                ))}
            </div>

            <Link href={"/upload"}>
                <button className="mt-8 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                    + Video
                </button>
            </Link>

        </div>
    )
}
import { Video } from "../types";
import Link from "next/link";

interface VideoCardProps {
    video: Video;
}

const VideoCard = ({video}: VideoCardProps) => {
    return (
        <Link href={`/videos/${video.id}`}>
            {/*Add thumbnail funationality if time*/}
            <div className="border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer bg-white">
                <h2 className="text-lg font-semibold mb-1 text-blue-700">{video.title}</h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                <span className="text-xs text-gray-400">Uploaded by {video.user_id}</span>
            </div>
        </Link>
    )
};

export default VideoCard;
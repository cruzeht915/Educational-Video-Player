import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideoComments, getSingleVideo, createComment, editVideo } from "../../lib/api";
import { Comment, Video } from "../../types";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import VideoPlayer from "../../components/VideoPlayer";
import EditVideoForm from "../../components/EditVideoForm";

const VideoDetailPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const userId = "elmer_cruz";  //placeholder
    const [video, setVideo] = useState<Video|null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (typeof id === "string") {
            getSingleVideo(id).then(setVideo)
            getVideoComments(id).then(setComments)
        }
    }, [id]);

    if (!video) {
        return <p>Loading video...</p>;
      }

    return (
        <div>
            <div className="bg-white pt-4 pb-1 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">{video.title}</h1>
                <VideoPlayer url = {video.video_url}/>
                <p className="text-left text-gray-900 m-5">{video.description}</p>
                {editing? (
                    <EditVideoForm video={video} onSubmit={async (new_title, new_description) => {
                        await editVideo(video.id, new_title, new_description);
                        const updated = await getSingleVideo(video.id);
                        setVideo(updated);
                        setEditing(false);
                    }}/>
                ):
                (<div className="flex justify-center">
                    <button 
                    className="bg-green-600 text-white px-4 py-2 rounded
                     hover:bg-green-700 text-sm"
                     onClick={() => setEditing(!editing)}>
                        {editing? "Save": "Edit"}
                     </button>
                </div>
                )}
                <p className="text-left text-gray-500 m-5 text-xs">Uploaded by {video.user_id}</p>
            </div>
            <CommentForm 
                videoId={video.id} 
                userId={userId} 
                onSubmit= { async (content) => {
                    const data = await createComment(video.id, content, userId);
                    console.log(data)
                    const updated = await getVideoComments(video.id);
                    setComments(updated);      // refresh list after post
                }}
            />
            <CommentList comments={comments}/>
        </div>
    );

}

export default VideoDetailPage;


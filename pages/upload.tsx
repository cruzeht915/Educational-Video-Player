import { useRouter } from "next/router";
import React, { use, useState } from "react";
import { createVideo } from "../lib/api";

const UploadPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userID = "elmer_cruz";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if(!title || !description || !videoURL) {
            setLoading(false);
            setError("Please fill in all fields.");
            return;
        }

        try {
            await createVideo(userID, description, videoURL, title);
            router.push("/");     // return to hom page after download
        } catch (err) {
            setError("Failed to upload video.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4"> Upload a Video</h1>
            <form 
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    placeholder="Title"
                    value= {title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                />
                <input 
                    type="text"
                    placeholder="Video URL (e.g. https://...)"
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Uploading..." : "Submit"}
                </button>
            </form>
        </div>
    );

}

export default UploadPage;
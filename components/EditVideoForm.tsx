import { useState } from "react";
import { Video } from "../types";

interface EditVideoProps {
    video: Video;
    onSubmit: (new_title:string, new_description:string) => Promise<void>;
}

const EditVideoForm = ({video, onSubmit}: EditVideoProps) => {
    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(video.description);

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (title==="") {
                setError("Title cannot be empty");
                return;
            }
            await onSubmit(title, description);
        } catch (err) {
            setError("Failed to edit video")
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3>New Title:</h3>
            <input 
                type="text"
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
                className="w-full p-2 border rounded"
            />
            <h3>New Description</h3>
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={submitting}
                className="w-full p-2 border rounded"
                rows={4}
            />
            <div className="flex justify-center">
                <button 
                    type = "submit"
                    className="bg-green-600 text-white px-4 py-2 rounded
                     hover:bg-green-700 text-sm"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default EditVideoForm;
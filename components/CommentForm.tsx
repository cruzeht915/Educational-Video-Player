import React, { useState } from "react";

interface CommentFormProps {
    videoId: string;
    userId: string;
    onSubmit: (content:string) => Promise<void>;
}

const CommentForm = ({videoId, userId, onSubmit}: CommentFormProps) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (content.trim()==="") {
                setError("Comment cannot be empty");
                return;
            }
            await onSubmit(content);
            setContent("");     //clear afer posting
        } catch (err) {
            setError("Failed to post comment")
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-3">
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-1 text-sm"
                placeholder="Write your comment..."
                value={content}
                disabled={submitting}
                rows={3}
                onChange={(e)=>setContent(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                disabled={submitting}
            >
                {submitting? "Posting...": "Post Comment"}
            </button>
        </form>
    );
}

export default CommentForm;
import { Comment } from "../types";

interface CommentListProps {
    comments: Comment[];
};

const CommentList = ({comments}: CommentListProps) => {
    if (comments.length == 0) {
        return <p> No Comments Yet...</p>
    }

    return (
        <ul className="space-y-4">
            {comments.map((comment, index) => (
                <li key={index} className="border-b pb-2">
                    <p className="text-sm text-gray-800">{comment.content}</p>
                    <span className="text-xs text-gray-500">{comment.user_id}</span>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;

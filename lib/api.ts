//Base API URL for all requests
const basePath = "/api/proxy";


/**
 * Creates a new video
 * @param userID - The user_id (snake case) of the user
 * @param description - Description of the video
 * @param videoURL - Public url to the video file
 * @param title - Title of the video
 * @returns Response
 */

export async function createVideo(userID: string, description: string, videoURL: string, title: string) {
    
    const newVideo = {
        user_id: userID,
        description: description,
        video_url: videoURL,
        title: title
    };
    const res = await fetch(basePath+"/create-video", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newVideo)
    });

    return await res.json();
}

/**
 * Gets all viedos for given user
 * @param userID - The user ID (snake case)
 * @returns response containing list of videos for given user or error
 */
export async function getUserVideos(userID: string) {

    const res = await fetch(`${basePath}/videos?user_id=${userID}`);

    const {videos} = await res.json();

    return videos;
}

/**
 * Edits an existing video
 * @param videoID - The video ID
 * @param title - New title of video
 * @param description - New Description of video
 * @returns Response
 */
export async function editVideo(videoID: string, title: string, description: string) {
    
    const newEdit = {
        video_id: videoID,
        title: title,
        description: description
    };
    
    const res = await fetch(basePath+"/edit-video", {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newEdit)
    });

    if (!res.ok) throw new Error("Failed to update video");

    return await res.json();
}

/**
 * Gets any single video by video ID
 * @param videoID - The video ID
 * @returns Response containing single video info
 */
export async function getSingleVideo(videoID: string) {
    
    const res = await fetch(`${basePath}/single?video_id=${videoID}`);

    const {video} = await res.json();

    return video;
}

/**
 * Craetes a comment on a single video by a given user
 * @param videoID - The video ID
 * @param content - Text of the comment
 * @param userID - The user ID (snake case)
 * @returns Response
 */
export async function createComment(videoID: string, content: string, userID: string) {
    
    const newComment = {
        video_id: videoID,
        content: content,
        user_id: userID
    };
    
    const res = await fetch(basePath+"/create-comment", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newComment)
    });

    return await res.json();
}

/**
 * Gets all comments for a video given its ID
 * @param videoID - The video ID
 * @returns A response containing all the comments on video byt given ID
 */
export async function getVideoComments(videoID: string) {
    
    const res = await fetch(`${basePath}/comments?video_id=${videoID}`);

    const {comments} = await res.json();

    return comments;
}
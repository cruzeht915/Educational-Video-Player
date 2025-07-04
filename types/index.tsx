export interface Comment {
    created_at: string   //ISO time stamp
    content: string      //The comment text
    user_id: string      //Who wrote the comment (snake case) 
    video_id: string     //Video this comment belongs to
    id: string           //Unique comment ID (UUID)
}

export interface Video {
    created_at: string   //ISO time stamp
    video_url: string   
    user_id: string      //Who wrote the comment (snake case) 
    description: string
    title: string
    num_comments: number
    id: string           //Unique video ID (UUID)
}
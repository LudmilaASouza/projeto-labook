import { PostDB } from './../models/Post';
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private static TABLE_POSTS="posts"
    private static TABLE_LIKE_DISLIKE = "likes_dislikes"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }
}
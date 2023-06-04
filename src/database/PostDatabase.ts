import { PostDB, PostDBWithCreatorName } from './../models/Post';
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from './UserDatabase';

export class PostDatabase extends BaseDatabase {
    private static TABLE_POSTS="posts"
    private static TABLE_LIKE_DISLIKE = "likes_dislikes"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPostsWithCreatorName = async (): Promise<PostDBWithCreatorName[]> => {
        
        const result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            `${PostDatabase.TABLE_POSTS}.id`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            `${PostDatabase.TABLE_POSTS}.content`,
            `${PostDatabase.TABLE_POSTS}.likes`,
            `${PostDatabase.TABLE_POSTS}.dislikes`,
            `${PostDatabase.TABLE_POSTS}.created_at`,
            `${PostDatabase.TABLE_POSTS}.update_at`,
            `${UserDatabase.TABLE_USERS}.name as creator_name`
        )
        .join(`${UserDatabase.TABLE_USERS}`, 
        `${PostDatabase.TABLE_POSTS}.creator_id`, 
        "=", `${UserDatabase.TABLE_USERS}.id`)
        
        return result as PostDBWithCreatorName[]
        
    }
}
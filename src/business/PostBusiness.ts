import { GetPostsInputDTO, GetPostsOutputDTO } from './../dtos/post/getPosts.dto';
import { CreatePostsInputDTO, CreatePostsOutputDTO } from './../dtos/post/createPosts.dto';
import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { Post } from '../models/Post';

export class PostBusiness {
    constructor (
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public createPost = async (input: CreatePostsInputDTO): Promise<CreatePostsOutputDTO> => {
        
        const {content, token} = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError()
        }
        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const postDB = post.toDBModel()
        await this.postDatabase.insertPost(postDB)

        const output: CreatePostsOutputDTO = undefined

        return output
    }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {

        const { token } = input

        const payload = this.tokenManager.getPayload(token)
        if (!payload) {
            throw new UnauthorizedError()
        }

        const postsDBWithCreatorName = 
            await this.postDatabase.getPostsWithCreatorName()

        const posts = postsDBWithCreatorName.map((postWithCreatorName)=> {
            const post = new Post (
                postWithCreatorName.id,
                postWithCreatorName.content,
                postWithCreatorName.likes,
                postWithCreatorName.dislikes,
                postWithCreatorName.created_at,
                postWithCreatorName.update_at,
                postWithCreatorName.creator_id,
                postWithCreatorName.creator_name
            )

            return post.toBusinessModel()
        })

        const output: GetPostsOutputDTO = posts

        return output
                
    }
}
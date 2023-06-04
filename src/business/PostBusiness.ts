import { CreatePostsInputDTO, createPostsOutputDTO } from './../dtos/post/createPosts.dto';
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

    public createPost = async (input: CreatePostsInputDTO): Promise<createPostsOutputDTO> => {
        
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

        const output: createPostsOutputDTO = undefined

        return output
    }
}
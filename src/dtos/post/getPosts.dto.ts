import { PostModel } from './../../models/Post';
import z from 'zod'

export interface GetPostsInputDTO {
    token: string
}

export type GetPostsOutputDTO = PostModel []

export const GetPostsSchema = z.object ({
    token: z.string({invalid_type_error: "Token precisa ser string."}).min(1)
}).transform(data => data as GetPostsInputDTO)
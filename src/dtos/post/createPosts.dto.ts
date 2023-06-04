import z from 'zod'

export interface CreatePostsInputDTO {
    content: string,
    token: string
}

export type CreatePostsOutputDTO = undefined

export const createPostsSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostsInputDTO)
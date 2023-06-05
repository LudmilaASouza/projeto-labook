import z from 'zod'

export interface CreatePostsInputDTO {
    content: string,
    token: string
}

export type CreatePostsOutputDTO = undefined

export const createPostsSchema = z.object({
    content: z.string({invalid_type_error: "Content precisa ser string."}).min(1),
    token: z.string({invalid_type_error: "Token precisa ser string."}).min(1)
}).transform(data => data as CreatePostsInputDTO)
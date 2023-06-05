import z from 'zod'

export interface LikeDislikePostInputDTO {
    postId : string,
    token: string,
    like: boolean
}

export type LikeDislikeOutputDTO = undefined

export const LikeDislikePostSchema = z.object ({
    postId : z.string({invalid_type_error: "ID precisa ser string."}).min(1),
    token: z.string({invalid_type_error: "Token precisa ser string."}).min(1),
    like: z.boolean({invalid_type_error: "Like precisa ser true ou false."})
}).transform ( data => data as LikeDislikePostInputDTO)
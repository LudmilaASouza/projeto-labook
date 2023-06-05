import z from 'zod'

export interface EditPostInputDTO {
    content: string,
    token: string,
    idToEdit: string
}

export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object ({
    content: z.string({invalid_type_error: "Content precisa ser string."}).min(1),
    token: z.string({invalid_type_error: "Token precisa ser string."}).min(1),
    idToEdit: z.string({invalid_type_error: "ID precisa ser string."}).min(1)
}).transform(data => data as EditPostInputDTO)
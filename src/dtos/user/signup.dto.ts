import z from 'zod'


export interface SignupInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    token: string
}

export const SignupSchema = z.object ({ 
    name: z.string({invalid_type_error: "Name precisa ser string."}).min(2),
    email: z.string({invalid_type_error: "E-mail precisa ser string."}).email(),
    password: z.string().min(4)
}).transform(data => data as SignupInputDTO)
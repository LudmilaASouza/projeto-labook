import z from 'zod'

export interface LoginInputDTO {
    email: string,
    password: string
}


export interface LoginOutputDTO {
    token: string
}

export const LoginSchema = z.object ({ 
    email: z.string({invalid_type_error: "E-mail precisa ser string."}).email(),
    password: z.string().min(4)
}).transform(data => data as LoginInputDTO)


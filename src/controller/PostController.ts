import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { createPostsSchema } from "../dtos/post/createPosts.dto";
import { GetPostsSchema } from '../dtos/post/getPosts.dto';
import { EditPostSchema } from "../dtos/post/editPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { LikeDislikePostSchema } from "../dtos/post/likeDislikePost.dto";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = createPostsSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostsSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = EditPostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                idToEdit: req.params.id
            })
            const output = await this.postBusiness.editPost(input)
            
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            } 
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = DeletePostSchema.parse({
                token: req.headers.authorization,
                idToDel: req.params.id
            })

            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            } 
        }
    }

    public likeDislikePost = async (req: Request, res: Response) => {
        try {
            const input = LikeDislikePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like
            })

            const output = await this.postBusiness.likeDislikePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            } 
        }
    }
}
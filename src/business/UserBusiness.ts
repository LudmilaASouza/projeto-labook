import { BadRequestError } from './../errors/BadRequestError';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from '../database/UserDatabase';
import { SignupInputDTO, SignupOutputDTO } from '../dtos/user/signup.dto';
import { TokenPayload, USER_ROLES, User } from '../models/User';
import { LoginInputDTO, LoginOutputDTO } from '../dtos/user/login.dto';
import { NotFoundError } from '../errors/NotFoundError';

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {name, email, password} = input
        const id = this.idGenerator.generate()

        const hasedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hasedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )
        
        const userDB = user.toDBModel()
        await this.userDatabase.createUser(userDB)

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const output: SignupOutputDTO = {
            token: this.tokenManager.createToken(payload)
        }

        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const {email, password} = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if(!userDB){
            throw new BadRequestError("Email não encontrado.")
        }

        const user = new User (
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const isPasswordCorrect = await this.hashManager
        .compare(password, user.getPassword())

        if(!isPasswordCorrect){
            throw new BadRequestError("E-mail ou senha incorreta.")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const output: LoginOutputDTO = {
            token: this.tokenManager.createToken(payload)
        }

        return output

    }
}
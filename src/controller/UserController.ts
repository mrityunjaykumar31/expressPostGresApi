import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            console.log(request.params.id)
            let userToRemove = await this.userRepository.findOne(request.params.id);

            await this.userRepository.remove(userToRemove);
            response.status(200).json( request.params.id + " Deleted ")  
        } catch (error) {
            response.status(400).json({ error: error.message }); 
        }
    }

}
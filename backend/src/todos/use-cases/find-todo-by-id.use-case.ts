import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FindUniqueTodoRepository } from "../repository";


@Injectable()
export class FindUniqueUseCase{
    constructor(
        private readonly findUniqueTodoRepository: FindUniqueTodoRepository,
        private readonly logger: Logger,
    ) {}

    async findById(id: string) {
        try {
            this.logger.log('finding  toDo ...');
            const todo = await this.findUniqueTodoRepository.findById(id);
            this.logger.log('toDo found successfully');
            if(!todo){
                throw new NotFoundException('ToDo')
            }
            return todo;
        }   catch(error){
            this.logger.error(error);
            throw new Error('Failed to find toDo')
        }
    }
}
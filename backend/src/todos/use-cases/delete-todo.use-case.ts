import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DeleteTodoRepository, FindUniqueTodoRepository } from "../repository";

@Injectable()
export class DeleteTodoUsecase {
    constructor(
        private readonly deleteTodoRepository: DeleteTodoRepository,
        private readonly findTodoByIdRepository: FindUniqueTodoRepository,
        private readonly logger: Logger,
    ) {}

    async execute(id: string) {
        try {
            this.logger.log('Deleting  toDo ...');
            const todo = await this.findTodoByIdRepository.findById(id);
            if(!todo) {
                throw new NotFoundException('ToDo not found');
            }
            await this.deleteTodoRepository.delete(id);
            this.logger.log('Todo deleted sucessfully')
            return todo;
        }  catch(error){
            this.logger.error(error)
            throw error;
        }
        }
    }

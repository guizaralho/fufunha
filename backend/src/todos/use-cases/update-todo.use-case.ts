import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FindUniqueTodoRepository, UpdateTodoRepository } from "../repository";
import { UpdateTodoDto } from "../dto/update-todo.dto";


@Injectable()
export class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoRepository: UpdateTodoRepository,
        private readonly findTodoByRepository: FindUniqueTodoRepository,
        private readonly logger: Logger,
    ) {}

    async execute(id: string,data:UpdateTodoDto) {
        try {
            this.logger.log('Updating  toDo ...');
            const todo = await this.findTodoByRepository.findById(id);
            if(!todo) {
                throw new NotFoundException('ToDo not found');
            }
            await this.updateTodoRepository.update(id,data);
            this.logger.log('Todo Updated sucessfully')
            return todo;
        }  catch (error){
            this.logger.error(error);
            throw new error('failed to update toDo')
        }
    }
}
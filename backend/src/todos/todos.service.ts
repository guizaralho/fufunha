import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoRepository, DeleteTodoRepository, FindAllTodoRepository, FindUniqueTodoRepository, UpdateTodoRepository } from './repository';
import { FindAllTodoUseCase } from './use-cases';

@Injectable()
export class TodosService {
  constructor (
          private readonly createTodoRepository: CreateTodoRepository,
          private readonly findAllTodoUseCase: FindAllTodoUseCase,
          private readonly findUniqueTodoRepository: FindUniqueTodoRepository,
          private readonly updateTodoRepository: UpdateTodoRepository,
          private readonly deleteTodoRepository: DeleteTodoRepository) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.createTodoRepository.create(createTodoDto);
  }

  async findAll() {
    return await this.findAllTodoUseCase.findAll();
  }

  async findOne(id: string) {
    return await this.findUniqueTodoRepository.findById(id);
  }

  async update(id: string, data: UpdateTodoDto) {
    return await this.updateTodoRepository.update(id,data);
  }

  async remove(id: string) { 
    return await this.deleteTodoRepository.delete(id);
  }
}

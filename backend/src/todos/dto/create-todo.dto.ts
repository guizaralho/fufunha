import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";


enum TododPriority{
LOW = 'LOW',
MEDIUM = 'MEDIUM',
HIGH = 'HIGH',    
}

export class CreateTodoDto{
@IsString()
title: string;

@IsString()
@IsOptional()
description?: string;

@IsBoolean()
@IsNotEmpty()
completed: boolean;

@IsEnum(TododPriority)
@IsNotEmpty()
priority: TododPriority;

@IsDateString()
@IsOptional()
dueAt?: Date;

@IsDateString()
completedAt: Date;

@IsString()
userId: string;

@IsDateString()
createdAt: Date;

@IsDateString()
@IsOptional()
updatedAt: Date;
}
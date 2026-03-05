export class CreateTodoDto {
title: string;
description: string;
completed: boolean;
priority: TododPriority;
dueAt: Date;
completedAt: Date;
userId: string;
createdAt: Date;
updatedAt: Date;
}

enum TododPriority{
LOW = 'LOW',
MEDIUM = 'MEDIUM',
HIGH = 'HIGH',    
}

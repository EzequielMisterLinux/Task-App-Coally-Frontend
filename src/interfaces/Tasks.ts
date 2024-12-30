export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    user: User;
    createAt: Date;
    __v: number;
  }
  
  export interface CreateTaskDto {
    title: string;
    description: string; 
    completed: boolean
  }
  
  export interface User {
    _id: string;
    names: string;
    lastnames: string;
    email: string;
  }
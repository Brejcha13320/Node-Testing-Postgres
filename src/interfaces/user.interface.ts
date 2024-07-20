import { Category } from "./category.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithCategories {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
}

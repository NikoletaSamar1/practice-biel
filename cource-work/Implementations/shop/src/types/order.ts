import { Food } from "./food";

export interface Order {
    id: string;
    userId: string;
    food: Food[];
    totalValue: number;
  }
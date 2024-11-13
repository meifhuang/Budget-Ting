export type Expense = {
    id: number, 
    userId: number,
    categoryId: number,
    itemName: string,
    date: Date, 
    amount: number, 
    recurring: boolean,
    frequency?: string, 
}
export interface ViewModelProduct {
    name: string;
    price: number;
    description: string;
    image: string;
    countInStock: number;
    isFeatured?:boolean
    categoryName: string;
    // categoryId: number;

}

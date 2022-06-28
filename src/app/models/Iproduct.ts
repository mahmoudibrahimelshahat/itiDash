import { category } from "./Icategory";

export interface Iproduct {
    id?: string;
    name: string;
    price: number;
    description: string;
    richDescription?:string
    image?: string;
    brand?:string;
    rating?: number;
    countInStock: number;
    category?:category
    numReviews?:number
    isFeatured?:boolean
}
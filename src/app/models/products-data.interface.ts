export interface Brand {
    id: number,
    name: string
}

export interface FiltersData {
    brands: Brand[]
}

export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    categoryId: number;
    description: string;
    brandId: number;
    image: string;
}
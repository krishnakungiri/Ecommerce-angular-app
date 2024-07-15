export interface Brand {
    id: number;
    name: string;
}

export interface Category extends Brand {
    brands: number[]
}

export interface FiltersData {
    brands?: Brand[];
    category?: Category;
    rating?: number;
    price?: [number, number]
}

export interface FiltersDataAPI {
    brand?: number[];
    category?: number;
    rating?: number;
    price?: { gt: number, lt: number }
}

export interface IpriceRangeFilter {
    priceMinValue: number,
    priceMaxValue: number
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

export interface CartProduct extends Product {
    quantity: number;
}
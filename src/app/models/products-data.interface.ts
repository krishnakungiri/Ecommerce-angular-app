export interface Brand {
    id: number;
    name: string;
}

export interface Category extends Brand {

}

export interface FiltersData {
    brands?: Brand[];
    category?: Category;
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
interface IPredictResponse {
    price: string;
    img: string;
}

export interface ImagesResult {
    images_results: {
        original: string;
    }[];
}

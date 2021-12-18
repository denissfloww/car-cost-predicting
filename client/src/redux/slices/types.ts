export interface IPredictResponse {
    price: string;
    img: string;
    car: string;
}

export interface IQuery {
    model: string,
    brand: string,
    year: string,
    transmission: string,
    mileage: string,
    fueltype: string,
    tax: string,
    mpg: string,
    enginesize: string,
    img: string,
    price: string,
}

export interface IQueryResponse {
    count: number,
    queries: IQuery[]
}

export interface IBrandAveragePrice{
    brand: string,
    price: number
}
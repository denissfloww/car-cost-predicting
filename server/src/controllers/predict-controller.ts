import { Request, Response } from 'express';
import axios from 'axios';
import { ImagesResult } from './types';
import { Between, getRepository } from 'typeorm';
import { query } from '../entity/query';

export const getPredictResult = async (req: Request, res: Response) => {
    try {
        const { brand, model, year, engineType, driveType, mileage, tax, mpg, enginesize } = req.query;
        //   не удалять
        const image = await getImage(`${brand}%20${model}%20${year}`);
        //const image = 'https://serpapi.com/searches/61ba142029d17788d6b2a009/images/15c818b2fd970129b52dc83e2c65691088306a3c14cd79cbba31cdb9ae2ee5b3.jpeg'

        const data = {
            Inputs: {
                input1: {
                    ColumnNames: [
                        'brand',
                        'model',
                        'year',
                        'transmission',
                        'mileage',
                        'fuelType',
                        'tax',
                        'mpg',
                        'engineSize',
                        'price',
                        'Column 10',
                    ],
                    Values: [
                        [
                            brand,
                            model,
                            Number(year),
                            driveType,
                            Number(mileage),
                            engineType,
                            Number(tax),
                            Number(mpg),
                            Number(enginesize),
                            0,
                            'value',
                        ],
                        [
                            brand,
                            model,
                            Number(year),
                            driveType,
                            Number(mileage),
                            engineType,
                            Number(tax),
                            Number(mpg),
                            Number(enginesize),
                            0,
                            'value',
                        ],
                    ],
                },
            },
            GlobalParameters: {},
        };

        const response = await axios.post(
            `https://ussouthcentral.services.azureml.net/workspaces/a8c57ce43fd249629841228279be740a/services/5cd47b3f3f864766a973456d059e30e1/execute?api-version=2.0&details=true`,
            data,
            {
                headers: {
                    Authorization: 'Bearer CT8/obmHIJUgG9Gb6FP4AANXXmexdmu3iP6Ew1H0K5qtvAcXg6sxaOfG82noVbmWYM1fuLwk90DaViRjtfhoHQ==',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );

        const price = response.data['Results']['output1']['value']['Values'][0][0];

        const result = {
            price: price,
            img: image, // image,
            car: `${brand} ${model}, год: ${year}, тип двигателя: ${engineType}, трасмиссия: ${driveType}, объем двигателя: ${enginesize}, пробег: ${mileage}`,
        };

        await getRepository(query).save({
            //@ts-ignore
            model: model,
            brand: brand,
            year: year,
            transmission: driveType,
            mileage: mileage,
            fueltype: engineType,
            tax: tax,
            mpg: mpg,
            enginesize: enginesize,
            img: image,
            price: price,
        });

        return res.send(result);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export const getHistoryPerDay = async (req: Request, res: Response) => {
    try {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() - 1);

        const [queries, count] = await getRepository(query).findAndCount({
            where: {
                date: Between(endDate, startDate),
            },
            order: {
                date: "DESC",
            },
        });

        return res.status(200).send({ count, queries });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

export const getQueriesCountForAllTime = async (req: Request, res: Response) => {
    try {
        const [queries, count] = await getRepository(query).findAndCount();

        return res.status(200).send({ count });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

export const getAverageBrandPricePerDay = async (req: Request, res: Response) => {
    try {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() - 1);
        console.log(startDate.toISOString(), endDate)

        const brandAvgPrice = await getRepository(query).query(
            `
                select round(avg(q.price)) as price , q.brand
                from queries q
                where
                    q.date BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()
                group by q.brand;
            `
        );

        return res.status(200).send(brandAvgPrice);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

const getImage = async (str: string) => {
    const query = `${process.env.GOOGLE_SEARCH_API_URL}/search.json?q=${str}&tbm=isch&ijn=0&api_key=184bf11e474db990bbf005a558aed292d07997ee547d30bcee7094623ab95d25`;
    console.log(query);
    const response = await axios.get(query);
    const imagesResult: ImagesResult = response.data;
    console.log(imagesResult.images_results[0].original);

    return imagesResult.images_results[0].original;
};

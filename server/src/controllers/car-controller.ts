import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { car } from "../entity/сar";

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await getRepository(car)
      .createQueryBuilder("c")
      .select("c.brand")
      .distinctOn(["c.brand"])
      .getMany();

    const brandsValue: string[] = brands.map(({ brand } : any) => brand)

    return res.send(brandsValue);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getModels = async (req: Request, res: Response) => {
  try {
    const models = await getRepository(car)
      .createQueryBuilder("c")
      .select("c.model")
      .distinctOn(["c.model"])
      .getMany();

    const modelsValue: string[] = models.map(({ model } : any) => model)

    return res.send(modelsValue);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getTransmissions = async (req: Request, res: Response) => {
  try {
    const transmissions = await getRepository(car)
      .createQueryBuilder("c")
      .select("c.transmission")
      .distinctOn(["c.transmission"])
      .getMany();

    const transmissionsValue: string[] = transmissions.map(({ transmission } : any) => transmission)

    return res.send(transmissionsValue);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getFuelTypes = async (req: Request, res: Response) => {
  try {
    const fuelTypes = await getRepository(car)
      .createQueryBuilder("c")
      .select("c.fueltype")
      .distinctOn(["c.fueltype"])
      .getMany();

    const fuelTypesValue: string[] = fuelTypes.map(({ fueltype } : any) => fueltype)

    return res.send(fuelTypesValue);
  } catch (e) {
    return res.status(500).send(e);
  }
};

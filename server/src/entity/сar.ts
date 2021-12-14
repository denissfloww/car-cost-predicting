import { Column, Entity, Index } from "typeorm";

@Index("cars_pkey", ["carid"], { unique: true })
@Entity("cars", { schema: "public" })
export class car {
  @Column("integer", { primary: true, name: "carid" })
  carid: number;

  @Column("character varying", { name: "brand", length: 8 })
  brand: string;

  @Column("character varying", { name: "model", length: 22 })
  model: string;

  @Column("integer", { name: "year" })
  year: number;

  @Column("character varying", { name: "transmission", length: 9 })
  transmission: string;

  @Column("integer", { name: "mileage" })
  mileage: number;

  @Column("character varying", { name: "fueltype", length: 8 })
  fueltype: string;

  @Column("numeric", { name: "tax", precision: 5, scale: 1 })
  tax: string;

  @Column("numeric", { name: "mpg", precision: 5, scale: 1 })
  mpg: string;

  @Column("numeric", { name: "enginesize", precision: 3, scale: 1 })
  enginesize: string;
}

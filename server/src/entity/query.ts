import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("table_name_pk", ["id"], { unique: true })
@Entity("queries", { schema: "public" })
export class query {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "date", nullable: true, default: () => "now()" })
  date: string | null;

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

  @Column("numeric", { name: "price" })
  price: string;

  @Column("character varying", { name: "img", nullable: true })
  img: string | null;
}

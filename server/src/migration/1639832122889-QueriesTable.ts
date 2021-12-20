import { MigrationInterface, QueryRunner } from 'typeorm';

export class QueriesTable1639832122889 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table queries
(
    id           serial
        constraint table_name_pk
            primary key,
    date         timestamp default now(),
    brand        varchar(8)    not null,
    model        varchar(22)   not null,
    year         integer       not null,
    transmission varchar(9)    not null,
    mileage      integer       not null,
    fueltype     varchar(8)    not null,
    tax          numeric(5, 1) not null,
    mpg          numeric(5, 1) not null,
    enginesize   numeric(3, 1) not null,
    price        numeric       not null,
    img          varchar
);

alter table queries
    owner to postgres;

INSERT INTO public.queries (id, date, brand, model, year, transmission, mileage, fueltype, tax, mpg, enginesize, price, img) VALUES (3, '2021-12-18 00:00:00.000000', 'audi', 'A8', 2021, 'Manual', 100000, 'Electric', 200.0, 4.8, 2.5, 23356.46875, 'https://iron-bet.ru/upload/iblock/059/059082d919f971dd434f9f16d14d02d8.jpg');
INSERT INTO public.queries (id, date, brand, model, year, transmission, mileage, fueltype, tax, mpg, enginesize, price, img) VALUES (5, '2021-12-18 00:00:00.000000', 'audi', 'A8', 2021, 'Manual', 100000, 'Electric', 200.0, 4.8, 2.5, 23356.46875, 'https://iron-bet.ru/upload/iblock/059/059082d919f971dd434f9f16d14d02d8.jpg');
INSERT INTO public.queries (id, date, brand, model, year, transmission, mileage, fueltype, tax, mpg, enginesize, price, img) VALUES (4, '2021-12-18 00:00:00.000000', 'ford', 'Caddy Life', 2009, 'Semi-Auto', 10000, 'Diesel', 200.0, 100.0, 5.5, 27301.8697916667, 'https://iron-bet.ru/upload/iblock/059/059082d919f971dd434f9f16d14d02d8.jpg');
INSERT INTO public.queries (id, date, brand, model, year, transmission, mileage, fueltype, tax, mpg, enginesize, price, img) VALUES (6, '2021-12-14 00:00:00.000000', 'merc', 'GL Class', 1996, 'Semi-Auto', 400000, 'Petrol', 200.0, 100.0, 2.0, 7878.39895833333, 'https://iron-bet.ru/upload/iblock/059/059082d919f971dd434f9f16d14d02d8.jpg');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "queries"`);
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRelationOfTotal1674056867976 implements MigrationInterface {
    name = 'RemoveRelationOfTotal1674056867976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "in_theaters" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "available_seats" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "available_seats"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "in_theaters"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total" integer NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class employeeJoinTableFix1673985880106 implements MigrationInterface {
    name = 'employeeJoinTableFix1673985880106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees_order_orders" ("employeesId" uuid NOT NULL, "ordersId" uuid NOT NULL, CONSTRAINT "PK_4914b7002c37f1193c4bda4ed9c" PRIMARY KEY ("employeesId", "ordersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ccb4105ac220cc994345dab2e" ON "employees_order_orders" ("employeesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49e7aa241357693124a4ef6419" ON "employees_order_orders" ("ordersId") `);
        await queryRunner.query(`ALTER TABLE "employees_order_orders" ADD CONSTRAINT "FK_9ccb4105ac220cc994345dab2ea" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employees_order_orders" ADD CONSTRAINT "FK_49e7aa241357693124a4ef64195" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees_order_orders" DROP CONSTRAINT "FK_49e7aa241357693124a4ef64195"`);
        await queryRunner.query(`ALTER TABLE "employees_order_orders" DROP CONSTRAINT "FK_9ccb4105ac220cc994345dab2ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49e7aa241357693124a4ef6419"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ccb4105ac220cc994345dab2e"`);
        await queryRunner.query(`DROP TABLE "employees_order_orders"`);
    }

}

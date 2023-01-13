import { MigrationInterface, QueryRunner } from "typeorm";

export class atualizaçãoIdtoPrimaryGeneratedColumn1673469092650 implements MigrationInterface {
    name = 'atualizaçãoIdtoPrimaryGeneratedColumn1673469092650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_394d1cc04a533ecac03f2a65c5c"`);
        await queryRunner.query(`ALTER TABLE "categoryMovie" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2f229e096b82d3702ec4958656b"`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" DROP CONSTRAINT "FK_b25c44e96367bdd28b7cbd0ba1b"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_79d909def044937cd35642b0d11"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_df8796a81b4d48f180eacc1304c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4ee357cce7fc67e1ffe07bb65f9"`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" DROP CONSTRAINT "FK_31943c537009d92f4a2dc93db92"`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" DROP CONSTRAINT "FK_3a9c3fb7a432564acc8889b922f"`);
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" DROP CONSTRAINT "FK_5dec124b0df700e1dc874ca2846"`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" DROP CONSTRAINT "FK_543fd6eb6ee5eb10d6767f1f577"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" DROP CONSTRAINT "FK_ae3ce953f1ad83a5ebb36254fc4"`);
        await queryRunner.query(`ALTER TABLE "foods" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_b4f713df790fa1b93645c6d24e6"`);
        await queryRunner.query(`ALTER TABLE "categoryFood" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2f229e096b82d3702ec4958656b" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4ee357cce7fc67e1ffe07bb65f9" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_394d1cc04a533ecac03f2a65c5c" FOREIGN KEY ("categoryMovieId") REFERENCES "categoryMovie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_79d909def044937cd35642b0d11" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_b4f713df790fa1b93645c6d24e6" FOREIGN KEY ("categoryFoodId") REFERENCES "categoryFood"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_df8796a81b4d48f180eacc1304c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" ADD CONSTRAINT "FK_b25c44e96367bdd28b7cbd0ba1b" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" ADD CONSTRAINT "FK_31943c537009d92f4a2dc93db92" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" ADD CONSTRAINT "FK_5dec124b0df700e1dc874ca2846" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" ADD CONSTRAINT "FK_3a9c3fb7a432564acc8889b922f" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" ADD CONSTRAINT "FK_ae3ce953f1ad83a5ebb36254fc4" FOREIGN KEY ("foodsId") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" ADD CONSTRAINT "FK_543fd6eb6ee5eb10d6767f1f577" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foods_order_orders" DROP CONSTRAINT "FK_543fd6eb6ee5eb10d6767f1f577"`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" DROP CONSTRAINT "FK_ae3ce953f1ad83a5ebb36254fc4"`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" DROP CONSTRAINT "FK_3a9c3fb7a432564acc8889b922f"`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" DROP CONSTRAINT "FK_5dec124b0df700e1dc874ca2846"`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" DROP CONSTRAINT "FK_31943c537009d92f4a2dc93db92"`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" DROP CONSTRAINT "FK_b25c44e96367bdd28b7cbd0ba1b"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_df8796a81b4d48f180eacc1304c"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_b4f713df790fa1b93645c6d24e6"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_79d909def044937cd35642b0d11"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_394d1cc04a533ecac03f2a65c5c"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4ee357cce7fc67e1ffe07bb65f9"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2f229e096b82d3702ec4958656b"`);
        await queryRunner.query(`ALTER TABLE "categoryFood" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_b4f713df790fa1b93645c6d24e6" FOREIGN KEY ("categoryFoodId") REFERENCES "categoryFood"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foods" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" ADD CONSTRAINT "FK_ae3ce953f1ad83a5ebb36254fc4" FOREIGN KEY ("foodsId") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "foods_order_orders" ADD CONSTRAINT "FK_543fd6eb6ee5eb10d6767f1f577" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" ADD CONSTRAINT "FK_5dec124b0df700e1dc874ca2846" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employees_rooms_rooms" ADD CONSTRAINT "FK_3a9c3fb7a432564acc8889b922f" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" ADD CONSTRAINT "FK_31943c537009d92f4a2dc93db92" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4ee357cce7fc67e1ffe07bb65f9" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_df8796a81b4d48f180eacc1304c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_79d909def044937cd35642b0d11" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie_rooms_rooms" ADD CONSTRAINT "FK_b25c44e96367bdd28b7cbd0ba1b" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2f229e096b82d3702ec4958656b" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "categoryMovie" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_394d1cc04a533ecac03f2a65c5c" FOREIGN KEY ("categoryMovieId") REFERENCES "categoryMovie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

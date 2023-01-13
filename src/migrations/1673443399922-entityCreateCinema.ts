import { MigrationInterface, QueryRunner } from "typeorm";

export class entityCreateCinema1673443399922 implements MigrationInterface {
    name = 'entityCreateCinema1673443399922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoryMovie" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f71f28a58037bce3b721f7210ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL, "movieId" uuid, "roomId" uuid, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL, "name" character varying NOT NULL, "director" character varying NOT NULL, "synopsis" character varying NOT NULL, "release_date" date NOT NULL, "categoryMovieId" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "cpf" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL, "name" character varying NOT NULL, "is3D" boolean NOT NULL, "seats" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL, "name" character varying NOT NULL, "registration" character varying NOT NULL, "age" integer NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_9fa854797df9194a3529176a1fc" UNIQUE ("registration"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "status" character varying NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "foods" ("id" uuid NOT NULL, "name" character varying NOT NULL, "stock" integer NOT NULL, "price" integer NOT NULL, "categoryFoodId" uuid, "usersId" uuid, CONSTRAINT "PK_0cc83421325632f61fa27a52b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoryFood" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2969502715309e4147345c771ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_rooms_rooms" ("movieId" uuid NOT NULL, "roomsId" uuid NOT NULL, CONSTRAINT "PK_842be9b9a974fc03f24e4bc75bc" PRIMARY KEY ("movieId", "roomsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b25c44e96367bdd28b7cbd0ba1" ON "movie_rooms_rooms" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_31943c537009d92f4a2dc93db9" ON "movie_rooms_rooms" ("roomsId") `);
        await queryRunner.query(`CREATE TABLE "employees_rooms_rooms" ("employeesId" uuid NOT NULL, "roomsId" uuid NOT NULL, CONSTRAINT "PK_5f04427768a0cbff8e85a23ab62" PRIMARY KEY ("employeesId", "roomsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5dec124b0df700e1dc874ca284" ON "employees_rooms_rooms" ("employeesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a9c3fb7a432564acc8889b922" ON "employees_rooms_rooms" ("roomsId") `);
        await queryRunner.query(`CREATE TABLE "foods_order_orders" ("foodsId" uuid NOT NULL, "ordersId" uuid NOT NULL, CONSTRAINT "PK_16eae55676a32a82328063f2e43" PRIMARY KEY ("foodsId", "ordersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae3ce953f1ad83a5ebb36254fc" ON "foods_order_orders" ("foodsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_543fd6eb6ee5eb10d6767f1f57" ON "foods_order_orders" ("ordersId") `);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_543fd6eb6ee5eb10d6767f1f57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae3ce953f1ad83a5ebb36254fc"`);
        await queryRunner.query(`DROP TABLE "foods_order_orders"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a9c3fb7a432564acc8889b922"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5dec124b0df700e1dc874ca284"`);
        await queryRunner.query(`DROP TABLE "employees_rooms_rooms"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31943c537009d92f4a2dc93db9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b25c44e96367bdd28b7cbd0ba1"`);
        await queryRunner.query(`DROP TABLE "movie_rooms_rooms"`);
        await queryRunner.query(`DROP TABLE "categoryFood"`);
        await queryRunner.query(`DROP TABLE "foods"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "categoryMovie"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRouteEntity1712994067613 implements MigrationInterface {
  name = 'AddRouteEntity1712994067613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."routes_type_enum" AS ENUM('car', 'airplane', 'ship')`,
    );
    await queryRunner.query(
      `CREATE TABLE "routes" ("id" SERIAL NOT NULL, "distance" integer NOT NULL, "time" integer NOT NULL, "price" integer NOT NULL, "type" "public"."routes_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromId" integer, "toId" integer, "ownerId" integer, CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id")); COMMENT ON COLUMN "routes"."distance" IS 'Расстояние пути в километрах'; COMMENT ON COLUMN "routes"."time" IS 'Время прохождения пути в часах'; COMMENT ON COLUMN "routes"."price" IS 'Стоимость прохождения пути в копейках'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."amount" IS 'Количество продукта на складах в формате { [RouteEntity#id]: number }'`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" ADD CONSTRAINT "FK_2dbc63dd8a8143de6c077f4a6d7" FOREIGN KEY ("fromId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" ADD CONSTRAINT "FK_2df35120f2a887a623d0cc11108" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" ADD CONSTRAINT "FK_0a247ce3d7e9a59c0ce101fa01f" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "routes" DROP CONSTRAINT "FK_0a247ce3d7e9a59c0ce101fa01f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" DROP CONSTRAINT "FK_2df35120f2a887a623d0cc11108"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" DROP CONSTRAINT "FK_2dbc63dd8a8143de6c077f4a6d7"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."amount" IS 'Количество продукта на складах в формате { [StoreEntity#id]: number }'`,
    );
    await queryRunner.query(`DROP TABLE "routes"`);
    await queryRunner.query(`DROP TYPE "public"."routes_type_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductEntity1712975349003 implements MigrationInterface {
  name = 'AddProductEntity1712975349003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "photo" character varying NOT NULL, "price" integer NOT NULL, "properties" json NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "amount" json NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "ownerId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")); COMMENT ON COLUMN "products"."price" IS 'Стоимость в копейках'; COMMENT ON COLUMN "products"."properties" IS 'Дополнительные параметры продукта'; COMMENT ON COLUMN "products"."enabled" IS 'Отображение продукта у покупателе'; COMMENT ON COLUMN "products"."amount" IS 'Количество продукта на складах в формате { [StoreEntity#id]: number }'`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_stores_stores" ("productsId" integer NOT NULL, "storesId" integer NOT NULL, CONSTRAINT "PK_56210c6c856ff3186388b571c86" PRIMARY KEY ("productsId", "storesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0c6f1e2be190e72b6199489af" ON "products_stores_stores" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea97d4e96b2ce670cb6adeb1c2" ON "products_stores_stores" ("storesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_663aa9983fd61dfc310d407d4da" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" ADD CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" ADD CONSTRAINT "FK_ea97d4e96b2ce670cb6adeb1c2b" FOREIGN KEY ("storesId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" DROP CONSTRAINT "FK_ea97d4e96b2ce670cb6adeb1c2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" DROP CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_663aa9983fd61dfc310d407d4da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ea97d4e96b2ce670cb6adeb1c2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0c6f1e2be190e72b6199489af"`,
    );
    await queryRunner.query(`DROP TABLE "products_stores_stores"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}

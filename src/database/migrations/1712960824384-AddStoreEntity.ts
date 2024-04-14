import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStoreEntity1712960824384 implements MigrationInterface {
  name = 'AddStoreEntity1712960824384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."stores_type_enum" AS ENUM('store', 'delivery_point')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stores" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "type" "public"."stores_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "FK_a447ba082271c05997a61df26df" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "FK_a447ba082271c05997a61df26df"`,
    );
    await queryRunner.query(`DROP TABLE "stores"`);
    await queryRunner.query(`DROP TYPE "public"."stores_type_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeProductEntityAndStoreEntityRelation1712986038307
  implements MigrationInterface
{
  name = 'ChangeProductEntityAndStoreEntityRelation1712986038307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" DROP CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" ADD CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" DROP CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores_stores" ADD CONSTRAINT "FK_a0c6f1e2be190e72b6199489af1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }
}

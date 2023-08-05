import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesInit1691234484128 implements MigrationInterface {
    name = 'TablesInit1691234484128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attendees_answer_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "attendees" ("id" SERIAL NOT NULL, "answer" "public"."attendees_answer_enum" NOT NULL DEFAULT '0', "eventId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0d01acb0e67860db61a6fb61a4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "when" TIMESTAMP NOT NULL, "organizerId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendees" ADD CONSTRAINT "FK_4925989ece225c9c203da5c225c" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendees" ADD CONSTRAINT "FK_47ee4048f204fcdd9b27e16b977" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_1024d476207981d1c72232cf3ca" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_1024d476207981d1c72232cf3ca"`);
        await queryRunner.query(`ALTER TABLE "attendees" DROP CONSTRAINT "FK_47ee4048f204fcdd9b27e16b977"`);
        await queryRunner.query(`ALTER TABLE "attendees" DROP CONSTRAINT "FK_4925989ece225c9c203da5c225c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "attendees"`);
        await queryRunner.query(`DROP TYPE "public"."attendees_answer_enum"`);
    }

}

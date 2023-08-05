import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1691232393378 implements MigrationInterface {
  name = "SeedDb1691232393378";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // users
    // password admin1234
    await queryRunner.query(
      `INSERT INTO users (username, email, password, "firstName", "lastName") VALUES ('admin', 'admin@gmail.com', '$2b$05$wZiceah/wzynGlWuaAomAu/NfAu7bbabGOFQuEt4YACX867Gyb5/y', 'admin', 'admin')`
    );
    // password test1234
    await queryRunner.query(
      `INSERT INTO users (username, email, password, "firstName", "lastName") VALUES ('test', 'test@gmail.com', '$2b$05$/cLXYQIK3oRKupYY6cs6DedURX.H3VeQ7LdwEyiuq7K64joND78Lq', 'test', 'test')`
    );

    // events
    await queryRunner.query(
      `INSERT INTO events (name, description, address, "when", "organizerId") VALUES ('Team Meetup', 'Lets meet together.',  'Office St 120','2023-08-15 21:00:00', '1')`
    );

    await queryRunner.query(
      `INSERT INTO events (name, description, address, "when", "organizerId") VALUES ('Workshop', 'Lets learn something.',  'Workshop St 80','2023-08-17 21:00:00', '1')`
    );

    await queryRunner.query(
      `INSERT INTO events (name, description, address, "when", "organizerId") VALUES ('Strategy Meeting', 'Lets meet with big bosses.',  'Boss St 100','2023-08-07 21:00:00', '2')`
    );

    await queryRunner.query(
      `INSERT INTO events (name, description, address, "when", "organizerId") VALUES ('Sales Pitch', 'Lets try to sell stuff',  'Money St 34','2023-08-09 22:00:00', '2')`
    );

    await queryRunner.query(
      `INSERT INTO events (name, description, address, "when", "organizerId") VALUES ('Founders Meeting', 'People meet to talk about business ideas',  'Invention St 123','2023-08-09 22:00:00', '1')`
    );

    // attendees
    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('0', '1', '1')`
    );

    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('0', '2', '1')`
    );

    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('1', '3', '1')`
    );
    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('2', '4', '1')`
    );
    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('1', '5', '1')`
    );

    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('2', '1', '2')`
    );

    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('0', '2', '2')`
    );

    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('2', '3', '2')`
    );
    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('0', '4', '2')`
    );
    await queryRunner.query(
      `INSERT INTO attendees (answer, "eventId", "userId") VALUES ('1', '5', '2')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}

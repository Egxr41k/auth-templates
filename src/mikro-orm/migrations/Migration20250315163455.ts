import { Migration } from '@mikro-orm/migrations';

export class Migration20250315163455 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_username_unique";`);

    this.addSql(`alter table "user" rename column "username" to "email";`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);

    this.addSql(`alter table "user" rename column "email" to "username";`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);
  }

}

import createConnection from '../index';
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

export async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(`
    insert into users(id, name, email, password, admin, driver_license, created_at)
    values ('${id}', 'admin', 'admin@admin.com', '${password}', true, '123456', now())
  `);

  await connection.close();
};

create().then(() => console.log('User admin created!'));
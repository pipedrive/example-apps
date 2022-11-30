### Running the app

1. Clone the repo, `cd` into the app directory, and run `npm i` to install all the required dependencies.

2. Create a Pipedrive app and copy its client id, secret to the `.env.example` file. Rename this file to `.env`.

3. Generate the database by using the `npx prisma db push` command.

```
% npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

🚀  Your database is now in sync with your Prisma schema. Done in 28ms

✔ Generated Prisma Client (4.6.1 | library) to ./node_modules/@prisma/client in 58ms
```

4. You can start the app by running the `npm run dev` command.

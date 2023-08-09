# Multiplayer Quiz App

This project utilizes NextJS 13.

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Client Components
Client components have the ability to use state in react. Client components should be used whenever you need user interaction. For example: event listeners.

## Server Components

TBD...


# Prisma

To migrate (create) schemas run `npx prisma migrate dev --name init`

To open up Prisma's GUI (substitute for pgAdmin) run `npx prisma studio`

# Seeding Database
If you need to seed some data in the database, create a `[table_name].tsx` file underneath `prisma/data` that has JSON data.

Import it into `prisma/seed.tsx` and then follow the convention in the file.

Run the command: `npm run seed`


# Schemas

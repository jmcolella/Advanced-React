import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import User from './schemas/User';
import Product from './schemas/Product';
import ProductImage from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { KeystoneContext } from '@keystone-next/types';

const databaseUrl = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long a user can be signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: [
      'name',
      'email',
      'password',
    ],
  },
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseUrl,
    onConnect: async (keystone: KeystoneContext) => {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    }
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: ({ session }) => {
      // The session withItemData config can tell Keystone what data to store in the session
      // And what data to return from the session

      // You can then read that off the session.data object
      // And allow for more advanced permissions based on that data

      return session?.data?.email === 'colella.john@gmail.com';
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email'
  })
}));

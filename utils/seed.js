const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // delete the collections if they exist
  let usersCheck = await connection.db
    .listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtsCheck = await connection.db
    .listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }
  
  // bring in user data
  const users = userData;

  // bring in thought data
  const thoughts = thoughtData;

  // add users to the collection
  await User.collection.insertMany(users);

  // add thoughts to the collection
  await Thought.collection.insertMany(thoughts);

  // show the seeded data
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete!');
  process.exit(0);
});
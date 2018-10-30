'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const users = [
  {
    firstName: 'Maria',
    lastName: 'Johnson',
    email: 'maryj@test.com',
    isAdmin: false
  },
  {
    firstName: 'Pegmann',
    lastName: 'College',
    email: 'whyisthisacollege@what.com',
    isAdmin: false
  },
  {
    firstName: 'Larry',
    lastName: 'Larryson',
    email: 'basicbro@geemail.com',
    isAdmin: false
  },
  {
    firstName: 'Dot',
    lastName: 'Cat',
    email: 'meowmeowmeowmeow@meow.com',
    isAdmin: false
  }
]

const products = [
  {
    name: 'Tasty Gravy',
    description: 'Very tasty! Buy this please!',
    category: 'Creamy'
  },
  {
    name: 'Nasty Gravy',
    description: 'Very nasty! Do not buy this!',
    category: 'Chunky'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(products.map(product => Product.create(product)))

  console.log(`seeded ${users.length + products.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

const {db} = require('./server/db')
const { User, Product } = require('./server/db')

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

const seed = async () => {
  await db.sync({force: true})
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(products.map(student => Product.create(product)))

  console.log('Seeding success!')
  db.close()
}

seed()
  .catch(err => {
    console.error('Oh no! Something went wrong! Everyone has died and it is all your fault!')
    console.error(err)
    db.close()
  })

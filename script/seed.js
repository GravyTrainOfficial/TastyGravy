'use strict'

const db = require('../server/db')
const { User, Product, LineItem, Order } = require('../server/db/models')
const devPassword = 'test'

const users = [
  {
    firstName: 'Maria',
    lastName: 'Johnson',
    email: 'maryj@test.com',
    password: devPassword,
    role: 'member'
  },
  {
    firstName: 'Pegmann',
    lastName: 'College',
    email: 'whyisthisacollege@what.com',
    password: devPassword,
    role: 'member'
  },
  {
    firstName: 'Larry',
    lastName: 'Larryson',
    email: 'basicbro@geemail.com',
    password: devPassword,
    role: 'member'
  },
  {
    firstName: 'Dot',
    lastName: 'Cat',
    email: 'meowmeowmeowmeow@meow.com',
    password: devPassword,
    role: 'member'
  },
  {
    firstName: 'Russell',
    lastName: 'Moore',
    email: 'heiscool@cool.com',
    password: devPassword,
    role: 'admin'
  }
]

const products = [
  {
    name: "Moens Baert Truffle Gravy",
    description:
      "A Belgian delicacy, Moens Baert's Truffle Gravy has a smooth, rich flavor familiar to any serious purveyor of gravy.\n\nBest paired with game meats.",
    category: 'Craft',
    price: 7900,
    inventoryQuantity: 10,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Appalachian Honey Ham Gravy',
    description:
      "Much like the mountains it hails from, the Appalachian Honey Ham has awed many a gravy-snob for generations. If you're having smoked ham without this bad boy,\n\nwhat are you even doing my man?",
    category: 'Sweet',
    price: 1400,
    inventoryQuantity: 100,
    image_URL: 'http://dummyimage.com/200x200.png/5fa2dd/ffffff'
  },
  {
    name: 'Cow Shin Bone-Broth Gravy',
    description:
      "A staple in the North Shore of Long Island, Cow Shin drips the meat juices that make gravy directly from a cow's shin.\n\nDid you know people can make gravy from bones? I sure didn't, and it make me anxious!",
    category: 'Bone Broth',
    price: 5000,
    inventoryQuantity: 15,
    image_URL: 'http://dummyimage.com/200x200.bmp/cc0000/ffffff'
  },
  {
    name: 'Sam Adams Traditional Thanksgiving Special',
    description:
      "People don't know this, but Sam Adams has been making gravy for longer than they've been making beer. They just aren't very good at it.",
    category: 'American',
    price: 150,
    inventoryQuantity: 200,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: "Tasty Gravy's Twig & Gizzard Blend",
    description:
      'A classic blend from our gravy-experts, always pushing the limits of what is "edible" and what "definitely is not edible".\n\nBest paired fowl or reptile.',
    category: 'Giblet',
    price: 2400,
    inventoryQuantity: 110,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: 'Magnesium Chloride',
    description:
      "Not sure how this got into the warehouse, but we have a lot of it and it'd be great if you could take it off our hands.\n\nPlease do not pair this with anything.",
    category: 'Miscellaneous',
    price: 1000,
    inventoryQuantity: 500,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: "Tasty Gravy's Turkey Gravy",
    description:
      'The gravy that put us on the map. Nothing can match the thick, creamy flavors of our Turkey Gravy.\n\nBest paired with turkey, but pairs well with most meats.',
    category: 'Brown',
    price: 2500,
    inventoryQuantity: 500,
    image_URL: 'http://dummyimage.com/200x200.jpg/cc0000/ffffff'
  },
  {
    name: 'Shishito Pepper Truffle Gravy',
    description:
      'Terrific gravy blend from our neighbors down south (Florida). As exquisite and fullbodied as it is cutting.',
    category: 'Truffle',
    price: 3500,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: "Gérard Dupont's White Roux",
    description:
      "As fantastic and bewildering in flavor as its originator, Gérard Dupont, infamous gravy theorist known for his harsh temper and flamboyant outfits.\n\nBest paired with veal, but works equally well with most vegetables.",
    category: 'Roux',
    price: 4000,
    inventoryQuantity: 30,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: 'IOPE RETIGEN MOISTURE TWIN CAKE NO.23',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    category: 'Electronics',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  },
  {
    name: 'Primidone',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    category: 'Electronics',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: 'A big asssss',
    description:
      'Just a,\n\n  a real nasty butttt ',
    category: 'Sweet',
    price: 999900,
    inventoryQuantity: 9999,
    image_URL: 'http://dummyimage.com/200x200.bmp/dddddd/000000'
  },
  {
    name: "Nutella Gravy",
    description:
      "An original Tasty Gravy blend, where we take everyone's favorite sweet spread and make it\n\ninto a slightly less viscous version of the same treat. Best paired with baked goods.",
    category: 'Sweet',
    price: 1800,
    inventoryQuantity: 75,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'ANTIMICROBIAL FOAMING',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    category: 'Health',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Rhinocerous Horn Brew',
    description:
      'It was not illegal at the time we first made this. It was definitely unethical though.',
    category: 'Bone',
    price: 12000,
    inventoryQuantity: 3,
    image_URL: 'http://dummyimage.com/200x200.png/ff4444/ffffff'
  },
  {
    name: 'Norton Falls Citrus Brew',
    description:
      'A fascinating take on the citrus micro-brew craze sweeping the Gravy Nation. Our tasters were floored.\n\nBest paired with beef, but pairs well with pork.',
    category: 'Vegetarian',
    price: 2000,
    inventoryQuantity: 99,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  },
  {
    name: "R'lyeh Blend",
    description:
      "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn!",
    category: 'Eldritch Horror',
    price: 10000,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/dddddd/000000'
  },
  {
    name: 'Chicken Stock Blend',
    description:
      'For suppliers and restaurants, 10 barrels of our finest chicken gravy stock.',
    category: 'Supplier',
    price: 2000,
    inventoryQuantity: 100,
    image_URL: 'http://dummyimage.com/200x200.jpg/dddddd/000000'
  },
  {
    name: 'Cow Stock Blend',
    description:
      'For suppliers and restaurants, 10 barrels of our finest cow gravy stock.',
    category: 'Supplier',
    price: 2500,
    inventoryQuantity: 75,
    image_URL: 'http://dummyimage.com/200x200.jpg/5fa2dd/ffffff'
  },
  {
    name: "Dr. Robert's Magic Gravy",
    description:
      "Dr. Robert has been making gravy for over 400 years. His latest brew will knock your socks off -- and more!",
    category: 'Magic Gravy',
    price: 100000,
    inventoryQuantity: 1,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Graceland Turkey Blend',
    description:
      "This Graceland treat will have you dancing in your blue suede shoes and saying 'Thank you, thank you very much...for the gravy!'\n\nBest paired with southern fried foods.",
    category: 'Brown',
    price: 2200,
    inventoryQuantity: 80,
    image_URL: 'http://dummyimage.com/200x200.jpg/dddddd/000000'
  },
  {
    name: 'Redeye Blood Gravy',
    description:
      'Bloody delicious, you can taste the iron!\n\nBest paired with a juicy steak.',
    category: 'Redeye',
    price: 3300,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/ff4444/ffffff'
  },
  {
    name: 'Salsiccia Siciliano',
    description:
      'Molto bene! A sausage-based gravy from Sicilio. Mamma mia! Etc.!\n\nBest paired with a pizza pasta gabagool!',
    category: 'Sausage',
    price: 5900,
    inventoryQuantity: 4000,
    image_URL: 'http://dummyimage.com/200x200.bmp/cc0000/ffffff'
  },
  {
    name: 'COUMADIN',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    category: 'Automotive',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/dddddd/000000'
  },
  {
    name: 'Levetiracetam',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    category: 'Sports',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/5fa2dd/ffffff'
  },
  {
    name: 'Leader Lice Treatment',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    category: 'Baby',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/5fa2dd/ffffff'
  },
  {
    name: 'HYDROCODONE BITARTRATE AND ACETAMINOPHEN',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    category: 'Industrial',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/cc0000/ffffff'
  },
  {
    name: 'headache formula',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    category: 'Industrial',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Citalopram',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    category: 'Industrial',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/dddddd/000000'
  },
  {
    name: 'LISINOPRIL AND HYDROCHLOROTHIAZIDE',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    category: 'Computers',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  }
]

const orders = [
  {
    datePurchased: new Date('1995-12-17T03:24:00'),
    userId: 1
  }
]

const lineItems = [
  {
    quantity: 1,
    status: 'cart',
    userId: 1,
    productId: 1,
    orderId: null
  },
  {
    quantity: 11,
    status: 'cart',
    userId: 2,
    productId: 10,
    orderId: null
  },
  {
    quantity: 2,
    status: 'purchased',
    userId: 1,
    productId: 3,
    orderId: 1
  },
  {
    quantity: 1,
    status: 'shipped',
    userId: 1,
    productId: 1,
    orderId: 1
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all(users.map(user => User.create(user)))
  console.log(`seeded ${users.length} users`)
  await Promise.all(products.map(product => Product.create(product)))
  console.log(`seeded ${products.length} products`)
  await Promise.all(orders.map(entry => Order.create(entry)))
  console.log(`seeded ${orders.length} orders`)
  await Promise.all(lineItems.map(item => LineItem.create(item)))
  console.log(`seeded ${lineItems.length} line items`)

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

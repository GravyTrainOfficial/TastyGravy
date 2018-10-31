const { User, Product } = require('./server/db/models')
const db = require('./server/db')

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
  },
  {
    firstName: 'Russel',
    lastName: 'Moore',
    email: 'heiscool@cool.com',
    isAdmin: false
  }
]

const products = [
  {
    name: 'Miconazole 3 Combination Pack',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    category: 'Kids',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Ludens Wild Honey Throat Drops',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    category: 'Books',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/5fa2dd/ffffff'
  },
  {
    name: 'Linden',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    category: 'Computers',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/cc0000/ffffff'
  },
  {
    name: 'SUPER AQUA MAX WHITE C LUMINOUS AMPOULE',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    category: 'Industrial',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: 'RUMEX ACETOSELLA POLLEN',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    category: 'Kids',
    price: 1.5,
    inventoryQuantity: 12,
  },
  {
    name: 'Magnesium Chloride',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    category: 'Movies',
    price: 1.5,
    inventoryQuantity: 12,
  },
  {
    name: 'Metabolism',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    category: 'Computers',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/cc0000/ffffff'
  },
  {
    name: 'SHISEIDO RADIANT LIFTING FOUNDATION',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    category: 'Computers',
    price: 1.5,
    inventoryQuantity: 12,
  },
  {
    name: 'HEADACHE',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    category: 'Industrial',
    price: 1.5,
    inventoryQuantity: 12,
  },
  {
    name: 'IOPE RETIGEN MOISTURE TWIN CAKE NO.23',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
    category: 'Electronics',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  },
  {
    name: 'Primidone',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    category: 'Electronics',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/ff4444/ffffff'
  },
  {
    name: 'Spironolactone',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    category: 'Jewelery',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/dddddd/000000'
  },
  {
    name: 'STUDIO FIX FLUID SPF 15 BROAD SPECTRUM',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    category: 'Toys',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  },
  {
    name: 'ANTIMICROBIAL FOAMING',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    category: 'Health',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Rhodotorula mucilaginosa',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    category: 'Games',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/ff4444/ffffff'
  },
  {
    name: 'Herbion Naturals Orange',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    category: 'Computers',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  },
  {
    name: 'Dog Hair',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    category: 'Baby',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'AFLURIA',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    category: 'Books',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/dddddd/000000'
  },
  {
    name: 'FAMILY DOLLAR ACNE TREATMENT',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    category: 'Automotive',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/5fa2dd/ffffff'
  },
  {
    name: 'Naratriptan',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    category: 'Movies',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/cc0000/ffffff'
  },
  {
    name: 'FACE IT RADIANCE POWDER PACT SPF25 MOISTURE VEIL NB21',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    category: 'Toys',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/dddddd/000000'
  },
  {
    name: 'Laxative Pills',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    category: 'Baby',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/ff4444/ffffff'
  },
  {
    name: 'Intuniv',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    category: 'Kids',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/cc0000/ffffff'
  },
  {
    name: 'COUMADIN',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    category: 'Automotive',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/dddddd/000000'
  },
  {
    name: 'Levetiracetam',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    category: 'Sports',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/5fa2dd/ffffff'
  },
  {
    name: 'Leader Lice Treatment',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    category: 'Baby',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/5fa2dd/ffffff'
  },
  {
    name: 'HYDROCODONE BITARTRATE AND ACETAMINOPHEN',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    category: 'Industrial',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.jpg/cc0000/ffffff'
  },
  {
    name: 'headache formula',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    category: 'Industrial',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.bmp/ff4444/ffffff'
  },
  {
    name: 'Citalopram',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    category: 'Industrial',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/dddddd/000000'
  },
  {
    name: 'LISINOPRIL AND HYDROCHLOROTHIAZIDE',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    category: 'Computers',
    price: 1.5,
    inventoryQuantity: 12,
    image_URL: 'http://dummyimage.com/200x200.png/cc0000/ffffff'
  }
]

const seed = async () => {
  await db.sync({ force: true })
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(products.map(product => Product.create(product)))

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error(
    'Oh no! Something went wrong! Everyone has died and it is all your fault!'
  )
  console.error(err)
  db.close()
})

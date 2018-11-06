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
    image_URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEHKOA6YcJtI_19KgoO6NfTADlmRja0Ha0lUAB0Y8_9W-W-ss'
  },
  {
    name: 'Appalachian Honey Ham Gravy',
    description:
      "Much like the mountains it hails from, the Appalachian Honey Ham has awed many a gravy-snob for generations. If you're having smoked ham without this bad boy,\n\nwhat are you even doing my man?",
    category: 'Sweet',
    price: 1400,
    inventoryQuantity: 100,
    image_URL: 'https://www.gourmetfoodstore.com/images/Product/large/urbani-pesto-and-truffle-sauce-truffle-thrills-1S-2969.jpg'
  },
  {
    name: 'Cow Shin Bone-Broth Gravy',
    description:
      "A staple in the North Shore of Long Island, Cow Shin drips the meat juices that make gravy directly from a cow's shin.\n\nDid you know people can make gravy from bones? I sure didn't, and it make me anxious!",
    category: 'Bone Broth',
    price: 5000,
    inventoryQuantity: 15,
    image_URL: 'https://cdn.smemarkethub.com/freshtodommot/sme_rck_azr-1508547540000CowLeg'
  },
  {
    name: 'Sam Adams Traditional Thanksgiving Special',
    description:
      "People don't know this, but Sam Adams has been making gravy for longer than they've been making beer. They just aren't very good at it.",
    category: 'American',
    price: 150,
    inventoryQuantity: 200,
    image_URL: 'https://i.pinimg.com/originals/9d/69/da/9d69da4044db3768ce65d31d3111c580.jpg'
  },
  {
    name: "Tasty Gravy's Twig & Gizzard Blend",
    description:
      'A classic blend from our gravy-experts, always pushing the limits of what is "edible" and what "definitely is not edible".\n\nBest paired fowl or reptile.',
    category: 'Giblet',
    price: 2400,
    inventoryQuantity: 110,
    image_URL: 'https://3.bp.blogspot.com/-J4DygKHiOYI/WoNMahbDKhI/AAAAAAAANbE/B-n-Axs7qiMkgVtDVlvL3Ko-mSX5SZS2gCLcBGAs/s1600/MC7.JPG'
  },
  {
    name: 'Magnesium Chloride',
    description:
      "Not sure how this got into the warehouse, but we have a lot of it and it'd be great if you could take it off our hands.\n\nPlease do not pair this with anything.",
    category: 'Miscellaneous',
    price: 7920,
    inventoryQuantity: 500,
    image_URL: 'https://midwestsalt.com/wp-content/uploads/2015/11/mag.jpg'
  },
  {
    name: "Tasty Gravy's Turkey Gravy",
    description:
      'The gravy that put us on the map. Nothing can match the thick, creamy flavors of our Turkey Gravy.\n\nBest paired with turkey, but pairs well with most meats.',
    category: 'Brown',
    price: 2500,
    inventoryQuantity: 500,
    image_URL: 'https://sifu.unileversolutions.com/image/en-ZA/original/1/knorr-classic-roast-onion-gravy-50040646.jpg'
  },
  {
    name: 'Shishito Pepper Truffle Gravy',
    description:
      'Terrific gravy blend from our neighbors down south (Florida). As exquisite and fullbodied as it is cutting.\n\nBest paired with chicken, but pairs well with most fowl.',
    category: 'Truffle',
    price: 3499,
    inventoryQuantity: 78,
    image_URL: 'https://gfscdn.azureedge.net/images/Product/medium/urbani-black-truffles-and-mushrooms-sauce-truffle-thrills-1S-2963.jpg'
  },
  {
    name: "Gérard Dupont's White Roux",
    description:
      "As fantastic and bewildering in flavor as its originator, Gérard Dupont, infamous gravy theorist known for his harsh temper and flamboyant outfits.\n\nBest paired with veal, but works equally well with most vegetables.",
    category: 'Roux',
    price: 4000,
    inventoryQuantity: 30,
    image_URL: 'http://newrecipesforlife.com/wordpress/wp-content/uploads/2012/04/country-gravy-biscuits.jpeg'
  },
  {
    name: 'Nickelodeon Slime',
    description:
      'Take the Double Dare Challenge and get the Nickelodeon Slime! Totally edible, with a parmesan base.\n\nBest paired with Mark Summers.',
    category: 'Special',
    price: 2199,
    inventoryQuantity: 60,
    image_URL: 'https://static2.nordic.pictures/17998059-thickbox_default/nickelodeon-stretchy-green-slime-500ml.jpg'
  },
  {
    name: "Nutella Gravy",
    description:
      "An original Tasty Gravy blend, where we take everyone's favorite sweet spread and make it\n\ninto a slightly less viscous version of the same treat. Best paired with biscuits.",
    category: 'Sweet',
    price: 1800,
    inventoryQuantity: 75,
    image_URL: 'https://lh3.googleusercontent.com/wJ97IZibQ3cu7qQXNKJfZs0fVl5fmXKbMKDwRqyRVdZid22ffm-kRbMEXWf6QB3KtRtou-5KXrtL6-zxZ4L1xpUxGYjt1MhmK5aAm-E=w600-l68'
  },
  {
    name: 'Vanilla Poutine',
    description:
      'Just sort of let my imagination go on this one. What do you think this would taste like? I have something in my head though and it tastes really good.\n\nGood with everything.',
    category: 'Special',
    price: 150,
    inventoryQuantity: 12,
    image_URL: 'https://dish-environment-prod-contentbucket-10u8bszryovz3.s3.amazonaws.com/assets/s3fs-public/styles/content_image_medium/public/1501470-country-sausage-gravy-photo-by-KGora.jpg?itok=Xx6nV8fT'
  },
  {
    name: 'Rhinocerous Horn Brew',
    description:
      'It was not illegal at the time we first made this. It was definitely unethical though.',
    category: 'Bone',
    price: 12000,
    inventoryQuantity: 3,
    image_URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDAXn8AlBKks4Wd9AWOYeDG76ZzY9tmx8zyC2Df4T9wnK9MpuO6A'
  },
  {
    name: 'Norton Falls Citrus Brew',
    description:
      'A fascinating take on the citrus micro-brew craze sweeping the Gravy Nation. Our tasters were floored.\n\nBest paired with beef, but pairs well with pork.',
    category: 'Vegetarian',
    price: 1999,
    inventoryQuantity: 99,
    image_URL: 'https://cdn.shopify.com/s/files/1/1475/7634/files/Screen_Shot_2016-09-26_at_17.23.00_large.png?v=1474925002'
  },
  {
    name: "R'lyeh Blend",
    description:
      "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn!",
    category: 'Eldritch Horror',
    price: 100000,
    inventoryQuantity: 12,
    image_URL: 'https://vignette.wikia.nocookie.net/injusticefanon/images/3/37/Cthulhu_%28HOD%29.jpg/revision/latest?cb=20180126114517'
  },
  {
    name: 'Chicken Stock Blend',
    description:
      'For suppliers and restaurants, 10 barrels of our finest chicken gravy stock.',
    category: 'Supplier',
    price: 200000,
    inventoryQuantity: 100,
    image_URL: 'https://atlas-content-cdn.pixelsquid.com/stock-images/old-wine-barrel-9GZqkoA-600.jpg'
  },
  {
    name: 'Cow Stock Blend',
    description:
      'For suppliers and restaurants, 10 barrels of our finest cow gravy stock.',
    category: 'Supplier',
    price: 249999,
    inventoryQuantity: 75,
    image_URL: 'https://atlas-content-cdn.pixelsquid.com/stock-images/old-wine-barrel-9GZqkoA-600.jpg'
  },
  {
    name: "Dr. Robert's Magic Gravy",
    description:
      "Dr. Robert has been making gravy for over 400 years. His latest brew will knock your socks off -- and more!",
    category: 'Special',
    price: 1111111111,
    inventoryQuantity: 1,
    image_URL: 'https://comps.canstockphoto.com/wizard-preparing-a-potion-vector-clip-art_csp13284217.jpg'
  },
  {
    name: "Elvis's Graceland Turkey Blend",
    description:
      "This Graceland treat will have you dancing in your blue suede shoes and saying 'Thank you, thank you very much...for the gravy!'\n\nBest paired with southern fried foods.",
    category: 'Brown',
    price: 2211,
    inventoryQuantity: 80,
    image_URL: 'https://igx.4sqi.net/img/general/600x600/53576104_jjIM4Zr2xqqlJnv8RzUIZ3xBcdMlt8DSwLlAK80PyPk.jpg'
  },
  {
    name: 'Redeye Blood Gravy',
    description:
      'Bloody delicious, you can taste the iron!\n\nBest paired with a juicy steak.',
    category: 'Redeye',
    price: 3345,
    inventoryQuantity: 12,
    image_URL: 'https://ak1.ostkcdn.com/img/mxc/20150204_salisbury_steak.jpg'
  },
  {
    name: 'Salsiccia Siciliano',
    description:
      'Molto bene! A sausage-based gravy from Sicilio. Mamma mia! Etc.!\n\nBest paired with a pizza pasta gabagool!',
    category: 'Sausage',
    price: 5999,
    inventoryQuantity: 40,
    image_URL: 'https://www.takaski.com/wp-content/uploads/2018/02/KAGOME-Tomato-Ketchup-Made-in-Japan4.jpg'
  },
  {
    name: "Mom's Famous Turkey Gravy",
    description:
      "Mom knows best with her cold-brew gravy special. Made with our secret ingredient: a mother's love. Also way too much butter, like, a medically inadvisable amount of the stuff.\n\nBest paired with a good ol' turkey dinner.",
    category: 'Brown',
    price: 1200,
    inventoryQuantity: 239,
    image_URL: 'https://images.fitpregnancy.mdpcdn.com/sites/fitpregnancy.com/files/field/image/third-trimester-pregnancy-nutrition_700x700_corbis-42-23048410.jpg'
  },
  {
    name: "Newman's Gravy",
    description:
      'You know Cool Hand Luke makes a mean gravy. Good for any occasion, with hearty, meaty, chunky base that keeps on giving.\n\nBest paired with most fowl.',
    category: 'Brown',
    price: 1500,
    inventoryQuantity: 384,
    image_URL: 'https://target.scene7.com/is/image/Target/GUEST_668c6d14-b4ce-4b3b-96a9-33437e5e7f8a?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: "Tasty Gravy's Sauce à la Crème",
    description:
      "Bonjour! This is Tasty Gravy's cream blend made by our gravy-experts after spending a summer in Paris! This rich, flavorful blend has the kind of neutral, buttery flavor that all French people like for some reason.\n\nIt's Hollandaise sauce! We bottled it and called it gravy! Please buy this.",
    category: 'Roux',
    price: 2999,
    inventoryQuantity: 271,
    image_URL: 'https://www.crazyforcrust.com/wp-content/uploads/2017/11/Easy-5-Minute-Gravy-1-of-1-500x500.jpg'
  },
  {
    name: 'Brookln Veggie Delights',
    description:
      "A crisp veggie blend, hoppy and aromatic. Some idiot with an awful moustache who still listens to Bon Iver created this in a house\n\nin Bedstuy. He lives there with three other guys all named Ian or Elliott and they all look the same and 'play instruments'.\n\nTheir house used to belong to a family that lived there for three decades, but they got priced out of it by their tyrannical landlord.\n\nThis city treats its poor like dirt, and while I hope some change in leadership can help fix that, without radical, direct action, I highly doubt we'll move the needle in my lifetime.\n\nBest paired with ground meat.",
    category: 'Vegetarian',
    price: 2899,
    inventoryQuantity: 69,
    image_URL: 'https://data.whicdn.com/images/152142713/large.jpg'
  },
  {
    name: 'Pork Stock Blend',
    description:
      'For suppliers and restaurants, 10 barrels of our finest pork gravy stock.',
    category: 'Supplier',
    price: 249999,
    inventoryQuantity: 100,
    image_URL: 'https://atlas-content-cdn.pixelsquid.com/stock-images/old-wine-barrel-9GZqkoA-600.jpg'
  },
  {
    name: 'Nevada Onion Tangerine',
    description:
      "A blend to die for. Our premiere onion blend hails from the great state of Nevada, with a\n\ntangerine twist to keep all you gravy-nerds satisfied. Hurry now though, they're going fast! \n\nBest paired with ham, but pairs well with most veggie dishes.",
    category: 'Onion',
    price: 4499,
    inventoryQuantity: 47,
    image_URL: 'http://ukcdn.ar-cdn.com/recipes/originals/c4b1c0e5-3c87-4a7f-b969-27fa0a0dfe1d.jpg'
  },
  {
    name: 'California Vegan Gravy',
    description:
      "Surf's up! This California treat leans on the sweet side, but with enough bitter greens mixed in to keep your palette guessing -- and your waistline slim.\n\nBest paired with veggie snacks.",
    category: 'Vegetarian',
    price: 1869,
    inventoryQuantity: 200,
    image_URL: 'https://assets.epicurious.com/photos/5609a5bfe0acd286555db8d2/1:1/w_600%2Ch_600/354049_hires.jpg'
  },
  {
    name: 'Gravy Train CHOO CHOO',
    description:
      'ALL ABOARD THE GRAVY TRAIN CHOO CHOO!',
    category: 'Gravy Train',
    price: 10,
    inventoryQuantity: 10000,
    image_URL: 'https://images-platform.99static.com/_f6fEohTeGyuGk35pxZRacYcSWA=/500x500/top/smart/99designs-contests-attachments/19/19090/attachment_19090303'
  },
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

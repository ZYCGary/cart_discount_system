Cart = require("./cart");
const { groupBuying } = require("./rule");

// Init product list
products = [
  {
    sku: "9325336130810",
    name: "Game of Thrones: Season 1",
    price: 39.49,
  },
  {
    sku: "9325336028278",
    name: "The Fresh Prince of Bel-Air",
    price: 19.99,
  },
  {
    sku: "9780201835953",
    name: "The Mythical Man-Month",
    price: 31.87,
  },
  {
    sku: "9781430219484",
    name: "Coders at Work",
    price: 28.72,
  },
  {
    sku: "9780132071482",
    name: "Artificial Intelligence",
    price: 119.92,
  },
];

// Init pricing rules
pricingRules = [
  {
    type: "wholesale",
    saleProductSku: "9780201835953",
    number: 10,
    newPrice: 21.99,
  },
  {
    type: "get one free",
    saleProductSku: "9781430219484",
    number: 3,
  },
  {
    type: "bundle",
    saleProductSku: "9325336130810",
    freeProductSku: '9325336028278',
  },
];

cart = new Cart(products, pricingRules);

// Example 1: Products in cart: 9780201835953 x 10, 9325336028278
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9780201835953");
cart.addProduct("9325336028278");

console.log("Example 1 total: ", cart.total());
cart.clear();

// Example 2: Products in cart: 9781430219484 x 3, 9780132071482
cart.addProduct("9781430219484");
cart.addProduct("9781430219484");
cart.addProduct("9781430219484");
cart.addProduct("9780132071482");

console.log("Example 2 total: ", cart.total());
cart.clear();

// Example 3: Products in cart: 9325336130810, 9325336028278, 9780201835953
cart.addProduct("9325336130810");
cart.addProduct("9325336028278");
cart.addProduct("9780201835953");

console.log("Example 3 total: ", cart.total());
cart.clear();

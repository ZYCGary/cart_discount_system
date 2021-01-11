const Rule = require("./rule");
const { getRule } = require("./rule");

class Cart {
  rule = null;
  products = [];
  pricingRules = [];
  checkoutList = [];

  constructor(products, pricingRules) {
    this.rule = new Rule();
    this.products = products;
    this.pricingRules = pricingRules;
  }

  addProduct = async function (sku) {
    if (this.checkoutList[sku]) {
      this.checkoutList[sku].count += 1;
      this.checkoutList[sku].price = this.getPriceBySku(sku);
      this.checkoutList[sku].total =
        this.checkoutList[sku].price * this.checkoutList[sku].count;
    } else {
      this.checkoutList[sku] = {
        count: 1,
        price: this.getPriceBySku(sku),
        total: this.getPriceBySku(sku),
      };
    }
  };

  getPriceBySku = function (sku) {
    for (let product of this.products) {
      if (product.sku === sku) return product.price;
    }

    return 0;
  };

  total = function () {
    // Update item price in the checkout list according to rules
    for (let pricingRule of this.pricingRules) {
      this.checkoutList = this.rule.getRule(pricingRule, this.checkoutList);
    }

    // Calculate total price
    let total = 0;
    for (let item in this.checkoutList) {
      total += this.checkoutList[item].total;
    }

    return total.toFixed(2);
  };

  clear = function () {
    this.checkoutList = [];
  };
}

module.exports = Cart;

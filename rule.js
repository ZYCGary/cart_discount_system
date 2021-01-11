class Rule {
  getRule = function (rule, checkoutList) {
    switch (rule.type) {
      case "wholesale":
        return this.wholesale(
          rule.saleProductSku,
          rule.number,
          rule.newPrice,
          checkoutList
        );

        break;

      case "get one free":
        return this.getOneFree(rule.saleProductSku, rule.number, checkoutList);

        break;

      case "bundle":
        return this.bundleSale(
          rule.saleProductSku,
          rule.freeProductSku,
          checkoutList
        );

        break;
    }
  };

  // Get discount when buying multiply same roducts.
  wholesale = function (saleProductSku, number, newPrice, checkoutList) {
    let checkoutItem = checkoutList[saleProductSku];

    if (checkoutItem?.count >= number) {
      checkoutItem.price = newPrice;
      checkoutItem.total = newPrice * checkoutItem.count;
    }

    return checkoutList;
  };

  // Get 1 free: offer a x for the price of x-1 deal.
  getOneFree = function (saleProductSku, number, checkoutList) {
    let checkoutItem = checkoutList[saleProductSku];

    if (checkoutItem?.count >= number) {
      checkoutItem.total =
        checkoutItem.price *
        (2 * parseInt(checkoutItem.count / 3) + (checkoutItem.count % 3));
    }
    return checkoutList;
  };

  // Bundle sale: Customers who purchase one product, will get another product for free.
  bundleSale = function (saleProductSku, freeProductSku, checkoutList) {
    let saleItem = checkoutList[saleProductSku];
    let freeItem = checkoutList[freeProductSku];

    if (saleItem && freeItem) {
      freeItem.price = 0;
      freeItem.total = 0;
    }

    return checkoutList;
  };
}

module.exports = Rule;

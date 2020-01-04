export class Item {
  constructor(
    private price: number = 0,
  ) {}

  calculateDiscount(rate: number): number {
    return this.price - (this.price * 0.01 * rate);
  }
}

export class Order {
  private items: Item[] = [];
  private payment: number = 0;
  private paymentAt: Date = new Date();

  add(item: Item): void {
    this.items.push(item);
  }

  calculateDiscount(rate: number): number {
    return this.items.reduce(
      (price, item) => price + item.calculateDiscount(rate),
      0
    );
  }

  pay(paymentAt: Date, discountRate: number = 0): void {
    this.payment = this.calculateDiscount(discountRate);
    this.paymentAt = paymentAt;
  }

  getPayment(): number {
    return this.payment;
  }

  receipt(): string {
    return this.paymentAt.getFullYear() +
      '/' +
      (this.paymentAt.getMonth() + 1) +
      ' ' + this.payment + '円'
      ;
  }
}

// const order = new Order();
//
// order.add(new Item(100)); // 100円の商品を追加
// order.add(new Item(200)); // 200円の商品を追加
//
// order.pay(new Date(), 50); // 支払い（50%引き）
// const receipt = order.receipt(); // '2018/04 150円' というレシートを出力
// console.log(receipt);

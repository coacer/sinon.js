"use strict";
exports.__esModule = true;
var Item = /** @class */ (function () {
    function Item(price) {
        if (price === void 0) { price = 0; }
        this.price = price;
    }
    Item.prototype.calculateDiscount = function (rate) {
        return this.price - (this.price * 0.01 * rate);
    };
    return Item;
}());
exports.Item = Item;
var Order = /** @class */ (function () {
    function Order() {
        this.items = [];
        this.paymentAt = null;
    }
    Order.prototype.add = function (item) {
        this.items.push(item);
    };
    Order.prototype.calculateDiscount = function (rate) {
        return this.items.reduce(function (price, item) { return price + item.calculateDiscount(rate); }, 0);
    };
    Order.prototype.pay = function (paymentAt, discountRate) {
        if (discountRate === void 0) { discountRate = 0; }
        this.payment = this.calculateDiscount(discountRate);
        this.paymentAt = paymentAt;
    };
    Order.prototype.getPayment = function () {
        return this.payment;
    };
    Order.prototype.receipt = function () {
        return this.paymentAt.getFullYear() +
            '/' +
            (this.paymentAt.getMonth() + 1) +
            ' ' + this.payment + '円';
    };
    return Order;
}());
exports.Order = Order;
var order = new Order();
order.add(new Item(100)); // 100円の商品を追加
order.add(new Item(200)); // 200円の商品を追加
order.pay(new Date(), 50); // 支払い（50%引き）
var receipt = order.receipt(); // '2018/04 150円' というレシートを出力
console.log(receipt);

import { Item, Order } from "./index";
import sinon from "sinon";

describe('Order', () => {
  it('spy', () => {
    const item = new Item(1000);
    const spy = sinon.spy(item, "calculateDiscount");

    const order = new Order();
    order.add(item);
    order.add(item);

    order.pay(new Date(), 10);

    expect(spy.withArgs(10).calledTwice).toBe(true);
  });
});

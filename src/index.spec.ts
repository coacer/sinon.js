import { Item, Order } from "./index";
import sinon from "sinon";

// モックとは: 一言で言うと記録係。実行後に記録したデータを元に検証する
// 基本的に検証したい関数、メソッドを登録して検証する機能のみ
describe('Order', () => {
  it('spy', () => {
    const item = new Item(1000);
    // item#calculateDiscountのスパイ
    const sinonSpy = sinon.spy(item, "calculateDiscount");
    // const jestSpy = jest.spyOn(item, "calculateDiscount"); // jestの場合

    const order = new Order();
    order.add(item);
    order.add(item);

    order.pay(new Date(), 10);

    // calledWithで一度でも与えられた引数で呼ばれたらtrue
    expect(sinonSpy.calledWith(10)).toBe(true);
    // withArgsで与えられた引数で呼ばれているspyのみを抽出
    // calledTwiceで2回呼ばれたらtrue
    expect(sinonSpy.withArgs(10).calledTwice).toBe(true);
  });

  // sinonのスタブはスパイと同様に記録することもできる(何回呼ばれたかなど)が、
  // 本質的な用途は本物と異なる振る舞いをする偽物を作り出すor未実装の場合に仮のものを作ること
  it('stub', () => {
    const item = new Item(1000);
    const sinonStub = sinon.stub(item, "calculateDiscount");
    // 1回目に呼ばれた時は50, 2回目は70を返すようにスタブする
    sinonStub.onCall(0).returns(50);
    sinonStub.onCall(1).returns(70);

    const order = new Order();
    order.add(item);
    order.add(item);
    order.pay(new Date(), 10);

    expect(sinonStub.withArgs(10).calledTwice).toBe(true);
    // 本物の場合と異なる結果となる
    expect(order.getPayment()).toBe(120);
  });

  // モックはスタブとは全く別物で、どのような振る舞いをするかをあらかじめ期待して、その通りに動作しなかった場合に検証を失敗させる(スパイとは異なり、期待する動作を実行前に書く)
  it('mock', () => {
    const item = new Item();
    const mock = sinon.mock(item);
    mock.expects('calculateDiscount')
      .twice()
      .withArgs(10)
      .returns(90);

    const order = new Order();
    order.add(item);
    order.add(item);
    order.pay(new Date(), 10);

    mock.verify();
    expect(order.getPayment()).toBe(180);
  });
});

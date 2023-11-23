class Order {
  constructor() {
    this.id=null,
    this.paymentMethodId=null,
    this.accountId=null,
    this.items=[],
    this.status=[],//object
    this.ShippingAddress=null,//object
    this.total=null,
    this.voucher=null,//object
    this.paid=null,
    this.creatAt=null
  }
}
export default Order

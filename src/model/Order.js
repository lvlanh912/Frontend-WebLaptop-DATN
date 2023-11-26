class Order {
  constructor() {
    this.id=null,
    this.paymentMethod=null,//object
    this.accountId=null,
    this.items=[],
    this.status=null,//object
    this.shippingAddress={},//object
    this.total=null,
    this.voucher={},//object
    this.paid=null,
    this.isPaid=false,
    this.creatAt=null
  }
}
export default Order

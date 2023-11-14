class Voucher{
    constructor(){
        this._id=null,
        this.code=null,
        this.minApply=null,
        this.value=null,
        this.isValue=true,
        this.maxReduce=null,
        this.products=[],
        this.quantity=null,
        this.createAt=null,
        this.startAt=null,
        this.endAt=null
        this.active=null
    }
}

export default Voucher
import { Create_new_Voucher } from "../CallAPI";
import removeEmptyFields from "../removeEmptyFields";

function ValidateData(Voucher){
    if(Voucher.code==null||Voucher.code=='')
        return "Mã giảm giá không được để trống"
    if(!Voucher.code.match(/^[A-Za-z0-9]*$/))
        return "Mã giảm giá chứa ký tự không hợp lệ"
    if(Voucher.minApply==null)
        return "Đơn hàng tối thiểu không được để trống"
    if(Voucher.value==null||Voucher.value==0)
        return "Giá trị không được để trống và phải lớn hơn 0"
    if(Voucher.quantity==null||Voucher.quantity<=0)
        return "Số lượng phải lớn hơn 0"
    if(Voucher.startAt==null||Voucher.startAt=='')
        return "Vui lòng chọn ngày bắt đầu"
    if(Voucher.endAt==null||Voucher.endAt=='')
        return "Vui lòng chọn ngày kết thúc"
    
}

async function Add(Voucher){
    let result={
        success:false,
        data:{}
    }
    try{
        let dataValid=ValidateData(Voucher)
        if(dataValid===undefined){
            result.success=true
            let payload= JSON.stringify(removeEmptyFields(Voucher))
            result.data= await Create_new_Voucher(payload)
        }
        else
            result.data=dataValid
    }
    catch(ex){
        result.success=false
        result.data=ex.message
    }
    finally{
        return result
    }
}

export {Add,ValidateData}
import { Edit_Payment } from "../CallAPI.js";
import removeEmptyFields from "../removeEmptyFields.js";
import { ValidateData } from "./Payment_Manager.js";

export async function Edit(Payment) {
    let result = {
        success: false,
        data: {},
    };
    try {
        let dataValid = ValidateData(Payment);
        const id = Voucher.id;
        if (dataValid === undefined) {
            result.success = true;
            let payload = JSON.stringify(removeEmptyFields(Voucher));
            result.data = await Edit_Payment(payload, String, id);
        } else result.data = dataValid;
    } catch (ex) {
        result.success = false;
        result.data = ex.message;
    } finally {
        return result;
    }
}

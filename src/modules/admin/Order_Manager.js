import { Get_all_Order } from "../CallAPI.js";
import removeEmptyFields from "../removeEmptyFields.js";

export async function GetAll(page = 1, size = 25, filterobj, sort) {
    try {
      return await Get_all_Order(page = 1, size = 25, filterobj, sort);
    } catch (err) {
      throw err;
    }
  }
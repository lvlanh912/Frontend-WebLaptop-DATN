import {GetProductStockStatistic,GetProductAddinYearStatistic,GetTopProductStatistic,GetOrderOverview,GetOrderOverviewPerMonth,GetRevenueOverview} from "../CallAPI.js"
import {GettopProductSold} from "../home/HomeAPI.js"
export{GetProductStockStatistic,GettopProductSold,GetOrderOverview,GetOrderOverviewPerMonth,GetRevenueOverview}
export async function GetProductAdd_PerMoth(year)
{
    console.log(year)
    if(year==undefined)
        year=new Date().getFullYear()
    return {
        data:await GetProductAddinYearStatistic(year),year:year
    }
}
export async function GetTopProductSold(value,startime,endtime){
    return await GetTopProductStatistic("top-product-sold",value,startime,endtime)
}
export async function GetTopProductView(value,startime,endtime){
    return await GetTopProductStatistic("top-product-view",value,startime,endtime)
}
export async function GetTopProductStock(value,startime,endtime){
    return await GetTopProductStatistic("top-product-stock",value,startime,endtime)
}


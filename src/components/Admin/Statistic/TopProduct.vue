<template>
  <div class="col-12 mt-2">
                <p class="fs-5 inherit fw-bold m-0 p-0">Top sản phẩm {{ title }}</p>
                <ul class="p-2 bg-white list-unstyled pe-5">
                    <li v-for="item in data" :key="item.id" class="w-100 d-flex justify-content-between py-2">
                        <div class="d-flex col-8 col-xl-10">
                            <!-- ảnh -->
                            <div class="align-middle align-self-center white-space-nowrap py-0 me-3">
                                <a class="d-block rounded-2 border">
                                <img :src="host+'/images/products/'+item.images[0]" alt="" width="35"></a>
                            </div>
                            <!-- tên sản phẩm -->
                            <div class="align-middle white-space-nowrap align-self-center ms-2">
                                <span class="" style="font-size: small;">{{item.productName}}</span>
                            </div>
                            
                        </div>
                        <!-- Lượt xem -->
                        <div v-if="type=='view'" class="px-2 ms-2 align-middle white-space-nowrap align-self-center col justify-content-end">
                            <span class=" px-2 no-wrap" style="font-size: small;"><i class="bi bi-eye-fill me-1"></i>{{item.view}}</span>
                        </div>
                        <!-- Lượt bán-->
                        <div v-else-if="type=='sold'" class="px-2 ms-2 align-middle white-space-nowrap align-self-center col justify-content-end">
                            <span class=" px-2 no-wrap" style="font-size: small;">đã bán {{item.sold}}</span>
                        </div>
                        <div v-else class="px-2 ms-2 align-middle white-space-nowrap align-self-center col justify-content-end">
                            <span class=" px-2 no-wrap" style="font-size: small;"><i class="bi bi-box-fill me-1"></i> {{item.stock}}</span>
                        </div>
                    </li>
                </ul>
            </div>
</template>

<script>
import { onBeforeMount, ref, watch } from 'vue'
import * as Statistic from '../../../modules/admin/Statistic'
export default {
props:{
    filter:{},
    type:{}
},
setup(props,{emit}){
    const type=props.type
    const filter=props.filter
    const title=ref('')
    const data= ref([])
    const host=backendHost
    onBeforeMount (async()=>{
       getData()
    })
    const getData=async()=>{
        switch (type) {
            case 'sold':
                data.value=await Statistic.GetTopProductSold(filter.value,filter.startdate,filter.enddate)
                title.value="bán chạy"
                break;
            case 'view':
                data.value=await Statistic.GetTopProductView(filter.value,filter.startdate,filter.enddate)
                title.value="xem nhiều"
                break;
            default:
                data.value=await Statistic.GetTopProductStock(filter.value,filter.startdate,filter.enddate)
                title.value="tồn kho"
                break;
        }
    }
    watch(filter,()=>getData())
    return {data,host,type,title,type,filter}
}
}
</script>

<style>

</style>
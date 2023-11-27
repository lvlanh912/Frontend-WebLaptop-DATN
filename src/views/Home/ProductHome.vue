<template>
    <section class="row">
        <div class="col-3 d-none d-lg-block">
            <category-child-vue ></category-child-vue>
        </div>
        <!-- Sản phẩm -->
        <div class="col-9">
        <div class="bg-white p-3">
            <!-- Lọc,sắp xếp -->
            <div class="px-2 py-4 mb-4 d-flex justify-content-between">
                <div class="align-items-center d-none d-lg-flex">
                    <button href="" class="btn sort-button me-2 rounded-4 text-blue fw-bolder py-1">Hàng mới</button>
                    <button href="" class="btn sort-button me-2 rounded-4 text-blue fw-bolder py-1">Giá tăng dần</button>
                    <button href="" class="btn sort-button me-2 rounded-4 text-blue fw-bolder py-1">Giá giảm dần</button>
                </div>
                <div class="d-flex align-items-center">
                    <select class="select-sort">
                        <option value="">Sắp xếp</option>
                        <option value="">Lượt đánh giá</option>
                        <option value="">Lượt xem</option>
                        <option value="">Tên A-Z</option>
                        <option value="">Tên Z-A</option>
                    </select>

                </div>
            </div>
            <!-- List Sản phẩm -->
            <div class="d-flex flex-wrap border gap-0">
                <!-- Sản phẩm -->
                <product v-for="item,index in listProduct" :key="index" :item="item" ></product>
            </div>
            <!-- Phân trang -->
        </div>
           
        </div>
    </section>
</template>

<script>
import Product from '../../components/home/Product.vue'
import { onBeforeMount, onUpdated, reactive, ref } from 'vue'
import {  onBeforeRouteUpdate, useRoute } from 'vue-router'
import CategoryChildVue from '../../components/home/Products/CategoryChild.vue'
import {getProduct} from '../../modules/home/HomeAPI.js'
export default {
    components:{
        CategoryChildVue,
        Product
    },
    setup() {
        const router=useRoute()
        const listProduct=ref([])
        const pageindex=ref(1)
        const pagesize=ref(25)
        const totalpage=ref(0)
        const sort=ref('')
        const filterobj = reactive({
            keywords: '',
            category: '',
            brand: '',
            min: '',
            max: '',
      })
        const GetData = async () => {
            const data=await getProduct(pageindex.value,pagesize.value,filterobj,sort.value)
            listProduct.value=data.items
            totalpage.value=data.totalPages
      }
        onBeforeMount(async()=>{
           await GetData()
         })
        onBeforeRouteUpdate(async (to, from, next) => {
            filterobj.category=to.params.categoryID
            await GetData()
             next()
        })
        return{listProduct,totalpage}
    }
}
</script>

<style scoped>
.sort-button{
    margin-right: 8px;
    border: 1px solid #1988EC;
    line-height: 34px;
    padding: 0 16px;
}
.sort-button:hover{
    color: white !important;
    background-color: #1988EC;
}
.active{
    color: white !important;
    background-color: #1988EC;
}
.select-sort{
    width: 120px;
    height: 36px;
    border: 1px solid #BDC6D3;
    border-radius: 40px;
    padding-left: 10px;
    color: #404D5F;
    font-size: 16px;
    margin-right: 16px;
}
</style>
<template>

    <section class="row ">
        <div class="col-12 ms-2 mt-2">
            <crumb/>
        </div>
        <div class="col-3 d-none d-lg-block rounded-3">
                <category-child-vue ></category-child-vue>
        </div>
        <!-- Sản phẩm -->
        <div class="col-12 col-md-9 rounded-3">
        <div class="bg-white p-3">
            <!-- Lọc,sắp xếp -->
            <div class="px-2 py-4 d-flex justify-content-between">
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
                <!-- Lọc -->
                    <div @click="isShowFilter=!isShowFilter" class="btn inherit border">
                        <i class="bi bi-funnel-fill text-blue me-2"></i>Lọc
                    </div>

                </div>
            </div>
            <!-- form-lọc -->
            <div class="d-flex justify-content-end mb-2">
                <transition>
                    <filter-form-vue v-if="isShowFilter" :categoryId="filterobj.category"
                     @closeFilter="isShowFilter=false"
                     @filData="onFilter"
                     @CancelFil="onCancelFilter"
                      ></filter-form-vue>
                </transition>
            </div>
            <!-- List Sản phẩm -->
            <transition name="slide-fade">
            <div v-if="isLoadproduct" class="d-flex flex-wrap border gap-0">
                <!-- Sản phẩm -->
                <product v-for="item in listProduct" :key="item.id" :item="item" ></product>
            </div>
        </transition>
            <!-- Phân trang -->
            <nav v-if="listProduct.length>0" class="d-flex justify-content-end pt-2">
                <ul class="pagination">
                <li v-if="pageindex > 1" @click="changepage(--pageindex)" class="page-item">
                    <p class="page-link m-0">
                    <span>«</span>
                    <span class="sr-only"></span>
                    </p>
                </li>
                <li class="page-item active"> 
                    <p class="page-link m-0" >
                        <span>{{ pageindex }}</span>
                        <span class="sr-only"></span>
                    </p></li>
                <li v-if="pageindex < totalpage" @click="changepage(++pageindex)" class="page-item">
                    <p class="page-link m-0">
                    <span>»</span>
                    <span class="sr-only"></span>
                    </p>
                </li>
                </ul>
 </nav>
        </div>
           
        </div>
    </section>
</template>

<script>
import Product from '../../../components/home/Product.vue'
import { onBeforeMount, onUpdated, reactive, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import CategoryChildVue from '../../../components/home/Products/CategoryChild.vue'
import FilterFormVue from '../../../components/home/Products/FilterForm.vue'
import {getProduct} from '../../../modules/home/HomeAPI.js'
import Crumb from '../../../components/home/Products/Crumb.vue'
export default {
    components:{
        CategoryChildVue,
        Product,
        FilterFormVue,
        Crumb
    },
    setup() {
        const router=useRoute()
        const listProduct=ref([])
        const pageindex=ref(1)
        const pagesize=ref(20)
        const totalpage=ref(0)
        const sort=ref('')
        const isShowFilter=ref(false)
        const isLoadproduct=ref(false)
        const filterobj = reactive({
            keywords: '',
            category: '',
            brand: '',
            min: '',
            max: '',
        })
        const GetData = async () => {
            isLoadproduct.value=false
            const data=await getProduct(pageindex.value,pagesize.value,filterobj,sort.value)
            listProduct.value=data.items
            totalpage.value=data.totalPages
            isLoadproduct.value=true
      }
        const changepage = async (e) => {
            pageindex.value = e
            await GetData()
        }
        onBeforeMount(async()=>{
            filterobj.category=router.params.categoryID
            await GetData()
         })
        onBeforeRouteUpdate(async (to, from, next) => {
            filterobj.category=to.params.categoryID
            await GetData()
             next()
        })

        const onFilter=async(filterObj)=>{
            filterobj.brand=filterObj.brand,
            filterobj.keywords=filterObj.keywords,
            filterobj.category=filterObj.category,
            filterobj.min=filterObj.min,
            filterobj.max=filterObj.max
            await GetData()
        }
        const onCancelFilter=async()=>{
            filterobj.value=''
            await GetData()
        }


        return{listProduct,isShowFilter,filterobj,onFilter,onCancelFilter,
            pageindex,totalpage,changepage,isLoadproduct
        }
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
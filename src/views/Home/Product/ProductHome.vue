<template>
<main>
    <section class="row ">
        <div class="col-12 ms-2 mt-2">
            <crumb/>
        </div>
        <div class="col-3 d-none d-md-block rounded-3">
                <category-child-vue ></category-child-vue>
        </div>
        <!-- Danh sách Sản phẩm -->
        <div class="col-12 col-md-9 rounded-3 position-relative">
        <div class="bg-white p-3">
            <!-- Lọc,sắp xếp -->
            <div class="px-2 py-4 row justify-content-between justify-content-lg-end">
                    <select @change="onSort" class="select-sort col-6 col-md-4 col-lg-2 " v-model="sort">
                        <option :value="''">Sắp xếp</option>
                        <option :value="'name'">Tên A-Z</option>
                        <option :value="'name_desc'">Tên Z-A</option>
                        <option :value="'sold'">Sản phẩm bán chạy</option>
                        <option :value="'date'">hàng mới trước</option>
                        <option :value="'date_desc'">hàng cũ trước</option>
                        <option :value="'price'">Giá tăng dần</option>
                        <option :value="'price_desc'">Giá giảm dần</option>
                    </select>
                <!-- Lọc -->
                <div @click="isShowFilter=!isShowFilter" style="max-width: 80px;"
                 class="btn inherit border col-lg-2 col-4 no-wrap">
                    <i class="bi bi-funnel-fill text-blue me-2"></i>Lọc
            </div>
            </div>
            <!-- form-lọc -->
            <div style="z-index: 99999;" class="d-flex justify-content-end mb-2 position-absolute">
                <transition name="slide-fade">
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
            <nav v-if="listProduct.length>0" class="d-flex justify-content-center pt-2 mt-2">
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
</main>
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
        const pagesize=ref(24)
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
            stock:''
        })
        const ResetFilter=()=>{
             filterobj.keywords= '',
             filterobj.brand= '',
             filterobj.min= '',
             filterobj.max= '',
             filterobj.stock=''
        }
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
            ResetFilter()
            await GetData()
         })
        onBeforeRouteUpdate(async (to, from, next) => {
            filterobj.category=to.params.categoryID
            ResetFilter()
            await GetData()
             next()
        })

        const onFilter=async(filterObj)=>{
            filterobj.brand=filterObj.brand,
            filterobj.keywords=filterObj.keywords,
            filterobj.category=filterObj.category,
            filterobj.min=filterObj.min,
            filterobj.max=filterObj.max,
            filterobj.stock=filterObj.stock
            await GetData()
        }
        const onCancelFilter=async()=>{
            filterobj.value=''
            await GetData()
        }
        const onSort= async()=>await GetData()


        return{listProduct,isShowFilter,filterobj,onFilter,onCancelFilter,
            pageindex,totalpage,changepage,isLoadproduct,
            sort,onSort,pagesize
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
    height: 36px;
    border: 1px solid #BDC6D3;
    border-radius: 40px;
    padding-left: 10px;
    color: #404D5F;
    font-size: 16px;
    margin-right: 16px;
}
</style>../../../modules/home/ClientAction.js../../../modules/home/HomeAPI.js
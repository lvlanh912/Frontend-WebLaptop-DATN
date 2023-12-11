<template>
    <div class="row mt-2">
        <!--  -->
        <div class=" position-relative col-12 col-xl-6 border">
            <div class="mt-2 text-end">
                <select @change="onSelectyear" v-model="selectedYear" class="form-select-sm fw-bold text-muted px-3" >
                    <option value="" class="fw-bold">Chọn năm</option>
                    <option v-for="item in listYear" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <p class="text-center text-muted fw-bold">Sản phẩm được thêm trong năm {{ product_add_month.year }}</p>
            <Line v-if="!loadingchart1"
                :options="SettingOne.chartOptions"
                :data="SettingOne.chartData"
            />
            <div v-else class=" skeleton-loader w-100" style="height: 300px;"></div>
        </div>
        <!-- Số lượng sản phẩm còn/hết hàng  -->
        <div class=" position-relative col-12 col-xl-6 border">
            <p class="text-center text-muted fw-bold">Sản phẩm còn/ hết hàng trong kho</p>
            <div class="w-100" >
                <Doughnut v-if="!loadingchart2"
                :data="SettingTwo.chartData"
                :options="SettingTwo.chartOptions"
              />
              <div v-else class=" skeleton-loader w-100" style="height: 300px;"></div> 
           
            </div>
            <p class=" text-center inherit">Tổng số lượng sản phẩm: {{ totalProduct }}</p>
        </div>
        <div class="position-relative mt-2">
            <h5 class="text-center fs-5">Xếp hạng sản phẩm</h5>
            <div class="w-100 d-flex justify-content-between mt-2 px-2">
                
                <div class="col-12 col-md-5 d-flex"> Hiển thị 
                   <select v-model="Filter.value"  class="pt-0 ms-2 form-select form-select-sm mt-0 mb-2 pb-0 me-3" style="max-width: 100px; height: 25px !important;">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="15">15</option>
                    <option :value="20">20</option>
                  </select> Bản ghi 
                </div>
                <div class="d-flex justify-content-center align-content-center align-self-center me-lg-3">
                    <input type="date" v-model="Filter.startdate">
                    <span class="mx-2">đến</span>
                    <input type="date" v-model="Filter.enddate">
                </div>
              
            </div>
            <div class="row justify-content-between">
                <div class="col-12 col-xl-6 gap-xl-1">
                    <top-product :type="'sold'" :filter="Filter"/>
                </div>
                <!-- <div class="col-12 col-xl-6 gap-xl-1">
                    <top-product :type="'view'" :filter="Filter"/>
                </div> -->
                <div class="col-12 col-xl-6 gap-xl-1">
                    <top-product :type="'stock'" :filter="Filter"/>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement,ArcElement, CategoryScale,  LinearScale,  PointElement,  LineElement} from 'chart.js'
import { Bar,Doughnut, Line } from 'vue-chartjs'
import TopProduct from "./TopProduct.vue";
import * as Statistic from '../../../modules/admin/Statistic.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement,LineElement,PointElement)
export default {
  components: { Bar, Doughnut, Line,TopProduct },
  setup() {
    const ProductStockData=ref({
        outOfStock:0,
        haveStock:0
    })
    const listYear=ref([])
    const selectedYear=ref('')
    const product_add_month=ref([])

    const loadingchart1=ref(true)
    const loadingchart2=ref(true)
    const Filter=reactive({
        startdate:null,
        enddate:null,
        value:5
    })
    const SettingOne=computed(()=> ({
        chartData:{
          labels: [ 'Tháng 1', 'Tháng 2', 'Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12' ],
          datasets: [ {
            label: 'Số lượng sản phẩm thêm',
            backgroundColor: '#0798C3',
             data: product_add_month.value.data } 
            ]
        },
        chartOptions:{
            responsive:true
        }
        }))
    
    const GetlistYear= ()=>{
        for(let i=2023;i<=new Date().getFullYear();i++)
            listYear.value.push(i)
    }
    onMounted(async ()=>{
       
        GetlistYear()
        GetDataProductAdd()
        loadingchart2.value=true
        ProductStockData.value=await Statistic.GetProductStockStatistic()
        loadingchart2.value=false
    })
    const onSelectyear=()=>{
        if(selectedYear.value.length>3&&selectedYear.value!=product_add_month.value.year){
            GetDataProductAdd(selectedYear.value)
        }
    }
    const totalProduct=computed(()=>ProductStockData.value.outOfStock+ProductStockData.value.haveStock)
    const GetDataProductAdd=async(year)=>{
            loadingchart1.value=true
            product_add_month.value=await Statistic.GetProductAdd_PerMoth(year)
            loadingchart1.value=false
    }


        const SettingTwo=computed(()=>({
        chartData:{
                labels: ['Sản phẩm hết hàng', 'Sản phẩm còn hàng',],
                datasets: [
                    {
                        backgroundColor: ['#DEC408', '#008FFF'],
                        data: [ProductStockData.value.outOfStock, ProductStockData.value.haveStock]
                    }
                ]
            },
        chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))
 
    return {
        listYear,SettingOne,loadingchart1,product_add_month,onSelectyear,selectedYear,

        SettingTwo,totalProduct,loadingchart2,
        Filter
    
    };
  },
};
</script>

<style>

</style>
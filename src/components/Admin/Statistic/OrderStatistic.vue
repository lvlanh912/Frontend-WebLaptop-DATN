<template>
    <div class="">Chọn khoảng ngày</div>
    <div class="row mt-2">
        <!--  -->
        <div class=" position-relative col-12 col-xl-6">
      
            <Bar
            :options="SettingOne.chartOptions"
            :data="SettingOne.chartData"
          />
        </div>
        <!-- Số lượng sản phẩm còn/hết hàng  -->
        <div class=" position-relative col-12 col-xl-6">
           
            <div class="w-100">
                <Doughnut
                :data="SettingTwo.chartData"
                :options="SettingTwo.chartOptions"
              />
               
            </div>
            <p class=" text-center">Tổng số lượng sản phẩm: {{ totalProduct }}</p>
        </div>
        

    </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement } from 'chart.js'
import { Bar,Doughnut } from 'vue-chartjs'
import {GetProductStockStatistic,GetProductAdd_PerMoth} from '../../../modules/admin/Statistic.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement)
export default {
  components: { Bar,Doughnut },
  setup() {
    const ProductStockData=ref({
        outOfStock:0,
        haveStock:0
    })
    const totalProduct=ref(0)

    const product_add_month=ref([])
    const SettingOne=computed(()=> ({
        chartData:{
          labels: [ 'Tháng 1', 'Tháng 2', 'Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12' ],
          datasets: [ {
            label: 'Data One',
            backgroundColor: '#f87979',
             data: product_add_month.value } 
            ]
        },
        chartOptions:{
            responsive:true
        }
        }))
    
    onMounted(async ()=>{
        ProductStockData.value=  await GetProductStockStatistic()
        totalProduct.value=ProductStockData.value.outOfStock+ProductStockData.value.haveStock
        product_add_month.value=await GetProductAdd_PerMoth()
    })
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
 
    return {SettingOne,SettingTwo,totalProduct};
  },
};
</script>

<style>

</style>
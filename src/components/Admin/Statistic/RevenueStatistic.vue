<template>
    <div class="row mt-2">
        <!-- Số lượng đơn hàng trong khoảng thời gian đã chọn -->
        <div class=" position-relative col-12">
            <div class="text-center d-flex justify-content-center">
                <span class="me-2">Chọn thời gian: </span>
                <div class="d-flex justify-content-center align-content-center align-self-center me-lg-3">
                    <input type="date" v-model="Filter.starttime">
                    <span class="mx-2">đến</span>
                    <input type="date" v-model="Filter.endtime">
                </div>
            </div>
            <div  class="text-center fw-bold text-muted mt-2">Doanh thu từ {{start}} đến {{ end }}</div>
            <div v-if="!loadingDonut" class="w-100">
                <div class="postion-relative">
                    <Doughnut 
                        :data="Settings.chartData"
                        :options="Settings.chartOptions"
                    />
                </div>
            <div  class="text-center fw-bold text-muted mt-2">Tổng giá trị đơn hàng: {{ Total }}</div>
            </div>
            <div v-else class=" skeleton-loader w-100" style="height: 300px;"></div>
        <!-- Tổng quan đơn hàng  -->
       </div>
    </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement } from 'chart.js'
import { Bar,Doughnut } from 'vue-chartjs'
import * as Statistic from '../../../modules/admin/Statistic.js'
import Swal from 'sweetalert2';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement)
export default {
  components: { Bar,Doughnut },
  setup() {
    const Filter=reactive({
        starttime:'2023-12-01',
        endtime:'2023-12-09'
    })

    const start=computed(()=>Filter.starttime.split('-')[1]+'/'+Filter.starttime.split('-')[0])
    const end=computed(()=>Filter.endtime.split('-')[1]+'/'+Filter.starttime.split('-')[0])
    const loadingDonut=ref(true)
    const data=ref({
        totalvalue:0,
        totalPaid: 0
    })
    
    const Getdata=async()=>{
        loadingDonut.value=true
        data.value=await Statistic.GetRevenueOverview(Filter.starttime,Filter.endtime)
        loadingDonut.value=false

    }
    onBeforeMount(()=>{
        Getdata()
    })

    watch(Filter,async()=> {
        try{
            Getdata()
        }
        catch(err){
            Swal.fire('Có lỗi xảy ra',err.message,'error')
        }
        
    })
    const Total=computed(()=>data.value.totalvalue.toLocaleString("it-IT", {style: "currency", currency: "VND"}))

    const Settings=computed(()=>({
        chartData:{
                labels: ['Khấu trừ mã giảm giá', 'Số tiền thực nhận'],
                datasets: [
                    {
                        backgroundColor: ['#D0B614', '#07BBA2'],
                        data: [data.value.totalvalue-data.value.totalPaid,data.value.totalPaid]
                    }
                ]
            },
        chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))
 
    return {Settings,Total,Filter,start,end,loadingDonut};
  },
};
</script>

<style>

</style>
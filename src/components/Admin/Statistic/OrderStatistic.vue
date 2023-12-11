<template>
    <div class="row mt-2">
        <!-- Số lượng đơn hàng trong khoảng thời gian đã chọn -->
        <div class=" position-relative col-12 col-xl-6">
            <div class="text-center d-flex">
                <span class="me-2">Chọn thời gian: </span>
                <div class="d-flex justify-content-center align-content-center align-self-center me-lg-3">
                    <input type="month" v-model="Filter.starttime">
                    <span class="mx-2">đến</span>
                    <input type="month" v-model="Filter.endtime">
                </div>
            </div>
            <div class="text-center fw-bold text-muted mt-2">Số lượng đơn hàng từ {{start}} đến {{ end }} </div>
            
            <Bar v-if="!loadingBar1"
            :options="SettingOne.chartOptions"
            :data="SettingOne.chartData"
          />
          <div v-else class=" skeleton-loader w-100" style="height: 300px;"></div>
        </div>
        <!-- Tổng quan đơn hàng  -->
        <div v-if="!loadingDonut" class=" position-relative col-12 col-xl-6">
           <p class="text-center text-muted fw-bold">Tổng quan đơn hàng</p>
            <div class="w-100">
                <Doughnut
                :data="SettingTwo.chartData"
                :options="SettingTwo.chartOptions"
              />
               
            </div>
            <p class=" text-center">Tất cả đơn hàng: {{ totalOrder }}</p>
        </div>
        <div v-else class=" skeleton-loader position-relative col-12 col-xl-6" style="height: 300px;"></div>
        

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
        starttime:'2023-01',
        endtime:'2023-12'
    })

    const start=computed(()=>Filter.starttime.split('-')[1]+'/'+Filter.starttime.split('-')[0])
    const end=computed(()=>Filter.endtime.split('-')[1]+'/'+Filter.starttime.split('-')[0])
    const loadingBar1=ref(true)
    const loadingDonut=ref(true)
    const data=ref({
        waitConfirm:0,
        shipping: 0,
        success: 0,
        canceled: 0
    })
    const dataBar1=ref([])

    const LabelBar1=ref([])
    const GetLabel=()=>{
        const startDate={
            year:Filter.starttime.slice(0,4)*1,
            month:Filter.starttime.slice(5)*1
        }
        const endDate={
            year:Filter.endtime.slice(0,4)*1,
            month:Filter.endtime.slice(5)*1
        }
        console.log(endDate)
        const count=endDate.year>startDate.year? endDate.month+(12*(endDate.year-startDate.year)-startDate.month)+1: endDate.month-startDate.month+1
        if(count>12||count<2)
            throw new Error("Số tháng đã chọn không được lớn hơn 12 và có tối thiểu 2 tháng")
        let result=[]
        for(let i=0;i<count;i++){
            result.push(`Tháng ${(startDate.month+i)>12?(startDate.month+i)-12:(startDate.month+i)}`)
        }
        return result
    }
    const Getdata=async()=>{
        loadingDonut.value=true
        loadingBar1.value=true
        data.value=await Statistic.GetOrderOverview()
        loadingDonut.value=false

        LabelBar1.value=GetLabel()
        dataBar1.value=await Statistic.GetOrderOverviewPerMonth(Filter.starttime,Filter.endtime)
        loadingBar1.value=false
    }
    onBeforeMount(()=>{
        Getdata()
    })

    watch(Filter,async()=> {
        try{
            LabelBar1.value=GetLabel()
            dataBar1.value=await Statistic.GetOrderOverviewPerMonth(Filter.starttime,Filter.endtime)
        }
        catch(err){
            Swal.fire('Có lỗi xảy ra',err.message,'error')
        }
        
    })
    const totalOrder=computed(()=>data.value.waitConfirm+data.value.shipping+data.value.success+data.value.canceled)

    const SettingOne=computed(()=> ({
        chartData:{
          labels: LabelBar1.value,
          datasets: [ {
            label: 'Số lượng đơn hàng trong tháng',
            backgroundColor: '#0CA4BF',
             data: dataBar1.value} 
            ]
        },
        chartOptions:{
            responsive:true
        }
        }))
        const SettingTwo=computed(()=>({
        chartData:{
                labels: ['Chờ xác nhận', 'Đang vận chuyển','Đã hoàn thành','Đã huỷ'],
                datasets: [
                    {
                        backgroundColor: ['#D0B614', '#07BBA2','#05A20C','#BF0C0C'],
                        data: [data.value.waitConfirm,data.value.shipping,data.value.success,data.value.canceled]
                    }
                ]
            },
        chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))
 
    return {SettingOne,SettingTwo,totalOrder,Filter,start,end,loadingBar1,loadingDonut};
  },
};
</script>

<style>

</style>
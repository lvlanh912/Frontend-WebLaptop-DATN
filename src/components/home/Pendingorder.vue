<template>
    <div class="">
        <div class="d-flex justify-content-between align-content-center px-4">
          <h3 class="fs-5 text-muted">Đã chọn {{ count_item }} sản phẩm</h3>
          <div class="d-flex flex-column justify-content-center">
              <h4 class="mb-1">Tổng cộng: <span class="fw-bold text-blue">
                  {{ ToVND(total) }}
              </span> </h4>
              <h4 class="fs-6 inherit text-red text-end">Tiết kiệm {{ ToVND(maxPrice_total-total) }}</h4>
          </div>
          
        </div>
        <div class="text-end">
            <button class="btn btn-success bg-blue border-0 fw-bold px-3">Đặt hàng</button>
        </div>
    </div>
</template>

<script>
import { computed, onUpdated } from 'vue'
export default {
props:{
    items:{
        require:true
    }
},
setup(props,{emit}){
    const count_item=computed(()=>props.items.length)

    const total=computed(()=>{
        let sum=0
        props.items.forEach(item => {
           sum+=item.product.price*item.quantity
        });
        return sum
    })
    const maxPrice_total=computed(()=>{
        let sum=0
        props.items.forEach(item => {
           sum+=item.product.maxPrice*item.quantity
        });
        return sum
    })
    const ToVND = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }
    onUpdated(()=>{
        console.log(props.items)
    })
    return {count_item,total,ToVND,maxPrice_total

    }
}
}
</script>

<style>

</style>
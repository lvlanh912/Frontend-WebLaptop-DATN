<template>
    <div class="d-flex w-100 my-2">
        <!-- ảnh -->
        <router-link :to="{name:'product-detail',params:{productId:orderItem.product.id}}"  class="align-middle white-space-nowrap py-0 me-3">
            <div class="d-block rounded-2 border">
                <img :src="image" alt="" width="53">
            </div>
        </router-link>
        <!-- thông tin sản phẩm -->
        <div class="w-100">
            <div class="d-flex justify-content-between">
                <div class="col-8">
                    <span class="fw-bold">{{orderItem.product.productName }}</span>
                    <span class="d-block text-muted inherit" style="font-size: small; font-weight: 600;">Số lượng: {{ orderItem.quantity }}</span>
                </div>
                <div class=" d-flex flex-column justify-content-end align-content-center">
                    <span style="font-size: small;" class="d-block text-danger no-wrap text-decoration-line-through">{{ToVND(orderItem.product.maxPrice) }}</span>
                    <span  class="d-block text-blue no-wrap align-self-center pb-2">{{ToVND(orderItem.product.price) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
props:{
    orderItem:{
    }
},
setup(props,{emit}){
    const image=computed(()=>backendHost+'/images/products/'+props.orderItem.product.images[0])
    const orderItem=reactive(props.orderItem) 
    const ToVND = (e) =>e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    
    return{image,ToVND,orderItem,}
    }
}

</script>

<style>

</style>
<template>
   <Teleport to="body">
    <header-com/>
    <hr class="mt-5">
    <filter-com />
    <section class="container-fluid bg-light bg-white">
     <p class="position-relative header fw-bold fs-3 pt-3">Laptop mới cập nhật</p>
     <div class=" row g-2">
        <product v-for="laptop in laptops.list_laptop" :item="laptop">
            <slot>
                <div class="d-flex flex-column text-start infor py-2 ms-2">
                    <span class="text-muted">CPU: {{ laptop.CPU }}</span>
                    <span class="text-muted">RAM: {{ laptop.RAM }}</span>
                    <span class="text-muted">Ổ cứng: {{ laptop.ROM }}</span>
                    <span class="text-muted">Card:  {{ laptop.GPU }}</span>
                    <span class="text-muted">M.Hình: {{ laptop.Screen }}</span>
                </div>
            </slot>
        </product>
     </div>
     <div class="list-more"></div>
    </section>
    <section class="container-fluid bg-light bg-white mt-4">
     <p class="position-relative header fw-bold fs-3 pt-3">Tin tức</p>
     <div class="row g-2">
      
     </div>
     <div class="list-more"></div>
    </section>
    <footer-com/>
  </Teleport>
</template>

<script>
import HeaderCom from '../components/Header.vue'

import list_laptop from '../data/data-sample/laptop'
import FooterCom from '../components/Footer.vue'
import {useRoute} from 'vue-router'
import FilterCom from '../components/filterCom.vue'
import { reactive } from 'vue'
import Product from '../components/home/Product.vue'
export default {
components:{
    HeaderCom,
    FooterCom,
    FilterCom,
Product
},
setup(){
    const route=useRoute()
   const laptops=reactive(list_laptop)
   return {laptops}
}
}
</script>

<style scoped>
.infor span{
    font-weight: 530;
    font-size: 15px;
    margin-bottom: 4px;
    font-family: "Roboto",sans-serif;
}
</style>
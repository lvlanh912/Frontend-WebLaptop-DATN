<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <!-- Lựa chọn -->
    <div class="">
      
    </div>
   <!-- Sản phẩm done -->
    <div class=" position-relative">
      <h3 class="text-center fw-bold">Sản phẩm</h3>
      <product-statistic/>
    </div>
    <div class=" position-relative">
      <h3 class="text-center fw-bold">Đơn hàng</h3>
      <order-statistic/>
    </div>
  </section>
</template>

<script>

import { onBeforeMount, onMounted, reactive, ref } from "vue";

import ProductStatistic from '../../components/Admin/Statistic/ProductStatistic.vue';
import OrderStatistic from '../../components/Admin/Statistic/OrderStatistic.vue';
export default {
  components: { ProductStatistic,OrderStatistic },
  setup() {
      
    return {};
  },
};
</script>
<style scoped>
</style>

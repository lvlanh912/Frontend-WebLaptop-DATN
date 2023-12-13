<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <!-- Lựa chọn -->
    <div class="d-flex justify-content-start">
      <div class=" py-2 px-4 d-flex">
        <p class="text-center fw-bold">Lựa chọn hiển thị:</p>
        <div class="ms-3">
          <div class="form-check d-flex align-self-center">
            <input class="form-check-input me-3" type="checkbox" v-model="isShowProduct">
            <label class="form-check-label" >
              Thống kê sản phẩm
            </label>
          </div>
          <div class="form-check d-flex align-self-center">
            <input class="form-check-input me-3" type="checkbox" v-model="isShowOrder">
            <label class="form-check-label" >
              Thống kê đơn hàng
            </label>
          </div>
          <div class="form-check d-flex align-self-center">
            <input class="form-check-input me-3" type="checkbox" v-model="isShowRevenue">
            <label class="form-check-label" >
              Thống kê doanh thu
            </label>
          </div>

        </div>
      </div>
    </div>
   <!-- Sản phẩm done -->
    <div v-if="isShowProduct" class=" position-relative">
      <h3 class="text-center fw-bold">Sản phẩm</h3>
      <product-statistic/>
    </div>
    <div v-if="isShowOrder" class=" position-relative">
      <h3 class="text-center fw-bold">Đơn hàng</h3>
      <order-statistic/>
    </div>
    <div v-if="isShowRevenue" class=" position-relative">
      <h3 class="text-center fw-bold">Doanh thu</h3>
      <revenue-statistic/>
    </div>
  </section>
</template>

<script>

import { onBeforeMount, onMounted, reactive, ref } from "vue";

import ProductStatistic from '../../components/Admin/Statistic/ProductStatistic.vue';
import OrderStatistic from '../../components/Admin/Statistic/OrderStatistic.vue';
import RevenueStatistic from "../../components/Admin/Statistic/RevenueStatistic.vue";
export default {
  components: { ProductStatistic,OrderStatistic,RevenueStatistic},
  setup() {
      const isShowProduct=ref(true)
      const isShowOrder=ref(true)
      const isShowRevenue=ref(true)
    return {isShowProduct,isShowRevenue,isShowOrder};
  },
};
</script>
<style scoped>
</style>

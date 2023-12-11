<template>
  <section class="w-100 position-relative" style="width: 100vw">
    <!-- Lựa chọn -->
    <div class="">
      
    </div>
    <div class=" position-relative">
      <product-statistic/>
    </div>
  </section>
</template>

<script>

import { onBeforeMount, onMounted, reactive, ref } from "vue";

import ProductStatistic from '../../components/Admin/Statistic/ProductStatistic.vue';
export default {
  components: { ProductStatistic },
  setup() {
      
    return {};
  },
};
</script>
<style scoped>
</style>

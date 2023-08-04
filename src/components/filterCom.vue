<template>
  <div>
    <!-- sắp xếp -->
    <div class="bg-white pt-2 d-flex justify-content-between">
      <select class="d-lg-none px-3" aria-label="Default select example">
        <option selected>Sắp xếp theo</option>
        <option value="1">Mới nhất</option>
        <option value="2">Giá thấp nhất</option>
        <option value="3">Giá cao nhất</option>
      </select>
      <h4 class="d-none d-lg-block mx-2">Sắp xếp theo</h4>
      <div class="col-8 d-none d-lg-block">
        <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder active">
          Mới nhất
        </button>
        <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">
          Giá thấp nhất
        </button>
        <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">
          Giá cao nhất
        </button>
        <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">
          Bán chạy nhất
        </button>
      </div>
      <button @click="isShowmodal=!isShowmodal" class="btn btn-primary">
        <i class="bi bi-funnel-fill pe-2"> </i>Lọc
      </button>
    </div>
    <!-- menu-lọc -->
    <transition name="fade">
        <div v-if="isShowmodal" class="modal d-block">
          <div class="modal-dialog w-100 shadow row justify-content-center" style="max-width: 100%">
            <div class="model--content col-12 col-md-10 col-xl-6 px-3">
              <div class="modal-header text-center">
                <h1 class="fs-4">Lọc sản phẩm</h1>
                <button  @click="isShowmodal=!isShowmodal" type="button" class="btn btn-close"></button>
              </div>
              <div class="modal-body">
                <strong>Khoảng giá</strong>
                <hr />
                <div class="row ms-2">
                  <div
                    class="form-check col-12 col-sm-6"
                    v-for="price in price_list.data"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="price"
                      v-model="price_list.select"
                      :value="price.value"
                    />
                    <label class="form-check-label">{{ price.name }}</label>
                  </div>
                </div>
                <strong>CPU</strong>
                <hr class="m-1" />
                <div class="row ms-2">
                  <div
                    class="form-check col-12 col-sm-6"
                    v-for="cpu in cpu_list.data"
                  >
                    <input
                      type="radio"
                      name="CPU"
                      :value="cpu.value"
                      v-model="cpu_list.select"
                      class="form-check-input"
                    />
                    <label>{{ cpu.name }} </label>
                  </div>
                </div>
                <strong>RAM</strong>
                <hr class="m-1" />
                <div class="row ms-2">
                  <div
                    class="form-check col-12 col-sm-6"
                    v-for="ram in Ram_list.data"
                  >
                    <input
                      type="radio"
                      :value="ram.value"
                      name="RAM"
                      v-model="Ram_list.select"
                      class="form-check-input"
                    />
                    <label>{{ ram.name }} </label>
                  </div>
                </div>
                <strong>Nhu cầu</strong>
                <hr class="m-1"/>
                <div class="row ms-2">
                  <div
                    class="form-check col-12 col-sm-6"
                    v-for="type in type_list.data">
                    <input
                      type="radio"
                      :value="type.value"
                      name="RAM"
                      v-model="type_list.select"
                      class="form-check-input"
                    />
                    <label>{{ type.name }} </label>
                  </div>
                </div>
    
                <strong>Hãng</strong>
                <hr class="m-1"/>
                <div class="row ms-2">
                  <div
                    class="form-check col-12 col-sm-6"
                    v-for="company in company_list.data">
                    <input
                      type="radio"
                      :value="company.value"
                      name="Company"
                      v-model="company_list.select"
                      class="form-check-input"
                    />
                    <label>{{ company.name }} </label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import { cpu_list, price_list, Ram_list, type_list,company_list } from "../data/filter.js";
export default {
  setup() {
        const isShowmodal=ref(false)
    return {isShowmodal, price_list, cpu_list, Ram_list, type_list,company_list };
  },
};
</script>

<style scoped>
.active {
  background-color: var(--bs-blue);
  color: white;
}
.modal {
  background: #00000045;
}
.model--content{
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;
}
.fade-enter-active{
    transition: all 1s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from{
   transform: translateY(100%);
   opacity: 0.5;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

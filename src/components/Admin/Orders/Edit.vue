<template>
  <div :class="'modal-backdrop pt-5 model-show'">
    <div class="modal-dialog" style="min-width: 700px">
      <div class="modal-content rounded-4">
        <div class="modal-header">
          <h5 class="modal-title text-blue">Cập nhật đơn hàng</h5>
          <button @click="closeThis" type="button" class="btn-close"></button>
        </div>

        <form>
          <div class="modal-body">
            <div class="row mb-2">
              <div class="col">
                <div class="form-group text-center">
                  <strong class="form-label text-center">
                    <i class="bi bi-list text-green"></i>
                    Danh sách sản phẩm
                  </strong>
                  <!-- Danh sách sản phẩm -->
                  <div
                    v-for="(item, index) in order.items"
                    :key="index"
                    class="row"
                  >
                    <div class="align-self-center col text-start">
                      <img
                        :src="
                          BackendHost +
                          '/images/products/' +
                          item.product.images[0]
                        "
                        alt=""
                        class="img-thumbnail"
                        style="max-width: 4rem"
                      />
                      <span class="ms-2 align-self-center form-label">
                        {{ item.product.productName }}
                      </span>
                    </div>
                    <!-- Giá tiền x Số lượng -->
                    <div class="align-self-center col">
                      <span class="ms-2 align-self-center form-label">
                        {{ ToVND(item.product.price) }}
                      </span>
                      <span class="ms-2 align-self-center form-label">x</span>
                      <span class="ms-2 align-self-center form-label">
                        {{ item.quantity }}
                      </span>
                    </div>
                    <div class="align-self-center col">
                      {{ ToVND(item.product.price * item.quantity) }}
                    </div>
                  </div>
                  <hr />
                  <!-- Thông tin thanh toán -->
                  <div class="col">
                    <strong class="form-label text-center d-block">
                      <i class="bi bi-currency-exchange text-yellow"></i>
                      Thông tin thanh toán
                    </strong>
                    <div class="col">
                      <div class="row">
                        <label class="col text-start">
                          Phương thức thanh toán
                        </label>
                        <span class="col text-start">{{ Paymentmethod }}</span>
                      </div>
                      <div class="row">
                        <label class="col text-start">Mã giảm giá</label>
                        <span class="col text-start">
                          {{ order.voucher != null ? "Có" : "Không" }}
                        </span>
                      </div>
                      <div class="row">
                        <label class="col text-start">
                          Tổng giá trị đơn hàng
                        </label>
                        <span class="col text-start">
                          {{ ToVND(order.total) }}
                        </span>
                      </div>
                      <div v-if="order.voucher != null" class="row">
                        <label class="col text-start">
                          Chiết khấu mã giảm giá
                        </label>
                        <span class="col text-start text-red">
                          {{ "- " + ToVND(order.total - order.paid) }}
                          <i
                            class="bi bi-info-circle-fill text-info"
                            :title="voucher_infor"
                          ></i>
                        </span>
                      </div>
                      <div class="row">
                        <hr class="mt-2 mb-0" />
                        <label class="col text-start">Tổng thu</label>
                        <span class="col text-start text-blue fw-bolder">
                          {{ ToVND(order.paid) }}
                        </span>
                        <hr class="my-1" />
                      </div>
                      <div class="row align-self-center mt-2">
                        <label class="col text-start">
                          Tình trạng thanh toán
                        </label>
                        <select v-model="order.isPaid" class="form-select col">
                          <option :value="true">Đã thanh toán</option>
                          <option :value="false">Chưa thanh toán</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- Thông tin đơn hàng -->
                  <div class="col pt-2">
                    <strong class="form-label text-center d-block">
                      <i class="bi bi-truck text-blue"></i>
                      Thông tin đơn hàng
                    </strong>
                    <div class="row">
                      <label class="col text-start">Trạng thái đơn hàng</label>
                      <select
                        v-model="order.status.code"
                        class="form-select col"
                      >
                        <option :value="1">Đang chờ xác nhận</option>
                        <option :value="2">
                          Đơn hàng đã xác nhận, Đang giao hàng
                        </option>
                        <option :value="3">Đã giao hàng thành công</option>
                        <option :value="0">Đơn hàng đã huỷ</option>
                      </select>
                    </div>
                  </div>
                  <!-- Thông tin người nhận -->
                  <div class="col pt-2">
                    <strong class="form-label text-center d-block">
                      <i class="bi bi-person-badge-fill text-blue"></i>
                      Thông tin người nhận
                    </strong>
                    <div class="d-flex col mt-2">
                      <label class="form-label no-wrap col-4 text-end pe-4">
                        Họ và tên người nhận
                      </label>
                      <input
                        v-model="order.shippingAddress.fullname"
                        type="text"
                        class="form-control"
                      />
                    </div>
                    <div class="d-flex col mt-2">
                      <label class="form-label no-wrap col-4 text-end pe-4">
                        Địa chỉ
                      </label>
                      <span v-if="full_address" class="inherit" style="font-size: small;">{{ order.shippingAddress.address }} - {{ full_address }}</span>
                      <input v-else
                        v-model="order.shippingAddress.address"
                        type="text"
                        class="form-control"
                      />
                    </div>
                    <div class="d-flex col mt-2">
                      <label class="form-label no-wrap col-4 text-end pe-4">
                        Số điện thoại
                      </label>
                      <input
                        v-model="order.shippingAddress.phone"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="modal-footer">
          <button @click="closeThis" type="button" class="btn btn-secondary">
            Huỷ
          </button>
          <button @click="onSubmit" type="button" class="btn btn-primary">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref, computed, onMounted} from "vue"
import {Edit,GetFulladdress} from "../../../modules/admin/Order_Manager.js"

export default {
  props: {
    Order: {
      require: true,
    },
  },
  setup(props, {emit}) {
    const BackendHost = ref(backendHost)
    const order = ref(props.Order)
    const result = ref()
    const full_address=ref()
    onMounted(async()=>{
      if(order.value.accountId!=null)
        full_address.value=await GetFulladdress(order.value.shippingAddress.wardId)
    })
    const Paymentmethod = computed(() => {
      if (order.value.paymentMethod != null)
        return order.value.paymentMethod.name
      return "Thanh toán khi nhận hàng"
    })
    const voucher_infor = computed(() => {
      if (order.value.voucher != null)
        if (order.value.voucher.isValue)
          //giảm trực tiếp
          return `Giảm ${ToVND(order.value.voucher.value)} cho đơn từ ${ToVND(
            order.value.voucher.minApply
          )}`
      //Giảm theo %
      return `Giảm ${order.value.voucher.value} % cho đơn từ ${ToVND(
        order.value.voucher.minApply
      )}, giảm tối đa ${ToVND(order.value.voucher.maxReduce)}`
    })
    const closeThis = () => {
      emit("reloadData")
      emit("CloseEdit")
    }
    const ToVND = (e) => {
      return e.toLocaleString("it-IT", {style: "currency", currency: "VND"})
    }
    const onSubmit = async () => {
      result.value = await Edit(
        order.value.id,
        order.value.shippingAddress,
        order.value.isPaid,
        order.value.status.code
      )
      //dữ liệu chưa valid hoặc lỗi trả từ bên server hoặc mất mạng :)))
      if (!result.value.success) {
        Swal.fire({
          icon: "warning",
          title: result.value.data,
        })
      } else {
        Swal.fire({
          icon: "success",
          title: "Thành công",
        })
      }
      closeThis()
    }
    return {
      BackendHost,
      order,
      voucher_infor,
      Paymentmethod,
      onSubmit,
      closeThis,
      ToVND,
      full_address,
    }
  },
}
</script>

<style></style>

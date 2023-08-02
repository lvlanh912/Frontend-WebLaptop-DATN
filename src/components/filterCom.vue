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
            <h4 class="d-none d-lg-block mx-2 ">Sắp xếp theo</h4>
            <div class="col-8 d-none d-lg-block">
                <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder active">Mới nhất</button>
                <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">Giá thấp nhất</button>
                <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">Giá cao nhất</button>
                <button class="btn btn-outline-info rounded-3 ms-4 fw-bolder">Bán chạy nhất</button>
            </div>
            <button class="btn btn-primary "><i class="bi bi-funnel-fill pe-2"> </i>Lọc</button>
        </div>
        <!-- menu-lọc -->
        <div class="modal d-block">
            <div class="modal-dialog w-100 shadow" style="max-width: 100%;">
                <div class="modal-content" style="width: 100vw;">
                    <div class="modal-header text-center">
                        <h1 class="fs-4">Lọc sản phẩm</h1>
                        <button type="button" class="btn btn-close"></button>
                    </div>
                    <div class="modal-body">
                        <span>Khoảng giá</span>
                        <hr>
                        <div class="row">
                            <div class="form-check  col-12 col-sm-6" v-for="price in price_filter.data">
                                <input class="form-check-input" type="radio" name="price" v-model="price_filter.select" :value="price.value" >
                                <label class="form-check-label">{{price.name}}</label>
                            </div>
                        </div>
                        <strong>CPU</strong>
                        <hr class="m-1">
                        <div class="row">

                            <div class="form-check col-12 col-sm-6" v-for="cpu in cpu_filter.data">
                                <input type="radio" name="CPU" :value="cpu.value" v-model="cpu_filter.select" class="form-check-input" />
                                <label>{{ cpu.name }} </label>
                            </div>
                        </div>
                        <strong>RAM</strong>
                        <hr class="m-1">
                        <div class="form-check">
                            <input type="radio" name="ram" class="form-check-input" />
                            <label>16GB </label>
                        </div>
                        <div class="form-check">
                            <input type="radio" name="ram" class="form-check-input" />
                            <label>32GB </label>
                        </div>
                        <div class="form-check">
                            <input type="radio" name="ram" class="form-check-input" />
                            <label>64GB </label>
                        </div>
                        <strong>Màn hình</strong>
                        <div class="form-check">
                            <input type="radio" name="rom" class="form-check-input" />
                            <label>SSD </label>
                        </div>
                        <div class="form-check">
                            <input type="radio" name="rom" class="form-check-input" />
                            <label>HDD </label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Xác nhận</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import{cpu_list, price_list} from '../data/filter.js'
    export default {
        setup(){
           const price_filter=price_list
           const cpu_filter=cpu_list
           return {price_filter,cpu_filter}
        }
    }
</script>

<style scoped>
    .active {
        background-color: var(--bs-blue);
        color: white;
    }
    .modal{
        background: #00000045;
    }
</style>
<template>
   <div style="min-width: 20rem;;max-width: 50rem;" class="p-3 bg-white rounded-3 col-6 px-md-2 px-lg-5 px-sm-1 d-flex flex-column align-content-center">
            <div class="d-flex flex-column p-sm-2 p-md-4 p-lg-5 ">
                <h3 class="text-center mb-5 pt-4" style="color: rgb(7, 93, 93);">Đăng ký</h3>
               <div class="input-group">
                <span class=" input-group-text"><i class="bi bi-person-fill m-auto"></i></span>
                <input class="form-control" placeholder="Nhập tên đăng nhập" type="text">
               </div>
               <div class="input-group mt-2">
                <span class=" input-group-text"><i class="bi bi-card-text m-auto"></i></span>
                <input class="form-control" placeholder="Nhập họ tên" type="text">
               </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-key-fill m-auto"></i></span>
                <input type="password" class="form-control" placeholder="Nhập mật khẩu"  >
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-key-fill m-auto"></i></span>
                <input type="password" class="form-control" placeholder="Nhập lại mật khẩu" >
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi m-auto">@</i></span>
                <input class="form-control" placeholder="Nhập email"  type="email">
                </div>
                <div class="input-group mt-2">
                    <span class="input-group-text"> <i class="bi bi-telephone-fill m-auto"></i></span>
                <input class="form-control" placeholder="Nhập số điện thoại"  type="tel">
                </div>
                <div class=" d-flex justify-content-center align-content-center pt-2 mb-2 mt-4">
                    <button class=" btn text-white btn-primary px-4">Đăng ký</button>
                </div>
        </div>
    <hr>
        <p class="text-center bottom-0">
           <label for="">Đã có tài khoản?</label>
           <a @click="this.$emit('switch',1)" class="link-info text-decoration-none">Đăng Nhập</a>
        </p>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
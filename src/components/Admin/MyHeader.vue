<template>
  <nav class=" bg-white navbar d-flex justify-content-between shadow p-1 fixed-top">
    <h3 class="navbar-brand ms-3">Trang quản trị</h3>
    <div class=" px-1">
      <a type="button" class="btn btn-primary position-relative rounded-circle py-1 px-2 me-3 me-md-4">
        <i class="bi bi-chat-text small"></i>
        <span class=" small position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          99+
        </span>
      </a>
      <a type="button" class="btn btn-primary position-relative rounded-circle py-1 px-2 me-2">
        <i class="bi bi-bell small"></i>
        <span class="small position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          9
        </span>
      </a>
      <button @click="showmenu" class="btn">
        <i class="bi bi-list fs-4"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
setup(props,{emit}){
 function showmenu(){
    emit('show_menu','hello')
  }
  return {showmenu}
}
}
</script>

<style scoped>
.btn-primary:hover{
  background-color: seagreen;
}


</style>
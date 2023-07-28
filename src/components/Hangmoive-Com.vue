<template>
    <div v-for="order in orders"  class="toast fade show position-absolute bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <span class=" rounded-circle me-2"></span>
        <strong class="me-auto">{{order.time}} </strong>
        <small>{{ order.time }} giờ trước</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Anh Nguyen vừa mua máy
      </div>
    </div>
</template>

<script>
export default{
props: ['orders']
}
</script>

<style scoped>
.toast-header span{
    width: 15px;
    height: 15px;
    background-color: #c1169994;
}
.fade{
    animation:animation 1.5s infinite ;
    animation-play-state: running;
    animation-direction:alternate;
}
@keyframes animation {
    from{
        opacity: 0.7;
        background-color: rgba(135, 129, 129, 0.278);
    }
    to{
        opacity: 1;
    }
    
}
</style>
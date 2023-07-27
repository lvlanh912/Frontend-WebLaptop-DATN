<template>
    <div  class=" ms-0 position-relative banner bg-danger">
        <img class="banner-item" src="https://laptop88.vn/media/banner/03_May50c92c020b8ada51c78e3e8639d6b6ef.jpg"/>
        <img class="banner-item" src="https://laptop88.vn/media/banner/10_Jul0ae396f01178bb86caf1549486f0e70f.jpg"/>
        <img class="banner-item" src="https://laptop88.vn/media/banner/03_May50c92c020b8ada51c78e3e8639d6b6ef.jpg"/>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.banner{
    border-radius: 2px;
    left: 200px;
    width:calc(100% - 200px);
    height: auto;
    min-height: 350px;
    max-height: 400px;
    overflow: hidden;
}
.banner .banner-item{
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    transition: all 0.4s ease-in;
    background-position: center center;
    background: black url("https://laptop88.vn/media/banner/03_May50c92c020b8ada51c78e3e8639d6b6ef.jpg") no-repeat center center  ;
}
.banner .active{
    opacity: 1;
}
</style>
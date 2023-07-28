<template>
    <div id="slide" class="carousel slide mx-2 mt-3" data-bs-ride="carousel">
        <div class="carousel-inner h-100">
          <div class="carousel-item position-absolute active" data-bs-interval="999">
            <img src="https://laptop88.vn/media/banner/21_Jul0d758f885dcacfcf9d41c24e6cd16db3.jpg" class="d-block w-100" alt="img">
          </div>
          <div class="carousel-item position-absolute" data-bs-interval="2000">
            <img src="https://laptop88.vn/media/banner/21_Jul0d758f885dcacfcf9d41c24e6cd16db3.jpg" class="d-block w-100 h-auto" alt="img">
          </div>
          <div class="carousel-item position-absolute">
            <img src="https://laptop88.vn/media/banner/21_Jul0d758f885dcacfcf9d41c24e6cd16db3.jpg" class="d-block w-100" alt="img">
          </div>
        </div>
        <button class="carousel-control-prev position-absolute top-0 " type="button" data-bs-target="#slide" data-bs-slide="prev">
        </button>
        <button class="carousel-control-next position-absolute top-0 " type="button" data-bs-target="#slide" data-bs-slide="next">
        </button>
      </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    #slide{
        max-width: 700px;
        height: auto;
        width: 100%;
        position: relative;
        max-height: fit-content;
    }
</style>
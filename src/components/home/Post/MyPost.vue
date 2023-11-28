<template>
  <div class="col-md-6 col-lg-4 ">
    <div class="card bg-light border-0 d-flex flex-column justify-content-between h-100">
      <!-- Image -->
      <div class="card-image">
        <router-link :to="{name:'post-detail',params:{id:post.id}}">
            <img
            style="max-height:300px;"
              class="card-img"
              :src="imagelink"
              alt=""
            />
        </router-link>  
      </div>
      <!-- title -->
        <h5 class="card-body card-title">
            <router-link :to="{name:'post-detail',params:{id:post.id}}"
                class="btn-link text-reset fw-bold text-decoration-none max-line-2">
                {{ post.title }}
            </router-link>
        </h5>
        <!-- Card info -->
        <div class="nav nav-divider align-items-center d-sm-inline-block">
          <span class="nav-item text-muted inherit fw-bold text-end">Đăng ngày:  {{ datepost }}</span>
        </div>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
    props:{
        post:{
            require:true
        }
    },
    setup(props,{emit}){
        const post=props.post
        const imagelink=computed(()=>backendHost+'/images/posts/'+post.images[0])
        const datepost=computed(()=>new Date(post.createAt).toLocaleDateString())

        return {post,imagelink,datepost}
    }
}
</script>

<style scoped>
.card-img:hover{
    scale: 105%;
    transition: all .3s ease-in-out;
}
.text-reset:hover{
    color:var( --product-price) !important;
    transition: all .3s ease-in-out;
}
</style>

<template>
  <main >
    <ul class="breadcrumb justify-content-start">
        <li class="breadcrumb-item ">
            <RouterLink class="text-decoration-none fw-bold"  :to="{name:'home'}">Trang chủ</RouterLink>
        </li>
        <li class="breadcrumb-item ">
            <RouterLink class="text-decoration-none fw-bold"  :to="{name:'post'}">Tin tức</RouterLink>
        </li>
        <li class="breadcrumb-item active">{{post.title}}</li>
    </ul>
    <section class="pt-4 bg-white">
        <div class="container bg-white rounded-3">
            <h2 class="p-2 fw-bold fs-1">{{post.title}}</h2>
            <span class="d-block text-muted inherit text-end"> Ngày đăng: {{date_create}}</span>
        </div>
        <!-- nội dung -->
        <transition name="slide-fade">
            <div v-if="Isshowcontent" class="p-4"  v-html="content"></div>
        </transition>
        <!-- Tin khác -->
    </section>
    <div class="my-3">
            <h4 class="fw-bold text-blue ms-2">Tin khác</h4>
        </div>
        <transition name="slide-fade">
            <section v-if="Isshowcontent" class="mt-2">
                    <div  class="row g-4 mb-2 mt-1 bg-white">
                        <MyPost v-for="item in list_post" :key="item.id" :post="item" ></MyPost>
                    </div>
            </section>
        </transition>
  </main>
</template>

<script>
import {  ref,computed, onMounted } from 'vue'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
import MyPost from '../../../components/home/Post/MyPost.vue'
import {getPostbyid,getPost} from '../../../modules/home/HomeAPI.js'
export default {
    components:{
        MyPost
    },
setup(){
    const router=useRoute()
    const post=ref({})
    const postId=ref(router.params.id)
    const list_post=ref([])
    const Isshowcontent=ref(false)
    onMounted(async ()=>{
        Isshowcontent.value=false
        post.value= await getPostbyid(postId.value)
        Isshowcontent.value=true
        await GetData()
    })
    onBeforeRouteUpdate(async (to,from,next)=>{
        Isshowcontent.value=false
        window.scrollTo(0, 0)
        post.value= await getPostbyid(to.params.id)
        Isshowcontent.value=true
        await GetData()
        next()
    })
    const content=computed(()=>insertimagetoContent())
    const insertimagetoContent=()=>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.value.content, "text/html");
        const imgElements = doc.getElementsByTagName("img");
        for(let i=imgElements.length-1;i>=0;i--){
            imgElements[i].setAttribute('src',backendHost+'/images/posts/'+post.value.images[i])
            imgElements[i].setAttribute('style','width:100%;height:auto')
        }
        return doc.body.innerHTML
    }
    const GetData = async () => {
            let result = await getPost(1, 7, '')
            list_post.value = result.items
            list_post.value.map((value,index)=>{
                if(value.id==post.value.id){
                    list_post.value.splice(index,1)
                    return
                }
            })
            if(list_post.value.length>6)
                list_post.value.splice(5,1)
        }
    const date_create=computed(()=>new Date(post.value.createAt).toLocaleDateString())
    return {
        post,
        date_create,
        content,
        list_post,
        Isshowcontent
    }
}
}
</script>

<style scoped>
img{
    width: 100%;
}
</style>
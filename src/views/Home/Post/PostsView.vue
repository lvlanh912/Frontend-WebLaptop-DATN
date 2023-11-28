<template>
    <main>
        <ul class="breadcrumb justify-content-start">
            <li class="breadcrumb-item ">
                <RouterLink class="text-decoration-none fw-bold"  :to="{name:'home'}">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Tin tức</li>
        </ul>
        <div class="px-2 d-flex justify-content-between bg-white rounded-3">
            <div class="align-items-center d-none d-md-flex col ">
                <button @click="sortDate_desc" class="btn me-2 rounded-4 text-blue fw-bolder py-1">Tin mới nhất trước</button>
                <button @click="sortDate" class="btn me-2 rounded-4 text-blue fw-bolder py-1">Tin cũ nhất trước</button>
            </div>
            <select v-model="sort" @change="onSearch" class="form-select d-block d-md-none w-auto">
                <option :value="''">Sắp xếp theo</option>
                <option :value="'date'">Tin cũ nhất trước</option>
                <option :value="'date_desc'">Tin mới nhất trước</option>
            </select>
            <!-- Tìm kiếm -->
              <div class="w-auto">
                <form class="input-group" @submit.prevent="onSearch">
                    <input v-model="keyword" class="form-control border-bottom-0 m-0 rounded-2 " type="search" placeholder="Nhập từ khoá" aria-label="Search">
                    <button class="btn bg-blue m-0" type="submit"><i class="text-white bi bi-search"></i></button>
                </form>
				</div>
        </div>
        <hr class="m-0">
        <section class="pt-4">
            <div class="container bg-white">
                <transition name="slide-fade">
                <div  v-if="isLoaded" class="row g-4 mb-2">
                    <!-- post -->
                        <MyPost v-for="item in list_post" :key="item.id" :post="item" ></MyPost>
                    </div>
                </transition>
                <!-- pagging -->
                <nav  class="d-flex justify-content-center pt-2">
                    <ul class="pagination">
                     <li v-if="pageindex > 1" @click="changepage(--pageindex)" class="page-item">
                      <p class="page-link m-0">
                       <span>«</span>
                       <span class="sr-only"></span>
                      </p>
                     </li>
                     <li class="page-item active">
                      <p class="page-link m-0">
                       <span>{{ pageindex }}</span>
                       <span class="sr-only"></span>
                      </p>
                     </li>
                     <li v-if="pageindex < totalpage" @click="changepage(++pageindex)" class="page-item">
                      <p class="page-link m-0">
                       <span>»</span>
                       <span class="sr-only"></span>
                      </p>
                     </li>
                    </ul>
                </nav>
            </div>
        </section>
    </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import MyPost from '../../../components/home/Post/MyPost.vue'
import { getPost } from '../../../modules/home/HomeAPI.js';
export default {
    components: {
        MyPost
    },
    setup() {
        const list_post = ref([])
        const pageindex = ref(1)
        const pagesize = ref(24)
        const totalpage=ref(0)
        const sort = ref('')
        const isLoaded=ref(false)
        const keyword=ref('')
        onMounted(async() => {
            await GetData()
        })
        const GetData = async () => {
            isLoaded.value=false
            let result = await getPost(pageindex.value, pagesize.value, sort.value,keyword.value)
            totalpage.value=result.totalPages
            list_post.value = result.items
            isLoaded.value=true
        }
        const changepage = async (e) => {
            pageindex.value = e
            await GetData()
        }
        const sortDate= async()=>{
            sort.value='date'
            await GetData()
        }
        const sortDate_desc= async()=>{
            sort.value='date_desc'
            await GetData()
        }
        const onSearch=async()=>{
            await GetData()
        }
        return {
            pageindex,
            totalpage,
            pagesize,
            list_post,
            changepage,
            isLoaded,
            keyword,
            sort,
            sortDate,
            sortDate_desc,
            onSearch
        }
    }
}
</script>

<style>

</style>
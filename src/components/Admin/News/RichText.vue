<template>
    <div>
        <div id="quillEditor"> </div>
    </div>
</template>

<script>
import { Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onBeforeMount, onMounted, ref } from 'vue';
export default {
    name: 'QuillEditor',
    props:{
        data:{
            require:false
        }
    },
    setup(props,{emits}) {
        const quill = ref(null)
        onMounted(() => {
            quill.value = new Quill(document.getElementById('quillEditor'), {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // các nút định dạng văn bản
                        [{ 'header': 1 }, { 'header': 2 }],               // tiêu đề
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // danh sách
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],  // kích thước văn bản
                        [{ 'color': [] }],         // màu sắc
                        [{ 'font': [] }],                                 // font chữ
                        [{ 'align': [] }], ['image']                                        // xóa định dạng
                    ],
                },
            })
            if(props.data!=null)
            return quill.value.root.innerHTML=props.data
        })
        const GetContent=()=>{
            return quill.value.root.innerHTML
        }
        
        const SetContent=()=>{
          
        }
        SetContent()
        return{
            quill,
            GetContent
        }
    }


}
</script>

<style scoped>
/* Bổ sung các kiểu CSS tùy thuộc vào nhu cầu của bạn */
</style>

<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {ref} from 'vue'
import {
  allPhotoService, managerPhotoDeleteService,
  photoAddService, photoCategoryDeleteService,
  photoCategoryService,
  photoDeleteService,
  photoLikeService,
  photoListService
} from "@/api/photo";

const tokenStore = useTokenStore();




const photos = ref([
  {
    id: 5,
    createUserName: 'jizihe',
    categoryId: 7,
    imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    likeNum: 3
  },
  {
    id: 5,
    createUserName: 'lvtingting',
    categoryId: 7,
    imgUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    likeNum: 7
  }
])


const comments=ref([
  {
    id:5,
    photoId:1,
    createUserName:'jizihe',
    content:'这张照片好漂亮'
  }
])





import {Plus} from '@element-plus/icons-vue'
import {useTokenStore} from "@/stores/token";
import {ElMessage, ElMessageBox} from "element-plus";
import {commentAddService, commentDeleteService, commentListService, managerCommentDeleteService} from "@/api/comment";
//控制抽屉是否显示

const visibleDrawer2 = ref(false)

const commentModel=ref({
  photoId:'',
  createUserName:'',
  content:''
})




const count = ref(0)
const load = () => {
  count.value += 2
}






const photoList=async ()=>{

  let result=await allPhotoService();
  photos.value=result.data;
}
photoList();



const likePhoto=async (photoId)=>{
  console.log(photoId);
  let result=await photoLikeService(photoId);
  ElMessage.success(result.message?result.message:"点赞成功");
  photoList();
}

const managerDeletePhoto=async (photoId)=>{
  ElMessageBox.confirm(
      '你确认删除该相片吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result=await managerPhotoDeleteService(photoId);
        ElMessage({
          type: 'success',
          message: '管理员删除照片成功',
        })
        photoList();
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const commentList=async ()=>{
  let result=await commentListService(commentModel.value.photoId);
  comments.value=result.data;
}

const showComment=(photoId)=>{
  commentModel.value.photoId=photoId;
  commentList();
  visibleDrawer2.value=true;
}
const addComment=async ()=>{
  let result= await commentAddService(commentModel.value);
  ElMessage.success(result.message?result.message:"添加成功");
  commentList();
}

const managerDeleteComment = (row) => {
  ElMessageBox.confirm(
      '你确认删除该评论吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result=await managerCommentDeleteService(row.id);
        ElMessage({
          type: 'success',
          message: '管理员删除评论成功',
        })
        commentList();
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>相片墙</span>
      </div>
    </template>

    <!--    <div class="demo-image__lazy">-->
    <!--      <el-image v-for="url in urls" :key="url" :src="url" lazy>-->
    <!--        <div>你好</div>-->
    <!--      </el-image>-->
    <!--    </div>-->

    <ul class="infinite-list" style="overflow: auto">
      <li v-for="photo in photos" :key="photo" class="infinite-list-item">
        <el-image :src="photo.imgUrl" class="img-size" lazy/>
        <div class="info">
          <div>点赞数:{{photo.likeNum}}</div>
          <el-button type="primary" @click="likePhoto(photo.id)">点赞</el-button>
          <div>作者:{{photo.createUserName}}</div>
          <el-button :icon="Delete" circle plain type="danger" @click="managerDeletePhoto(photo.id)"></el-button>
          <el-button type="primary" @click="showComment(photo.id)">展示评论</el-button>
        </div>
      </li>
    </ul>


    <el-drawer v-model="visibleDrawer2" title="评论区" direction="rtl" size="50%">
      <!-- 添加文章表单 -->
      <el-table :data="comments" style="width: 100%">
        <el-table-column label="评论用户" width="100" prop="createUserName"> </el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button :icon="Delete" circle plain type="danger" @click="managerDeleteComment(row)"></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
      <el-form-item label="评论">
        <div class="editor">
          <quill-editor
              theme="snow"
              v-model:content="commentModel.content"
              contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addComment">发布</el-button>
      </el-form-item>
    </el-drawer>


  </el-card>


</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}


/* 抽屉样式 */
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}


.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}

.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}


.infinite-list {
  height: 500px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.img-size {
  height: 500px;
  width: 500px;
}

.info {
  flex-direction: column;
}
</style>
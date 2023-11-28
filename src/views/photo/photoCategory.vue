<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import {photoCategoryAddService, photoCategoryDeleteService, photoCategoryService} from "@/api/photo";
import {ElMessage, ElMessageBox} from "element-plus";
const categorys = ref([
  {
    "id": 3,
    "categoryName": "美食",
  },
  {
    "id": 4,
    "categoryName": "娱乐",
  },
  {
    "id": 5,
    "categoryName": "军事",
  }
])


const photoCategoryList = async () => {
  let result = await photoCategoryService();
  categorys.value = result.data;
}
photoCategoryList();




//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
  categoryName: '',
})
//添加分类表单校验
const rules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ]
}

const addCategory = async () => {
  let result = await photoCategoryAddService(categoryModel.value);
  ElMessage.success(result.message ? result.message : "添加成功");
  photoCategoryList();
  dialogVisible.value = false;
}




const deleteCategory = (row) => {
  ElMessageBox.confirm(
      '你确认删除该分类信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result=await photoCategoryDeleteService(row.id);
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        photoCategoryList();
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
        <span>相册</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true">添加相册</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="相册名称" prop="categoryName"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <!-- 添加分类弹窗 -->
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="相册名称" prop="categoryName">
        <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addCategory"> 确认 </el-button>
        </span>
    </template>
  </el-dialog>

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
</style>

import request from "@/utils/request";
import{useTokenStore} from '@/stores/token'
export const photoCategoryService=()=>{
    //const tokenStore=useTokenStore();
    return request.get('/category');
}


//添加文章分类
export const photoCategoryAddService = (categoryModel) => {
    return request.post('/category', categoryModel)
}
export const photoCategoryDeleteService=(id)=>{
    return request.delete('/category?id='+id);
}

export const photoAddService=(photoData)=>{
    return request.post("/photo",photoData);
}

export const photoListService=(params)=>{
    return request.get("/photo",{params:params});
}

export const photoLikeService=(photoId)=>{
    console.log("js"+photoId);
    return request.post("/photo/like?photoId="+photoId);
}

export const photoDeleteService=(photoId)=>{
    return request.delete("/photo?photoId="+photoId);
}

export const allPhotoService=()=>{
    return request.get("/photo/allPhoto")
}

export const managerPhotoDeleteService=(photoId)=>{
    return request.delete("/photo/managerDelete?photoId="+photoId);
}
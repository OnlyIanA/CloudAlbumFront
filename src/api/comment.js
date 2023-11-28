import request from "@/utils/request";
import{useTokenStore} from '@/stores/token'
export const commentAddService=(commentData)=>{
    return request.post("/comment",commentData);
}
export const commentListService=(photoId)=>{
    return request.get("/comment?photoId="+photoId);
}
export const commentDeleteService=(commentId)=>{
    return request.delete("/comment?commentId="+commentId);
}
export const managerCommentDeleteService=(commentId)=>{
    return request.delete("/comment/managerDelete?commentId="+commentId);
}
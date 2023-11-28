import {createRouter, createWebHistory} from 'vue-router'
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import PhotoCategoryVue from "@/views/photo/photoCategory.vue";
import PhotoManageVue from "@/views/photo/photoManage.vue";
import UserAvatarVue from "@/views/user/userAvatar.vue";
import UserInfoVue from "@/views/user/userInfo.vue";
import PublicPhoto from "@/views/PublicPhoto.vue";

const routes = [
    {path: '/login', component: LoginVue},
    {path: '/', component: LayoutVue,redirect:'/photo/manage',
        children:[
            {path:'/photo/category',component:PhotoCategoryVue},
            {path:'/photo/manage',component:PhotoManageVue},
            {path:'/user/info',component:UserInfoVue},
            {path:'/user/avatar',component:UserAvatarVue},
            {path:'/public',component:PublicPhoto}
        ]}
]

const router=createRouter({
    routes:routes,
    history:createWebHistory()
})

export default router
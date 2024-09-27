<!-- 经典布局 -->
<template>
  <section class="flex flex-col h-full">
    <header class=" h-17 shrink-0 flex w-full  shadow-md  bg-white backdrop-filter backdrop-blur-lg bg-opacity-50 justify-between items-center sm:px-4 md:px-4">

      <img @click="changeUrl('home')" class="h-6" src="https://assets.dewatermark.ai/images/watermark-remover/header_logo_new.webp" alt="" />
      <div class="flex static items-center ">
<!--        <el-button class="mr-10 lg:mr-20 fw-800 text-16px border-black" @click="getUrlClick('this-person-does-not-exist')">生成人脸</el-button>-->
<!--        <button class="flex bg-transparent border-transparent sm+:hover:bg-gray-200 mr-8 justify-between items-center">-->
<!--                <svg-icon-->
<!--                  class="cursor-pointer"-->
<!--                  style="width: 22px;margin-right: 8px"-->
<!--                  name="en"-->
<!--                ></svg-icon>-->
<!--          <span class="inline-block fs-20 text-sm">English</span>-->
<!--&lt;!&ndash;          <span @click="changeLang('zh')">切换语言</span>&ndash;&gt;-->
<!--        -->
<!--        </button>-->
        <div
          class="bg-white sm+:border sm+:rounded-md sm+:shadow-md transition sm+:absolute sm+:right-0 sm+:top-full sm+:translate-y-2 sm:fixed sm:inset-0 sm:h-screen sm:top-[68px] sm:border-t py-[10px] px-2 z-50 hidden"
        >
          <p class="font-semibold mb-2 px-2 text-base-content-primary sm:flex sm:justify-between sm:items-center">
            <span>语言</span>
            <button class="p-1 sm+:hidden">
              <div class="inline-block w-7 h-7">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full"
                >
                  <path d="M5.83301 5.83301L22.1663 22.1663" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M22.167 5.83301L5.83366 22.1663" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </div>
            </button>
          </p>
        </div>

<!--        <el-button-->
<!--          class=" lg:flex items-center justify-center rounded-[8px] border border-black fw-800  lg:w-[100px]   text-16px transition"-->
<!--          @click="dialogVisible = true"-->
<!--          >登录-->
<!--        </el-button>-->
      </div>
    </header>
    <el-container class="flex-1 flex flex-col overflow-auto">
      <Main class="bg" />

    </el-container>
  </section>
  <el-dialog v-model="dialogVisible"  width="300">
<div  class="flex justify-between items-center p-20" >
  <GoogleLogin :callback="callback"/>
<!--  <img class="w-400" src="@/assets/images/home/Or.webp" alt="">-->
</div>

  </el-dialog>

</template>

<script setup lang="ts" name="layoutClassic">

import router from '@/routers';
import Main from '@/layouts/components/Main/index.vue';
import { LanguageType } from '@/stores/interface';
import { useGlobalStore } from '@/stores/modules/global';
import { googleInfo } from '@/api/modules/person'

import { reactive, ref } from 'vue'
import { useI18n } from "vue-i18n";
import { decodeCredential } from 'vue3-google-login'

const globalStore = useGlobalStore();
const i18n = useI18n();
// 登录弹窗
const dialogVisible = ref(false)
// 用户选择或登录谷歌账号后会触发此回调
const callback = (response) => {
  // 使用 decodeCredential 解码 JWT credential 获取用户信息
  console.log(response.credential);
  const userInfo = decodeCredential(response.credential)
  googleInfo({data:response.credential}).then(response => {
    console.log(response);
  })
}

// 菜单跳转路由
function changeUrl(url) {
//跳转
router.push({ path: `/${url}` });
}

// 切换语言
const changeLang=(type)=>{
  i18n.locale.value = type;
  // globalStore.setGlobalState('language', 'zh');
}
</script>

<style scoped lang="scss">
@import './index.scss';

//header{
//  background-color: rgba(1,1,1,0);
//}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.fixMenu {
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px 0 25px;
  background-color: #fafbff;
}

.collapse {
  justify-content: center;
  padding: 0;
}
</style>

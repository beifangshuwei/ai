<template>
  <div class="person  flex flex-col items-center p-20 lg:p-40">
    <div class="sm:w-100% md:w-450 lg:w-650  text-center">
      <h1 class="mb-20 fs-30">{{$t('person.title')}}</h1>
      <div class="mb-20 fs-14">
        {{$t('person.intro')}}
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Gender" class="">
          <el-select
            v-model="formInline.gender"
            placeholder="Any"
            clearable
          >
            <el-option label="Any" value="Any" />
            <el-option label="Male" value="Male" />
            <el-option label="Female" value="Female" />
          </el-select>
        </el-form-item>
        <el-form-item label="Age">
          <el-select
            v-model="formInline.age"
            placeholder="Any"
            clearable
          >
            <el-option label="Any" value="Any" />
            <el-option label="12-18 years old" value="12-18" />
            <el-option label="19-25 years old" value="19-25" />
            <el-option label="26-35 years old" value="26-35" />
            <el-option label="35-50 years old" value="35-50" />
            <el-option label="50+ years old" value="50" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ethnicity">
          <el-select
            v-model="formInline.ethnicity"
            placeholder="Any"
            clearable
          >
            <el-option label="Any" value="Any" />
            <el-option label="Asian" value="Asian" />
            <el-option label="Black" value="Black" />
            <el-option label="White" value="White" />
            <el-option label="Indian" value="Indian" />
            <el-option label="Middle Eastern" value="Middle Eastern" />
            <el-option label="Latino Hispanic" value="Latino Hispanic" />
          </el-select>
        </el-form-item>
        <el-form-item class="">
          <el-button type="primary" @click="onSubmit">Refresh Image</el-button>
        </el-form-item>
      </el-form>
      <img class="w-100%"  src="@/assets/images/home/Or.webp">
      <!--    <img class=" sm:w-100% md:w-450 lg:w-650"  src="@/assets/images/home/Or.webp">-->
      <el-button class="mt-20 w-100% h-30 lg:h-50 fs-20" type="primary">{{$t('person.downloadButton')}}</el-button>
      <section class="text-left w-100% ">
        <h2>{{$t('person.intro1.title')}}</h2>
        <p>{{$t('person.intro1.content')}}</p>
        <h2>{{$t('person.intro2.title')}}</h2>
        <div class="mt-10">
          <img class="sm:w-100% float-left mr-20 mb-10 md:w-200 lg:w-300 inline-flex"  src="@/assets/images/home/Or.webp">
          <p>{{$t('person.intro2.concent1')}}</p>
          <p>{{$t('person.intro2.concent2')}}</p>
          <p>{{$t('person.intro2.concent3')}}</p>
          <p>{{$t('person.intro2.concent4')}}</p>
        </div>
        <h2>{{$t('person.intro3.title')}}</h2>
        <div class="mt-10">
          <p>{{$t('person.intro3.concent')}}</p>
        </div>
        <h2>{{$t('person.intro4.title')}}</h2>
        <div class="mt-10">
          <img class="sm:w-100% float-left mr-20 mb-10 md:w-200 lg:w-300 inline-flex"  src="@/assets/images/home/Or.webp">
          <p>{{$t('person.intro4.concent1')}}</p>
          <p>{{$t('person.intro4.concent2')}}</p>
          <p>{{$t('person.intro4.concent3')}}</p>
          <p>{{$t('person.intro4.concent4')}}</p>
        </div>
        <div class="mt-10">
          <img class="sm:w-100% float-left mr-20 mb-10 md:w-200 lg:w-300 inline-flex"  src="@/assets/images/home/Or.webp">
          <p>{{$t('person.intro5.concent1')}}</p>
          <p>{{$t('person.intro5.concent2')}}</p>
          <p>{{$t('person.intro5.concent3')}}</p>
        </div>
      </section>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useI18n } from 'vue-i18n';
// import { LanguageType } from '@/stores/interface';
import { useGlobalStore } from '@/stores/modules/global';
import Img from "@/components/Upload/Img.vue";

const globalStore = useGlobalStore();
const i18n = useI18n();

const formInline = reactive({
  gender: "",
  age: "",
  ethnicity: ""
});

const onSubmit = () => {
  console.log("submit!");
  // i18n.locale.value = 'zh';
  // globalStore.setGlobalState('language', 'zh');
};
</script>

<style scoped>
.person{
  @media (max-width: 768px){
    h1{
      font-size: 24px !important;
    }
  }
  h2{
    font-size: 24px;
    margin-top: 20px;
  }
  p{
    font-size: 16px;
    margin-top: 10px;
    background-clip: text;
  }
  .demo-form-inline .el-input {
    --el-input-width: 220px;

  }

  .demo-form-inline .el-select {
    --el-select-width: 70px;
  }
}

</style>

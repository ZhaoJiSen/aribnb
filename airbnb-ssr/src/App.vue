<script lang='ts' setup>
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {getLanguage} from "./api/modules/commonHeader";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import HeaderCommon from "@/layout/headerCommon/index.vue";
import FooterCommon from "@/layout/FooterCommon/index.vue";

const route = useRoute();

const locale = ref();
const {locale: customLocale} = useI18n();

onMounted(() => {
  getLang();
});

const changeLanguage = (type: string) => {
  console.log("trigger");
  if (type === "en") {
    locale.value = en;
    customLocale.value = "en";
  } else {
    locale.value = zhCn;
    customLocale.value = "zh";
  }
};

const getLang = async () => {
  const res = await getLanguage();
  
  const {success, result} = res;
  const {name} = result;
  
  if (success) {
    if (name === "zh-cn") {
      locale.value = zhCn;
      customLocale.value = "zh";
    } else {
      locale.value = en;
      customLocale.value = "en";
    }
  }
};

</script>

<template>
  <el-config-provider :locale='locale'>
    <HeaderCommon
      @changeLanguage='changeLanguage'
      v-show="route.fullPath.indexOf('login') === -1"
    />
    <div class='container'>
      <router-view />
    </div>
    <FooterCommon v-show="route.fullPath.indexOf('login') === -1" />
  </el-config-provider>
</template>

<style lang='scss' scoped></style>

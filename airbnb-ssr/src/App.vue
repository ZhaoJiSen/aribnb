<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import HeaderCommon from "@/layout/headerCommon/index.vue";
import FooterCommon from "@/layout/FooterCommon/index.vue";

const route = useRoute();

const locale = ref();
const { locale: customLocale } = useI18n();

const changeLanguage = (type: string) => {
  console.log(1);

  // console.log(type);
  // if (type.name === "zh-cn") {
  //   locale.value = zhCn;
  //   customLocale.value = "zh";
  // } else {
  //   locale.value = en;
  //   customLocale.value = "en";
  // }
};
</script>

<template>
  <el-config-provider :locale="locale">
    <HeaderCommon
      v-show="route.fullPath.indexOf('login') !== -1"
      @changeLanguage="changeLanguage"
    />
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterCommon v-show="route.fullPath.indexOf('login') !== -1" />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>

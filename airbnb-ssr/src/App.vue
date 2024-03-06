<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import HeaderCommon from "@/layout/headerCommon/index.vue";
import FooterCommon from "@/layout/FooterCommon/index.vue";

const locale = ref();
const { locale: customLocale } = useI18n();

const changeLanguage = (type: string) => {

  if (type === "zh-cn") {
    locale.value = zhCn;
    customLocale.value = "zh";
  } else {
    locale.value = en;
    customLocale.value = "en";
  }
};
</script>

<template>
  <el-config-provider :locale="locale">
    <HeaderCommon @changeLanguage="changeLanguage" />
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterCommon />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>

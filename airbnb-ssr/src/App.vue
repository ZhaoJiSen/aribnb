<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const locale = ref();
const value1 = ref("");
const size = ref<"default" | "large" | "small">("default");

const { t, locale: customLocale } = useI18n();

const changeLanguange = (lang: any) => {
  locale.value = lang;
  customLocale.value = lang.name;
};
</script>

<template>
  <el-config-provider :locale="locale">
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
      :size="size"
    />
    <div>{{ t("message.home") }}</div>
    <el-button @click="changeLanguange(zhCn)">切换为中文</el-button>
    <el-button @click="changeLanguange(en)">切换为英文</el-button>
  </el-config-provider>
</template>

<style scoped lang="scss">
@import "./styles/variable.scss";

.div {
  width: 50px;
  height: 50px;
  @include line-text-overflow;
}
</style>

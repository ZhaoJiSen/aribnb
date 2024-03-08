<template>
  <div class="header-common">
    <img :src="logoImg" alt="logo" class="logoImg" />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">{{ t("header.orders") }}</el-menu-item>
      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
      <el-sub-menu index="internationalization">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh-cn">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <el-tooltip :content="t('header.personalCenter')" effect="light">
          <el-avatar :src="avatarImg" />
        </el-tooltip>
      </el-menu-item>
      <!-- <el-menu-item index="login">
        {{ t("login.loginTab") }} / {{ t("login.signTab") }}
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { saveLanguage } from "@/api/modules/commonHeader.ts";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import logoImg from "@/assets/images/logo.png";
import avatarImg from "@/assets/images/avatar.jpg";

const { t } = useI18n();
const router = useRouter();

const emit = defineEmits<{
  (e: "changeLanguage", key: string): void;
}>();

const activeIndex = ref("orders");

const handleSelect = async (key: string) => {
  if (key === "en" || key === "zh-cn") {
    const result = await saveLanguage(key);
    const { success } = result;

    if (success) emit("changeLanguage", key);
  }
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

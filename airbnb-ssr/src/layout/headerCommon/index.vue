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
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { saveLanguage, getLanguage } from "@/api/modules/commonHeader.ts";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import avatarImg from "@/assets/images/avatar.jpg";
import logoImg from "@/assets/images/logo.png";

const { t } = useI18n();

const emit = defineEmits<{ (e: "changeLanguage", type: any): void }>();

const activeIndex = ref("orders");

onMounted(() => {
  getLang();
});

const handleSelect = (key: string) => {
  emit("changeLanguage", key);
  handleLang(key);
};

const handleLang = (lang: any) => {
  saveLanguage(lang).then((res) => {
    const { success } = res;

    if (success) {
      console.log("保存成功");
    }
  });
};

const getLang = () => {
  getLanguage().then((res) => {
    const { success, result } = res;
    const { name } = result;

    console.log("current", name);

    if (success) {
      if (name === "zhCn") {
        emit("changeLanguage", zhCn);
      } else {
        emit("changeLanguage", en);
      }
    } else {
      ElMessage.error("获取当前语言失败");
    }
  });
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>

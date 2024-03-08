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
      <el-menu-item index="login">
        {{ t("login.loginTab") }} / {{ t("login.signTab") }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { saveLanguage, getLanguage } from "@/api/modules/commonHeader.ts";

import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import logoImg from "@/assets/images/logo.png";
import avatarImg from "@/assets/images/avatar.jpg";

const { t } = useI18n();
const router = useRouter();

const emit = defineEmits<{ (e: "changeLanguage", type: any): void }>();

const activeIndex = ref("orders");

onMounted(() => {
  getLang();
});

const handleSelect = (key: string) => {
  console.log(key);
  if (key === "en" || key === "zh-cn") {
    emit("changeLanguage", key);
  }
};

// const handleLang = (lang: any) => {
//   saveLanguage(lang).then((res) => {
//     const { success } = res;

//     if (success) {
//       console.log("保存成功");
//       emit("changeLanguage", lang);
//     }
//   });
// };

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

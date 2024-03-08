<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- Tab 组件 -->
        <el-tabs v-model="activeName" @tab-change="onTabChange">
          <el-tab-pane :label="t('login.loginTab')" name="login"> </el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="registe"></el-tab-pane>
        </el-tabs>

        <!-- form 组件 -->
        <el-form :model="formModel" :rules="rules" ref="formRef">
          <el-form-item prop="phone">
            <el-input
              v-model="formModel.phone"
              :placeholder="t('login.placeMobile')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              :placeholder="t('login.placePass')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">{{
              loginText
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, reactive } from "vue";
import type { TabPaneName } from "element-plus";

const { t } = useI18n();

const formRef = ref();
const activeName = ref("login");
const loginText = ref(t("login.loginBtn"));

const formModel = reactive({
  phone: "",
  password: "",
});
const rules = reactive({
  phone: [
    {
      required: true,
      min: 11,
      max: 11,
      message: t("login.placeMobile"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("login.placePass"),
      trigger: "blur",
    },
  ],
});

const submitForm = () => {
  formRef.value.validate((vaild: boolean) => {
    if (vaild) {
      alert("成功");
    } else {
      return false;
    }
  });
};

const onTabChange = (e: TabPaneName) => {
  if (e === "login") {
    loginText.value = t("login.loginBtn");
  } else {
    loginText.value = t("login.signBtn");
  }
};
</script>

<style scoped lang="scss">
@import url("./index.scss");
</style>

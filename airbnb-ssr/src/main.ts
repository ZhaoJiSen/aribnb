import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import i18n from "./language/i18n";
import "./styles/reset.scss";

createApp(App).use(router).use(i18n).mount("#app");


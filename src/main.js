import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "@/assets/tailwind.scss";
import "@/assets/reset-default-styles.scss";
import ElementPlus from "element-plus";
import router from "./router";
import VChart from "vue-echarts";
import "echarts";
import universalComponents from "@/components/ui/index";

// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import AwesomeIcons from "@/components/ui/awesome-icons/index";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

library.add(...AwesomeIcons);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

//add components
app.component("a-icon", FontAwesomeIcon);
app.component("v-chart", VChart);

const components = [...universalComponents];
components.map((component) => {
  if (component?.__name) {
    app.component(component?.__name, component);
  }
});

// icons element plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

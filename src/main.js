import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { Plugins, registerWebPlugin } from "@capacitor/core";
import { SendIntent } from "send-intent";

const { SplashScreen, AdMob } = Plugins;
registerWebPlugin(SendIntent);
Vue.config.productionTip = true;

new Vue({
  vuetify,
  render: (h) => h(App),
  mounted: () => {
    SplashScreen.hide();
    AdMob.initialize();
  },
}).$mount("#app");

<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img src="@/assets/logo.png"></v-img>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://mydevtools.online" target="_blank" text>
        <span class="mr-2">See more</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Home ref="home" />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import { Plugins } from "@capacitor/core";
import { AdSize, AdPosition } from "@capacitor-community/admob";
import { startListenShareEvent } from "./utils/index";

export default {
  name: "App",
  components: {
    Home,
  },
  data: () => ({
    options: {
      adId: "ca-app-pub-9997110645195662/9672874768",
      adSize: AdSize.BANNER,
      position: AdPosition.BOTTOM_CENTER,
      margin: 0,
    },
  }),

  mounted() {
    // start listen for  share event
    startListenShareEvent((res) =>
      this.$refs.home.setVideoLink(res.text).check()
    );
    this.showAds();
  },
  methods: {
    showAds() {
      Plugins.AdMob.showBanner(this.options);
      // Subscibe Banner Event Listener
      Plugins.AdMob.addListener("onAdLoaded", (info) => {
        console.log("Banner ad loaded" + info);
      });
      // Get Banner Size
      Plugins.AdMob.addListener("onAdSize", (info) => {
        console.log(info);
      });
    },
  },
};
</script>

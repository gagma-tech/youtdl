<template>
  <div style="padding:15px">
    <h2>
      <p class="text-center">Downlaod Youtube Video</p>
    </h2>
    <div v-if="!passToDownload">
      <v-form ref="form">
        <v-text-field
          v-model="video.link"
          label="Link video youtube"
          required
        ></v-text-field>
        <v-btn :disabled="video.link == ''" class="mr-4" @click="check()">
          <template v-if="isLoading">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </template>
          <template v-else>
            Check
          </template>
        </v-btn>
      </v-form>
    </div>
    <div v-else>
      <template>
        <v-card class="mx-auto my-12" max-width="700">
          <v-img height="250" :src="res.thumbnail.thumbnails[3].url"></v-img>
          <v-card-title>{{ res.title }}</v-card-title>
          <v-form v-model="formData.isValid" ref="formData">
            <v-card-text>
              <v-select
                v-model="video.vd_format"
                :items="listFormats"
                :rules="formData.vd_formatRules"
                label="Select format"
                dense
                outlined
                required
              ></v-select>
              <v-select
                v-model="video.vd_quality"
                :items="listQuality"
                :rules="formData.vd_qualityRules"
                label="Select quality"
                item-text="state"
                item-value="abbr"
                dense
                outlined
                required
              ></v-select>
              <v-btn x-large color="primary" dark @click="download()">
                <v-icon> mdi-file-download </v-icon>
                Download</v-btn
              >
              <v-btn
                x-large
                color="danger"
                style="margin:5px"
                @click="passToDownload = false"
              >
                <v-icon>mdi-arrow-left</v-icon>
                Back</v-btn
              >
            </v-card-text>
          </v-form>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import { youtdlCheck, ytldDownload } from "../api/index";
import { Plugins } from "@capacitor/core";

export default {
  name: "HomePage",
  data() {
    return {
      video: {
        link: "",
        vd_format: null,
        vd_quality: null,
      },
      formData: {
        isValid: false,
        vd_formatRules: [(v) => !!v || "Format is required"],
        vd_qualityRules: [(v) => !!v || "Quality is required"],
      },
      isLoading: false,
      passToDownload: false,
      res: {},
      listFormats: ["mp4", "webm"],
      listQuality: [
        {
          state: "Highest",
          abbr: "highest",
        },
        {
          state: "Howest audio",
          abbr: "lowestaudio",
        },
        {
          state: "Lowest",
          abbr: "lowest",
        },
        {
          state: "Highest audio",
          abbr: "highestaudio",
        },
        {
          state: "Highest video",
          abbr: "highestvideo",
        },
        {
          state: "Lowest video",
          abbr: "lowestvideo",
        },
      ],
    };
  },
  methods: {
    check() {
      this.isLoading = true;
      youtdlCheck(this.video.link).then(
        (res) => {
          this.res = res.data;
          this.isLoading = false;
          this.passToDownload = true;
        },
        () => {
          this.isLoading = false;
          Plugins.Modals.alert({
            title: "Note",
            message: "Youtube link is not Valid",
          });
        }
      );
    },
    download() {
      let valid = this.$refs.formData.validate();
      if (valid)
        window.open(
          ytldDownload(
            this.video.link,
            this.video.vd_format,
            this.video.vd_quality
          )
        );
    },
    setVideoLink(val) {
      this.video.link = val;
      return this;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

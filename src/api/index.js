import axios from "axios";
const api = "https://mydevtools.online";
export function youtdlCheck(video) {
  return axios.get(api + "/api/v1/youtdl/check", { params: { video } });
}
export function ytldDownload(video, vd_format, vd_quality) {
  return `${api}/api/v1/youtdl/?video=${video}&vd_format=${vd_format}&vd_quality=${vd_quality}`;
}

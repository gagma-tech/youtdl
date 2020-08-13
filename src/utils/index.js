import { Plugins } from "@capacitor/core";

export function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName("body")[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}
export function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? "block" : "none";
}

export function startListenShareEvent(callback) {
  // check if any share event first time
  Plugins.SendIntent.checkSendIntentReceived().then(callback);
  // after app is up
  window.addEventListener("sendIntentReceived", () => {
    Plugins.SendIntent.checkSendIntentReceived().then(callback);
  });
}

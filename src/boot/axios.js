import Vue from 'vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

FCM.eventTarget.addEventListener(
    "pushNotificationReceived",
    function (data) {
      console.log(JSON.stringify(data.detail, null, 2));
    },
    false
  );

Vue.use(Vuelidate)

Vue.prototype.$axios = axios

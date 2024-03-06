import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import router from "@/router";
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from "vue-clipboard2";
import  CodeEditor  from "bin-code-editor";
import 'bin-code-editor/lib/styles/index.css'
import * as echarts from 'echarts';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(CodeEditor);



new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$echarts = echarts;
  }
}).$mount('#app')

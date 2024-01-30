import Vue from "vue";
import VueRouter from "vue-router";
import Client from "@/components/main/Client.vue";
import ControlPanel from "@/components/main/panel/ControlPanel.vue";
import MonitorPanel from "@/components/main/panel/MonitorPanel.vue";
import LogPanel from "@/components/main/panel/LogPanel.vue";
import Profile from "@/components/main/Profile.vue";
import ControlView from "@/components/main/panel/control/ControlView.vue";

const push = VueRouter.prototype.push
const replace = VueRouter.prototype.replace

Vue.use(VueRouter)

VueRouter.prototype.push = function (location) {
    return push.call(this,location).catch(err => err)
}

VueRouter.prototype.replace = function (location) {
    return replace.call(this,location).catch(err => err)
}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: 'client',
            path: '/client',
            component: Client,
        },
        {
            name: "controlPanel",
            path: '/controlPanel',
            component: ControlPanel,
            children:[
                {
                    name: 'controlView',
                    path: 'controlView',
                    component: ControlView
                }
            ]
        },
        {
            name: "monitorPanel",
            path: '/monitorPanel',
            component: MonitorPanel,
        },
        {
            name: "logPanel",
            path: '/logPanel',
            component: LogPanel,
        },
        {
            name: "profile",
            path: "/profile",
            component: Profile
        }
    ]
});

// 前置路由
// router.beforeEach((to, from, next) => {
//     console.log('to' , to);
//     console.log('from' , from);
//     next()
// })
//
// // 后置路由
// router.afterEach((to ,from) => {
//     console.log('to' , to);
//     console.log('from' , from);
// })


export default router
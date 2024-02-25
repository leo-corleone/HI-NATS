import Vue from "vue";
import VueRouter from "vue-router";
import Client from "@/components/main/Client.vue";
import ControlPanel from "@/components/main/panel/ControlPanel.vue";
import MonitorPanel from "@/components/main/panel/MonitorPanel.vue";
import LogPanel from "@/components/main/panel/LogPanel.vue";
import Profile from "@/components/main/Profile.vue";

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
export default router
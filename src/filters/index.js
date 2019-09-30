import Vue from "vue"
import moment from "./moment"
import filterImg from "./filterImg"
import formatters from "./formatters"

//注册全局过滤器需要使用 Vue.filter，第一个参数 'moment' 是过滤器名称，
//第二个参数 moment 是一个函数，用来返回一个处理后的值。
// Vue.filter("moment", moment);

const filters = {
    moment,
    filterImg,
    formatters
}

for (const [key, value] of Object.entries(filters)) {
    Vue.filter(key, value)
}
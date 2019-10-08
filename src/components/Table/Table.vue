<template>
    <!--table组件-->
    <div class="text item">
        <el-table :data="tableData"
                  tabeId="table"
                  ref="table"
                  border
                  size="mini"
                  fit
                  highlight-current-row
                  @row-dblclick="rowDblclick"
                  v-loading="loading"
                  :default-sort = "Oder"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.3)"
                  @selection-change="handleChange"
        >
            <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
            <template v-for="(th, key) in tableHeader">
                <slot v-if="th.slot" :name="th.slot"></slot>
                <!--否则显示列数据-->
                <template v-if="sortFiled.includes(th.prop)">
                    <el-table-column
                            :key="key"
                            :prop="th.prop"
                            :label="th.label"
                            :fixed="th.fixed"
                            :min-width="th.minWidth"
                            :show-overflow-tooltip="true"
                            background="oldlace"
                            align="center"
                            sortable
                            :column-key="th.prop"
                    >
                        <template slot-scope="scope">
                            <div v-if="th.operate">
                                <template v-for="(o, key) in th.operate">
                                    <el-button v-if="o.type" :key="key"  :type="o.type" @click="o.clickFun(scope.row)" type="text" size="small">{{o.name}}</el-button>
                                    <el-button v-else :key="key" @click="o.clickFun(scope.row)" type="text" size="small">{{o.name}}</el-button>
                                </template>
                            </div>
                            <div v-else>
                                <template v-if="th.formatTime">
                                    <span v-if="th.clickFun" @click="th.clickFun(scope.row)" :class="th.className">{{ scope.row[th.prop] }}</span>
                                    <span  v-else>{{ scope.row[th.prop] | moment(th.formatTime) }}</span>
                                </template>
                                <template v-else-if="!th.formatData">
                                    <span v-if="th.clickFun" @click="th.clickFun(scope.row)" :class="th.className">{{ scope.row[th.prop] }}</span>
                                    <span  v-else>{{ scope.row[th.prop] || '暂无' }}</span>
                                </template>

                                <span v-else-if="th.filterLabel" v-html="scope.row[th.prop]"></span>
                                <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template v-else-if="th.prop">
                    <el-table-column
                            :key="key"
                            :prop="th.prop"
                            :label="th.label"
                            :fixed="th.fixed"
                            :min-width="th.minWidth"
                            :show-overflow-tooltip="true"
                            background="oldlace"
                            align="center"
                            border
                            column-key=""
                    >
                        <template slot-scope="scope">
                            <div v-if="th.operate">
                                <template v-for="(o, key) in th.operate">
                                    <el-button v-if="o.type" :key="key"  :type="o.type" @click="o.clickFun(scope.row,scope.$index)" type="text" size="small">{{o.name}}</el-button>
                                    <el-button v-else :key="key" @click="o.clickFun(scope.row,scope.$index)" type="text" size="small">{{o.name}}</el-button>
                                </template>
                            </div>
                            <div v-else>
                                <template v-if="th.formatTime">
                                    <span v-if="th.clickFun" @click="th.clickFun(scope.row)" :class="th.className">{{ scope.row[th.prop] }}</span>
                                    <span  v-else>{{ scope.row[th.prop] | moment(th.formatTime) }}</span>
                                </template>
                                <template v-else-if="!th.formatData">
                                    <span v-if="th.clickFun" @click="th.clickFun(scope.row,scope.$index)" :class="th.className">{{ scope.row[th.prop] }}</span>
                                    <span  v-else :class="th.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             className"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                >{{ scope.row[th.prop] || '暂无' }}</span>
                                </template>
                                <!--  <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>-->
                                <span v-else-if="th.filterLabel" v-html="scope.row[th.prop]"></span>
                                <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>


                <!--如果插入列-->
                <slot></slot>
            </template>
        </el-table>
    </div>
</template>

<script>
import Paging from '../Paging/Paging'
import moment from 'moment'
export default {
    name: "Table",
    components: {
        Paging
    },
    props: {
        tableData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        rowDblclick: {
            type: Function,
            default: (row, event, column) => {
                console.log('default: ' + row + '---' + event + '---' + column)
            }
        },
        tableHeader: {
            type: Array,
            default: function () {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        Oder:{
            type: Object,
            default:  function () {
                return {};
            }
        },
        sortFiled: {
            type:Array,
            default:  function () {
                return [];
            }
        },
        handleChange: {
            type: Function,
            default: function () {
                return ;
            }
        },
        selection: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
    },
}
</script>

<style lang="less">

    .el-table th>.cell,.has-gutter tr th{
        color: #000;
        font-size: 15px;
        font-weight: bold;
    }

    .el-table th ,.el-table tr:nth-child(even) {
        background-color: #f0f3f8;
    }

    .el-table td, .el-table th.is-leaf{
        border: none;
    }
    .el-table__row .cell .el-button {
        min-width: 50px !important;
        width: auto !important;
        height: 36px !important;
        border:none!important;
        color: #3a497d;
        font-size: 14px;
        text-decoration: underline;

    }

    tbody .el-table__row,.el-table tr,.el-table td{
        height: 40px !important;
        line-height: 40px !important;
    }
    tbody .el-table__row .cell{
        font-size: 14px !important;
    }


</style>

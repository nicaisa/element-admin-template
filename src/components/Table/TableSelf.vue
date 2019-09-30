<template>
    <section>
        <div style="padding: 30px 0px; box-sizing: border-box">
            <div>
                <el-button @click="handleCreat" style="background: #3a497d;color: #fff;">新建</el-button>
                <el-button @click="batchAdd">批量新增</el-button>
                &ensp;
                <el-select v-model="operateVal" placeholder="..."  class="seleed"  @change="handleOperate(operateVal)">
                    <el-option
                            v-for="item in operateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="sh_info">
                &emsp;<span style="display:inline-block;font-family: Aparajita;font-size: 18px; width: 20px;height: 20px;color: #fff;background-color: #3a497d; border-radius: 50%;text-align: center;">i</span>&emsp;
                <div>已选择<span style="color: #3a497d">{{ checked.length }} </span>项</div>&emsp;
                <div @click="clearCheck" style="color: #3a497d;cursor: pointer">清空</div>&emsp;
                <div>总计{{ tableData.length }}项</div> &emsp;&emsp;
                <template  v-if="tableFilter.length > 0">
                    <div>已选筛选:
                        <template v-for="item in tableFilter">
                              <span v-if="item.value.length > 0"  class="nichen">
                            {{item.label}}：{{item.value.join(',')}}
                            <template v-if="item.length > 1">等{{ item.length }}项</template>
                            &ensp;</span>
                        </template>

                        <!-- <span class="nichen">名称：XXXX&ensp;</span>&emsp;
                         <span class="nichen1">分类品牌口碑...等3项</span>&emsp;
                         <span class="nichen2">类型：标签</span>&emsp;
                         <span class="nichen3">状态：排出等2项</span>-->
                    </div>
                    &emsp;
                    <div @click="clearFilter" style="color: #3a497d;cursor: pointer">重置筛选</div>
                </template>
            </div>
        </div>
        <table class="table"  border="0" cellspacing="0" cellpadding="0">
            <thead class="thead">
            <tr>
                <th v-if="multipleCheck">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAll"></el-checkbox>
                </th>
                <th v-for="item in tableHeader" class="cell">
                    {{ item.label }}
                    <!--过滤-->
                    <i v-if="item.filters">
                        <img :src="filterIcon | filterImg" class="filter-icon" @click="item.selectShow = !item.selectShow">
                        <div class="filter-select" v-if="item.selectShow">
                            <el-select v-model="item.filterData"
                                       filterable multiple
                                       placeholder="请选择"
                                       @change="item.filterHandler(item)"
                                       @blur="item.selectShow =  false">
                                <el-option
                                        v-for="it in item.filters"
                                        :key="it.value"
                                        :label="it.label"
                                        :value="it.value">
                                </el-option>
                            </el-select>
                        </div>
                    </i>
                    <!--排序-->
                    <i v-if="item.sort" class="triangle-box">
                        <div class="triangle-up" @click="item.ascFun(item.prop)"></div>
                        <div class="triangle-line"></div>
                        <div class="triangle-down" @click="item.descFun(item.prop)"></div>
                    </i>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in tableData">
                <td v-if="multipleCheck" align="center" style="padding-left: 24px;box-sizing: border-box">
                    <el-checkbox-group v-model="checked" :key="index" :value="index"  @change="handleChecked">
                        <el-checkbox :label="index">&ensp;</el-checkbox>
                    </el-checkbox-group>
                </td>
                <template  v-for="(it, i) in row">
                    <td v-if = "Object.keys(tableCol).includes(i)">
                        <template v-if="tableHeader[tableCol[i]].formatTime">
                            <span v-if="tableHeader[tableCol[i]].clickFun"
                                  @click="tableHeader[tableCol[i]].clickFun(row)"
                                  :class="tableHeader[tableCol[i]].className">
                                {{ it }}
                            </span>
                            <span  v-else>{{ it | moment(tableHeader[tableCol[i]].formatTime) }}</span>
                        </template>
                        <template v-else-if="!tableHeader[tableCol[i]].formatData">
                            <span v-if="tableHeader[tableCol[i]].clickFun"
                                  @click="tableHeader[tableCol[i]].clickFun(row, index)"
                                  :class="tableHeader[tableCol[i]].className">
                                {{it}}
                            </span>
                            <span v-else>{{ it || '暂无' }}</span>
                        </template>
                      <span v-else :class="tableHeader[tableCol[i]].className instanceof Array ? tableHeader[tableCol[i]].className[it] : tableHeader[tableCol[i]].className">{{ it | formatters(tableHeader[tableCol[i]].formatData) }}</span>
                    </td>
                </template>
                <td v-if="tableHeader[tableHeader.length - 1].operate">
                    <template v-for="operate in tableHeader[tableHeader.length - 1].operate" >
                        <span @click="operate.clickFun(row, index)" style="display: inline-block; margin: 8px;color: #3a497d;cursor: pointer;">{{ operate.name }}</span>
                    </template>
                </td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        name: "TableSelf",
        props: {
            tableData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            tableHeader: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            tableCol: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            multipleCheck: {
                type: Boolean,
                default: false
            },
            checkedAllIndex: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            checkAllId: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            operateOptions: {
               type: Array,
                default: function () {
                    return [];
                }
            },
            operateVal: {
                type: String,
                default: ''
            },
            tableFilter: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                filterIcon: 'filter.png',
                checked: [], // 选择id
                checkedAll: false,
                isIndeterminate: false,
            }
        },
        methods: {
            // 全选
            handleCheckAll(val) {
                this.checked = val ? this.checkedAllIndex : [];
                this.isIndeterminate = false;

            },
            // 清空check
            clearCheck(){
                this.checked = [];
                this.checkedAll = false;
            },
            // 选择(单选)
            handleChecked(value) {
                let checkedCount = value.length;
                this.checkedAll = checkedCount === this.checkedAllIndex.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedAllIndex.length;
            },
            // 批量新增
            batchAdd() {
               // this.$emit("batchAdd")
                this.$parent.batchAdd()
            },
            // 新增
            handleCreat() {
                // this.$emit("handleCreat")
                this.$parent.handleCreat()
            },
            // 操作
            handleOperate(val) {
                // this.$emit("handleOperate", val)
                this.$parent.handleOperate(val)
            },
            // 清空筛选条件
            clearFilter() {
                this.$emit("clearFilter")
            }
        }
    }
</script>

<style lang="scss">
    $triangle-color: #3a497d;
    $triangle-width: 5px;
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #3a497d !important;
        border-color: #3a497d !important;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner{
        border-color: #3a497d;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color: #3a497d;

    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
        color: #3a497d;
        background-color: #FFF;
    }


     .el-select-dropdown__item.selected {
         color: #3a497d;
         font-weight: 700;
     }
    .el-select__input{
        background: #fff;
    }
    .table {
        width: 100%;
        .thead {
            color: #000;
            font-size: 15px;
            font-weight: bold;
            .cell {
                width: max-content;
                word-wrap: normal;
                text-overflow: ellipsis;
                vertical-align: middle;
                padding: 10px;
            }
        }
        th, tr {
            background-color: #FFF;
        }
        th, tr:nth-child(even) {
            background-color: #f0f3f8;
        }
        tbody .row,  tr, td {
            height: 40px !important;
            line-height: 40px !important;
            position: relative;
            padding: 10px;
            text-align: center;
        }
        .filter-icon {
            width: 10px;
            vertical-align: middle;
            cursor: pointer;
        }
        .triangle-box {
            display: inline-block;
        }
        .triangle-up {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 $triangle-width $triangle-width $triangle-width;
            border-color: transparent transparent $triangle-color transparent;
            cursor: pointer;
        }
        .triangle-down {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: $triangle-width $triangle-width 0 $triangle-width;
            border-color:  $triangle-color transparent transparent transparent;
            cursor: pointer;
        }
        .triangle-line {
            height: 2px;
        }
        .filter-select {
            position: absolute;
        }
        .sh_info {
            width: 100%;
            height: 40px;
            margin-top: 20px;
            border: 1px solid #00ffff;
            border-radius: 6px;
            background: rgba(0, 235, 235, 0.1);
            display: flex;
            font-size: 14px;
            color: #757575;
            align-items: center;
            .nichen {
                border: 1px solid #7fc9ff;
                padding: 6px 8px;
                border-radius: 4px;
                color: #12b5f0;
            }
            .nichen1 {
                border: 1px solid #ffaebe;
                padding: 6px 8px;
                border-radius: 4px;
                background: rgba(255, 76, 74, 0.1);
                color: #ff4c4a;
            }
            .nichen2 {
                border: 1px solid #aeffaa;
                padding: 6px 8px;
                border-radius: 4px;
                color: #15f01a;
                background: rgba(56, 255, 17, 0.1);
            }
            .nichen3 {
                border: 1px solid #ffcd98;
                padding: 6px 8px;
                border-radius: 4px;
                color: #f0b200;
                background: rgba(240, 203, 32, 0.1);
            }

        }
    }
</style>

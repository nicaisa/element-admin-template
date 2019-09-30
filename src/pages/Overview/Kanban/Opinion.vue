<template>
    <article>
        全部舆情
       <!-- <Table :tableData="data" :tableHeader="tableHeader" >
            <template slot="slot">
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope" class="btn" >
                        {{scope.url}}
                      &lt;!&ndash;  <img :src="scope.url | filterImg" alt="">&ndash;&gt;
                       &lt;!&ndash; <el-button v-if="scope.row.exa_status !== 2"  type="text" @click="applyOperate(1, scope.row)">查看申请</el-button>
                        <el-button v-if="scope.row.exa_status !== 0"  type="text" @click="applyOperate(3, scope.row)">删除申请</el-button>
                        <el-button v-if="scope.row.exa_status === 0"  type="text" @click="applyOperate(2, scope.row)">再次提交</el-button>&ndash;&gt;
                    </template>
                </el-table-column>
            </template>
        </Table>-->
    </article>
</template>

<script>
    /*全部舆情*/
    import Table from "@/components/Table/Table"
    export default {
        name: "Overview",
        data() {
            return {
                data: [
                    {exa_time: 1111111111,url: 'logo.png' }
                ],
                tableHeader: [
                    { prop: 'exa_time', label: '审核时间',  minWidth: 100 },
                    { slot: 'slot' }
                ],
            }
        }
    }
</script>

<style scoped>

</style>

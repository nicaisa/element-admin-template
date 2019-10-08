<template>
    <article>
        全部舆情
        <Table :tableData="data" :tableHeader="tableHeader" >
            <template slot="slot">
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope" class="btn" >
                        <img :src="scope.row.url | filterImg" alt="">
                    </template>
                </el-table-column>
            </template>
        </Table>
    </article>
</template>

<script>
    /*全部舆情*/
    import Table from "@/components/Table/Table"
    export default {
        name: "Overview",
        components: {
            Table
        },
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

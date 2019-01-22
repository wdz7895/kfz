<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            prop="admin_tx"
            label="管理员头像"
            width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.admin_tx"/>
                </template>
            </el-table-column>
            <el-table-column
            prop="admin_name"
            label="管理员名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="admin_jsName"
            label="管理员角色">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            :background="true"
            :page-size="5"
            :total="count"
            :pager-count="9"
            @current-change="getData"
            >
        </el-pagination>    
    </div>
</template>
<script>
export default {
    name:"adminList",
    data(){
        return{
            tableData:[],
            count:0
        }
    },
    methods:{
        getData(value){
            this.$http.getAdminList({
                skip:(value-1)*5,
                limit:5
            }).then(res=>{
                this.count = res.data.count
                this.tableData = res.data.data
            })
        }
    },
    mounted(){
        this.$http.getAdminList({
            skip:0,
            limit:5
        }).then(res=>{
            this.count = res.data.count
            this.tableData = res.data.data
        })
    }
}
</script>

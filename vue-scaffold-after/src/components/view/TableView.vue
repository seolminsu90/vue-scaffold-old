<template>
    <div class="card m-2">
        <div class="card-header">
            테이블 관련 모음
        </div>
        <div class="card-body">
            <PaginationTable :rows="rows" :heads="heads" />
            <PaginationTable :rows="rows" :heads="heads" :isVertical="true"/>
            <TablePart :rows="rows" :heads="heads"></TablePart>
            <TablePart :row="rows[0]" :heads="heads"></TablePart>
        </div>
    </div>
</template>
<script>
export default {
    name: "TableView",
    data() {
        return {
            rows: [],
            heads: {
                age: {
                    rowClass(row){
                        if(row.age < 10) return ['text-info']
                        else if(row.age < 20) return ['text-warning']
                        else return ['text-danger']
                    }
                }
            }
        };
    },
    mounted() {
        let tmp = []
        for (let i = 0; i < 35; i++) {
            tmp.push({ "name": "Babo" + i, "value": i, "age": i, "power": i*i });
        }
        this.rows = tmp
    }
}
</script>
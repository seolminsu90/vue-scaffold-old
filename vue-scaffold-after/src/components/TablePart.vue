<template>
    <section class="dynamicTable" :class="{ small: small }">
        <table class="table table-sm table-bordered" style="table-layout: fixed">
            <caption>
                <template v-if="title !== ''">{{ title }}</template>
                <div class="col-sm-10 position-relative p-0">
                    <button v-if="excel" type="button" class="float-end btn btn-sm btn-success ms-2">Excel</button>
                </div>
            </caption>
            <thead v-if="!isVertical">
                <tr>
                    <th scope="col" v-for="[k, v] in heads_" v-show="v.disable !== true" :key="k" :class="v.class">
                        <template v-if="v.headText !== undefined">
                            <template v-if="typeof (v.headText) === 'function'">
                                {{ v.headText(k) }}
                            </template>
                            <template v-else>
                                {{ v.headText }}
                            </template>
                        </template>
                        <template v-else>{{ k }}</template>
                    </th>
                </tr>
            </thead>
            <tbody v-if="!isVertical">
                <tr v-for="(row, index) in this.rows_" :key="index">
                    <td scope="row" v-show="v.disable !== true" v-for="[k, v] in heads_" :key="k"
                        :class="[ typeof v.rowClass === 'function'? v.rowClass(row) : v.rowClass ]">
                        <template v-if="v.rowText !== undefined">
                            <template v-if="typeof (v.rowText) === 'function'">
                                {{ v.rowText(row) }}
                            </template>
                            <template v-else>
                                {{ v.rowText }}
                            </template>
                        </template>
                        <template v-else>
                            {{ row[k] }}
                        </template>

                        <template v-if="v.button !== undefined && v.button.click !== undefined &&
                        (v.button.active === undefined || v.button.active(row) === true)">
                            <button :disabled="v.button.disabled !== undefined && v.button.disabled(row) === true"
                                class="btn" type="button" @click="v.button.click(rows_[index])" :class="v.button.class">
                                {{ v.button.btnText }}
                            </button>
                        </template>
                        <template v-else-if="v.buttons !== undefined && v.buttons.length > 0">
                            <template v-for="(btn, idx) in v.buttons" :key="idx">
                                <template v-if="btn !== undefined && btn.click !== undefined &&
                                (btn.active === undefined || btn.active(row) === true)">
                                    <button :disabled="btn.disabled !== undefined && btn.disabled(row) === true"
                                        class="btn" type="button" @click="btn.click(rows_[index])" :class="btn.class"
                                        style="margin-left:5px">
                                        {{ btn.btnText }}
                                    </button>
                                </template>
                            </template>
                        </template>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="isVertical">
                <tr v-for="[k, v] in heads_" v-show="v.disable !== true" :key="k">
                    <th scope="col" :class="v.class">
                        <template v-if="v.headText !== undefined">
                            <template v-if="typeof (v.headText) === 'function'">
                                {{ v.headText(k) }}
                            </template>
                            <template v-else>
                                {{ v.headText }}
                            </template>
                        </template>
                        <template v-else>{{ k }}</template>
                    </th>
                    <td scope="col" v-show="v.disable !== true" v-for="(row, index) in rows_" :key="index"
                        :class="[ typeof v.rowClass === 'function'? v.rowClass(row) : v.rowClass ]">
                        <template v-if="v.rowText !== undefined">
                            <template v-if="typeof (v.rowText) === 'function'">
                                {{ v.rowText(row) }}
                            </template>
                            <template v-else>
                                {{ v.rowText }}
                            </template>
                        </template>
                        <template v-else>
                            {{ row[k] }}
                        </template>

                        <template v-if="v.button !== undefined && v.button.click !== undefined &&
                        (v.button.active === undefined || v.button.active(row) === true)">
                            <button :disabled="v.button.disabled !== undefined && v.button.disabled(row) === true"
                                class="btn" type="button" @click="v.button.click(row, index)" :class="v.button.class">
                                {{ v.button.btnText }}
                            </button>
                        </template>
                        <template v-else-if="v.buttons !== undefined && v.buttons.length > 0">
                            <template v-for="(btn, idx) in v.buttons" :key="idx">
                                <template v-if="btn !== undefined && btn.click !== undefined &&
                                (btn.active === undefined || btn.active(row) === true)">
                                    <button :disabled="btn.disabled !== undefined && btn.disabled(row) === true"
                                        class="btn" type="button" @click="btn.click(row, index)" :class="btn.class"
                                        style="margin-left:5px">
                                        {{ btn.btnText }}
                                    </button>
                                </template>
                            </template>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <slot name="pagination"></slot>
        <div v-if="searchFunc !== undefined" class="absolute-bottom-right-scroll col-sm-2">
            <div class="searchInput input-group rounded">
                <input v-model="data" type="search" class="form-control rounded" placeholder="Search"
                    @keyup.enter="search" />
                <span class="input-group-text border-0" style="cursor:pointer" @click="search">
                    <i class="fas fa-search"></i>
                </span>
            </div>
        </div>

    </section>
</template>
  
<script>
export default {
    name: 'TablePart',
    props: {
        excel: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        row: {
            type: Object
        },
        rows: {
            type: Array,
            default: () => { return [] }
        },
        heads: {
            type: Object,
            default: () => { return {} }
        },
        small: {
            type: Boolean,
            default: false
        },
        searchFunc: {
            type: Function
        }
    },
    data() {
        return {
            rows_: [],
            heads_: {},
            data: '',
            isVertical: false
        };
    },
    watch: {
        row: function () {
            this.reload()
        },
        rows: function () {
            this.reload()
        }
    },
    mounted() {
        this.reload()
    },
    methods: {
        search() {
            this.searchFunc(this.data)
        },
        reload() {
            let tmpRows = this.rows
            if (tmpRows == undefined || tmpRows.length == 0) {
                if (this.row != undefined) {
                    this.isVertical = true
                    tmpRows.push(this.row)
                } else {
                    this.heads_ = {}
                    this.rows_ = []
                    return
                }
            }

            let keys = Object.keys(tmpRows[0])
            let temp = this.heads


            for (let i = 0; i < keys.length; i++) {
                if (temp[keys[i]] === undefined) {
                    temp[keys[i]] = {}
                }
            }

            let sortTemp = Object.entries(temp)

            sortTemp.sort((a, b) => {
                let aVal = a[1]
                let bVal = b[1]
                let aOrder = (aVal.order == undefined) ? 0 : aVal.order
                let bOrder = (bVal.order == undefined) ? 0 : bVal.order
                return aOrder - bOrder
            })

            this.heads_ = sortTemp === undefined ? {} : sortTemp
            this.rows_ = tmpRows
        }
    }
}
</script>
  
<style scoped>
.dynamicTable {
    position: relative;
    overflow-x: auto;
}

.dynamicTable th {
    background-color: #f3f7ff
}

.dynamicTable.small {
    font-size: 0.75rem;
}

.table tbody td:hover {
    background-color: #dbf0ff;
}

caption {
    caption-side: top;
    font-size: 1rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
}

caption .row {
    margin: 0;
    line-height: 2rem;
}
</style>
  
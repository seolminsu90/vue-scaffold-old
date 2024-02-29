<template>
  <section class="dynamicTable" :class="{ small: small }">
    <table class="table table-sm table-bordered" style="table-layout: fixed">
      <caption class="mb-1">
        <div class="row">
          <span class="col-sm-2 align-middle p-0">{{ title }}</span>
          <div class="col-sm-10 position-relative p-0">
            <button v-if="excel" type="button" class="float-end btn btn-sm btn-success ms-2">Excel</button>
            <button v-if="filter" type="button" class="float-end btn btn-sm btn-info ms-2"
              @click="filterShow">Filter</button>
          </div>
        </div>
      </caption>
      <thead v-if="!isVertical">
        <tr>
          <th scope="col" v-for="[k, v] in cheads" v-show="v.disable !== true" :key="k" :class="v.class">
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
        <tr v-for="(row, index) in rowsComputed" :key="index">
          <td scope="row" v-show="v.disable !== true" v-for="[k, v] in cheads" :key="k"
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
              <button :disabled="v.button.disabled !== undefined && v.button.disabled(row) === true" class="btn"
                type="button" @click="v.button.click(row, index)" :class="v.button.class">
                {{ v.button.btnText }}
              </button>
            </template>
            <template v-else-if="v.buttons !== undefined && v.buttons.length > 0">
              <template v-for="(btn, idx) in v.buttons" :key="idx">
                <template v-if="btn !== undefined && btn.click !== undefined &&
                (btn.active === undefined || btn.active(row) === true)">
                  <button :disabled="btn.disabled !== undefined && btn.disabled(row) === true" class="btn" type="button"
                    @click="btn.click(row, index)" :class="btn.class" style="margin-left:5px">
                    {{ btn.btnText }}
                  </button>
                </template>
              </template>
            </template>
          </td>
        </tr>
      </tbody>
      <tbody v-if="isVertical">
        <tr v-for="[k, v] in cheads" v-show="v.disable !== true" :key="k">
          <th scope="col" class="col-sm-1" :class="v.class">
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
          <td scope="col" v-show="v.disable !== true" v-for="(row, index) in rowsComputed" :key="index"
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
              <button :disabled="v.button.disabled !== undefined && v.button.disabled(row) === true" class="btn"
                type="button" @click="v.button.click(row, index)" :class="v.button.class">
                {{ v.button.btnText }}
              </button>
            </template>
            <template v-else-if="v.buttons !== undefined && v.buttons.length > 0">
              <template v-for="(btn, idx) in v.buttons" :key="idx">
                <template v-if="btn !== undefined && btn.click !== undefined &&
                (btn.active === undefined || btn.active(row) === true)">
                  <button :disabled="btn.disabled !== undefined && btn.disabled(row) === true" class="btn" type="button"
                    @click="btn.click(row, index)" :class="btn.class" style="margin-left:5px">
                    {{ btn.btnText }}
                  </button>
                </template>
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationPart :pageMoveEventFunc="pageMove" :page="page.page" :totalCnt="page.totalCnt" :pageGroupSize="5"
      :articleSize="page.size" />

    <PopUp ref="filterPop" :title="'필터'" :ok="filterSet" :okTitle="'적용'">
      <div class="filter-wrap row p-2">
        <div class="row mt-1" v-for="[k, v] in cheads" v-show="v.disable !== true" :key="k">
          <div class="col-sm-5">
            <label class="col-form-label form-control-sm" style="font-size:.7rem;word-break: break-all;">
              <template v-if="v.headText !== undefined">
                <template v-if="typeof (v.headText) === 'function'">
                  {{ v.headText(k) }}
                </template>
                <template v-else>
                  {{ v.headText }}
                </template>
              </template>
              <template v-else>{{ k }}</template>
            </label>
          </div>
          <div class="col-sm-7">
            <input type="text" class="form-control form-control-sm" v-model="v.filtered" placeholder="일치">
          </div>
        </div>
      </div>
    </PopUp>
  </section>
</template>

<script>
export default {
  name: "PaginationTable",
  props: {
    title: {
      type: String,
      default: ""
    },
    rows: {
      type: Array
    },
    heads: {
      type: Object,
      default: () => { return {} }
    },
    small: {
      type: Boolean,
      default: false
    },
    excel: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cheads: {},
      data: "",
      dataFilter: {},
      page: {},
      pageInit: {
        page: 1,
        totalCnt: 0,
        saveCnt: 0,
        size: 10
      }
    }
  },
  watch: {
    rows: function () {
      this.reload();
    }
  },
  mounted() {
    this.reload();
  },
  computed: {
    rowsComputed() {
      return this.sliceRow(this.rows, {
        filter: this.dataFilter,
        page: this.page
      });
    }
  },
  methods: {
    sliceRow: (rows, conf) => {
      if (conf === undefined || conf === {})
        return rows;
      let rows_ = rows;
      if (conf.filter !== undefined) {
        rows_ = rows.filter(row => {
          let bool = true;
          for (let [key, value] of Object.entries(conf.filter)) {
            bool = bool && row[key] == value;
          }
          return bool;
        });
      }
      if (conf.page !== undefined) {
        if (conf.filter === undefined) {
          conf.page.totalCnt = conf.page.saveCnt;
        }
        else {
          conf.page.totalCnt = rows_.length;
        }
        return rows_.slice((conf.page.page - 1) * conf.page.size, conf.page.page * conf.page.size);
      }
    },
    pageMove(page, totalCnt) {
      this.page.page = page;
      if (totalCnt !== undefined) {
        this.page.saveCnt = totalCnt;
        this.page.totalCnt = totalCnt;
      }
    },
    filterShow() {
      this.$refs.filterPop.show();
    },
    filterSet() {
      this.page.page = 1;
      let filterMap = {};
      Object.entries(this.cheads).forEach(([, v]) => {
        if (v[1].filtered !== undefined && v[1].filtered !== "") {
          filterMap[v[0]] = v[1].filtered;
        }
      });
      this.dataFilter = filterMap;
    },
    reload() {
      if (this.rows === undefined || this.rows.length === 0) {
        return;
      }

      let keys = Object.keys(this.rows[0]);
      let temp = _.cloneDeep(this.heads);
      this.page = _.cloneDeep(this.pageInit);
      this.page.saveCnt = this.rows.length;

      for (let i = 0; i < keys.length; i++) {
        if (temp[keys[i]] === undefined) {
          temp[keys[i]] = {};
        }
      }

      let sortTemp = Object.entries(temp);
      sortTemp.sort((a, b) => {
        let aVal = a[1];
        let bVal = b[1];
        let aOrder = (aVal.order == undefined) ? 0 : aVal.order;
        let bOrder = (bVal.order == undefined) ? 0 : bVal.order;
        return aOrder - bOrder;
      });

      this.cheads = sortTemp;
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

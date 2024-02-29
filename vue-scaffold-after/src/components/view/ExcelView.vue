<template>
  <div class="card m-2">
    <div class="card-header">
      Json을 Excel로 변환하거나 Excel을 Json으로 변환하는 기능
    </div>

    <div class="card-body">
      <button type="button" class="btn btn-info me-1" @click="exportExcel">Json To Excel</button>
      <button type="button" class="btn btn-danger" @click="importExcel">Excel To Json</button>
      <input v-show="false" type="file" id="excelUpload" ref="excelInput" @change="changedExcelInput"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
    </div>

    <div class="card-item">
      <PaginationTable 
        :rows="items"
        :excel="true"
        :filter="true"
        :small="true"
      ></PaginationTable>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
export default {
  name: "ExcelScaffold",
  methods: {
    importExcel() {
      this.$refs.excelInput.click()
    },
    changedExcelInput(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result;  // let data = e.target.result;
        let sheetsArr = [];
        let workbook = XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach(sheetName => {
          sheetsArr.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
        });
        if (sheetsArr.length > 0) {
          this.items = sheetsArr[0];
        }
      };
      reader.readAsBinaryString(file);
    },
    exportExcel() {
      let myFile = "myFile.xlsx";
      let myWorkSheet = XLSX.utils.json_to_sheet(this.jsonList);
      let myWorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
      XLSX.writeFile(myWorkBook, myFile);
    }
  },
  data() {
    return {
      items: [],
      jsonList: [
        { name: "Moran", role: "back" },
        { name: "Alain", role: "front" },
        { name: "Tony", role: "back" },
        { name: "Mike", role: "back" },
        { name: "Abo", role: "back" },
        { name: "Toni", role: "back" }
      ]
    };
  }
}
</script>


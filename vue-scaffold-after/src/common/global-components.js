// 전역 컴포넌트 설정 파일
import PaginationTable from '@/components/PaginationTable.vue'
import PaginationPart from '@/components/PaginationPart.vue'
import TablePart from '@/components/TablePart.vue'
import PopUp from '@/components/PopUp.vue'

export const componentRegist = (app) => {
    app
        .component('PaginationTable', PaginationTable)
        .component('PaginationPart', PaginationPart)
        .component('TablePart', TablePart)
        .component('PopUp', PopUp)
}
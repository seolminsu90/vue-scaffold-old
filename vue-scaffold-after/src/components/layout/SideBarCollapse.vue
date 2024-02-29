
<template>


    <div :id="getGroupId"
        :class="{ 'collapse': menuParent !== undefined, ['collapse' + menuName]: menuName !== undefined, 'show': menuShow }"
        class="list-group list-group-flush" :data-bs-parent="'#' + dataBsParent">

        <template v-for="(menu, idx) in menus" :key="idx">

            <div v-if="menu.menuHide == undefined && (menu.auth == undefined || checkRole(menu.auth))"
                class="list-group-item text-light" :id="[menu.name]"
                :class="{ active: menu.active, ['list-group-bg' + depth]: true }"
                @click.prevent.stop="menuFunction(menu)">
                <div :aria-controls="menu.children !== undefined ? 'collapse' + menu.name : ''"
                    :data-bs-target="menu.children !== undefined ? '.collapse' + menu.name : ''"
                    :data-bs-toggle="menu.children !== undefined ? 'collapse' : ''">
                    <i class="nav-icon fas" :class="[menu.icon]"></i> {{
                    menu.displayName === undefined? menu.name : menu.displayName
                    }}
                    <i v-if="menu.children !== undefined" class="fas fa-angle-down rotate-icon"></i>
                </div>

                <template v-if="menu.children !== undefined">
                    <SideBarCollapse :depth="depth+1" :menus="menu.children" :menuFunction="menuFunction"
                        :menuName="menu.name" :menuShow="menu.show" :dataBsParent="getGroupId"
                        :menuParent="'menuGroup' + menu.name" />
                </template>
            </div>

        </template>

    </div>

</template>

<script>
export default {
    name: 'SideBarCollapse',
    components: {
        SideBarCollapse: this
    },
    computed: {
        getGroupId() {
            return this.menuParent === undefined ? 'menuGroupRoot' : this.menuParent
        }
    },
    methods: {
        checkRole(role) {
            if (this.roles.length === 0) return false
            return this.roles.includes(role)
        }
    },
    mounted(){
        console.log("HasRole : " + this.roles)
    },
    props: {
        roles: {
            type: Array,
            default: () => []
        },
        depth: {
            type: Number,
            default: 0
        },
        menus: {
            type: Array,
            require: true
        },
        menuFunction: {
            type: Function,
            require: true
        },
        menuParent: {
            type: String,
            require: false
        },
        menuShow: {
            type: Boolean,
            default: false
        },
        menuName: {
            type: String,
            require: false
        },
        dataBsParent: {
            type: String,
            require: false
        }
    }
}
</script>
<style scoped>
#sidebar-wrapper .list-group {
    width: 100%;
}

.list-group-item {
    padding: 0;
    font-weight: bold;
    border: none;
    position: relative;
    font-size: 0.8rem;
    line-height: 2rem;
    background-color: rgba(255, 255, 255, 0) !important;
}

.list-group-item>div[aria-controls]:hover {
    color: rgb(143, 229, 255);
}

.list-group-item>div[aria-controls]>i:nth-child(1) {
    width: 1.5rem;
}

.list-group-item.active,
.list-group-item.active>div[aria-controls]:hover {
    color: rgb(0, 195, 255) !important;
}

.collapsing.collapse-horizontal {
    transition: width .5s ease;
}

.list-group-item .fa-angle-down {
    position: absolute;
    right: 5px;
    top: 0px;
    line-height: 2rem;
}

.list-group-item .list-group-item {
    padding-left: 0.7rem;
}
</style>
<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile" v-show="false">
                <span>기타 여기에 추가정보 필요시. 사용할 공간</span>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </li>
            <li class="nav-item" :class="{active: state.routeNameComputed == 'dashboard' || state.routeNameComputed == ''}">
                <router-link to="/" class="nav-link">
                    <span class="menu-title">대시보드</span>
                    <i class="mdi mdi-home menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="menu-title">차트</span>
                    <i class="mdi mdi-chart-bar menu-icon"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                    aria-controls="ui-basic">
                    <span class="menu-title">서브메뉴</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-crosshairs-gps menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <router-link to="/button-sample" class="nav-link">Buttons</router-link></li>
                        <li class="nav-item"> <router-link to="/text-sample" class="nav-link">Typography</router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item" :class="{active: state.routeNameComputed == 'form-sample'}">
                <router-link to="/form-sample" class="nav-link">
                    <span class="menu-title">폼예시</span>
                    <i class="mdi mdi-format-list-bulleted menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item" :class="{active: state.routeNameComputed == 'table-sample'}">
                <router-link to="/table-sample" class="nav-link">
                    <span class="menu-title">테이블</span>
                    <i class="mdi mdi-table-large menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://www.bootstrapdash.com/demo/purple-admin-free/pages/icons/mdi.html"
                    target="_blank">
                    <span class="menu-title">아이콘 등 참조레퍼런스</span>
                    <i class="mdi mdi-contacts menu-icon"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script setup>

import { computed, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
    routeName: '',
    routeNameComputed: computed(() => state.routeName)
})

watch(() => route.name, (name) => state.routeName = name)

</script>
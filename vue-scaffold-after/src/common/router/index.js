import { createRouter, createWebHistory } from 'vue-router'

// * Tips
// 1. 무거운 페이지나 View의 경우 /* webpackChunkName: "Scaffold" */ 와 같이 주면
//    빌드 시점에서 Chunk Name 단위로 리소스가 분리되어 라우트 진입시에 로드되게 된다.
// 2. fullpath, menuHide, icon, auth, displayName는 sidemenu에서 쓰려고 추가한 값(router엔 쓸모 없음)
//    path, name, component, children은 router의 원래 속성들임

const routes = [
    {
        path: '/',
        name: 'home',
        icon: 'fa-bank',
        menuHide: true,
        component: () => import(/* webpackChunkName: "Home" */ '@/components/page/HomePage.vue'),
        children: [
            {
                path: '',
                name: 'main',
                menuHide: true,
                component: () => import('@/components/view/MainView.vue'),
            },
            {
                path: 'scaffold',
                fullpath: '/scaffold',
                name: 'scaffold',
                displayName: '스캐폴드 모음',
                icon: 'fa-bell',
                auth: 'USER',
                children: [
                    {
                        path: 'util',
                        fullpath: '/scaffold/util',
                        name: 'util',
                        displayName: '기능성',
                        icon: 'fa-bug',
                        children: [
                            {
                                path: 'table',
                                fullpath: '/scaffold/util/table',
                                name: 'table',
                                displayName: '테이블',
                                icon: 'fa-table',
                                component: () => import('@/components/view/TableView.vue')
                            },
                            {
                                path: 'i18n',
                                fullpath: '/scaffold/util/i18n',
                                name: 'i18n',
                                displayName: '다국어화',
                                icon: 'fa-eye',
                                component: () => import('@/components/view/I18nView.vue')
                            },
                            {
                                path: 'excel',
                                fullpath: '/scaffold/util/excel',
                                name: 'excel',
                                displayName: '엑셀관리',
                                icon: 'fa-bolt',
                                component: () => import('@/components/view/ExcelView.vue')
                            },
                            {
                                path: 'axios',
                                fullpath: '/scaffold/util/axios',
                                name: 'axios',
                                displayName: 'AJAX 처리',
                                icon: 'fa-beer',
                                component: () => import('@/components/view/AxiosView.vue')
                            },
                            {
                                path: 'loadcontent',
                                fullpath: '/scaffold/util/loadcontent',
                                name: 'loadcontent',
                                displayName: '로딩관련',
                                icon: 'fa-bomb',
                                component: () => import('@/components/view/LoadView.vue')
                            },
                            {
                                path: 'login',
                                fullpath: '/scaffold/util/login',
                                name: 'login',
                                displayName: '로그인',
                                icon: 'fa-bug',
                                component: () => import('@/components/view/OauthView.vue')
                            },
                            {
                                path: 'notification',
                                fullpath: '/scaffold/util/notification',
                                name: 'notification',
                                displayName: '알림',
                                icon: 'fa-bell',
                                component: () => import('@/components/view/NotificationView.vue')
                            }
                        ]
                    },
                    {
                        path: 'depth-example',
                        fullpath: '/scaffold/depth-example',
                        name: 'depth-example',
                        displayName: '메뉴뎁스',
                        icon: 'fa-blind',
                        children: [
                            {
                                path: 'depth-example2',
                                fullpath: '/scaffold/depth-example/depth-example2',
                                name: 'page1',
                                displayName: '뎁스2페이지1',
                                icon: 'fa-ban',
                                children: [
                                    {
                                        path: 'depth-example2-page1',
                                        fullpath: '/scaffold/depth-example/depth-example2/depth-example2-page1',
                                        name: 'page1-1',
                                        displayName: '뎁스3페이지1',
                                        icon: 'fa-book',
                                        component: () => import('@/components/view/TestView.vue')
                                    },
                                    {
                                        path: 'depth-example2-page2',
                                        fullpath: '/scaffold/depth-example/depth-example2/depth-example2-page2',
                                        name: 'page1-2',
                                        displayName: '뎁스3페이지2',
                                        icon: 'fa-car',
                                        component: () => import('@/components/view/TestView.vue')
                                    }
                                ]
                            },
                            {
                                path: 'depth-example-page',
                                fullpath: '/scaffold/depth-example/depth-example-page',
                                name: 'page2',
                                displayName: '뎁스2페이지2',
                                icon: 'fa-download',
                                component: () => import('@/components/view/TestView.vue')
                            }
                        ]
                    },
                    {
                        path: 'depth-page',
                        fullpath: '/scaffold/depth-page',
                        name: 'depth-page',
                        displayName: '뎁스2페이지',
                        icon: 'fa-blind',
                        component: () => import('@/components/view/TestView.vue')
                    }
                ]
            },
            {
                path: 'admin',
                fullpath: '/admin',
                name: 'admin',
                icon: 'fa-heart',
                auth: 'ADMIN',
                children: [
                    {
                        path: 'log',
                        fullpath: '/admin/log',
                        name: 'log',
                        icon: 'fa-heart',
                        component: () => import(/* webpackChunkName: "Log" */ '@/components/view/TestView.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/oauth/redirect',
        name: 'redirect',
        component: () => import(/* webpackChunkName: "Rediect" */ '@/components/page/RedirectPage.vue')
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 로그인, 권한 등등 처리
router.beforeEach((to, from, next) => {
    console.log("Guard")
    //if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    //else next()
    next()
})

export { router, routes }

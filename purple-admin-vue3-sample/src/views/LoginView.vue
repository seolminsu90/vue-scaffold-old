<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row flex-grow">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                                <h1 class="h2 fw-bold text-identity"><i class="mdi mdi-chart-bubble title-icon"></i><span
                                        class="title-text ms-2">Dashboard</span></h1>
                            </div>
                            <h4>대시보드 로그인 샘플 메시지</h4>
                            <h6 class="font-weight-light">로그인을 하세요.</h6>
                            <form class="pt-3">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                                        placeholder="Username">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" id="exampleInputPassword1"
                                        placeholder="Password">
                                </div>
                                <div class="mt-3">
                                    <router-link to="/"
                                        class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">LOGIN
                                    </router-link>
                                </div>
                                <div class="text-center mt-4 font-weight-light"> Don't have an account? <a
                                        href="register.html" class="text-primary">계정생성</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
<script setup>

</script>
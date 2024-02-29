<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <div>
            <a href="index3.html" class="brand-link">
                <span class="h1 brand-text font-weight-light">DATA TOOL</span>
            </a>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="h5 nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link active">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Starter Pages
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <p @click="navigate('/about')" class="nav-link active">
                                    <i class="far fa-circle nav-icon"></i>
                                    <span>About Page</span>
                                </p>
                            </li>
                            <li class="nav-item">
                                <p @click="navigate('/')" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <span>Home Page</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" @click="navigate('/about')">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                About
                                <span class="right badge badge-danger">Go</span>
                            </p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Simple Link
                                <span class="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    name: 'SideBar',
    components: {
    }
}
</script>
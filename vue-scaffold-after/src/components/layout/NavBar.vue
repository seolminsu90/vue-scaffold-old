<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <span :data-bs-target="'.collapseSidebar'" data-bs-toggle="collapse" style="cursor:pointer"> <i
        class="fa-solid fa-bars text-light" style="font-size:1.7rem"></i> </span>

    <div class="collapse navbar-collapse" id="navbar-collapse-wrap">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div id="nav-write-wrap" class="d-flex">
        <span class="text-white">Hello world !!</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
  },
  methods: {
  }
}
</script>

<style scoped>
#nav-write-wrap,
.navbar {
  padding: 0 5px;
  font-size: 14px;
}

#navbar-collapse-wrap {
  padding: 0 20px
}
</style>

<template>
  <div>
    <NavBar/>
    <div class="container mt-2">
      <router-view/>
    </div>
  </div>
</template>
<script>
import NavBar from "@/core/components/NavBar";
export default {
  components: {NavBar}
}
</script>

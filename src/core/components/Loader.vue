<template>
  <div class="col text-center py-5 my-5 d-flex flex-column align-items-center justify-content-center" v-if="loader">
    <div class="spinner-border text-primary" role="status"></div>
    Cargando...
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    loader: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>

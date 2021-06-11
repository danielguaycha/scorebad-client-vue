<template>
    <div> {{/*Simple HOC for display loader or content*/}}
      <Loader :loader="loader"/>
      <slot v-if="!loader"/>
    </div>
</template>

<script>
import Loader from "@/core/components/Loader";
export default {
  name: "WithLoader",
  components: {Loader},
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

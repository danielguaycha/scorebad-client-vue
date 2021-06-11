<template>
  <div v-if="items.length > 0" class="row g-1">
    <div v-for="item in items"
         :key="item.title" class="col-12 col-md-4">
      {{/*Loading Score Items*/}}
      <ScoreItem :item="item" />
    </div>
  </div>
</template>

<script>
import ScoreItem from "@/modules/home/components/_partials/ScoreItem";
export default {
  name: "SuggestList",
  components: {ScoreItem},
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

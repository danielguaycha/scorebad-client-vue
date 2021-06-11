<template>
  <div>
    <div  class="card-score">
      {{/*Thumbnail for team*/}}
      <div @click="show = true"
           :style="{'background-image': `url('${item.thumbnail}')` }"
           class="card-score-img" :alt="item.title"/>
      {{/*Body extra content*/}}
      <div class="card-score-body">
        <h4 @click="show = true">{{ item.title }}</h4>
        <div class="extra">
          <small>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>
            {{ item.date |  moment("DD/MM/YYYY") }}
          </small>
          <small class="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-play-circle text-primary" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
            </svg>
            {{ item.videos.length }}
          </small>
        </div>
      </div>
    </div>

    {{/*Modal for embebed Iframe*/}}
    <Modal :show="show" @close="show = false">
      <div slot="header">
        <h5 class="mb-0">{{ item.title }} |<small class="text-muted fs-6">{{ item.date | moment('DD/MM/YYYY')}}</small></h5>
      </div>
      <div slot="body">
          <div class="video-embed-container">
            <div class="video-embed" v-html="item.embed"></div>
          </div>
        </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/core/components/Modal";

export default {
  name: "ScoreItem",
  components: {Modal},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false
  }),
}
</script>

<template>
  <ul class="leagues">
    <li v-for="i in leagues" :key="i.id" class="leagues-item">
      <div class="actions">
        {{/*On Select League*/}}
        <button @click="$emit('onSelectLeague', i); viewList(i.id)" class="league-btn">
          <Avatar :username="i.name" :size="30" color="#fff" class="me-2"></Avatar>
          {{ i.name }}
        </button>
        {{/*Show teams for selected league*/}}
        <button @click.prevent="viewList(i.id)" class="btn-open">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
        </button>
      </div>
      {{/*Loading team List for league, for default this show when route contains league id*/}}
      <TeamList :league="i.id"
                :show="i.id == currentLeague"
                :id="`league_${i.id}`"
                @onSelectTeam="e => $emit('onSelectTeam', e)" />
    </li>
  </ul>
</template>

<script>
import _ from 'underscore';
import Avatar from 'vue-avatar';
import TeamList from "@/modules/home/components/TeamList";

export default {
  name: "LeaguesList",
  components: {TeamList, Avatar},
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  },
  data: () => ({
    leagues: [],
    showTeams: false,
    currentLeague:  null,
  }),
  created() {
    this.currentLeague = this.$route.query.id;
    for (let item of this.items) {
      const league = item.competition; // current league
      const i = _.where(this.leagues, { id: league.id }); // verify if league is already push
      if (i.length <= 0) this.leagues.push(league); // if not exists push this
    }
  },
  methods: {
    viewList(id) {
      // for show menu list of teams
      const showing = document.querySelectorAll('.teams');
      for (let s of showing) {
        if (s.id !== `league_${id}`)
          s.classList.remove('show');
      }
      document.getElementById(`league_${id}`).classList.toggle('show');
    }
  }
}
</script>

<style scoped>

</style>

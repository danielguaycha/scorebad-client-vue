<template>
  <WithLoader :loader="loader">
    <div class="row">
      {{/*List of scores*/}}
      <div class="col-12 col-lg-8">
        {{/*Header Title and Search*/}}
        <div class="home-header">
          <div v-if="leagueName" class="fw-bold text-primary me-5">{{ leagueName }}</div>
          <SearchTeam @onSearch="getScoresForTeam"/>
        </div>
        {{/*List with scores*/}}
        <SuggestList :items="suggestList"></SuggestList>
      </div>
      {{/*SideBar with leagues*/}}
      <div v-if="list.length > 0" class="col-12 col-lg-4">
        <LeaguesList :items="list"
                     @onSelectTeam="getScoresForTeam"
                     @onSelectLeague="getScoreForLeague" />
      </div>
    </div>
  </WithLoader>
</template>

<script>
import _ from 'underscore';
import SuggestList from "@/modules/home/components/SuggestList";
import LeaguesList from "@/modules/home/components/LeaguesList";
import {scoreService} from "@/modules/home/services/scoreService";
import SearchTeam from "@/modules/home/components/_partials/SearchTeam";
import WithLoader from "@/core/components/WithLoader";

export default {
  name: 'Home',
  components: {WithLoader, SearchTeam, LeaguesList, SuggestList},
  data: () => ({
    suggestList: [],
    list: [],
    // league
    leagueId: null,
    leagueName: '',
    // team
    teamStr: null,
    //others
    loader: false,
  }),
  mounted() {
    this.leagueId = this.$route.query.id;
    this.teamStr = this.$route.query.team;
    this.getFootBall();
  },
  methods: {
    getFootBall() { // request to the api rest
      this.loader = true;
      scoreService.getAll().then(res => {
        this.list = res;
        this.$store.commit('setItems', res); // setting items to store
        if (!this.leagueId && !this.teamStr)
          this.suggestList = _.sample(this.list, 5); // load 5 items for default

        if (this.leagueId) // if contains id in route query, filter for league
          this.filterForLeague();

        if (this.teamStr)  // if contains team search in query, filter for teams
          this.filterForTeam();
      }).finally(() => this.loader = false);
    },
    // get for league, on select list in LeaguesList Component
    getScoreForLeague(league) {
      if (this.leagueId && this.leagueId.toString() === league.id.toString()) return; // check current route with id
      this.leagueName = league.name;
      this.$router.replace({path: '', query: {id: league.id}});
      this.leagueId = league.id;
      // filter
      this.filterForLeague();
    },

    filterForLeague() { // apply filters for leagues with current League ID
      const items = this.$store.getters.getItems;
      this.suggestList = (items.filter(i => i.competition.id.toString() === this.leagueId.toString()));
    },

    // get for teams, on select list in LeagueList > TeamList
    getScoresForTeam(team) {
      if (this.teamStr === team.toLowerCase()) return;
      this.teamStr = team.toLowerCase();
      this.$router.replace({path: '', query: {team: this.teamStr}});
      this.filterForTeam()
    },

    filterForTeam() { // apply filters for Team
      this.leagueName = null;
      this.leagueId = null;
      const items = this.$store.getters.getItems;
      this.suggestList = (items.filter(i => i.title.toLowerCase().includes(this.teamStr.toLowerCase())));
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (Object.keys(to.query).length <= 0) {
      this.teamStr = null;
      this.leagueName = null;
      this.leagueId = null;
      this.getFootBall(); // reset values when go to /
    }
    next()
  },
}
</script>

<template>
  <div class="list">
    <h1>
      List
    </h1>
    <ul>
      <li v-for="(map, index) in getMaps" :key="map.id">
        {{ index + 1 }}:
        <router-link :to="`/game?id=${map.id}`">{{ map.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

interface Data {
  ids: string[];
}

export default Vue.extend({
  data(): Data {
    return {
      ids: []
    };
  },
  async mounted() {
    const { uid } = this.getCurrentUser;

    await this.fetchMapsByUid(uid);
  },
  computed: {
    ...mapGetters("map", ["getMaps"]),
    ...mapGetters("auth", ["getCurrentUser"])
  },
  methods: {
    ...mapActions("map", ["fetchMapsByUid"])
  }
});
</script>

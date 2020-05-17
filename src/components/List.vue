<template>
  <div class="list">
    <h1>
      List
    </h1>
    <ul>
      <li v-for="id in ids" :key="id">
        Game id <router-link :to="`/?id=${id}`">{{ id }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
    const { data } = await this.axios.get(
      "https://us-central1-doge-sokoban.cloudfunctions.net/getMapList"
    );
    if (data) {
      this.ids = data;
    }
  }
});
</script>

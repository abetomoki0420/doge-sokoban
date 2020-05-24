<template>
  <div class="app-header">
    <div class="app-header-items">
      <span class="app-header-item">
        <router-link to="/">top</router-link>
      </span>
      <span v-if="isSignedIn" class="app-header-item">
        <router-link to="/list">list</router-link>
      </span>
      <span v-if="isSignedIn" class="app-header-item">
        <router-link to="/editor">editor</router-link>
      </span>
    </div>
    <div class="controls">
      <span v-if="isSignedIn" @click="signOut" class="control clickable">
        signout
      </span>
      <span v-else @click="signIn" class="control clickable">signin</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  components: {},
  computed: {
    ...mapGetters("auth", ["isSignedIn"])
  },
  methods: {
    ...mapActions("auth", ["signIn", "signOut"])
  }
});
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;

  &-items {
    display: flex;
  }

  &-item {
    padding: 10px;
    &::before {
      content: "";
      color: transparent;
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      width: 20px;
      margin-right: 8px;
      border-radius: 50%;
      background-image: url("~@/assets/jpg/doge.jpg");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .controls {
    .control {
      padding: 10px;
    }
  }
}

.clickable {
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

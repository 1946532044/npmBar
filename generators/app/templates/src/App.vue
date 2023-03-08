<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    if (sessionStorage.getItem("state")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("state"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    });
  }
}
</script>


<style>
#app {
  overflow: hidden;
}
* {
  padding: 0;
  margin: 0;
  user-select: none;
}
</style>

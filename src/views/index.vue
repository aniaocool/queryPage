<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      :key="new Date().getTime()"
    ></router-view>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scope></style>

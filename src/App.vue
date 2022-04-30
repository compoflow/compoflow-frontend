<!--
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-03-26 13:26:58
 * @Description: 测试组件，实际用不到
 * @FilePath: /bpmn_workflow/src/App.vue
-->

<template>
  <div id="app">
    <basic project="resource_platform"></basic>
  </div>
</template>

<script>
import Basic from "./components/Basic.vue";

export default {
  name: "App",
  components: {
    Basic,
  },
};
</script>

<style lang="less" scoped>
</style>

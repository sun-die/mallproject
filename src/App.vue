<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
body .el-table th.gutter{ /**表头对齐，不要删 */
  display: table-cell!important;
}
</style>

<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
   padding: 0;
   margin: 0;
}
body .el-table th.gutter{ /**表头对齐，不要删 */
display: table-cell!important;
}
</style>

<template>
  <el-row id="content">
    <el-col>
      <slot />
    </el-col>
  </el-row>
</template>

<style scoped>
#content {
  min-height: 25vh;
}
</style>

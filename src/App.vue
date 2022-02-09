<script setup>
import WebGLDemo from './components/webgl-demo.vue';
import DemoList from '@/components/demo-list.vue';
import CanvasTree from './components/canvas-tree.vue';

const listData = [
  { title: 'WebGL绘制三角形', compo: WebGLDemo },
  { title: 'canvas2d画树', compo: CanvasTree },
];
</script>

<template>
  <DemoList :data="listData" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>

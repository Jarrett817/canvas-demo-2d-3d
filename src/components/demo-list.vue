<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <ul class="demo-list">
    <li v-for="item in props.data">
      <p>{{ item.title }}</p>
      <component
        :is="item.compo"
        style="min-width: 300px; min-height: 300px"
      ></component>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.demo-list {
  column-count: 2;
  column-width: 50%;
  column-gap: 10px;

  li {
    break-inside: avoid;
    border: 1px solid black;
    margin-bottom: 10px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin-bottom: 20px;
    }
  }
}
</style>

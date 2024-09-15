<template>
  <div class="flex justify-between items-center">
    <span
      class="span-container shadow-md h-8 w-8 flex justify-center items-center transition ease-in-out delay-150 rounded-lg"
    >
      <VaIcon :name="props.iconName" :color="iconColor" />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  iconName: { type: String },
  iconColor: { type: String },
  cursor: { type: [String, undefined], default: 'pointer' },
  hoverBgColor: { type: String }
})
</script>

<style scoped>
.span-container {
  cursor: v-bind('props.cursor');
}
.span-container:hover {
  background-color: v-bind('props.hoverBgColor');
}
</style>

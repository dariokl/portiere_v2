<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-indigo-500 text-white">
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <HoverableIcon icon-name="attach_money" cursor="default" />
          <span class="block mt-2">Montly Income</span>
        </div>

        <div class="flex w-[72px]"></div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <span class="block mt-2 font-bold">3000,00</span>
      <span class="block flex gap-1 text-xs"
        >+12% <VaIcon name="trending_up" color="primary"
      /></span>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import HoverableIcon from '../../HoverableIcon.vue'
</script>

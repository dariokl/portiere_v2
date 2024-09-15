<template>
  <VaLayout
    style="height: 100vh"
    :top="{ fixed: true, order: 1 }"
    :left="{
      fixed: true,
      absolute: breakpoints.smDown && isSidebarVisible,
      order: 2,
      overlay: isSidebarVisible && breakpoints.smDown
    }"
    @left-overlay-click="isSidebarVisible = false"
  >
    <template #top>
      <VaNavbar class="py-2">
        <template #left>
          <VaButton
            :icon="isSidebarVisible ? 'menu_open' : 'menu'"
            @click="isSidebarVisible = !isSidebarVisible"
          />
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg">
            Portiere <span class="text-emerald-600">.</span>
          </VaNavbarItem>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="isSidebarVisible">
        <VaSidebarItem v-for="{ icon, title, path } in menu" :key="icon">
          <RouterLink :to="path">
            <VaSidebarItemContent>
              <VaIcon :name="icon" />
              <VaSidebarItemTitle>
                {{ title }}
              </VaSidebarItemTitle>
            </VaSidebarItemContent>
          </RouterLink>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <RouterView />
    </template>
  </VaLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useBreakpoint } from 'vuestic-ui'

const breakpoints = useBreakpoint()
const isSidebarVisible = ref(false)

const menu = [
  { icon: 'home', title: 'Home', path: '/' },
  { icon: 'bar_chart', title: 'Dashboard', path: '/dashboard' }
]
</script>

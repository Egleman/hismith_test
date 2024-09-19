<script setup lang="ts">
import {useNewsStore} from "~/stores/news";

const newsStore = useNewsStore()
const { pageTitle } = storeToRefs(newsStore)
</script>
<template>
  <v-app-bar :elevation="2" class="position-static">
    <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
  </v-app-bar>
</template>
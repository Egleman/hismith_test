<template>
  <NuxtLayout>
    <v-container max-width="1230" fluid v-show="!processing">
      <v-app>
        <Header />
        <NuxtPage />
      </v-app>
    </v-container>
    <v-container fluid fill-height v-if="processing" :class="$style.processing">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-progress-circular
              color="primary"
              indeterminate
              size="70"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
<script setup lang="ts">
import {useNewsStore} from "~/stores/news";

const newsStore = useNewsStore()
const {processing} = storeToRefs(newsStore)
newsStore.getPosts()
</script>
<style lang="scss" module>
@import './pages/news';
</style>
<script setup lang="ts">
import {useNewsStore} from "~/stores/news";
import {formatedDate} from "~/composable/utils";
import type {IPost} from "~/types";

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()
const { processing } = storeToRefs(newsStore)
const post = ref<IPost | null>({} as IPost | null)
const selectedImage = ref('')
const modal = ref(false)

const checkSlider = (urls: string | string[] | undefined) => {
  return Array.isArray(urls) && urls.length > 0;
}

const checkImage = (urls) => {
  if (urls && !Array.isArray(urls)) {
    return true
  }
}

const openImage = (image) => {
  selectedImage.value = image;
  modal.value = true;
}

watch(processing, (new_value) => {
  if (!new_value) {
    post.value = newsStore.getPostById(route.params.id)
    if (!post.value) {
      router.push({ path: "/" })
    }
  }
}, {immediate: true})

</script>
<template>
  <v-container>
    <v-card>
      <v-card-title style="white-space: normal">
        <h1>{{post?.title}}</h1>
      </v-card-title>
      <v-card-subtitle>
        <span>Дата публикации: <strong>{{formatedDate(post?.pubDate)}}</strong></span>
        <span v-if="post?.author"> | Автор: <strong>{{ post?.author }}</strong></span>
      </v-card-subtitle>
      <v-img v-if="checkImage(post?.enclosure?.url)" :src="post?.enclosure?.url" @click="openImage(post?.enclosure?.url)" height="400px"></v-img>
      <v-card-text>
        <p>{{post?.content}}</p>
      </v-card-text>
      <v-carousel v-if="checkSlider(post?.enclosure?.url)">
        <v-carousel-item v-for="(image, index) in post?.enclosure?.url" :key="index">
          <v-img :src="image" @click="openImage(image)" height="400px"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-dialog v-model="modal" max-width="600px">
        <v-img :src="selectedImage" @click="modal = false"></v-img>
      </v-dialog>
      <v-card-actions>
        <v-btn :href="post?.link" target="_blank">Ссылка на оригинальную новость</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<style lang="scss">
</style>
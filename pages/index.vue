<script setup lang="ts">
import {useNewsStore} from "~/stores/news";
import {formatedDate} from "~/composable/utils";

const newsStore = useNewsStore()
const {
  modifiedPosts,
  pageCount,
  currentPage,
  dateFilterOptions,
  baseSelectedDateFilter,
  searchWord
} = storeToRefs(newsStore)
newsStore.pageTitle = 'Extra news'
</script>
<template>
  <v-container>
    <div :class="$style.filter">
      <div :class="$style.filter__wrapper">
        <p :class="$style.filter__label">Сортировать по дате:</p>
        <v-select
            v-model="baseSelectedDateFilter"
            :items="dateFilterOptions"
            item-title="name"
            item-value="id"
            label="Дата"
            return-object
            single-line
            persistent-hint
        ></v-select>
      </div>
      <div :class="$style.filter__wrapper">
        <p :class="$style.filter__label">Поиск по названию</p>
        <v-text-field v-model="searchWord"></v-text-field>
      </div>
    </div>
    <v-row>
      <v-col v-for="post in modifiedPosts" :key="post.link" cols="12" md="4">
        <v-card class="d-flex flex-column fill-height">
          <v-card-title>
            <NuxtLink :to="`/${post.guid}`" class="news-title">
              {{ post.title }}
            </NuxtLink>
          </v-card-title>
          <v-card-subtitle>{{ formatedDate(post.pubDate) }}</v-card-subtitle>
          <v-card-text class="flex-grow-1">{{ post.contentSnippet }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-container class="max-width">
          <v-pagination
              v-model="currentPage"
              :length="pageCount"
              :hide-on-small="false"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" module>
@import 'news';
</style>
import {defineStore} from 'pinia'
import type {INewsStore, IPost} from "~/types";
import dayjs from "dayjs";
import type {RouteParamValue} from "#vue-router";

export const useNewsStore = defineStore('newsStore', {
    state: (): INewsStore => ({
        pageTitle: 'Extra news',
        posts: [],
        processing: true,
        currentPage: 1,
        itemsPerPage: 5,
        dateFilterOptions: [
            {
                name: 'Сначала новые',
                value: 'desc'
            },
            {
                name: 'Сначала старые',
                value: 'asc'
            }
        ],
        baseSelectedDateFilter: {
            name: 'Сначала новые',
            value: 'desc'
        },
        searchWord: ''
    }),

    getters: {
        modifiedPosts: (state: INewsStore) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.posts
                .slice(start, end)
                .sort((postA, postB) => {
                    if (state.baseSelectedDateFilter.value === 'desc') {
                        return dayjs(postB.pubDate).unix() - dayjs(postA.pubDate).unix()
                    } else {
                        return dayjs(postA.pubDate).unix() - dayjs(postB.pubDate).unix()
                    }
                })
                .filter(post => post.title.toLowerCase().includes(state.searchWord.toLowerCase()))
        },
        pageCount: (state: INewsStore) => {
            return Math.ceil(state.posts.length / state.itemsPerPage);
        }
    },

    actions: {
        async getPosts() {
            try {
                this.posts = await $fetch('/api/news')
            } catch (e) {
                console.log(e)
            } finally {
                this.processing = false
            }
        },
        getPostById(id: string | RouteParamValue[]): IPost | null {
            const post = this.posts.find(post => post.guid === id)
            if (post) {
                this.pageTitle = post.title
                return post
            }
            return null
        }
    },
})

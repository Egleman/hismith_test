export interface IPost {
    author?: string
    categories: string[]
    content: string
    contentSnippet: string
    creator?: string
    guid: string
    isoDate: string
    link: string
    pubDate: string
    title: string
    enclosure?: {
        length: ""
        type: "image/jpeg"
        url: string | string[]
    }
}
interface IDateFilterOption {
    name: string,
    value: string
}
export interface INewsStore {
    pageTitle: string
    posts: IPost[]
    processing: boolean,
    currentPage: number,
    itemsPerPage: number,
    dateFilterOptions: IDateFilterOption[],
    baseSelectedDateFilter: IDateFilterOption,
    searchWord: string
}
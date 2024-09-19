import Parser from 'rss-parser';

const parser = new Parser();

export default defineEventHandler(async (event) => {
    const feed = await parser.parseURL('http://static.feed.rbc.ru/rbc/logical/footer/news.rss');
    return feed.items; // Возвращает массив новостей
});

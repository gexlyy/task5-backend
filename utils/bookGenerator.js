import { Faker, en, de, ja } from '@faker-js/faker';
import seedrandom from 'seedrandom';

const localeMap = {
    'en': en,
    'de': de,
    'ja': ja
};

export function generateBooks({ lang, seed, page, likes, reviews }) {
    const selectedLocale = localeMap[lang] || en;
    const faker = new Faker({ locale: selectedLocale });
    faker.seed(seed + page);

    const rng = seedrandom(seed + page);

    const books = [];
    const startIndex = (page - 1) * 10 + 1;

    for (let i = 0; i < 10; i++) {
        const index = startIndex + i;
        const isbn = faker.string.alphanumeric(13).toUpperCase();
        const title = faker.lorem.words({ min: 2, max: 5 });
        const authors = Array.from({ length: rng() < 0.3 ? 2 : 1 }, () => faker.person.fullName());
        const publisher = faker.company.name();

        const bookLikes = Math.round(likes);
        let reviewCount = Math.floor(reviews);
        if (reviews % 1 > 0 && rng() < (reviews % 1)) {
            reviewCount += 1;
        }

        const bookReviews = Array.from({ length: reviewCount }, () => ({
            reviewer: faker.person.fullName(),
            text: faker.lorem.sentence()
        }));

        const coverImage = faker.image.urlLoremFlickr({ category: 'book', width: 200, height: 300 });

        books.push({
            index,
            isbn,
            title,
            authors,
            publisher,
            likes: bookLikes,
            reviews: bookReviews,
            coverImage
        });
    }

    return books;
}

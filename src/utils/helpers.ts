// Format date untuk display
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

// Slug generator
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

// Reading time calculator
export function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// Truncate text
export function truncate(text: string, length: number = 150): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
}
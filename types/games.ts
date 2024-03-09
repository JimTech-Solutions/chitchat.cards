type UUID = string;

export interface Categories {
    id: number,
    category: string,
    color: string
}

export interface Questions {
    gid: UUID,
    category: string,
    question: string
}

export interface Game {
    gid: UUID,
    title: string,
    short_description: string,
    long_description: string,
    thumbnail: string,
    recommended: string[],
    slug: string
}
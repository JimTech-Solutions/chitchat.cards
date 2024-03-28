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

export type GameData = {
  game_gid: UUID;
  game_title: string;
  game_short_description: string;
  game_long_description: string;
  game_thumbnail: string;
  game_recommended: string[];
  game_slug: string;
  total_questions: number;
  game_questions: GameQuestion[];
  game_categories: GameCategory[];
  game_privacy: string;
  game_access: string;
};

export type GameQuestion = {
  question: string;
  category: string;
  access: string;
  featured: boolean;
};

export type GameCategory = {
  category: string;
  color: string;
  question_count: number;
};
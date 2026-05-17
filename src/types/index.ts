export interface Verse {
    id: number;
    chapter: string;
    scope: string;
    sanskrit?: string;
    tibetan?: string;
    bengali?: string;
    english: string;
    logic_link?: number[];
    keywords?: string[];
    explanation?: string;
}

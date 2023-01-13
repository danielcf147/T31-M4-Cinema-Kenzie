export interface Movie {
    id: string;
    name: string;
    director: string;
    synopsis: string;
    release_date: string;
    categoryMovie_id: string;
}

export interface MovieRegisters {
    name: string;
    director: string;
    synopsis: string;
    release_date: string;
    categoryMovie_id: string;
}

export interface MovieReturn {
    id: string;
    name: string;
    director: string;
    synopsis: string;
    release_date: string;
    category: string
}
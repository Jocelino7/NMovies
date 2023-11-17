

export type Movie = {
    originalTitle: string;
    adult: boolean;
    backdrop_path: string;
    id: number;
    overview: string;
    title: string;
    vote_average:string,
    popularity:number,
    genre_ids:number[],
    release_date:string,
    poster_path:string
  };
export type Genre = {
    id:string,
    name:string
}  
export type actor = {
  adult: boolean,
  id: number,
  name: string,
  original_name: string,
  media_type: string,
  popularity: number,
  gender: number,
  known_for_department: string,
  profile_path: string,
  known_for:Movie[]
}
export type ActorsResponse = {
  page:string,
  results:actor[]
}
export type CreditActor = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any; // Substitua `any` pelo tipo apropriado, se aplicável
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};



type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
export type Casting = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

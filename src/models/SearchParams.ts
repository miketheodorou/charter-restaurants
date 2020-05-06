export interface Searchparams {
  term: string;
  filters: {
    state: string | null;
    genre: string | null;
    attire: string | null;
  };
}

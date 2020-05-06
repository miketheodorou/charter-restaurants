export interface Searchparams {
  term: string;
  filters: {
    [key: string]: any;
    state: string | null;
    genre: string | null;
    attire: string | null;
  };
}

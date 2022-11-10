export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | Nullable<T> | Optional<T>;

export type OrArray<T> = T | Array<T>;

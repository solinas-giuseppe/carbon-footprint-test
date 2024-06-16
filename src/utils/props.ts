export type NestedList<T> = T | NestedList<T>[]
export type ClassList = NestedList<string>

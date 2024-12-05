export type SnakeCase<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
    ? SnakeCase<R, `${A}${F extends Lowercase<F> ? "" : "_"}${Lowercase<F>}`>
    : A

export type ToSnakeCase<T extends Record<string, any>> = {
    [Key in keyof T as `${SnakeCase<string & Key>}`]: T[Key]
}

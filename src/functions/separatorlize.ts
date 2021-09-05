import { propertyWalk } from '../tools/propertyWalk'
import { separatorSplitRegexp } from '../tools/separatorSplitRegexp'
import { DepthInfinity, NextDepthIndex, DepthRecursionAllowed } from '../typings/DepthReflectIndex'
import { LettersWalk } from '../typings/LettersWalk'

export type Separatorlize<
  S extends string,
  T extends string,
  U extends boolean = false
> = S extends `${ infer S1 }${ infer S2 }`
  ? U extends true
    ? Uppercase<LettersWalk<Lowercase<S1>, S2, T>>
    : Lowercase<LettersWalk<Lowercase<S1>, S2, T>>
  : S

export type SeparatorlizeKeys<
  T,
  S extends string = '_',
  U extends boolean = false,
  D extends number = DepthInfinity
> = DepthRecursionAllowed<D> extends false ? T : T extends Array<infer A>
  ? Array<SeparatorlizeKeys<A, S, U, NextDepthIndex<D>>>
  : T extends Record<any, any>
    ? {
      [K in keyof T as K extends string ? Separatorlize<K, S, U> : K]: SeparatorlizeKeys<T[K], S, U, NextDepthIndex<D>>
    }
    : T

export interface SeparatorlizeOptions<
  S extends string = '_',
  U extends boolean = false,
> {
  separator: S
  uppercase: U
}

export const separatorlize = <
  T extends string,
  S extends string = '_',
  U extends boolean = false
>(
  string: T,
  options: Partial<SeparatorlizeOptions<S, U>> = {},
): Separatorlize<T, S, U> => {
  const { separator = '_' as S, uppercase = false } = options
  const newString = string.split( separatorSplitRegexp ).join( separator )

  if ( uppercase ) return newString.toUpperCase() as Separatorlize<T, S, U>

  return newString.toLocaleLowerCase() as Separatorlize<T, S, U>
}

export interface SeparatorlizeKeysOptions<
  S extends string = '_',
  U extends boolean = false,
  D extends number = 9
> extends SeparatorlizeOptions<S, U> {
  depths: D
}

export const separatorlizeKeys = <
  T,
  S extends string = '_',
  U extends boolean = false,
  D extends number = 9
>( resource: T, options: Partial<SeparatorlizeKeysOptions<S, U, D>> = {} ): SeparatorlizeKeys<T, S, U, D> => {
  const { depths = Infinity as D, ...separatorlizeOptions } = options

  return propertyWalk( resource, property => separatorlize( property, separatorlizeOptions ), depths )
}

import { propertyWalk } from '../tools/propertyWalk'
import { upperCaseReplacer } from '../tools/uppercaseReplacer'
import { DepthInfinity, DepthRecursionAllowed } from '../typings/DepthReflectIndex'
import { LettersWalk } from '../typings/LettersWalk'

export type Camelize<S extends string> = S extends `${ infer S1 }${ infer S2 }`
  ? LettersWalk<Lowercase<S1>, S2>
  : S

export type CamelizeKeys<T, D extends number = DepthInfinity> =
  DepthRecursionAllowed<D> extends false ? T : T extends Array<infer A>
    ? Array<CamelizeKeys<A>>
    : T extends Record<any, any>
      ? {
        [K in keyof T as K extends string ? Camelize<K> : K]: CamelizeKeys<T[K]>
      }
      : T

export const camelize = <T extends string>( string: T ): Camelize<T> => {
  const str = string.replace( /[-_\s]+(.)?/g, upperCaseReplacer )

  return `${ str[0].toLowerCase() }${ str.substr( 1 ) }`
}

export interface CamelizeKeysOptions<D extends number = DepthInfinity> {
  depths: D
}

export const camelizeKeys = <T, D extends number = DepthInfinity>(
  resource: T,
  options: Partial<CamelizeKeysOptions<D>> = {}
): CamelizeKeys<T, D> => {
  const { depths = Infinity } = options

  return propertyWalk( resource, camelize, depths )
}

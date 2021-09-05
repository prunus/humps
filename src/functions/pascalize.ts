import { propertyWalk } from '../tools/propertyWalk'
import { upperCaseReplacer } from '../tools/uppercaseReplacer'
import { DepthInfinity, DepthRecursionAllowed } from '../typings/DepthReflectIndex'
import { LettersWalk } from '../typings/LettersWalk'

export type Pascalize<S extends string> = S extends `${ infer S1 }${ infer S2 }`
  ? LettersWalk<Uppercase<S1>, S2>
  : S

export type PascalizeKeys<T, D extends number = DepthInfinity> =
  DepthRecursionAllowed<D> extends false ? T : T extends Array<infer A>
    ? Array<PascalizeKeys<A>>
    : T extends Record<any, any>
      ? {
        [K in keyof T as K extends string ? Pascalize<K> : K]: PascalizeKeys<T[K]>
      }
      : T

export const pascalize = <T extends string>( string: T ): Pascalize<T> => {
  const str = string.replace( /[-_\s]+(.)?/g, upperCaseReplacer )

  return `${ str[0].toUpperCase() }${ str.substr( 1 ) }`
}

export interface PascalizeKeysOptions<D extends number = DepthInfinity> {
  depths: D
}

export const pascalizeKeys = <T, D extends number = DepthInfinity>(
  resource: T,
  options: Partial<PascalizeKeysOptions<D>> = {}
): PascalizeKeys<T, D> => {
  const { depths = Infinity } = options

  return propertyWalk( resource, pascalize, depths )
}

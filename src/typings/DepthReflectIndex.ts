export type DepthReflectIndex = [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

export type DepthInfinity = -2

export type DepthRecursionAllowed<N extends number> = N extends -1 ? false : true

export type NextDepthIndex<N extends number> =
  DepthReflectIndex[N] extends never ? -1 : DepthReflectIndex[N]

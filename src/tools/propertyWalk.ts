export const propertyWalk = (
  target: any,
  walk: ( property: string ) => string,
  depths = Infinity
): any => {
  if ( depths === -1 ) return target

  if ( Array.isArray( target ) )
    return target.map( item => propertyWalk( item, walk, depths - 1 ) )

  if ( typeof target !== 'object' || target === null )
    return target

  return [
    ...Object.getOwnPropertyNames( target ),
    ...Object.getOwnPropertySymbols( target ),
  ].reduce( ( newObject, key ) => {
    const value = target[key]
    const valueIsObject = typeof target[key] === 'object' && target[key] !== null
    const newKey = typeof key === 'string' ? walk( key ) : key
    const newValue = valueIsObject ? propertyWalk( value, walk, depths - 1 ) : value

    return { ...newObject, [newKey]: newValue }
  }, {} )
}

/* eslint-disable @typescript-eslint/naming-convention */
import { camelize, camelizeKeys } from '../src'

describe( 'camelize functions', () => {

  it( 'basic string', () => {

    expect( camelize( 'hello_world_iam_camelize_string' ) ).toEqual( 'helloWorldIamCamelizeString' )

  } )

  it( 'object keys', () => {

    expect( camelizeKeys( {
      SomeProperty: 'foo',
      another_property: 'bar',
      'some-another-property': 'osh'
    } ) ).toEqual( {
      someProperty: 'foo',
      anotherProperty: 'bar',
      someAnotherProperty: 'osh'
    } )

  } )

  it( 'preservation symbols and numbers', () => {
    const symbolProperty = Symbol( 'some-symbol-property' )

    expect( camelizeKeys( {
      [symbolProperty]: 'foo',
      123: 123,
      natural_property: 'bar'
    } ) ).toEqual( {
      [symbolProperty]: 'foo',
      123: 123,
      naturalProperty: 'bar'
    } )

  } )

  it( 'properties depths limit', () => {

    const object = {
      PropertyOne: {
        property_two: 'foo',
        PropertyThree: {
          property_four: 'bar'
        }
      }
    }

    expect( camelizeKeys( object, { depths: 0 } ) ).toEqual( {
      propertyOne: {
        property_two: 'foo',
        PropertyThree: {
          property_four: 'bar'
        }
      }
    } )

    expect( camelizeKeys( object, { depths: 1 } ) ).toEqual( {
      propertyOne: {
        propertyTwo: 'foo',
        propertyThree: {
          property_four: 'bar'
        }
      }
    } )

  } )

} )

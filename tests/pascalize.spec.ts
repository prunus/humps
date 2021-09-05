/* eslint-disable @typescript-eslint/naming-convention */
import { pascalize, pascalizeKeys } from '../src'

describe( 'pascalize functions', () => {

  it( 'basic string', () => {

    expect( pascalize( 'hello_world_iam_pascalize_string' ) ).toEqual( 'HelloWorldIamPascalizeString' )

  } )

  it( 'object keys', () => {

    expect( pascalizeKeys( {
      someProperty: 'foo',
      another_property: 'bar',
      'some-another-property': 'osh'
    } ) ).toEqual( {
      SomeProperty: 'foo',
      AnotherProperty: 'bar',
      SomeAnotherProperty: 'osh'
    } )

  } )

  it( 'preservation symbols and numbers', () => {
    const symbolProperty = Symbol( 'some-symbol-property' )

    expect( pascalizeKeys( {
      [symbolProperty]: 'foo',
      123: 123,
      naturalProperty: 'bar'
    } ) ).toEqual( {
      [symbolProperty]: 'foo',
      123: 123,
      NaturalProperty: 'bar'
    } )

  } )

  it( 'properties depths limit', () => {

    const object = {
      propertyOne: {
        property_two: 'foo',
        propertyThree: {
          propertyFour: 'bar'
        }
      }
    }

    expect( pascalizeKeys( object, { depths: 0 } ) ).toEqual( {
      PropertyOne: {
        property_two: 'foo',
        propertyThree: {
          propertyFour: 'bar'
        }
      }
    } )

    expect( pascalizeKeys( object, { depths: 1 } ) ).toEqual( {
      PropertyOne: {
        PropertyTwo: 'foo',
        PropertyThree: {
          propertyFour: 'bar'
        }
      }
    } )

  } )

} )

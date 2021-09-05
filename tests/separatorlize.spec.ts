/* eslint-disable @typescript-eslint/naming-convention */
import { separatorlize, separatorlizeKeys } from '../src'

describe( 'separatorlize functions', () => {

  it( 'camelcase/pascalcase -> snakecase', () => {

    expect( separatorlize( 'helloWorldIamSeparatorlizeString' ) ).toEqual( 'hello_world_iam_separatorlize_string' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString' ) ).toEqual( 'hello_world_iam_separatorlize_string' )

  } )

  it( 'camelcase/pascalcase -> hyphencase', () => {

    expect( separatorlize( 'helloWorldIamSeparatorlizeString', { separator: '-' } ) ).toEqual( 'hello-world-iam-separatorlize-string' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString', { separator: '-' } ) ).toEqual( 'hello-world-iam-separatorlize-string' )

  } )

  it( 'camelcase/pascalcase -> uppercase', () => {

    expect( separatorlize( 'helloWorldIamSeparatorlizeString', { separator: '_', uppercase: true } ) ).toEqual( 'HELLO_WORLD_IAM_SEPARATORLIZE_STRING' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString', { separator: '_', uppercase: true } ) ).toEqual( 'HELLO_WORLD_IAM_SEPARATORLIZE_STRING' )

  } )

  it( 'camelcase/pascalcase -> another crazy case', () => {

    expect( separatorlize( 'helloWorldIamSeparatorlizeString', { separator: '$' } ) ).toEqual( 'hello$world$iam$separatorlize$string' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString', { separator: '+' } ) ).toEqual( 'hello+world+iam+separatorlize+string' )

  } )

  it( 'basic string', () => {

    expect( separatorlize( 'helloWorldIamSeparatorlizeString' ) ).toEqual( 'hello_world_iam_separatorlize_string' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString', { separator: '-' } ) ).toEqual( 'hello-world-iam-separatorlize-string' )

    expect( separatorlize( 'helloWorldIamSeparatorlizeString', { separator: '$' } ) ).toEqual( 'hello$world$iam$separatorlize$string' )

    expect( separatorlize( 'HelloWorldIamSeparatorlizeString', { separator: '+' } ) ).toEqual( 'hello+world+iam+separatorlize+string' )

  } )

  it( 'object keys', () => {

    const object = {
      SomeProperty: 'foo',
      anotherProperty: 'bar',
      'some-another-property': 'osh'
    }

    expect( separatorlizeKeys( object ) ).toEqual( {
      some_property: 'foo',
      another_property: 'bar',
      some_another_property: 'osh'
    } )

    expect( separatorlizeKeys( object, { uppercase: true } ) ).toEqual( {
      SOME_PROPERTY: 'foo',
      ANOTHER_PROPERTY: 'bar',
      SOME_ANOTHER_PROPERTY: 'osh'
    } )

    expect( separatorlizeKeys( object, { separator: '-' } ) ).toEqual( {
      'some-property': 'foo',
      'another-property': 'bar',
      'some-another-property': 'osh'
    } )

  } )

} )

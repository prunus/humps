# Prunus Humps

Created in order to facilitate the conversion of properties and strings according to the adopted naming convention, equally humps. But with a difference that is the possibility to use the typescript string typing inserted in version 4.1.

## Installation

```sh
yarn add @prunus/humps
```

## Usage


### Convert strings
```ts
import { camelize, pascalize, separatorlize } from '@prunus/humps'

camelize( 'hello_world' ) // helloWorld
camelize( 'HelloWorld' ) // helloWorld

pascalize( 'hello_world' ) // HelloWorld
pascalize( 'helloWorld' ) // HelloWorld

separatorlize( 'helloWorld' ) // hello_world
separatorlize( 'HelloWorld' ) // hello_world
```

### Convert object properties
```ts
import { camelizeKeys } from '@prunus/humps'

const object = { attr_one: 'foo', AttrTwo: 'bar' }
const camelizeObject = camelizeKeys( object ) // { attrOne: 'foo', attrTwo: 'bar' }
```

```ts
import { separatorlizeKeys } from '@prunus/humps'
const object = { attrOne: 'foo', attrTwo: 'bar' }
const separatorlizeObject = separatorlizeKeys( object ) // { attr_one: 'foo', attr_two: 'bar' }
```

```ts
import { separatorlizeKeys } from '@prunus/humps'
const object = { attrOne: 'foo', attrTwo: 'bar' }
const separatorlizeObject = separatorlizeKeys( object, '-' ) // { 'attr-one': 'foo', 'attr-two': 'bar' }
```

### Convert string types
```ts
import { Camelize, Pascalize, Separatorlize } from '@prunus/humps'

type CamelizeString = Camelize<'oh_typescript_definitions'> // ohTypescriptDefinitions
type PascalizeString = Pascalize<'oh_typescript_definitions'> // OhTypescriptDefinitions
type SeparatorlizeString = Separatorlize<'ohTypescriptDefinitions'> // oh_typescript_definitions
type SeparatorlizeStringWithHyphen = Separatorlize<'ohTypescriptDefinitions', '-'> // oh-typescript-definitions
```

### Convert object types or interfaces
```ts
import { CamelizeKeys } from '@prunus/humps'

interface UglyObject {
  PascalCaseProperty: any
  snake_case_property: any
  'hyphen-case-property': any
}

type PrettyObject = CamelizeKeys<UglyObject> 
/* {
  pascalCaseProperty: any
  snakeCaseProperty: any
  hyphenCaseProperty: any
} */
```

Hron
===

Hron is based on the haxe-serialization.

### Installation

```sh
$ npm install hron
```

### How to use

**encode**

	hron.encode( [js-object] );

**decode**

	hron.decode( [hron-string] );


### Supported type

- null				( n )
- NaN				( k )
- negative infinity	( m )
- positive infinity	( p )
- normal float		( d )
- zero				( z )
- bool				( t ) or ( f )
- string			( y [length] v [urlencode string] )
- array				( a ... h )
- object			( o ... g )

### Etc

[Github](https://github.com/tnRaro/hron.git)

C. 2014. tnRaro <admin@tnraro.com>
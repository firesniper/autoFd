+function ()
{
	Object.defineProperties
	(
		Object.prototype ,
		{
			"fnPgp_setIndex" : 
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( unitsGroup ) 
				{
					var args = Array.prototype.slice.call( arguments ) ;
					unitsGroup = ( args.length == 1 && unitsGroup && unitsGroup != undefined && unitsGroup != null ) ? 
							unitsGroup = args[ args.length - 1 ] : 
							this ;
					var pgp = {} ;
					var idx = 0 ;
					hfA01 : for ( var key in unitsGroup )
					{
						if ( !unitsGroup.hasOwnProperty ( key ) ) continue hfA01 ;
						try
						{  
							if ( unitsGroup[ key ].constructor.name != "Object" ) 
								// throw new TypeError( "key type must is Object" ) ;
							console.log( "key type must is Object" ) ;
							if ( unitsGroup[ key ].constructor.name == "Object" )
								unitsGroup[ key ].index = ++idx 
							else 
								// unitsGroup[ key ].index ;
								Object.defineProperties(
									unitsGroup[ key ] ,
									{
										"index" : {
											enumerable : true ,
											configurable : true ,
											writable : true ,
											value : ++idx ,
										} ,
									} 
								) ;
								// unitsGroup[ key ].__proto__.index = idx++ ;
							pgp [ key ] = unitsGroup[ key ] ;
						} 
						catch ( err ) 
						{
							console.log( "err:" , err ) ;
						} ;
					} ;
					return pgp ;
				} 
			} ,
		}
	) ;
	Object.defineProperties
	(
		Array.prototype ,
		{
			"JaSortByType" : 
			{
				enumerable : false ,
				configurable : true , 
				writable : true ,
				value : function ( field , reverse , array ) 
				{
					console.log( "this:" , this ) ;
					var args = Array.prototype.slice.call( arguments ) ;
					array = ( args.length == 3 && array ) ? 
							args[ args.length - 1 ] :
							function( $this )
							{
								if 
								( 
									$this.constructor.name == "Array"
									|| "length" in $this  
								)
								{
									return $this ;
								}
								else 
								{ 
									// throw new TypeError( "args must be Type String" ) ;
									console.log( "args must be Type String"  ) ;
								} ;
							}( this ) ;
							
					//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
					if( array.length < 2 || !field || typeof array[ 0 ] !== "object" ) return array ;
					//数字类型排序
	// 					array[ 0 ][ field ].match(/[^\d]/ig) ;
					if
					( 
						// typeof array[ 0 ][ field ] === "number" 
						!/[^\d]/ig.test( array[ 0 ][ field ] )
					) 
					{
						array.sort(
							function( x , y ) 
							{ 
								return x[ field ] > y[ field ] ;
							} 
						) ;
					} ;
					//字符串类型排序
					if
					( 
						// typeof array[ 0 ][ field ] === "string"
						/[^\d]/ig.test( array[ 0 ][ field ] ) 
					) 
					{
						array.sort( 
							function( x , y ) 
							{ 
								return x[ field ].localeCompare( y[ field ] ) ;
							}
						) ;
					} ;
					//倒序
					if( reverse ) 
					{
						array.reverse() ;
					} ;
					return array ;
				} ,
			} ,
		}
	) ;
	Object.defineProperties
	(
		String.prototype ,
		{
			"getSearch" : 
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( urlStrOpt )
				{
					var args = Array.prototype.slice.call( arguments ) ;
					urlStrOpt = ( args.length == 1 && urlStrOpt ) ? 
							urlStrOpt = args[ args.length - 1 ] : 
							typeof this === 'string' ?
							this :
							null ;
					var urlStrDef = location.href ? location.href : document.URL ? document.URL : urlStrOpt ? urlStrOpt : this ;
					
					if ( typeof urlStrDef != "string" ) throw new TypeError( "urlStrDef must string " ) ;
					var searchStr = window.location ? location.search : urlStrDef.match( /\?+.*$/ig )[ 0 ] ;
					if( searchStr.indexOf( "?" ) == 0 ) 
					{
						var sliceRes = searchStr.slice(1) ; 
						var etyAry = sliceRes.split( "&" ) ;
						var obj = {} ;
						for ( var i = 0 ; i < etyAry.length ; i++ )
						{
							var pgAry = etyAry[ i ].split( "=" ) ;
							obj[ pgAry[ 0 ] ] = pgAry[ 1 ] ;
						} ;
					}
					else
					{
						throw new RangeError( "none search" ) ;
					} ;
					return obj ;
				} ,
			} ,
		}
	) ;		
			


} () ;
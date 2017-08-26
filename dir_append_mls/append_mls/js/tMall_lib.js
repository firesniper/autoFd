+function ()
{
	Object.defineProperties
	(
		Object ,
		{
			"pgp_jaToSortTypeMap" :
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value :
				{
					""		: "title" ,
					"bid"	: "id" ,
					// "_bid"	: [ "price_integer" , true ]

				}
			} ,
			

		}
	) ;
	Object.defineProperties
	(
		Object ,
		{
			"pgp_jaToSortTypeMapFn" :
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( pgp )
				{
					var pgp_new = {} ;
					for ( var i = 0 , keys = Object.keys ( pgp ) ; i < keys.length ; i ++ )
					{
						var str_val = pgp [ keys [ i ] ] ;
						if ( str_val.indexOf ( "_" ) != 0 ) 
						{
							pgp_new [ keys [ i ] ] = 
							{ 
								"str_field" 	: str_val ,
								"bol_reverse"	: false 
							} ;
							pgp_new [ "_" +  keys [ i ] ] = 
							{ 
								"str_field" 	: str_val ,
								"bol_reverse"	: true 
							} ;
						} ;
						 
					} ; 
					// console.log ( "pgp_new:" , pgp_new ) ;
					Object.pgp_jaToSortTypeMap = pgp_new ;
				} ( Object.pgp_jaToSortTypeMap ) 
			}
			

		}
	) ;
	
	Object.defineProperties
	(
		Object.prototype ,
		{
			"fnJary_concatJa" :
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ()
				{
					var _this = this ;
					var json_data = _this ;
					var str_govJaryKey = Object.keys( json_data )[ 0 ] ;
					var jary_gov = json_data[ str_govJaryKey ] ;
					hfR01 : for( var dk in json_data )
					{
						if ( !json_data.hasOwnProperty( dk ) || dk == str_govJaryKey ) continue hfR01 ;
						jary_gov = jary_gov.concat( json_data[ dk ] ) ;
					} ;
					
					return jary_gov ;
				}
			} ,
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
								unitsGroup[ key ].index = idx ++ 
							else 
								// unitsGroup[ key ].index ;
								Object.defineProperties(
									unitsGroup[ key ] ,
									{
										"index" : {
											enumerable : true ,
											configurable : true ,
											writable : true ,
											value : idx ++ ,
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
			
			"fnJary_sortJaByType" : 
			{
				enumerable : false ,
				configurable : true , 
				writable : true ,
				value : function ( params ) 
				{
					console.log( "this:" , this ) ;
					var args = Array.prototype.slice.call( arguments ) ;
					/*jary = ( args.length == 3 && jary ) ? 
							args[ args.length - 1 ] :
							function( _this )
							{
								if 
								( 
									_this.constructor.name == "Array"
									|| "length" in _this  
								)
								{
									return _this ;
								}
								else 
								{ 
									// throw new TypeError( "args must be Type String" ) ;
									console.log( "args must be Type String"  ) ;
								} ;
							}( this ) ;*/
					var _this		= this ;		
					var str_field	= params.str_field ;		
					var bol_reverse	= params.bol_reverse ;
					var jary			= params.jary ? params.jary : this ;
					//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
					if( jary.length < 2 || !str_field || typeof jary[ 0 ] !== "object" ) return jary ;
					//数字类型排序
	// 					jary[ 0 ][ str_field ].match(/[^\d]/ig) ;
					if
					( 
						// typeof jary[ 0 ][ str_field ] === "number" 
						!/[^\d]/ig.test ( jary[ 0 ] [ str_field ] )
					) 
					{
						jary.sort
						(
							function ( x , y ) 
							{ 
								return (
									Math.floor ( x [ str_field ] ) 
									> 
									Math.floor ( y [ str_field ] ) 
								) ;
							} 
						) ;
					} ;
					//字符串类型排序
					if
					( 
						// typeof jary[ 0 ][ str_field ] === "string"
						/[^\d]/ig.test( jary[ 0 ][ str_field ] ) 
					) 
					{
						jary.sort( 
							function( x , y ) 
							{ 
								return x[ str_field ].localeCompare( y[ str_field ] ) ;
							}
						) ;
					} ;
					//倒序
					if( bol_reverse ) 
					{
						jary.reverse() ;
					} ;
					Object.defineProperties
					(
						jary ,
						{
							"mem1" :
							{
								enumerable : false ,
								configurable : true ,
								writable : true ,
								value : ""  
							}
						}
					) ;
					return jary ;
				} ,
			} ,
		}
	) ;
	

	var fnStr_getDomTemp = function ( params ) 
	{
		// var jary_data 		= params.jary_data ;
		var fnStr_getDomPatt			= params.fnStr_getDomPatt ;
		/*var num_startIdx	= params.num_startIdx ;
		var num_len			= params.num_len ;*/
		// var str_pgKey		= params.str_pgKey ;
		var ary_selectSubData	= params.ary_selectSubData ;
		/*if ( !jary_data ) 
		{ 
			$.toast( "暂无数据" ) ;
// 			throw new TypeError( "jary_data null" ) ;
// 			return ;
		} ;*/
		/*jary_data.fnPgp_setIndex () ;
		var ary_selectSubData = jary_data.splice ( num_startIdx , num_len ) ;
		console.log( "ary_selectSubData:" , ary_selectSubData.length ) ;*/
// 		num_reduceCount = num_reduceCount == 0 ? num_len : num_reduceCount ;
		// num_reduceCount += ary_selectSubData.length ;
		
		var arys_buffer_str = [] ;
		
		hfA01 : for ( var str_selectSubDataKey in ary_selectSubData )
		{
			if ( !ary_selectSubData.hasOwnProperty ( str_selectSubDataKey ) ) continue hfA01 ;
// 			var num_searchKey = num_reduceCount - Math.abs( ary_selectSubData.num_len - str_selectSubDataKey ) ;
			// var num_searchKey = ary_selectSubData[ str_selectSubDataKey ][ "index" ] /*- 1*/ ;
			var str_domTemp = fnStr_getDomPatt 
			( 
				{
					jary_data	: ary_selectSubData , 
					str_dataKey	: str_selectSubDataKey , 
					// str_pgKey	: num_searchKey 
				}
			) ;
			arys_buffer_str.push ( str_domTemp ) ;
		} ;
		// console.log( "arys_buffer_str:" , arys_buffer_str ) ;
		/*return {
			//  "jary_reduceData" : jary_data , 
			 "arys_buffer_str" : arys_buffer_str 
		} ;*/
		return arys_buffer_str.join ( "" ) ;
	} ;

	var fn_pgInfi = function ( params )
	{
    	console.log( "pgInfireduceData:" , params.jary_reduceData ) ;
		var jary_reduceData		= params.jary_reduceData ;
		var dom_dom				= params.dom_dom ? params.dom_dom : $( "#page-infinite-scroll" ) ;
		var qad_anchor			= params.qad_anchor ;
		var fnStr_getDomPatt 	= params.fnStr_getDomPatt ;
		var num_deadLineInc		= params.num_deadLineInc ? 
									params.num_deadLineInc :
									4 ;

    	var loading = false ;

        dom_dom.on 
		( 
            'infinite' , 
            function ( e ) 
            {
//             	console.log( "e:" , e ) ;
                if (loading) return ;

                loading = true ;
                setTimeout
				( 
                    function () 
                    {
                        loading = false ;

						// jary_reduceData.fnPgp_setIndex () ;
						var ary_selectSubData = jary_reduceData.splice 
						(
							 0 , 
							//  4
							 num_deadLineInc 
						) ;
						console.log( "ary_selectSubData:" , ary_selectSubData.length ) ;
                        var str_domTemp = $tMallCompo.fnStr_getDomTemp
						(
							{
								// jary_data		: jary_reduceData , 
								fnStr_getDomPatt			: fnStr_getDomPatt , 
								/*num_startIdx	: 0 , 
								num_len			: 4 , */
								ary_selectSubData	: ary_selectSubData

							} 
						) ;
                      	qad_anchor.append ( str_domTemp ) ;	
                    } , 
                    1000 
                ) ;
            }
        ) ;
      
	} ;
	var fnStr_cvtPostage = function ( ) 
    {
        return function ( postage )
        {
            // console.log ( "fnStr_cvtPostage" ) ;
            var postage = ( postage == 0 ) ? "免运费" : postage ;
            return postage ;
        } ;
    }

	var tMallCompo = 
	{
		fnStr_getDomTemp	: fnStr_getDomTemp ,
		fn_pgInfi			: fn_pgInfi
	} ;		

	Object.defineProperties
	(
		window , 
		{
			"$tMallCompo" :
			{
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : tMallCompo
			}
		}

	) ;

} () ;
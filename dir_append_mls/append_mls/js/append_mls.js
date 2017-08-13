var fnPgp_getDefUrl = function ( pgp_params )
{
	var baseURI = baseURI ? baseURI : window.baseURI ? window.baseURI : document.querySelector( "base" ) ? document.baseURI : "" ;
	var pgp_defUrl = pgp_params.pgp_defUrl || 
	{
		meta : [ ] ,
		link : [ ] ,
		script : [
			{ } 
		] ,
	} ;
	for ( var i in pgp_defUrl ) 
	{
		if ( pgp_defUrl.hasOwnProperty( i ) )
		{
			pgp_defUrl[ i ].__proto__.defFlag = true  ;
		} ;
	} ;
	
	return pgp_defUrl ;
} ;
void function () 
{

if ( !Object.assign ) 
{
	Object.defineProperty
	(
		Object , 
		"assign" ,
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( target , firstSource ) 
			{
				"use strict" ;
				if ( target === undefined || target == null )
					throw new TypeError( "Cannot convert first argument to object" ) ;
				var to = Object( target ) ;
				for ( var i = 1 ; i < arguments.length ; i++ ) 
				{
					var nextSource = arguments[ i ] ;
					if ( nextSource === undefined || nextSource == null ) continue ;
					var keysArray = Object.keys( Object( nextSource ) ) ;
					for ( var nextIndex = 0 , len = keysArray.length ; nextIndex < len ; nextIndex++ ) 
					{
						var nextKey = keysArray[ nextIndex ] ;
						var desc = Object.getOwnPropertyDescriptor( nextSource , nextKey ) ;
						if ( desc !== undefined && desc.enumerable ) to[ nextKey ] = nextSource[ nextKey ] ;
					} ;
				} ;
				return to ;
			} ,
			
		}
		
	) ;
} ;

Object.defineProperties
(
	Object.prototype ,
	{
		"thisOrArgs" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( unit ) 
			{
				try 
				{
					var args = Array.prototype.slice.call( arguments ) ; 
					unit = ( args.length == 1 && unit ) ? 
						unit = args[ args.length - 1 ] : 
						this ;
					if ( typeof unit === "string" ) 
					{
						return unit ;
					}
					else
					{
						throw new TypeError( "not string" ) ;
						return false ;
					} ;
				}
				catch ( e )
				{
					throw e ;

				} ;

			} ,
		} ,
		"fnStr_verifyType" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value :	function ( unit )
			{
				var args = Array.prototype.slice.call( arguments ) ;
				unit = this.parseArgs( arguments , 1 , unit ) ;
				var type = "" ;
				switch ( unit )
				{
					case undefined :
						return undefined ;
					break ;
					case null :
						return null ;
					break ;
				} ;
				if ( typeof unit === "object" )
				{
					return  ( "name" in unit.constructor ) ? 
							unit.constructor.name : 
							"length" in unit ? 
							"Array" :
							"Object" ;
				}
				else if ( typeof unit !== "object" )
				{
					return typeof unit ;
				} ;
				return type ;
			} ,
		} ,
		"fnNum_thisIdx" : 
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( htmlcol ) 
			{
				for ( var i = 0 ; i < htmlcol.length ; i++ ) 
				{
					if ( this == htmlcol[ i ] )
					{
						return i ;
					} ;
				} ;
			} ,
		} ,
		"fnPgp_argsCvtAry" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( paireGroup )
			{
				paireGroup.__proto__ = Array.prototype ;
				console.log("paireGroup",paireGroup);
				return paireGroup ;
			} 
		} ,
		
		"fnNum_getLength" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ()
			{
				if ( "length" in this ) return this.length ;
				var length = 0 ;
				for ( var key in this ) 
				{
					++length ;
				} ;
				return length ;
			} 
		} ,
		"fnAry_pgpCvtAry" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( paireGroup )
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				paireGroup = ( args.length == 1 && paireGroup ) ? 
							paireGroup = args[ args.length - 1 ] : 
							this ;
				console.log("paireGroup:",paireGroup);
				var ary = [] ;

				for ( var obje in paireGroup )
				{
					if ( paireGroup.hasOwnProperty ( obje ) )
					{

							ary.push ( paireGroup[ obje ] ) ;

					} ;
				} ;
				console.log("ary:",ary);
				return ary ;
			} 
		} ,
		"fnAry_pgpToAry" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( paireGroup )
			{
				console.log("this:",this);
				var ary = [] ;
				if ( Object.prototype.fnStr_verifyType ( paireGroup ) !== "Object" )
				{
					console.log("Object.prototype.fnStr_verifyType(paireGroup):" , Object.prototype.fnStr_verifyType (paireGroup) );
					return ;
				} ;

				var callBackFn = paireGroup.isArguments(  )[ "callBackFn" ] ;
				console.log("callBackFn:",callBackFn);
				ary = callBackFn( paireGroup ) ;
				return ary ;
			} 
		} ,
		"isArguments" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( paireGroup ) 
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				paireGroup = ( args.length == 1 && paireGroup ) ? 
							paireGroup = args[ args.length - 1 ] : 
							this ;
				var flag = null ;
				var callBackFn = null ;
				if ( "callee" in paireGroup )
				{
					flag = true ;
					callBackFn = Object.prototype.fnPgp_argsCvtAry ;
				}
				else if 
				(
					!( "callee" in paireGroup ) 
				)
				{
					flag = false ;
					callBackFn = Object.prototype.fnAry_pgpCvtAry ;
				} ;
				console.log("callBackFn",callBackFn);
				return { flag : flag , callBackFn : callBackFn , } ;
			} 
		} ,
		"parseArgs" :
		{
			enumerable : false ,
			configurable : true , 
			writable : true ,
			value : function ( args , numLength , unit ) 
			{
				if ( !( "callee" in args ) ) 
				{ 
					throw new TypeError( "necessary arguments" ) ;
					return ;
				} ;
				args = Array.prototype.slice.call( args ) ;
				var result = ( args.length == numLength && unit ) ?
							args[ args.length - 1 ] :
							this ;
				return result ;
			} 
		} ,
		"insertAfter" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( govern , refe , injection )
			{
				if ( arguments.hasNullPointer ().flag ) return ;
				var args = Array.prototype.slice.call ( arguments ) ;
	// 			if ( $args == null || $args == undefined ) return ;
				injection = ( args.length == 3 && injection ) ? 
							injection = args[ args.length - 1 ] : 
							this ;
				govern.insertBefore ( injection , refe.nextSibling ) ;
			} 
		} ,
		"fnAry_combinePgpNestPgp" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( unitsGroupA , unitsGroupB )
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				unitsGroupB = ( args.length == 2 && unitsGroup && unitsGroup != undefined && unitsGroup != null ) ? 
							unitsGroup = args[ args.length - 1 ] : 
							this ;
				var interAry = null ;
				var exterAry = unitsGroupB.fnNum_getLength () - unitsGroupA.fnNum_getLength () >= 0 
				?
				(
					function ()
					{
						interAry = unitsGroupA ;
						return unitsGroupB ;
					}
				)() 
				:
				(
					function ()
					{
						interAry = unitsGroupB ;
						return unitsGroupA ;
					}
				)() ;
				hfA01 : for ( var e in exterAry ) 
				{
					if ( !exterAry.hasOwnProperty ( e ) ) continue hfA01 ;
					if ( e in interAry )
					{
						var Ndef = null ;
						var def = interAry.defFlag ?
								(
									function ()
									{
										Ndef = exterAry[ e ] ;
										return interAry[ e ] ;
									}
								)() 
								:
								(
									function ()
									{
										Ndef = interAry[ e ] ;
										return exterAry[ e ] ;
									}
								)() ;

						exterAry[ e ] = Object.assign ( def , Ndef ) ;
					} ;
				} ;
				
				var nonp = exterAry.hasNullPointer () ;
				return nonp.unit ;
			} 
		} ,
		"haveAnyProperty" :
		{
			enumerable : false ,
			configurable : false ,
			writable : true ,
			value : function ( )
			{
				var res = null ;
				for ( var k in this )
				{
					if ( this.hasOwnProperty ( k ) )
					{
						return true ;
					} ; 
				} ;
				return false ;
			} 
		} ,
		"hasNullPointer" :
		{
			enumerable : false ,
			configurable : false ,
			writable : false ,
			value : function ( unitsGroup ) 
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				unitsGroup = ( args.length == 1 && unitsGroup && unitsGroup != undefined && unitsGroup != null ) ? 
							unitsGroup = args[ args.length - 1 ] : 
							this ;
				var unitA = ( unitsGroup.fnStr_verifyType () === "Object" ) ? 
							new Object () : 
							( unitsGroup.fnStr_verifyType () === "Array" ) ?
							new Array () :
							null ;
				var unitB = null ;
				var flag = false ;
				var nullPointInc = { indicatorA : 0 , indicatorB : 0 , } ; 
				var unitsGroupLength = { indicatorA : 0 , indicatorB : 0 , } ;
				hfa01 : for ( var indicatorA in unitsGroup ) 
				{
					++unitsGroupLength.indicatorA ;
					if ( !unitsGroup[ indicatorA ] ) ++nullPointInc.indicatorA ;

					if ( nullPointInc.indicatorA == unitsGroupLength.indicatorA ) 
					{ 
						return { unit : null , flag : true , } ; 
					} ;
					if 
					( 
						!unitsGroup[ indicatorA ] 
						|| !unitsGroup.hasOwnProperty( indicatorA ) 
					) 
					{
						console.log( "unitsGroup[%o]:" , indicatorA , unitsGroup[ indicatorA ] ) ;
	// 					throw new TypeError( unitsGroup + "[" + indicateA +"]" + "nullPoint" ) ;
						flag = true ;
						
						continue hfa01 ;
					} ;
					
					switch ( unitsGroup[ indicatorA ].fnStr_verifyType () )
					{
						case "Object" :
							unitB = new Object () ;
						break ;
						case "Array" :
							unitB = new Array () ;
						break ;
					} ; 
					hfa02 : for ( var indicatorB in unitsGroup[ indicatorA ] ) 
					{
						++unitsGroupLength.indicatorB ;
						if ( !unitsGroup[ indicatorA ][ indicatorB ] ) ++nullPointInc.indicatorB ;

						if 
						( 
							!unitsGroup[ indicatorA ][ indicatorB ] 
							|| !unitsGroup[ indicatorA ].hasOwnProperty( indicatorB )  
						) 
						{
							console.log( "unitsGroup[ indicatorA ][ indicatorB ]" , unitsGroup[ indicatorA ][ indicatorB ] ) ;
							flag = true ;
							
							continue hfa02 ;
						} ;

						unitB[ indicatorB ] = unitsGroup[ indicatorA ][ indicatorB ] ;
					} ;
					if ( !unitB.haveAnyProperty () ) continue hfa01 ;
					unitA[ indicatorA ] = unitB ;
				} ;
				return { 
							unit : unitA.haveAnyProperty () ? unitA : null , 
							flag : flag , 
						} ;
			} 
		} ,
		"hasSubTagName" :
		{
			enumerable : false ,
			configurable : false ,
			writable : false ,
			value : function ( subTagName , domCollection ) 
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				domCollection = ( args.length == 2 && domCollection ) ?
								domCollection = args[ args.length - 1 ] : 
								this ;
				
				for ( var subDom in domCollection ) 
				{ 
					if ( domCollection[ subDom ].tagName == subTagName && domCollection.hasOwnProperty( subDom ) ) 
					{
						return true ;
					} ; 
				} ;
				return false ;
			} 
		} ,

	}
	
) ;

Object.defineProperties
(
	Array.prototype ,
	{
		"fnNum_getLength" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : Object.prototype.fnNum_getLength ,
		} ,
		"fnAry_combinePgpNestPgp" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : Object.prototype.fnAry_combinePgpNestPgp ,
		} , 
		"defFlag" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value :  null ,
		} ,
		
	}
	
) ;
 
Object.defineProperties
(
	String.prototype ,
	{
		
		"getUrlFileName" : 
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( unitsGroup )
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				unitsGroup = ( args.length == 1 && unitsGroup && unitsGroup != undefined && unitsGroup != null ) ? 
						 unitsGroup = args[ args.length - 1 ] : 
						 this && typeof this == "string" ?
						 this :
						 null ;
				var str_url = unitsGroup ? unitsGroup : 
							( document.str_url && document.str_url != "" ) ?
							document.str_url : 
							location.href ;

				var fileName = "" ;
				if ( str_url.charAt ( str_url.length - 1 ) == "/" 
					&& str_url.lastIndexOf ( "/" ) == str_url.length - 1 )
				{
					fileName = "index" ;
				}
				else if ( str_url.lastIndexOf ( "/" ) != -1 )
				{
					fileName = str_url.substr ( str_url.lastIndexOf ( "/" ) + 1 ) ;
				}  ;
				return fileName ;
			} 
		} ,
		"crtTagEles" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( attrObj , tagType ) 
			{
	// 			if ( arguments.hasNullPointer().flag ) return ;
				var args = Array.prototype.slice.call ( arguments ) ;
	// 			if ( !$args ) return  ;
	// 			tagType = ( args.length == 2 && tagType ) ? 
	// 					  tagType = args[ args.length - 1 ] : 
	// 					  this ;
				tagType = this.parseArgs ( arguments , 2 , tagType ) ;
				var ele = document.createElement ( tagType ) ;
				for ( var _key in attrObj )
				{
					ele.setAttribute ( _key , attrObj[ _key ] ) ;
				} ;
				return ele ;
			} 
		} ,
		"getSchema" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( schemaRegStr , virtualPathCount , urlStr ) 
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				var urlStrDef = location.href ? location.href : document.URL ? document.URL : urlStr ? urlStr : this ;
				urlStr = ( args.length == 3 && urlStr ) ? 
						urlStr = args[ args.length - 1 ] : 
						typeof this === 'string' ?
						this :
						urlStrDef ;
				var virtualPathPatt = "\\/\\w+" ;
				virtualPathCount = 
				( 
					!virtualPathCount && virtualPathCount === undefined && virtualPathCount == null 
				) 
				?
				virtualPathPatt 
				:
				( /\d+/ig ).test ( virtualPathCount.toString () ) && !( /([^\d])+/ig ).test ( virtualPathCount.toString () ) 
				? 
				( 
					function () 
					{
						// virtualPathCount = virtualPathCount.match ( /\d+/ig ) ;
						virtualPathCount = new Number ( virtualPathCount ) ;
						var str = "\\/\\w+" ;
						for ( var i = 0 ; i < virtualPathCount - 1 ; i++ ) 
						{
							virtualPathPatt += virtualPathPatt ;
						} ;
						return virtualPathPatt ;
					} 
				)() 
				: 
				( 
					typeof virtualPathCount === "string" && window.isNaN( virtualPathCount ) 
				) 
				?
				virtualPathCount.indexOf ( "/" ) == 0 ? virtualPathCount : "/" + virtualPathCount 
				:
				virtualPathPatt ;
				
				var schemaRegStrDef = "^file:\\/\\/\\/[A-Za-z]:|(^http:\\/\\/(127.0.0.1:\\d+|localhost:\\d+|\\w+.\\w+.\\w+)?)?" ;
				schemaRegStr = ( schemaRegStr !== undefined && schemaRegStr !== null ) ? schemaRegStr : schemaRegStrDef ;

				
				var regExpObj = new RegExp ( schemaRegStr += virtualPathCount  , "ig" ) ;
				var regResStr = urlStr.match ( regExpObj ) ;
				return regResStr ;
			} 
		} ,
		"fnPgp_getUrl" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( num )
			{
				var args = Array.prototype.slice.call ( arguments ) ;
				let str_this = this ;
				var str_all = location.href ? location.href : document.URL ? document.URL : urlStr ? urlStr : str_this ;
				
				// let str_all = "<img src = 'http://www.abc.com/firesniper/adb/def/ghi/jkm/aaa.html' />" ;
				let str_schemaReg = `((?:http|https):)?\\/\\/(?:localhost|127.0.0.1|[\\w\\.-]+):?\\d*(?:\\\\|\\/)?` ;
				let reg_schemaReg = new RegExp ( str_schemaReg , `ig` ) ;
				let str_virRegPatt = `([\\w-]+(?:\\\\|\\/))` ;
				let str_virReg = str_virRegPatt + `{` + 0 + `,` + num + `}` ;
				console.log ( "str_virReg:" , str_virReg ) ;
				let str_fileNameReg = `([\\w\\.-]+(?:\\\\|\\/)?)?` ;
				let reg_virReg = new RegExp ( str_virReg , `ig` ) ;
				console.log ( "str_all.match ( reg_virReg ):" , str_all.match ( reg_virReg ) ) ;
				let str_urlReg = `(?:'|")?` + str_schemaReg + str_virRegPatt + "*" + str_fileNameReg + `(?:'|")?` ;
				// let ary_url_str = str_all.match ( /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.-]+):?\d*(?:\\|\/)?([\w\.-]+(?:\\|\/)?)*(?:'|")?/ig ) ;
				let ary_url_str = str_all.match ( new RegExp ( str_urlReg , `ig` ) ) ;
				console.log ( "ary_url_str:" , ary_url_str ) ;
				let ary_schema_str = ary_url_str[ 0 ].match ( reg_schemaReg ) ;
				console.log ( "ary_schema_str:" , ary_schema_str ) ;
				let str_start = ary_url_str[ 0 ].indexOf ( ary_schema_str [ 0 ] ) + ary_schema_str [ 0 ].length ;
				console.log ( "str_start:" ,  str_start ) ;
				let str_fd = ary_url_str[ 0 ].slice ( str_start ) ;
				console.log ( "str_fd:" , str_fd ) ;
				let ary_virPath_str = str_fd.match ( reg_virReg ) ;
				console.log ( "ary_virPath_str:" , ary_virPath_str ) ;
				let ary_scmVir_str = str_all.match 
				(
					// /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.]+)((?:\\|\/)\w+){0,4}(?:'|")?/ig 
					new RegExp ( str_schemaReg + str_virReg ) 
				) ;
				console.log ( "ary_scmVir_str:" , ary_scmVir_str ) ;
				return {
					"ary_url_str" : ary_url_str ,
					"ary_schema_str" : ary_schema_str ,
					"ary_virPath_str" : ary_virPath_str ,
					"ary_baseUrl_str" : ary_scmVir_str
				} ;
			} 
		} ,
		"suffix" : 
		{
			enumerable : false ,
			configurable : true ,
			writable : false , 
			value : function ( jectStr )
			{
				// console.log( "arguments:",arguments );
				var args = Array.prototype.slice.call ( arguments ) ;
				jectStr = ( args.length == 1 && jectStr ) ? 
						jectStr = args[ args.length - 1 ] : 
						this ;
				// console.log("jectStr:",jectStr );
				var regRes  = jectStr.match ( /(?:\.\w+)/ig ) ;
				return regRes[ regRes.length - 1 ] ;

			}
		} ,
		"prefix" : 
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( jectStr ) 
			{
				var args = Array.prototype.slice.call( arguments ) ;
				jectStr = ( args.length == 1 && jectStr ) ? 
						jectStr = args[ args.length - 1 ] : 
						this ;
				
				var prefix = jectStr.match ( /\.{0,1}\/|http:\/\// )[ 0 ] ;
				return prefix ;
			}
		} ,
		
		

	}
) ;
 



Object.defineProperties
(
	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
	Date.prototype ,
	{
		Format :
		{
			enumerable : false ,
			configurable : true ,
			writable : false ,
			value : function ( fmt )   
			{ //author: meizz   
			var o = {   
				"M+" : this.getMonth()+1,                 //月份   
				"d+" : this.getDate(),                    //日   
				"h+" : this.getHours(),                   //小时   
				"m+" : this.getMinutes(),                 //分   
				"s+" : this.getSeconds(),                 //秒   
				"q+" : Math.floor((this.getMonth()+3)/3), //季度   
				"S"  : this.getMilliseconds()             //毫秒   
			};   
			if(/(y+)/.test(fmt))   
				fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
			for(var k in o)   
				if(new RegExp("("+ k +")").test(fmt))   
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			return fmt;   
			}
		}
	}
) ;

Object.defineProperties
(
	Function.prototype ,
	{
		"callerArgs" : 
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ()
			{

				if ( typeof this !== "function" )
				{
					throw new TypeError ( "type funtion" ) ;
				} ;
				var thisArgs = Array.prototype.slice.call ( this.arguments ) ;
				// console.log("this:",thisArgs);
				// console.log("this:",thisArgs[0]);
				// console.log("this:",thisArgs.callee);
				// console.log("this:",thisArgs.hasOwnProperty("callee"));
				var thisCallerArgs = Array.prototype.slice.call ( this.caller.arguments ) ;
				var argsObj = null ;
				var argsAry = null ; 
				if 
				( 
					this.caller 
					&& thisCallerArgs 
					&& thisCallerArgs == thisArgs[ 0 ] 
				)
				{
					argsObj = thisCallerArgs ;

				}
				else if ( thisCallerArgs != thisArgs[ 0 ] )
				{
					argsObj = thisArgs[ 0 ] ;

				} ;

				argsAry = Function.operateType.fnAry_pgpToAry ( argsObj ) ;
				// console.log("args:",argsAry);
				return argsAry ;
			}
		}
		
	}
) ;

 

Object.defineProperties
(
	Boolean.prototype ,
	{
		"isAsynLoadFn" :
		{
			eumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( coupleFnObj , isAsyn ) 
			{
				try
				{
					isAsyn = this ? this : isAsyn ;
					isAsyn =  ( isAsyn !== undefined && isAsyn !== null && typeof isAsyn === "boolean" ) ? isAsyn : false ;
				}
				catch ( e )
				{
					throw new TypeError ( "is boolean type error" ) ;
				} ;

				var callBackFn = null ;
				switch ( isAsyn ) 
				{
					case true :
						callBackFn = coupleFnObj.Asyn ;
					break ;
					case false :
						callBackFn = coupleFnObj.Syn ;
					break ;
					
				} ;
				return callBackFn ;
			}
		}
	}
) ;

if ( "baseURI" in document == false ) 
{
	Object.defineProperty(
		document ,
		"baseURI" ,
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : (  document.querySelector ( "base" ) 
						&& "href" in document.querySelector ( "base" ) ?
						document.querySelector ( "base" ).href : "" ) ,
		} 
	) ;
} ;
Object.pgp_envOpt = {} ;
Object.defineProperties
(
	Object.pgp_envOpt ,
	{
		/*"dev" :
		{
			enumerable : true ,
			configurable : true ,
			writable : true ,
			value : 
			{
				ary_indicate : [ "localhost" , "127.0.0" ] ,
				pgp_servBaseUrl : "http://localhost:8080/mall_a01/" ,
				pgp_browBaseUrl : "http://localhost:3000/"
			}
		} ,
		"pro" :
		{
			enumerable : true ,
			configurable : true ,
			writable : true ,
			value : 
			{
				ary_indicate : [ "www.firesnip.com" , "github" ] ,
				pgp_servBaseUrl : "http://www.spitc-cn.com/mall_a01_ol/" ,
				pgp_browBaseUrl : "http://www.firesnip.com/light7-mall_c01_ol/"
			}
		} */
	}
) ;
Object.defineProperties
(
	Object ,
	{
		"fn_envOpt" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( pgp_params )
			{
				var pgp_option = pgp_params.pgp_envOpt ;
				// String.pgp_envOpt = pgp_option ;
				var res = { mem : null , length : 0 } ;
				for ( var a in pgp_option )
				{
					var length = Object.keys ( pgp_option [ a ] ).length ;
					if ( length >= res.length )
					{
						res.length = length ;
						res.mem = a ;
					} ;
				} ;
				console.log ( "res:" , res ) ;
				String.envParams = {} ;
				var pgp = {} ;
				for ( var column in pgp_option [ res.mem ] )
				{
					pgp [ column ] = {} ;
					for ( var l in pgp_option )
					{
						pgp [ column ] [ l ] = pgp_option [ l ] [ column ] ;
					} ;
				}
				String.envParams = pgp ;
				console.log ( "String.envParams:" , String.envParams ) ;
				 
			} 
		} 
	}

) ;
Object.defineProperties
(
	Object ,
	{
		
		"fnPgp_getEnvState" :
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( pgp_params )
			{

				/*var envScmAry = String.prototype.getSchema ( null , 3 ) ;
				console.log ( "envScmAry:" , envScmAry ) ;
				envScmAry[ 0 ] + envScmAry[ 1 ] ;*/
				var num_virPath = pgp_params.num_virPath || 2 ;
				var pgp_envOpt	= pgp_params.pgp_envOpt || String.pgp_envOpt ;

				var pgp_env = String.prototype.fnPgp_getUrl ( num_virPath ) ;
				console.log ( "pgp_env:" , pgp_env ) ;
				var str_schema		= pgp_env.ary_schema_str [ 0 ] ;

				var str_envOptIndi = "" ;
				var pgp_newNull_envOpt = {} ;
				for ( var a in pgp_envOpt )
				{
					bol_envOptIndi =  
					( 
						new RegExp 
						( 
							"(?:" 
							+ pgp_envOpt [ a ] [ "ary_indicate" ] .join ( "|" ) 
							+ ")" 
							, 
							"ig" 
						) 
					).test ( str_schema ) ;
					if ( bol_envOptIndi )
					{
						str_envOptIndi = a ;
						pgp_newNull_envOpt = pgp_envOpt [ a ] ;
					} ;
				} ;
				window.pgp_envState = 
				{
					"str_baseUrl" 			: pgp_env.ary_baseUrl_str [ 0 ] ,
					"str_schema"			: str_schema , 
					"str_url" 				: pgp_env.ary_url_str [ 0 ] ,
					"str_virPath" 			: pgp_env.ary_virPath_str [ 0 ] ,
					"str_envOptIndi"		: str_envOptIndi ,
					"pgp_envOpt" 			: pgp_newNull_envOpt
				} ; 	
				console.log ( "window.pgp_envState:" , window.pgp_envState ) ;
				
			}  
		}
	}
) ;
/* tMall_lib */

}() ;




;( function ( $html , $head , $body , fnPgp_getDefUrl ) 
{
"use strict" ;

$html = "0" in $html && $html[ 0 ] ? $html[ 0 ] : $html ;
$head = "0" in $head && $head[ 0 ] ? $head[ 0 ] : $head ;
$body = "0" in $body && $body[ 0 ] ? $body[ 0 ] : $body ;
if ( "0" in $body && $body[ 0 ] ) 
{
	var $script = $body.getElementsByTagName( "script" ) ;
	$script = "0" in $script && $script[ 0 ] ? $script[ 0 ] : $script ;
} ;

var classPgp = 
{
	scIns : function ( )
	{
		classPgp.scIns.prototype.insObj = this.__proto__ ;
		classPgp.scIns.prototype.inc = { a : 0 , b : 0, c : 0 } ;
		classPgp.scIns.prototype.tmpv = { a : null } ;

		classPgp.scIns.prototype.generateEle = function ( str_url , suffix , linkPaireGroup ) 
		{
			var defLinkPaireGroup = {
							"href" : str_url ,
							"type" : "text/css" ,
							"rel" : "stylesheet"
						} ;
			linkPaireGroup = linkPaireGroup ? linkPaireGroup : defLinkPaireGroup ;
			switch ( suffix )
			{

				case ".css" :
					return str_url.crtTagEles(
						
						linkPaireGroup ,
						"link" 
					) ;
				break ;

				case ".js" :
					return str_url.crtTagEles(
						
						{
							"src" : str_url ,
							"type" : "text/javascript" ,
						} ,
						"script" 
					) ;
				break ;
			}
		} ;

		classPgp.scIns.prototype.crtEleObj = function ( urlPgp , tagName )
		{
			// console.log("urlPgp:", urlPgp) ;
			if ( !urlPgp || urlPgp == undefined || urlPgp == null ) 
			{
				throw new TypeError( "null point error" ) ;
				// return false ;
			} ;
// 			urlPgp = urlPgp.fnAry_pgpCvtAry() ;
			var cssEleObj = {} ;
			var suffix = "" ;
			var ele = null ;
			var eleAry = [] ;
			var eleObj = {} ;
			af01 : for ( var o in urlPgp )
			{
				eleAry = [] ;
				if ( urlPgp.hasOwnProperty( o ) !== true ) continue af01 ;
				af02 : for ( 
					var i in urlPgp[ o ]  
				)
				{
					if ( urlPgp[ o ].hasOwnProperty( i ) !== true ) continue af02 ;
					// console.log( urlPgp[ o ][ i ] );
					var paireUnit = urlPgp[ o ][ i ] ;
					switch ( paireUnit.fnStr_verifyType(  ) ) 
					{
						case "String" :
							// console.log( "suffix:" , paireUnit.suffix(  ) );
							suffix = paireUnit.suffix(  ) ;
							ele = classPgp.scIns.prototype.insObj.generateEle( paireUnit , suffix ) ;
						break ;

						case "Object" :
							tagName = "href" in paireUnit ?
									  "link" :
								  	  "src" in paireUnit ?
								  	  "script" :
								  	  "meta" ;
							ele = String.prototype.crtTagEles(
								paireUnit ,
								tagName  
							) ;
						break ;
					} ;
					// console.log("ele:" ,ele);
// 					eleAry[ i ] = ele ;
					eleAry.push( ele ) ;
				}
				eleObj[ o ] = eleAry ;
			}
			// console.log("eleObj:" , eleObj);
			return eleObj ;
		} ;

		classPgp.scIns.prototype.load_sc = function ( scArr , label , isAsyn ) 
		{
			
			var inc = { a : 0 , b : 0 , c : 0 , } ;
			// console.log("label:" , classPgp.scIns.prototype.insObj.label);

			var fn = Function.isAsynLoadFn ( classPgp.scIns.prototype.appendSc , isAsyn ) ;
			fn ( scArr[ label ] , label , inc ) ;
		} ;
		classPgp.scIns.prototype.appendSc = function ( scArr , label , isAsyn , inc ) 
		{
			inc = 
			inc ? 
			inc : 
			( function ( label ) 
				{
					var obj = {} ;
					obj[ label ] = 0 ;
					return obj ;
				}
			)( label ) ;
			
			var mainCallBack = 
			{
				Syn : function ( scArr , label , inc ) 
				{
					if ( scArr[ label ] == null || scArr[ label ] === undefined || inc[ label ] >= scArr[ label ].length ) 
					{
						inc[ label ] = 0 ;
						return ;
					} ;

					// console.log( "scArr[this.inc[label]]:" , scArr[ label ][ inc[ label ] ] );
					var scEle = scArr[ label ][ inc[ label ] ] ;
	
					var domGovern = null ;
					var domParent = "" ;
					var isAsyn = null ;
					var tagType = ( "href" in scEle ) ? 
								  scEle.href.suffix() : 
								  ( "src" in scEle ) ?
								  scEle.src.suffix() :
								  "meta" ;
					if ( tagType == ".css" || tagType == ".js" )
					{
						isAsyn = false ; 
					} 
					else if ( tagType == ".ico" || tagType == ".png" || tagType == "meta" )
					{
						isAsyn = true ; 
					} ;

					if ( "tagName" in scEle ) 
					{
						var eleTagName =  scEle.tagName ;
			  				   
					} 
					else 
					{
						throw new TypeError ( "necessary htmlElement" ) ;
					} ;	
					if ( domParent = scEle.getAttribute ( "domParent" ) )
					{
						domParent = domParent ;
						// console.log( "domParent :" , domParent ) ;
					}
					
					switch ( eleTagName ) 
					{
						case "LINK" :
							domGovern = 
							domParent 
							?
							(
								function ()
								{
									// var domGovern = null ;
									switch ( domParent )
									{
										case "head" :
											return $head ;
											break ;
										case "body" :
											return $body ;
											break ;
									} ;
								}
							)() 
							:
							$head ;
						break ;
						case "META" :
							domGovern = $head ;
						break ;
						case "SCRIPT" :
							domGovern = 
							!domParent 
							? 
							$body :
							domParent == "head" 
							?
							$head : 
							$body ;
										
						break ;
					} ;
					var synCbFn = function ()
					{
						if ( inc[ label ] < scArr[ label ].length ) 
						{
							inc[ label ] ++ ;
							mainCallBack.Syn( scArr , label , inc ) ;
						} ;
					} ;
					domGovern.appendChild ( scEle ) ;
					if ( isAsyn )
					{
						synCbFn () ;
					} 
					else 
					{
						scEle.addEventListener
						(
							"load" ,
							function ( event ) 
							{

// 								console.log( "this:" , this , event );

								// if ( inc[ label ] < scArr[ label ].length ) 
								// {
								// 	inc[ label ]++ ;
								// 	mainCallBack.Syn( scArr , label , inc ) ;
								// } ;
								synCbFn() ;

							}
						) ;
					} ;
					
				} ,
				Asyn : function ( scArr , label , inc ) 
				{
					for ( var i = 0 ; i < scArr[ label ].length ; i ++ )
					{
						$head.appendChild ( scArr[ label ][ i ] ) ;
					} ;
				} ,
			} ;
			var callBackFn = isAsyn ? mainCallBack.Asyn : mainCallBack.Syn ;

			callBackFn ( scArr , label , inc ) ;
		} ;

		classPgp.scIns.prototype.distribute = 
		function ( urlPgp , isAsyn , tagName )
		{
			// console.log("arguments:" , arguments );
			isAsyn = isAsyn && typeof isAsyn === "boolean" ? isAsyn : false ;
			// if ( urlPgp.fnStr_verifyType() == "Object" )  urlPgp = urlPgp.fnAry_pgpCvtAry() ;
			var urlPgp = classPgp.scIns.prototype.insObj.crtEleObj ( urlPgp , tagName ) ;

			var mainCallBack = 
			{
				Syn : function ( urlPgp )
				{
					try
					{

						var recursionLoop = function ( urlPgp , indicator , isAsyn ) 
						{
							indicator = indicator ? indicator : 0 ; 
							if ( indicator >= urlPgp.length ) return ;

							classPgp.scIns.prototype.appendSc( urlPgp , indicator , isAsyn ) ;
							recursionLoop ( urlPgp , ++indicator , isAsyn ) ;
// 							void function () 
// 							{
// 								window.setTimeout(
// 									function ( urlPgp , indicator , isAsyn ) 
// 									{
// 										recursionLoop( urlPgp , ++indicator , isAsyn ) ;
// 									} , 
// 									100 
// 								) ;
// 							}() ;
						} ;
// 						recursionLoop( urlPgp , 0 , false ) ;
						for ( var indicator in urlPgp ) 
						{
							classPgp.scIns.prototype.appendSc( urlPgp ,  indicator  , false ) ;

						} ;
					}
					catch ( e )
					{
						console.log("e:",e);
					} ;

				} ,
				Asyn : function ( urlPgp ) 
				{
					try
					{

						for ( var indicator in urlPgp ) 
						{
							classPgp.scIns.prototype.appendSc( urlPgp ,  indicator  , false ) ;
						} ;
					}
					catch ( e )
					{
						console.log("e:",e);
					} ;

				} ,
			} ;
			var callBackFn = isAsyn ? mainCallBack.Asyn : mainCallBack.Syn ;

			callBackFn ( urlPgp ) ;
		} ;

	} ,
	

} ;
window.pgp_defUrl = {} ;
var append_mls = 
{
	 
	config : function ( pgp_params )
	{
		var pgp_defUrl	= pgp_params.pgp_defUrl ;
		var num_virPath	= pgp_params.num_virPath ;
		var pgp_envOpt	= pgp_params.pgp_envOpt ;
		Object.fn_envOpt ( { "pgp_envOpt" : pgp_envOpt } ) ;
		Object.fnPgp_getEnvState 
		( 
			{ 
				"num_virPath" : num_virPath ,
				"pgp_envOpt" : pgp_envOpt
			} 
		) ;
		window.pgp_defUrl = fnPgp_getDefUrl ( { "pgp_defUrl" : pgp_defUrl } ) ;
		
	} ,
	appendMeta : function ( urlPgp , isAsyn )
	{
		var scIns_InsObj = scInsSinIns ;
		// console.log("scIns_InsObj:",scIns_InsObj);
		
		var resUrlObj = 
		urlPgp != null && urlPgp != window.pgp_defUrl && urlPgp.meta 
		&& window.pgp_defUrl.meta
		? 
		function () 
		{
			if 
			( !window.pgp_defUrl.script || window.pgp_defUrl.meta.fnNum_getLength() == 0 ) 
			return urlPgp.meta ;
			resUrlObj = window.pgp_defUrl.meta.fnAry_combinePgpNestPgp ( urlPgp.meta ) ;
			// resUrlObj = window.pgp_defUrl.meta.concat( urlPgp.meta ) ;
			var nonp = resUrlObj.hasNullPointer () ;
			return nonp.unit ;
		} () 
		: 
		window.pgp_defUrl.meta ; 
		
		var metaEleObj = scIns_InsObj.crtEleObj ( resUrlObj ) ;
		scIns_InsObj.appendSc ( metaEleObj , 0 , isAsyn ) ;
	} ,
	appendLink : function ( urlPgp , isAsyn )
	{
		var scIns_InsObj = new classPgp.scIns () ;
// 		console.log("scIns_InsObj:",scIns_InsObj) ;
		
		var resUrlObj = urlPgp != null && urlPgp != window.pgp_defUrl && urlPgp.link ? 
			( 
				function () 
				{
					if 
					( !window.pgp_defUrl.script || window.pgp_defUrl.link.fnNum_getLength () == 0 ) 
					return urlPgp.link ;

					var resUrlObj2 = window.pgp_defUrl.link.concat ( urlPgp.link ) ;
					// console.log( "resUrlObj2:" , resUrlObj2 ) ;
					var nonp = resUrlObj2.hasNullPointer () ;
					return nonp.unit ;
				}
			)() : 
			window.pgp_defUrl.link ; 
		// console.log( "resUrlObj : " , resUrlObj ) ;
		scIns_InsObj.distribute ( resUrlObj , isAsyn ) ;
	} ,
	appendScript : function ( urlPgp , isAsyn )
	{
		$body = document.getElementsByTagName ( "body" )[ 0 ] ;
		$script = $body.getElementsByTagName ( "script" );
		// console.log("arguments:",arguments);
		var scIns_InsObj = new classPgp.scIns () ;
		// console.log("scIns_InsObj:",scIns_InsObj);
		
		var resUrlObj = urlPgp != null && urlPgp != window.pgp_defUrl && urlPgp.script ? 
			( 
				function () 
				{
					if 
					( !window.pgp_defUrl.script || window.pgp_defUrl.script.fnNum_getLength == 0 ) 
					return urlPgp.script ;
					if ( "length" in window.pgp_defUrl.script || window.pgp_defUrl.script.constructor.name == "Array" )
					{
						resUrlObj = window.pgp_defUrl.script.concat ( urlPgp.script ) ;
						var nonp = resUrlObj.hasNullPointer () ;
					} ;
					return nonp.unit ;
				}
			)() : 
			window.pgp_defUrl.script ; 
		// console.log( "resUrlObj:" ,resUrlObj ) ;
		scIns_InsObj.distribute ( resUrlObj , isAsyn ) ;
	} ,

	appendBase : function ( schemaRegStr , virtualPathCount , baseHref ) 
	{
		if ( document.querySelector ( "base" ) ) return ;
		var args = Array.prototype.slice.call ( arguments ) ;
		var regResStr = String.prototype.getSchema ( schemaRegStr , virtualPathCount ) ;
		
		var baseEle = document.createElement ( "base" ) ;

		baseEle.setAttribute ( "href" , ( args.length == 1 ) ? baseHref = args[ 0 ] : baseHref = regResStr[ 0 ] + "/"  ) ;
		$head.insertBefore ( baseEle , $head.firstElementChild ) ;

	} ,
	appendIni : function ( urlPgp , isAsyn ) 
	{
		urlPgp = urlPgp ? urlPgp : null ;
		// console.log( "urlPgp:" , urlPgp ) ;
		isAsyn = isAsyn ? isAsyn : false ;
		$append_mls.appendMeta ( urlPgp , true ) ;
		$append_mls.appendLink ( urlPgp , true ) ;

		document.onreadystatechange = 
		function ()
		{
			if ( document.readyState == "interactive" )
			{
				// console.log("document.readyState:" , document.readyState )
				window.$body = document.getElementsByTagName ( "body" )[ 0 ] ;
				if ( "length" in $body && $body.length >= 1 ) 
				{
					window.$body = "0" in $body && $body[ 0 ] ? $body[ 0 ] : $body ;
					// console.log( "$body: " , $body ) ;
					$append_mls.appendScript ( urlPgp , true ) ;
				} ;
			} ;
		} ;

	} ,
	invokeJsonp : function ( params ) 
	{
// 		if ( str_url.lastIndexOf( "/" ) != str_url.length - 1  
// 			&& str_url[ str_url.length - 1 ] != "/" )
// 		{
// 			str_url += "/" ;
// 		} ;
		var str_url 		= params.str_url ;
		var pgp_jsonpCb 	= params.pgp_jsonpCb ;
		var fn_callBack 	= params.fn_callBack ;
		var jsonpField 	= params.jsonpField ;

		if ( !str_url || str_url == null || str_url == undefined || str_url == "" ) throw new ReferenceError ( "url is null " ) ; 
		var str_timeStamp = ( new Date() ).Format ( "yyyy_MM_dd_hh_mm_ss_S" ) 
						+ parseInt ( Math.random( 9 ) * 10 ) ;

		var str_defJsonpCbKey = "jsonp" , str_defJsonpCbVal = "JSON_CALLBACK" ;
		var pgp_defJsonpCb = { "jsonp" : "JSON_CALLBACK" } ;
		var pgp_jsonpCb = pgp_jsonpCb ? pgp_jsonpCb : pgp_defJsonpCb ;
		var str_jsonpCbKey = 
		(
			function ()
			{
				
				var res = ( res = Object.keys( pgp_jsonpCb )[ 0 ] ) ? res : key ;
				return res ;
			}
		)() ;
		var str_jsonpCbKey = str_jsonpCbKey ? str_jsonpCbKey : str_defJsonpCbKey ;

		var fnNameExp2 = /(?:\?|&)jsonp=?\w+/ ;
		var exp_urlJsonpCbPaireSec = new RegExp ( "(?:\\?|&)" + str_jsonpCbKey + "=?\\w{0,}" , "i" ) ;
		
		if ( exp_urlJsonpCbPaireSec.test ( str_url ) ) 
		{
			var urlJsonpCbPaireSec = exp_urlJsonpCbPaireSec.exec ( str_url )[ 0 ] ;

			var	exp_urlJsonpCbVal = new RegExp ( "[^?&" + str_jsonpCbKey + "=]" , "ig" ) ;
			var	str_urlJsonpCbVal = urlJsonpCbPaireSec.match ( exp_urlJsonpCbVal ) ;
			str_urlJsonpCbVal = str_urlJsonpCbVal ? str_urlJsonpCbVal.join ( "" ) : str_jsonpCbKey ;
		}
		else
		{
			var	str_urlJsonpCbVal = str_defJsonpCbVal ;
		} ;
		
		
		var str_optJsonpCbVal = 
		( 
			function ()
			{
				var key = Object.keys ( pgp_jsonpCb ) [ 0 ] ;
				var res = ( res = pgp_jsonpCb[ str_jsonpCbKey ] ) ? res : pgp_jsonpCb[ key ] ;
				var val = typeof res == "string" && res.match ( /[\w\$]?/ig ) 
							&& res.match ( /[\w$]?/ig ).join ( "" ) != "" ?
							res.match ( /[\w$]?/ig ).join ( "" ) : 
							null ;

				return val ;
			}
		)() ;
		var	str_jsonpCbVal = str_optJsonpCbVal ? str_optJsonpCbVal : str_urlJsonpCbVal ? str_urlJsonpCbVal : str_defJsonpCbVal ;
		var str_randomFnName = str_jsonpCbVal + str_timeStamp ;
		if ( str_url.indexOf ( "?" ) == -1 ) 
		{
			var str_repUrl = str_url += "?" + str_jsonpCbKey + "=" + str_randomFnName ;
		} 
		else
		{
			if ( str_url.lastIndexOf ( "?" ) == str_url[ str_url.length - 1 ] ) 
			{
				var str_repUrl = str_url += str_jsonpCbKey + "=" + str_randomFnName ;
			}
			else if ( str_url.indexOf ( str_jsonpCbKey ) == -1 ) 
			{
				var str_repUrl = str_url +=  ( "&" + str_jsonpCbKey + "=" + str_randomFnName ) ;
			}
			else if ( str_url.indexOf ( str_jsonpCbKey + "=" ) != -1 ) 
			{
				var reg = new RegExp ( str_jsonpCbKey + "=\\w{0,}" , "i") 
				var str_repUrl = str_url.replace ( reg , str_jsonpCbKey + "=" + str_randomFnName ) 
			}
			else 
			{
				var reg = new RegExp ( str_jsonpCbKey + "\\w{0,}" , "i") ;
				var str_repUrl = str_url.replace ( reg , str_jsonpCbKey + "=" + str_randomFnName ) ;
			} ;
			console.log( "str_repUrl:" ,str_repUrl[0] ) ; 
		} ;

		var str_randomTagId = "id_" + str_randomFnName ;
		var dom_scEleA2 = 
		"script".crtTagEles
		( 
			{ 
				src : str_repUrl , 
				id : str_randomTagId , 
				type : "text/javascript" , 
				charset : "utf-8" 
			} 
		) ;
		
		$head.appendChild ( dom_scEleA2 ) ;
		
		var dom_randomTag = document.getElementById ( str_randomTagId ) ;
		// console.log("dom_scEleA2:",dom_scEleA2);

		var pgp_priJson = null ;
		window[ str_randomFnName ] = function ( json ) 
		{
			// console.log("skdjfalsdfjkl:" ,json);
			window.pgp_pubJson = pgp_priJson = json ;

			// console.log( "pubjson: " , window.pubjson ) ;
			
			var cbJson = fn_callBack ( json ) ;
			window[ str_randomFnName ] = undefined ;
			dom_randomTag.parentNode.removeChild ( dom_randomTag ) ;
			
			return json ;
		} ;
		

		var pm_a01 = new Promise 
		(
			function ( resolved , rejected )
			{
				/*setTimeout
				(
					function ()
					{
						resolved ( pgp_priJson ) ;
						console.log ( "window.pgp_pubJson:" , pgp_pubJson ) ;
						console.log ( "window.pgp_priJson:" , pgp_priJson ) ;
					} ,
					num_ms
				) ;*/
				var num_ms = 0 ;
				var num_ms_inc = .1 ;
				var numSiv_a01 = window.setInterval
				(
					function ()
					{
						num_ms += num_ms_inc ;
						if ( pgp_priJson )
						{
							console.log ( "pgp_priJson:" , pgp_priJson ) ;
							window.clearInterval ( numSiv_a01 ) ;
							resolved ( pgp_priJson ) ;
							console.log ( "num_ms1:" , num_ms ) ;	
						} ;
					} ,
					num_ms_inc
				) ;
				// console.log ( "num_ms2:" , num_ms ) ;
			} 

		) ;
		/*pm_a01.then
		(
			function ( resolved )
			{
				return resolved ;
			}
		) ;*/
		return pm_a01 ;
		// console.log( "rfjson:" , rfjson ) ;
	} ,

} ;

window.$append_mls = append_mls ;
const scInsSinIns = new classPgp.scIns () ;
window.$scInsSinIns = scInsSinIns ;
// $append_mls.appendBase() ;
// var window.pgp_defUrl = fnPgp_getDefUrl (  ) ;

}
)
(
	document.getElementsByTagName( "html" ) ,
	document.getElementsByTagName( "head" ) ,
	document.getElementsByTagName( "body" ) ,
	fnPgp_getDefUrl 
) ;

;( function detectSysInfo () {
"use strict" ; 
 ;dddfffftryt343333;
if ( !Object.assign ) 
{
	Object.defineProperty(
		Object , 
		"assign" ,
		{
			enumerable : false ,
			configurable : true ,
			writable : true ,
			value : function ( target , firstSource ) 
			{
				"use strict" ;
				if ( target === undefined || target === null )
					throw new TypeError( "Cannot convert first argument to object" ) ;
				var to = Object( target ) ;
				for ( var i = 1 ; i < arguments.length ; i++ ) 
				{
					var nextSource = arguments[ i ] ;
					if ( nextSource === undefined || nextSource === null ) continue ;
					var keysArray = Object.keys( Object( nextSource ) ) ;
					for ( var nextIndex = 0 , len = keysArray.length ; nextIndex < len ; nextIndex++ ) 
					{
						var nextKey = keysArray[ nextIndex ] ;
						var desc = Object.getOwnPropertyDescriptor( nextSource , nextKey ) ;
						if ( desc !== undefined && desc.enumerable ) to[ nextKey ] = nextSource[ nextKey ] ;
					} ;
				} ;
				return to ;
			}
		}
	) ;
} ;

var sysInfo = 
{
	platform : {
		"portable" : null ,
		"desktop" : null
	} ,
	explorerRace : {
		ie : null ,
		chrome : null ,
		firefox : null ,
		opera : null ,
		safari : null
	} ,
	urlState : {
		offLine : null ,
		local : null ,
		internal : null ,
		external : null
	}
} ;
var ua = navigator.userAgent.toLowerCase(); 


var uaReg = 
{
	platform : {
		"portable" : /iPhone|iPad|Android|Windows Phone/i ,
		"desktop" : /Windows|Macintosh/i
	} ,
	explorerRace : {
		"ie" : /msie([\d.]+)/ ,
		"firefox" : /firefox\/([\d.]+)/ ,
		"chrome" : /chrome\/([\d.]+)/ ,
		"opera" : /opera.([\d.]+)/ ,
		"safari" : /version\/([\d.]+).*safari/
	} ,
	urlState : {
		"offLine" : /file\:\/\/\// ,
		"local" : /127.0.0.1|localhost/ ,
		"internal" : /192.168.1.20/ ,
		"external" : /www.spitc-cn.com|spitc-cn.com/
	}
} ;

var iterateUa = function ( uaReg ) 
{
	var uaRegDef = 
	{
		platform : {
			"portable" : /iPhone|iPad|Android|Windows Phone/i ,
			"desktop" : /Windows|Macintosh/i
		} ,
		explorerRace : {
			"ie" : /msie([\d.]+)/ ,
			"firefox" : /firefox\/([\d.]+)/ ,
			"chrome" : /chrome\/([\d.]+)/ ,
			"opera" : /opera.([\d.]+)/ ,
			"safari" : /version\/([\d.]+).*safari/
		} ,
		urlState : {
			offLine : /file\:\/\/\// ,
			local : /127.0.0.1|localhost/ ,
			internal : /192.168.1.20/ ,
			external : /www.spitc-cn.com|spitc-cn.com/
		}
	} ;
	var verifyRes = uaReg.hasNullPointer() ;
	uaReg = ( uaReg && verifyRes.unit ) ? 
			uaReg = Object.assign( uaRegDef , verifyRes.unit ) : 
			uaRegDef ;
	var ua = navigator.userAgent.toLowerCase() ; 
	var lh = "url" in document ? document.url : "href" in location ? location.href : false ; 
	var enveloper = null ;
	var objo = {} ;
	var objj = {} ;
	hfa1 : for ( var o in uaReg ) 
	{
		enveloper = ( o == "platform" || o == "explorerRace" ) ? 
					enveloper = ua : 
					( o == "urlState" ) ? 
					enveloper = lh :
					false ;
		objj = {} ;
		hfa2 : for ( var j in uaReg[ o ] ) 
		{
// 			console.log( "uaReg[ o ][ j ]" , uaReg[ o ][ j ] );
// 			var regLiteral = new RegExp( uaReg[ o ][ j ].toString() ) ;
			var oj2RegRes = enveloper.match( uaReg[ o ][ j ] ) ;
			if ( !uaReg[ o ][ j ] || !oj2RegRes ) continue hfa2 ;
			objj[ j ] = oj2RegRes ;
// 			ary.push( ary[ i ] );
		} ;

		if ( !objj ) continue hfa1 ;
		objo[ o ] = objj ;
	} ;
	console.log( "objo:" , objo );
	sysInfo = objo ;
	return objo ;
} ;
iterateUa( sysInfo ) ;

var detectUserAgent = function ()
{
	var explorer = 
	{
		Type : "" ,
		Temp : ""
	} ;

	var platform = 
	{
		Type : "" ,
		Temp : ""
	} ;
	explorer.Type =
		( explorer.Temp = ua.match( /msie([\d.]+)/ ) ) ? 
		Sys.explorer.ie = explorer.Temp : 
		( explorer.Temp = ua.match( /firefox\/([\d.]+)/ ) ) ? 
		Sys.explorer.firefox = explorer.Temp : 
		( explorer.Temp = ua.match( /chrome\/([\d.]+)/ ) ) ? 
		Sys.explorer.chrome = explorer.Temp : 
		( explorer.Temp = ua.match( /opera.([\d.]+)/ ) ) ? 
		Sys.explorer.opera = explorer.Temp : 
		( explorer.Temp = ua.match( /version\/([\d.]+).*safari/ ) ) ? 
		Sys.explorer.safari = explorer.Temp :
	 undefined ; 
	platform.Type =
		// (s = ua.match(/windows([\s\w]+)/)) ? Sys.plat.windows = s[1]:
		// (s = ua.match(/macintosh([\s\w]+)/))? Sys.plat.macintosh= s[1]:
		( platform.Temp = ua.match( /iPhone|iPad|Android|Windows Phone/i ) ) ? 
		Sys.plat.portable = platform.Temp :
		( platform.Temp = ua.match( /Windows|Macintosh/i ) ) ? 
		Sys.plat.desktop = platform.Temp :
	undefined ;


	console.log("Sys:",Sys);
	
	console.log("explorer:",explorer);
	console.log("platform:",platform);
	// console.log("_uaRelA03:",_uaRelA03);
	console.log("Sys.plat:",Sys.plat);
	for ( var platType in Sys.plat ) 
	{
		console.log('platType:',platType)
	};


};
// detectUserAgent();

var mRootUrl = function () 
{
	var s04 ; 
// 	var RootUrl;
	var _lh = location.href ;
	var _lhmA01 =
		( s04 = _lh.match( /file\:\/\/\// ) ) ?
		Sys.url.offLine = s04[ 0 ] :
		( s04 = _lh.match( /127.0.0.1|localhost/ ) ) ?
		Sys.url.local = s04[ 0 ]:
		( s04 = _lh.match( /192.168.1.20/ ) ) ?
		Sys.url.internal = s04[ 0 ]:
		( s04 = _lh.match( /www.spitc-cn.com|spitc-cn.com/ ) ) ?
		Sys.url.external = s04[ 0 ]:
	0;
	console.log("_lhmA01:",_lhmA01);
	console.log("Sys.url:",Sys.url);
	for ( var iore in Sys.url ) 
	{
		console.log("iore:",iore);
	}
	if ( iore == 'local' || iore == 'internal' )
	{
		console.log('iore:',iore);
		var _lhre = _lh.match( /(\/(.)+\/)+/ig );
		console.log("_lhre:",_lhre);
		var str_sp = _lhre[ 0 ].split( "/" );
		console.log("str_sp:",str_sp);
		console.log("str_sp[6]:",str_sp[str_sp.length-2]);
// 		console.log("str_sp[6]:",Array.prototype.slice.call(str_sp)[5]);
	};
// 	switch (iore){
// 		case "no_server_file":
// 			console.log("no_server_file");
// 			Sys.RootUrl="file:///E:/SERVER_CODE/server_measurement/cs_trade/";
// 		break;
// 		case "local":
// 			console.log("local");
// 			Sys.RootUrl="http://127.0.0.1:8080/s/server_measurement/cs_trade/";
// 		break;
// 		case "internal":
// 			console.log("internal");
// 			Sys.RootUrl="http://192.168.1.20:8080/s/server_measurement/cs_trade/";
// 		break;

// 		case "external":
// 			console.log("external");
// 			Sys.RootUrl="http://www.spitc-cn.com/";
// 		break;
// 	}
	var _howDo = 
		iore == "no_server_file" ?
		Sys.RootUrl = "file:///E:/SERVER_CODE/server_measurement/" + str_sp[ str_sp.length - 2 ] + "/" :
		iore == "local" ?
        Sys.RootUrl = "http://127.0.0.1:8080/s/server_measurement/" + str_sp[ str_sp.length - 2 ] + "/" :
		iore == "internal" ?
		Sys.RootUrl = "http://192.168.1.20:8080/s/server_measurement/" + str_sp[str_sp.length-2] + "/" :
		iore == "external" ?
		Sys.RootUrl = "http://www.spitc-cn.com/" :
	0;
	console.log("_howDo:",_howDo);
// 	return RootUrl;
}
// mRootUrl();
var mGoto = function () 
 {
	var $args = Array.prototype.slice.call( arguments );
// 	var _RootUrl=$args[0];
	console.log('Sys.plat.hasOwnProperty("pc"):',Sys.plat.hasOwnProperty( "pc" ));
	for ( var platType in Sys.plat ) 
	{
		console.log('platType:',platType)
	}
// 	switch (platType){
// 		case "pc":
// 			console.log("platType:",platType);
// 			window.location.href=
// 			Sys.RootUrl+"jiaoben_accrodion_3931/index4.html";
// 		break;
// 		case "portable":
// 			console.log("platType:",platType);
// 			window.location.href=
// 			Sys.RootUrl+"jiaoben_accrodion_d_3581/index.html";
// 		break;
// 	}
	var _howDo = 
		platType == "pc" ?
		location.href =
		Sys.RootUrl + "jiaoben_accrodion_3931/index4_" + $args[ 0 ] + ".html" :
		platType == "portable" ?
		location.href =
		Sys.RootUrl + "jiaoben_accrodion_d_3581/index_" + $args[ 0 ] + ".html" :
	0;
	console.log("_howDo:",_howDo);
};
// window.mGoto = mGoto ;
$append_mls.invokeJson( "" );
// mGoto();
// var _aaaa=(1==1)?(1==3)?console.log(true):console.log(false):console.log(false);	
})();

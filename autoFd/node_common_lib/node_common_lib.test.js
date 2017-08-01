let nodeLib = require ( "../node_common_lib/node_common_lib" ) ;
let fs = require ( "fs" ) ;
console.log ( "nodeLib:" ,  nodeLib )　;
nodeLib.fn_init ( "" ) ;
let str1 = "a.b.c.d.e.f.g" ;

let str2 = "http://www.firesnip.com/light7-mall_c01_ol/home/index.html" ;

let pgp_Url = str2.fnPgp_getUrl ( 3 ) ;

console.log ( "pgp_Url:" , pgp_Url ) ;



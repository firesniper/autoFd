let nodeLib = require ( "../node_common_lib/node_common_lib" ) ;
let fs = require ( "fs" ) ;
console.log ( "nodeLib:" ,  nodeLib )　;
nodeLib.fn_init ( "" ) ;
let str1 = "a.b.c.d.e.f.g" ;

let str2 = "http://www.firesnip.com/light7-mall_c01_ol/home/index.html" ;

let pgp_Url = str2.fnPgp_getUrl ( 3 ) ;

console.log ( "pgp_Url:" , pgp_Url ) ;
let fnA01 = function () 
{
    console.log ( "fnA01" ) ;
} ;

let PmA01 = new Promise 
( 
    function ( resovled , rejected ) 
    {
        console.log ( "PmA01" ) ;
        console.log ( "PmA01 resovled:" , resovled ) ;
        resovled () ;
    } 
) ;
console.log ( "PmA01:" , PmA01 ) ;
PmA01.then 
(
    function ( resolved )
    {
        console.log ( "PmA01 resolved:" , resolved ) ;
    } ,
    function ( rejected )
    {
        console.log ( "PmA01 rejected:" , rejected ) ;
    }
)

let PmA02 = Promise.resolve ( fnA01 () ) ;
console.log ( "PmA02:" , PmA02 ) ;
PmA02.then 
(
    function ( resolved )
    {
        console.log ( "PmA02 resolved:" , resolved ) ;
    } ,
    function ( rejected )
    {
        console.log ( "PmA02 rejected:" , rejected ) ;
    }
)
let nodeLib = require ( "../node_common_lib/node_common_lib" ) ;
let fs = require ( "fs" ) ;
console.log ( "nodeLib:" ,  nodeLib )　;
nodeLib.init ( "" ) ;
let str1 = "a.b.c.d.e.f.g" ;
console.log () 
let index1 = str1.backNumIndexOf ( "." , 2 ) ;
let resStr1 = str1.slice ( index1 ) ;
let str2 = "node_js/output.dev.htm.html" ;
let resStr2 = str2.rmSuffix () ;
let strTab = "      " ;
let restabstr = strTab.match ( /(?: )/ig ) ;
let resAAA01 =  strTab.replace ( /(?: )/ig , " " ) ;
let resAAAB01 = resAAA01.replace ( /(?:\ ){1,}/ig , " " ) ;

var time1 = new Date ().getTime ( ) ;
var data = [] ;
for(var i = 0 ; i < 100000 ; i++ )
{
    data.push(i%100);
} ;
let data2 = [0,0,0,1,1,1,2,2,2,3,3,4,5,5,6,6]
let data2res = data2.unique2 () ;

Object.placeHolderTokenMapFn () ;
let readRes = fs.readFileSync ( "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/htmloutput.dev.htm" , 'utf-8' ) ;
let validRes = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/htmloutput.dev.htm".validFileGetState () ;

let boA02 = ".htm".isEleInAry ( nodeLib.markUpExtAry ) ;

void function ()
{
    "use strict"
    var cb01 = function ( )
    {
                    } ;
    var fn01 = function ( callback )
    {
                let a = undefined ;
       
                callback () ;
           
            } ;
    var fn02 = function ( callback ) 
    {
        setTimeout 
        (
            function () 
            {
                                Object.fn02 = "fn02" ;
                return "fn02Res" ;
            } ,
            3000
        ) ;
                callback () ;

        
    } ;
    var testSync = function ()
    {   
        "use strict"
        let a = null ;
        fn01 
        ( 
            function () 
            {
                "use strict"
                
                        a = 1 ;
                 
                            } 
            // cb01
        ) ;
        let fn02Res = null ;
        fn02Res = fn02 ( cb01 ) ;
                                let pmA01 = Promise.resolve
        (
            fn02 
        ) ;
                        pmA01
        .then
        (
            function ( resolve )
            {
                
            } ,
            function ( rejected )
            {}
        ) ;
                        
        let pmA02 =  new Promise 
        (
            function ()
            {
                                fn01 
                ( 
                    function () 
                    {
                        "use strict"
                         
                        a = 1 ; 
                         
                                            } 
                    // cb01
                ) ;
            } 
        ) ;
                        pmA02
        
        .then 
        (
            function ( resolve )
            {
                                
            } ,
            function ( reject ) 
            {
                            }

        ) ;
                
    } ; testSync () ;

} () ;
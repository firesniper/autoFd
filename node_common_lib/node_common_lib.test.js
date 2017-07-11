let nodeLib = require ( "D:/ProgramFiles/node_me/autoFd/node_common_lib/node_common_lib" ) ;
let fs = require ( "fs" ) ;
console.log ( "nodeLib:" ,  nodeLib )　;
nodeLib.init ( "" ) ;
let str1 = "a.b.c.d.e.f.g" ;
console.log () 
let index1 = str1.backNumIndexOf ( "." , 2 ) ;
console.log ( "index1:", index1 ) ;
let resStr1 = str1.slice ( index1 ) ;
console.log ( "resStr1:" , resStr1 ) ;
let str2 = "node_js/output.dev.htm.html" ;
let resStr2 = str2.rmSuffix () ;
console.log ( "resStr2:" , resStr2 ) ;
console.log ( "all".toTagRegStrPgp() ) ;
let strTab = "      " ;
let restabstr = strTab.match ( /(?: )/ig ) ;
console.log ( "restabstr:", restabstr ) ;
let resAAA01 =  strTab.replace ( /(?: )/ig , "$PH_space" ) ;
console.log ( "resAAA01:" , resAAA01 ) ; 
let resAAAB01 = resAAA01.replace ( /(?:\$PH_space){1,}/ig , " " ) ;
console.log ( "resAAAB01:" , resAAAB01 ) ;

var time1 = new Date ().getTime ( ) ;
var data = [] ;
for(var i = 0 ; i < 100000 ; i++ )
{
    data.push(i%100);
} ;
let data2 = [0,0,0,1,1,1,2,2,2,3,3,4,5,5,6,6]
// console.log ( "data:" , data ) ;
let data2res = data2.unique2 () ;
// console.log ( "data2res:" , data2res ) ;

Object.placeHolderTokenMapFn () ;
let readRes = fs.readFileSync ( "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/htmloutput.dev.htm" , 'utf-8' ) ;
// console.log ( "readRes:" ,  readRes   ) ;
let validRes = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/htmloutput.dev.htm".validFileGetState () ;
// console.log ( "validRes" , validRes ) ;

let boA02 = ".htm".isEleInAry ( nodeLib.markUpExtAry ) ;
// console.log ( "boA02:" , boA02 ) ;

void function ()
{
    "use strict"
    var cb01 = function ( )
    {
        console.log ( "cb01" ) ;
        // a = 2 ;
    } ;
    var fn01 = function ( callback )
    {
        console.log ( "fn01" ) ;
        let a = undefined ;
       /* setTimeout 
        (
            function ()
            {*/
                callback () ;
           /* } ,
            0
        ) ;*/
        console.log ( "a1:" ,  a ) ;
    } ;
    var fn02 = function ( callback ) 
    {
        setTimeout 
        (
            function () 
            {
                console.log ( "fn02_1" ) ;
                Object.fn02 = "fn02" ;
                return "fn02Res" ;
            } ,
            3000
        ) ;
        console.log ( "fn02_2" ) ;
        callback () ;

        /*let aAry = [] ;
        void function ()
        {
            for ( let i = 0 ; i < 10000000 ; i++ )
            {
                aAry.push ( i ) ;
            } ;
            Object.fn02 = "fn02" ;
            console.log ( "aAry:" , aAry ) ; 
            return aAry ;

        } () ;*/
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
                /*setTimeout 
                (
                    function ()
                    {*/
                        a = 1 ;
                 /*   } ,
                    0
                ) ;*/
                // console.log ( "a2:" , a ) ;
            } 
            // cb01
        ) ;
        let fn02Res = null ;
        fn02Res = fn02 ( cb01 ) ;
        console.log ( "fn02Res:" , fn02Res ) ;
        console.log ( "Object.fn02_0:" , Object.fn02 ) ;
        console.log  ( "a1:" , a ) ;
        let pmA01 = Promise.resolve
        (
            fn02 
        ) ;
        console.log ( "pmA01:" , pmA01 ) ;
        // pmA01.resolve () ;
        pmA01
        .then
        (
            function ( resolve )
            {
                console.log ( "Object.fn02_1:" , Object.fn02 ) ;

            } ,
            function ( rejected )
            {}
        ) ;
        console.log ( "fn02Res:" , fn02Res ) ;
        console.log ( "Object.fn02_2:" , Object.fn02 ) ;
        console.log ( "a2:" , a ) ;

        let pmA02 =  new Promise 
        (
            function ()
            {
                // fn02 () ;
                fn01 
                ( 
                    function () 
                    {
                        "use strict"
                         
                        a = 1 ; 
                         
                        // console.log ( "a3:" , a ) ;
                    } 
                    // cb01
                ) ;
            } 
        ) ;
        console.log ( "pmA02:" , pmA02 ) ;
        // pmA02.resolve () ;
        pmA02
        /*.catch 
        (
            function ( reason )
            {

                console.log ( "reason:" , reason ) ;
            }
        )*/
        .then 
        (
            function ( resolve )
            {
                console.log ( "resolve:" , resolve ) ;
                console.log ( "Object.fn02_3:" , Object.fn02 ) ; 

            } ,
            function ( reject ) 
            {
                console.log ( "reject:" , reject ) ;
            }

        ) ;
        console.log ( "Object.fn02_4:" , Object.fn02 ) ;
        console.log ( "a4:" , a ) ;

    } ; testSync () ;

} () ;
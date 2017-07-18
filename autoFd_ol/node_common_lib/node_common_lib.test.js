let nodeLib = require ( "../node_common_lib/node_common_lib" ) ;
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

let ary1 = [1,2,3,4,5] ;
let resAry1 = ary1.rmEle ( [1,2,3] ) ;

console.log ( "resAry1:" , resAry1 ) ;

let pgpA01 = 
{
    a : "a" , 
    b : "b" ,
    c : 
    [
         "a" , 
         "b" ,
         []
    ] ,
    d : 
    [
         "a" , 
         "b" ,
         []
    ] ,
    e : 
    [
         "a" , 
         "b" ,
         []
    ] ,
    f : 
    [
         "a" , 
         "b" ,
         []
    ] 
} ;
/*for ( let i = 0 ; i < 0 ; i ++ )
{
    pgpA01[ "c" ] = pgpA01 ;
} ;*/
String.prototype.getUrlGgp = function ( num )
{
    let _this = this ;
    let allStr = _this ;
    // let allStr = "<img src = 'http://www.abc.com/firesniper/adb/def/ghi/jkm/aaa.html' />" ;
    let schemaRegStr = `((?:http|https):)?\\/\\/(?:localhost|127.0.0.1|[\\w\\.-]+):?\\d*(?:\\\\|\\/)?` ;
    let virRegPattStr = `([\\w\\.-]+(?:\\\\|\\/)?)` ;
    let virRegStr = virRegPattStr + `{` + 0 + `,` + num + `}` ;
    console.log ( "virRegStr:" , virRegStr ) ;
    let virReg = new RegExp ( virRegStr , `ig` ) ;
    console.log ( "allStr.match ( virReg ):" , allStr.match ( virReg ) ) ;
    let urlRegStr = `(?:'|")?` + schemaRegStr + virRegPattStr + "*" + `(?:'|")?` ;
    // let urlStr = allStr.match ( /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.-]+):?\d*(?:\\|\/)?([\w\.-]+(?:\\|\/)?)*(?:'|")?/ig ) ;
    let urlStr = allStr.match ( new RegExp ( urlRegStr , `ig` ) ) ;
    console.log ( "urlStr:" , urlStr ) ;
    let schemaStr = urlStr[ 0 ].match ( new RegExp ( schemaRegStr , `ig` ) ) ;
    console.log ( "schemaStr:" , schemaStr ) ;
    let strStart = urlStr[ 0 ].indexOf ( schemaStr [ 0 ] ) + schemaStr [ 0 ].length ;
    console.log ( "strStart:" ,  strStart ) ;
    let fdStr = urlStr[ 0 ].slice ( strStart ) ;
    console.log ( "fdStr:" , fdStr ) ;
    let virPathStr = fdStr.match ( virReg ) ;
    console.log ( "virPathStr:" , virPathStr ) ;
    let scm_vir = allStr.match 
    (
        // /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.]+)((?:\\|\/)\w+){0,4}(?:'|")?/ig 
        new RegExp ( schemaRegStr + virRegStr ) 
    ) ;
    console.log ( "scm_vir:" , scm_vir ) ;
    return {
        "urlStr" : urlStr ,
        "schemaStr" : schemaStr ,
        "virPathStr" : virPathStr ,
        "baseUrl" : scm_vir
    } ;
} ;
let fnA01 = function ( pgp , num )
{
    let allStr = "<img src = http://www.abc.com:8080/firesniper/adb/def/ghi/jkm/aaa.html />" ;

    let urlGgp = allStr.getUrlGgp ( 3 ) ;
    console.log ( "urlGgp:" , urlGgp ) ;
    let nextPgp = { done : false } ;
    console.log ( "nextPgp:" , nextPgp ) ;
    let keyAry = [] ;
    let keyAryIt = {} ;
    let aryA01 = [ "undefined" ,"d" , "f" , undefined ] ;
    let aryB01 = [ "undefined" ,"0" , undefined ] ;
    let separator = "," ;
    let resApgp = {} ;

    hfA01 : for ( let a in pgp )
    {
        console.log ( "pgp[ %s ]:" , a , pgp[ a ] ) ;
        let keyAry = Object.keys ( pgp[ a ] ) ;
        console.log ( "keyAry:" , keyAry.length ) ;
        keyAryIt = keyAry.keys () ;
        console.log ( "separator + pgp[ %s ] + separator:" , a , separator +   a   + separator ) ;
        console.log ( "aryA01.join ( separator ).indexOf ( separator + %s + separator ) > 0:" , a , aryA01.join ( separator ).indexOf ( separator + a + separator ) > 0 ) ;
        if 
        ( 
            pgp[ a ]
            && 
            ( 
                pgp[ a ].constructor.name == "Object" 
                || 
                pgp[ a ].constructor.name == "Array" 
            )
            &&
            keyAry.length > 0
            &&
            aryA01.join ( separator ).indexOf ( separator +  a  + separator ) > 0  
            // &&
            // !nextPgp.done
        )
        {
            console.log ( " pgp[ %s ].constructor.name:" , a ,  pgp[ a ].constructor.name ) ;
            console.log ( eval ( "new " + pgp[ a ].constructor.name ) ) ;

            resApgp[ a ] = eval ( "new " + pgp[ a ].constructor.name ) ;

            console.log ( "resApgp[ %s ]:" , a , resApgp[ a ] ) ;

            for ( let b in pgp [ a ] )
            {
                if 
                ( 
                    aryB01.join ( separator ).indexOf ( separator + b + separator ) > 0
                )
                {
                     pgp[ a ][ b ] = pgp[ a ][ b ] + new RegExp ( "(?:\\/|\\\\)\\w" + "{" + 0 + "," + num + "}" ) ;

                } ;
                resApgp[ a ][ b ] = pgp[ a ][ b ] ;
            } ;
            /*nextPgp = keyAryIt.next () ;
            console.log ( "nextPgp2:" , nextPgp ) ;
            arguments.callee ( pgp[ a ] ) ;*/
        }
        else
        {
            resApgp[ a ] = pgp[ a ] ;
            continue hfA01 ;
        } ;
    } ;
    return resApgp ;

} ; 

let resA01 = fnA01( pgpA01 , 3 ) ;
console.log ( "resA01:" , resA01 ) ;
let urlStr = "http://www.abc.com:8123/abc/def/aaa.jpg" ;
let regA14 = new RegExp 
( 
    /*destBaseUrl ?
    destBaseUrl :*/
    `(?:(?:http|https)?:\\/\\/[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){`+0+`,`+2+`})` , 
    "ig" 
) ;
let urlA1res = urlStr.match ( regA14 ) ;
console.log ( "urlA1res:", urlA1res) ;



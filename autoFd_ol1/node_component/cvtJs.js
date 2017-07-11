let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;



let getResDataStr = function ( chunk )
{
                            let reserved0 = { "placeHolder1" : "\\//" } ; 

                let reserved = {} ;
        for ( let pA in reserved0  )
        {
            let RegStr = reserved0[ pA ].formatToRegStr () ;
            reserved[ pA ] =  new RegExp ( RegStr , "ig" ) ;
        } ;
                              /*  let matchRes = "" ;
        matchRes = chunk.match ( reserved[ "placeHolder1" ] ) ;
        let resChunk = chunk.replace 
        ( 
             /\\\/\//ig  , 
            "placeHolder1" 
        ) ; */
        let resChunk = "" ;
        for ( let p in reserved )
        {
            
                                                resChunk = chunk.replace ( reserved[ p ] , p ) ; 
             
        } ;
                        let regStr = 
        [ 
            // "console.log.*(?:;|\\r\\n)" 
            // ,
            "\\/\\/.*\\r\\n" 
            , 
            "\\/\\*.*\\*\\/"
        ] ;
        let regStr2 = 
        [ 
            /console.log.*(?:;|\r\n)/ig 
            ,
            /\/\/.*\r\n/ig
            , 
            /\/\*.*\*\//ig 
        ] ;
           
        let regRes = resChunk ;
        for ( let i = 0 ; i < regStr.length ; i++ )
        {
                                     regRes = regRes.replace ( regStr2[ i ] , "" ) ;
        } ;
        
        let resChunk2 = regRes ;
        for ( let p in reserved0 )
        {
                        resChunk2 = resChunk2.replace ( new RegExp( p , "ig" ) , reserved0[ p ] ) ; 
        } ;
                
        return resChunk2 ;
} ;



let cvtJs = 
{
    init : function ( globPgp , outputDir , baseUrl ) 
    {
        nodeCommonLib.init (  baseUrl ) ;
        glob 
        (
            '{' + globPgp.regPattAry.join () + '}' ,
            {
                "cwd" : globPgp.cwd ? globPgp.cwd : './' ,
                'mark' : true ,
            } ,
            function ( err , files )
            {
                let readStreamAry = files.getReadStreamAry () ;
                                let inputFile = "./public/node_js/inputJs.dev.txt" ;
                
                for ( let i = 0 ; i < readStreamAry.length ; i++ )
                {
                                                            readStreamAry[ i ].on (
                        "data" ,
                        function ( chunk )
                        {
                            let outputUri = 
                            (
                                outputDir  
                                + this.path.getDirFileFromUri ().file 
                                // + ".dev"
                                + this.path.getDirFileFromUri ().ext 
                            ).rmSuffix ( "" ) ;
                                                        let resDataStr = getResDataStr ( chunk ) ;
                            fs.writeFile 
                            (
                                outputUri
                                ,
                                resDataStr ,
                                function ()
                                {

                                }
                            ) ;

                        }
                    ) ;
                } ;
                
            }
        ) ;
    }
} ;
module.exports = cvtJs ;


Promise.resolve
(

) ;
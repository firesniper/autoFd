let glob = require ( "glob" ) ;
let fs = require ( "fs" ) ;
let cwr = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ;
let dir_append_mls = cwr + "/dir_append_mls/" ;

let resetManifest = function ( params )
{
    params.srcAry.push ( "" ) ;
    glob 
    (
        "{" + 
        params.srcAry.join ( "," ) 
        + "}" 
        ,
        {
            cwd : params.cwd ? params.cwd : "./" ,
            mark : true 
        } ,
        function ( err , fileList  )
        {
            console.log ( "fileList:" , fileList ) ;
            let readStm = fs.createReadStream ( params.cwd + fileList [ 0 ].slice ( 1 ) ) ; 
            readStm.setEncoding ( "utf-8" ) ;
            readStm.on 
            (
                "data" ,
                function ( chunk )
                {
                    console.log ( "chunk:" , typeof JSONchunk ) ;
                } 
            ) ; 
            console.log ( "readStm:" , readStm ) ;
            
            let data = require ( fileList [ 0 ] ) ;
            console.log ( "data:" , data ) ;
            let resPgp = {} ;
            for ( let k in data ) 
            {
                resPgp [ k ] = k ;
            } ;
            console.log ( "resPgp:" , resPgp ) ;
            fs.open 
            ( 
                params.cwd + fileList [ 0 ].slice ( 1 ) , 
                "w" ,
                function ( err , fd )
                {   
                    if ( err ) console.log ( "err:" , err ) ; 
                    fs.writeFile 
                    ( 
                        params.cwd + fileList [ 0 ].slice ( 1 ) , JSON.stringify ( resPgp ) ,
                        function ( err )
                        {
                            console.log ( "err:" , err ) ;
                        }
                    ) ;

                } 
            ) ;
        }
    ) ;
    
    
} ;
resetManifest 
(
    {
        srcAry : [ "./manifest/*.json" ] ,
        cwd : "./dir_append_mls/"
    } 
) ;
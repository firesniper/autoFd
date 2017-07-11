let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib.js" ) ;


let getResLessSassStr = function ( srcDataStr , fileExt )
{
        let regPgp = srcDataStr.getRegPgpFromState (  ) ;

    let lessSassStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
        let lessSassStr2 = lessSassStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
    
    

    return lessSassStr2 ;
} ;

let getResNonMakeUpStr = function ( srcDataStr , fileExt )
{
        let regPgp = srcDataStr.getRegPgpFromState (  ) ;

    let nmuStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
        let nmuStr2 = nmuStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
        return nmuStr2 ;
} ;

let getResJsStr2 = function ( srcDataStr , fileExt )
{
            let regPgp = srcDataStr.getRegPgpFromState ( regPgp.placeHolderTokenMap ) ;

    let jsStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
        let jsStr2 = jsStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
            
    return jsStr2 ;
} ;                    

let getResHTMLStr = function ( srcDataStr , injSrcStr , fileExt )
{
        let regPgpHead = srcDataStr.getRegPgpFromState ( "head" ) ;
        let targetAryA1 = srcDataStr.getCttWrap 
    ( 
        regPgpHead.placeHolderTokenMap ,
        regPgpHead.parentTagRegStrPgp
    ).selectCttAry ;
        
    let sourceDataPgp = injSrcStr.getCttWrap 
    ( 
        regPgpHead.placeHolderTokenMap ,
        regPgpHead.parentTagRegStrPgp
    ) ;
    
    let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPgp.selectCttAry ) ;
    
    let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
    
    let selectWrapAry = sourceDataPgp.selectWrapAry ;
    let headStr4 = ( selectWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + selectWrapAry[ selectWrapAry.length - 1 ] ) ;
        
    let resData = srcDataStr.tokenToPlaceHolder ( null , "global" ) ;
        let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
        
    
    /*if ( srcDataStr.indexOf ( "<body" ) > -1 )
    {
        let bodyStr = srcDataStr.tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
        
                let bodyStr3 = bodyStr[ 0 ].placeHolderToToken () ;
            } ;*/
    console.log ( "srcDataStr2:" , srcDataStr ) 
    let regPgpBody = srcDataStr.getRegPgpFromState ( "body" ) ;
            let bodyStr = srcDataStr.getCttWrap 
    ( 
        regPgpBody.placeHolderTokenMap ,
        regPgpBody.parentTagRegStrPgp
    ).selectWrapCttStr ;

        let bodyStr2 = bodyStr.placeHolderToToken ( regPgpBody.placeHolderTokenMap ) ;
        let resData3 = resData2.replace ( /<body.*>.*<\/body>/ig , bodyStr2 ) ;
    
    let resData4 = resData3.placeHolderToToken ( null , "global" ) ;
    
    return resData4 ;
    
} ;


let compileFd = 
{
    "watchLockA01" : false ,
    "fileState" : {
        uri : "" ,

    } ,
    init : function ( initParams ) 
    {
        let globPgp     = initParams.globPgp ;
        let regPattAry  = initParams.globPgp.regPattAry ;
        let cwd         = initParams.globPgp.cwd ? initParams.globPgp.cwd : "./" ;
        let baseUrl     = initParams.baseUrl ;
        let outputDir   = initParams.outputDir ;
        let injSrcStr   = initParams.injSrcStr ;
        nodeCommonLib.init ( baseUrl ) ;
        let $this = this ;
                                


        let promiseA01 = Promise.resolve 
        (
            glob 
            ( 
                '{' 
                + regPattAry.join ( "," ) 
                + '}' 
                ,
 
                { 
 
                    "cwd" : cwd ? cwd : "./" , 
                    mark : true 
                } , 
                function ( err , fileList )
                {
                    if ( err )
                    {
                                                return ;
                    } ;
                    
                    let readStreamAry = fileList.getReadStreamAry ( ) ;
                    
                    

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                                                readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( srcDataStr )
                            {
                                let _this = this ;
                                let _thisPath = this.path ;
                                
                                Object.validDatas.fileState = _this.path.validFileGetState () ;
                                                                outputDir = outputDir ? outputDir : _this.path.resolveUri ().dir ;
         
                                let outputUri =  _this.path.getOutputUri ( outputDir ) ;
                                
                                outputUri.validDesDirFileFromUri ( outputDir ) ;
                                let fileExt = _this.path.resolveUri ().ext ;
                                
                                let resDataStr = 
                                fileExt 
                                ? 
                                ( 
                                    Object.validDatas.fileState.isMarkUpExt
                                    ?
                                    getResHTMLStr ( srcDataStr , injSrcStr , fileExt ) 
                                    :
                                    getResNonMakeUpStr ( srcDataStr , fileExt ) 
                                    
                                )
                                : 
                                null ;
                                
                              

                                let writerStream = fs.createWriteStream 
                                ( 
                                    outputUri
                                ) ;
                                                                writerStream.write 
                                ( 
                                    resDataStr , 
                                    "utf-8" 
                                ) ;
                                writerStream.end () ;
                                writerStream.on
                                (
                                    "finish" ,
                                    function ()
                                    {
                                                                            }
                                ) ;
                                let watchLock = false ;
                                let fsWatchHandle = 
                                function ( a , b , c ) 
                                {
                                    if ( $this.watchLockA01 ) return ;
                                    $this.watchLockA01 = true ;

                                                                        
                                    initParams.globPgp = {
                                        "cwd" : "./" ,
                                        "regPattAry" : [ _this.path , "" ]
                                    } ;
                                    
                                    compileFd.init 
                                    ( initParams )  ;
                                    let st01 = setTimeout 
                                    (
                                        function ()
                                        {
                                            $this.watchLockA01 = false ;
                                        } ,
                                        3000
                                    ) ;
                                                                        

                                    
                                } ;
                                let psWatchA01 = Promise.resolve
                                (
                                    fs.watch 
                                    ( 
                                        _this.path , 
                                        fsWatchHandle
                                    ) 
                                ) ;
                                psWatchA01.then
                                (
                                    function ( resolve )
                                    {
                                        let st = setTimeout 
                                        (
                                            function ()
                                            {
                                                watchLock = !watchLock ;
                                            } ,
                                            3000

                                        ) ;
                                        fs.unwatchFile
                                        (
                                            _this.path , 
                                            fsWatchHandle
                                        ) ;
                                    } ,
                                    function ( reject ) 
                                    {

                                    }
                                ) ;
                                

                            }
                            
                        ) ;
                    } ;

                    

                    return fileList ;
                }    
            ) 
            
        ) ;
        promiseA01.then
        (
            function ( srcDataStr )
            {
                                                
                
            } ,
            function ( reject )
            {
                            }
        ) ;
        
        

    } 
} ;

module.exports = compileFd ;

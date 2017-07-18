let fs = require ( "fs" ) ;
let glob = require ( "glob" ) ;
let nodeCommonLib = require ( "../node_common_lib/node_common_lib" ) ;

console.log ( "begin" ) ;

let getResLessSassStr = function ( srcDataStr , fileExt )
{
    //console.log ( "srcDataStr:" ,  srcDataStr ) ;
    let regPgp = srcDataStr.getRegPgpFromState (  ) ;

    let lessSassStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
    //console.log ( "lessSassStr:" , lessSassStr ) ;
    let lessSassStr2 = lessSassStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
    //console.log ( "lessSassStr2:" , lessSassStr2 ) ;

    

    return lessSassStr2 ;
} ;

let getResNonMakeUpStr = function ( srcDataStr , fileExt )
{
    //console.log ( "srcDataStr:" ,  srcDataStr ) ;
    let regPgp = srcDataStr.getRegPgpFromState (  ) ;

    let nmuStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
    //console.log ( "nmuStr:" , nmuStr ) ;
    let nmuStr2 = nmuStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
    //console.log ( "nmuStr2:" , nmuStr2 ) ;
    return nmuStr2 ;
} ;

let getResJsStr2 = function ( srcDataStr , fileExt )
{
    //console.log ( "srcDataStr :" , srcDataStr ) ;
    //console.log ( "fileExt2:" , fileExt ) ;    
    let regPgp = srcDataStr.getRegPgpFromState ( regPgp.placeHolderTokenMap ) ;

    let jsStr = srcDataStr.getCttWrap 
    ( 
        regPgp.placeHolderTokenMap  
    ).selectWrapCttStr ;
    //console.log ( "jsStr:" , jsStr ) ;
    let jsStr2 = jsStr.placeHolderToToken ( regPgp.placeHolderTokenMap ) ;
    //console.log ( "jsStr2:" , jsStr2 ) ;
        
    return jsStr2 ;
} ;                    

let getResHTMLStr = function ( srcDataStr , injSrcStr , fileExt )
{
    //console.log ( "srcDataStr:" ,  srcDataStr ) ;
    let regPgpHead = srcDataStr.getRegPgpFromState ( "head" ) ;
    //console.log ( "regPgpHead:" , regPgpHead ) ;
    let targetAryA1 = srcDataStr.getCttWrap 
    ( 
        regPgpHead.placeHolderTokenMap ,
        regPgpHead.parentTagRegStrPgp
    ).selectCttAry ;
    //console.log ( "targetAryA1:" , targetAryA1 ) ;
    
    let sourceDataPgp = injSrcStr.getCttWrap 
    ( 
        regPgpHead.placeHolderTokenMap ,
        regPgpHead.parentTagRegStrPgp
    ) ;
    //console.log ( "sourceDataPgp.selectCttAry:" , sourceDataPgp.selectCttAry ) ;

    let resDiffAry = targetAryA1.excludeOverlap ( sourceDataPgp.selectCttAry ) ;
    //console.log ( " resDiffAry:" ,  resDiffAry ) ;

    let resDiffAry2 = targetAryA1.concat ( resDiffAry ) ;
    //console.log ( " resDiffAry2:" ,  resDiffAry2 ) ;

    let selectWrapAry = sourceDataPgp.selectWrapAry ;
    let headStr4 = ( selectWrapAry[ 0 ] + "\n" + resDiffAry2.join( "\n" ) + "\n" + selectWrapAry[ selectWrapAry.length - 1 ] ) ;
    //console.log ( "headStr4:" , headStr4 ) ;
    
    let resData = srcDataStr.tokenToPlaceHolder ( null , "global" ) ;
    //console.log ( "resData:" , resData ) ;
    let resData2 = resData.replace ( /<head.*>.*<\/head>/ig , headStr4 ) ;
    //console.log ( "resData2:" , resData2  ) ;
    
    
    /*if ( srcDataStr.indexOf ( "<body" ) > -1 )
    {
        let bodyStr = srcDataStr.tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
        console.log ( "bodyStr:" , bodyStr ) ;

        // let bodyStr2 = bodyStr.tokenToPlaceHolder () ;
        let bodyStr3 = bodyStr[ 0 ].placeHolderToToken () ;
        console.log ( "bodyStr3:" , bodyStr3 ) ;
    } ;*/
    //console.log ( "srcDataStr2:" , srcDataStr ) 
    let regPgpBody = srcDataStr.getRegPgpFromState ( "body" ) ;
    //console.log ( "regPgpBody:" , regPgpBody ) ;
    //console.log ( "regPgpBody.parentTagRegStrPgp:" , regPgpBody.parentTagRegStrPgp ) ;
    let bodyStr = srcDataStr.getCttWrap 
    ( 
        regPgpBody.placeHolderTokenMap ,
        regPgpBody.parentTagRegStrPgp
    ).selectWrapCttStr ;

    //console.log ( "bodyStr:" , bodyStr ) ;
    let bodyStr2 = bodyStr.placeHolderToToken ( regPgpBody.placeHolderTokenMap ) ;
    //console.log ( "bodyStr2:" , bodyStr2 ) ;
    let resData3 = resData2.replace ( /<body.*>.*<\/body>/ig , bodyStr2 ) ;
    //console.log ( "resData3:" , resData3 ) ;

    let resData4 = resData3.placeHolderToToken ( null , "global" ) ;
    //console.log ( "resData4:" , resData4  ) ;

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
        let regPattAry  = 
        initParams.globPgp.regPattAry ? 
        function ( )
        {
            initParams.globPgp.regPattAry.push ( "" ) ;
            return initParams.globPgp.regPattAry ;
        } () 
        : initParams.globPgp.regPattAry ;
        let cwd         = initParams.globPgp.cwd ? initParams.globPgp.cwd : "./" ;
        let outputDir   = initParams.outputDir ;
        let injSrcStr   = initParams.injSrcStr ;
        let srcBaseUrl  = initParams.srcBaseUrl ;
        console.log ( "srcBaseUrl:" , srcBaseUrl ) ;

        let destBaseUrl = initParams.destBaseUrl ;
        console.log ( "destBaseUrl:" , destBaseUrl ) ;
 
        let destVirPath = initParams.destVirPath ;
        nodeCommonLib.init 
        ( 
            {
                 "srcBaseUrl" : srcBaseUrl ,
                 "destBaseUrl" : destBaseUrl , 
                 "destVirPath" : destVirPath
            } 
        ) ;
        let $this = this ;
        //console.log ( "$this:" , $this ) ;
        // putPath.inputDir = putPath.inputUri.resolveUri ().dir ;
        // let inputUri = putPath.inputUri ;
        //console.log ( "nodeCommonLib:" , nodeCommonLib ) ;

        //console.log ( "initParams.outputDir:" , initParams.outputDir ) ;

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
                        //console.log ( "err:" , err ) ;
                        return ;
                    } ;
                    //console.log ( "fileList1:" , fileList ) ;

                    let readStreamAry = fileList.getReadStreamAry ( ) ;
                    
                    

                    for ( let inc = 0 ; inc < readStreamAry.length ; inc++ )
                    {
                        //console.log ( "readStreamAry[ inc ].path:" , readStreamAry[ inc ].path ) ;
                        readStreamAry[ inc ].on
                        (
                            "data" ,
                            function ( srcDataStr )
                            {
                                let _this = this ;
                                let _thisPath = this.path ;
                                //console.log ( "this.path:" , this.path ) ;

                                Object.validDatas.fileState = _this.path.validFileGetState () ;
                                //console.log ( "Object.validDatas.fileState:" , Object.validDatas.fileState ) ;
                                /*outputDir = outputDir ? outputDir : _this.path.resolveUri ().dir ;
                                console.log ( "191_outputDir:" , outputDir ) ;*/
                                let outputUri =  _this.path.getOutputUri ( outputDir ) ;
                                //console.log ( "outputUri：" , outputUri ) ;

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
                                //console.log ( "resDataStr:" , resDataStr ) ;

                              

                                let writerStream = fs.createWriteStream 
                                ( 
                                    outputUri
                                ) ;
                                // console.log ( "writerStream:" , writerStream ) ;        
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
                                        console.log ( "finish" ) ;
                                    }
                                ) ;
                                let watchLock = false ;
                                let fsWatchHandle = 
                                function ( a , b , c ) 
                                {
                                    if ( $this.watchLockA01 ) return ;
                                    $this.watchLockA01 = true ;

                                    //console.log ( "_this.path:" , _this.path ) ;
                                    /*fs.unwatchFile
                                    (
                                        _this.path , 
                                        fsWatchHandle
                                    ) ;*/
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
                                    // clearTimeout ( st01 ) ;
                                    

                                    
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
                // console.log ( "arg0:" , arg0 ) ;
                // console.log ( "Function.prototype.fileList:", Function.prototype.fileList ) ;
                
                
            } ,
            function ( reject )
            {
                // console.log ( "reject:" , reject ) ;
            }
        ) ;
        
        

    } 
} ;

module.exports = compileFd ;

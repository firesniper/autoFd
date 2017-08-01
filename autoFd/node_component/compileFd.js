let pgp_fs = require ( "fs" ) ;
let fn_glob = require ( "glob" ) ;
let pgp_nodeCommonLib = require ( "../node_common_lib/node_common_lib" ) ;

console.log ( "begin" ) ;

let fnStr_getResLessSass = function ( str_srcData , str_fileExt )
{
    console.log ( "str_srcData:" ,  str_srcData ) ;
    let pgp_reg = str_srcData.fnPgp_getRegPgpFromState (  ) ;

    let str_lessSass = str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_reg.pgp_placeHolderTokenMap  
    ).ary_selectWrapCtt_str ;
    console.log ( "str_lessSass:" , str_lessSass ) ;
    let str_lessSass2 = str_lessSass.fnStr_placeHolderToToken ( pgp_reg.pgp_placeHolderTokenMap ) ;
    console.log ( "str_lessSass2:" , str_lessSass2 ) ;

    return str_lessSass2 ;
} ;

let fnStr_getResNonMakeUp = function ( str_srcData , str_fileExt )
{
    console.log ( "NonMakeUp str_srcData:" ,  str_srcData ) ;
    let pgp_reg = str_srcData.fnPgp_getRegPgpFromState ( "global" ) ;
    console.log ( "pgp_reg:" , pgp_reg ) ;
    let ary_selectWrapCtt_str = str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_reg.pgp_placeHolderTokenMap ,
        pgp_reg.pgp_parentTag_reg 
    ).ary_selectWrapCtt_str ;
    console.log ( "ary_selectWrapCtt_str:" , str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_reg.pgp_placeHolderTokenMap  
    ) ) ;

    let str_nmu = ary_selectWrapCtt_str.fnStr_placeHolderToToken ( pgp_reg.pgp_placeHolderTokenMap ) ;
    console.log ( "str_nmu:" , str_nmu ) ;
    
    return str_nmu ;
} ;

let fnStr_getResJsStr2 = function ( str_srcData , str_fileExt )
{
    console.log ( "js str_srcData :" , str_srcData ) ;
    console.log ( "fileExt2:" , str_fileExt ) ;    
    let pgp_reg = str_srcData.fnPgp_getRegPgpFromState ( pgp_reg.pgp_placeHolderTokenMap ) ;

    let str_js = str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_reg.pgp_placeHolderTokenMap  
    ).ary_selectWrapCtt_str ;
    console.log ( "str_js:" , str_js ) ;
    let str_js2 = str_js.fnStr_placeHolderToToken ( pgp_reg.pgp_placeHolderTokenMap ) ;
    console.log ( "str_js2:" , str_js2 ) ;
        
    return str_js2 ;
} ;                    

let str_getResHTML = function ( str_srcData , str_injSrc , str_fileExt )
{
    console.log ( "str_srcData:" ,  str_srcData ) ;
    let pgp_regHead = str_srcData.fnPgp_getRegPgpFromState ( "head" ) ;
    console.log ( "pgp_regHead:" , pgp_regHead ) ;
    let ary_targetA1 = str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_regHead.pgp_placeHolderTokenMap ,
        pgp_regHead.pgp_parentTag_reg
    ).ary_selectCtt ;
    console.log ( "ary_targetA1:" , ary_targetA1 ) ;
    
    let str_resData = str_srcData.fnStr_tokenToPlaceHolder ( null , "global" ) ;
    // console.log ( "str_resData:" , str_resData.constructor.name ) ;
    console.log ( "str_resData:" , str_resData ) ;
    let str_resData2 = str_resData ;
    console.log ( "str_injSrc:" ,  ( str_injSrc != null) ) ;

    if (
         str_injSrc && str_injSrc != "" 
        //  false
        )
    {
        let pgp_sourceData = str_injSrc.fnPgp_getCttWrap 
        ( 
            pgp_regHead.pgp_placeHolderTokenMap ,
            pgp_regHead.pgp_parentTag_reg
        ) ;
        console.log ( "pgp_sourceData.ary_selectCtt:" , pgp_sourceData.ary_selectCtt ) ;

        let ary_resDiff = ary_targetA1.excludeOverlap ( pgp_sourceData.ary_selectCtt ) ;
        console.log ( "ary_resDiff:" ,  ary_resDiff ) ;

        let ary_resDiff2 = ary_targetA1.concat ( ary_resDiff ) ;
        console.log ( "ary_resDiff2:" ,  ary_resDiff2 ) ;

        
        
        if ( pgp_sourceData.ary_selectWrap != [] )
        {
            let ary_selectWrap = pgp_sourceData.ary_selectWrap ;
            let str_head4 = ( ary_selectWrap[ 0 ] + "\n" + ary_resDiff2.join( "\n" ) + "\n" + ary_selectWrap[ ary_selectWrap.length - 1 ] ) ;
            console.log ( "str_head4:" , str_head4 ) ;
            str_resData2 = str_resData.replace ( /<head.*>.*<\/head>/ig , str_head4 ) ;
            console.log ( "str_resData2:" , str_resData2  ) ;

        } ;

    } ;
    
    
    /*if ( str_srcData.indexOf ( "<body" ) > -1 )
    {
        let str_body = str_srcData.fnStr_tokenToPlaceHolder ().match ( /<body.*>.*<\/body>/ig ) ;
        console.log ( "str_body:" , str_body ) ;

        // let str_body2 = str_body.fnStr_tokenToPlaceHolder () ;
        let bodyStr3 = str_body[ 0 ].fnStr_placeHolderToToken () ;
        console.log ( "bodyStr3:" , bodyStr3 ) ;
    } ;*/
    console.log ( "str_srcData2:" , str_srcData ) 
    let pgp_regPgpBody = str_srcData.fnPgp_getRegPgpFromState ( "body" ) ;
    console.log ( "pgp_regPgpBody:" , pgp_regPgpBody ) ;
    console.log ( "pgp_regPgpBody.pgp_parentTag_reg:" , pgp_regPgpBody.pgp_parentTag_reg ) ;
    let str_body = str_srcData.fnPgp_getCttWrap 
    ( 
        pgp_regPgpBody.pgp_placeHolderTokenMap ,
        pgp_regPgpBody.pgp_parentTag_reg
    ).ary_selectWrapCtt_str ;

    console.log ( "str_body:" , str_body ) ;
    let str_body2 = str_body.fnStr_placeHolderToToken ( pgp_regPgpBody.pgp_placeHolderTokenMap ) ;
    console.log ( "str_body2:" , str_body2 ) ;
    let str_resData3 = str_resData2.replace ( /<body.*>.*<\/body>/ig , str_body2 ) ;
    console.log ( "str_resData3:" , str_resData3 ) ;

    let str_resData4 = str_resData3.fnStr_placeHolderToToken ( null , "global" ) ;
    console.log ( "str_resData4:" , str_resData4  ) ;

    return str_resData4 ;
    
} ;


let compileFd = 
{
    "watchLockA01" : false ,
    "pgp_fileState" : {
        uri : "" ,

    } ,
    fn_init : function ( pgp_params ) 
    {
        let pgp_globParams     = pgp_params.pgp_globParams ;
        let ary_regPatt  = 
        pgp_params.pgp_globParams.ary_regPatt ? 
        function ( )
        {
            pgp_params.pgp_globParams.ary_regPatt.push ( "" ) ;
            return pgp_params.pgp_globParams.ary_regPatt ;
        } () 
        : pgp_params.pgp_globParams.ary_regPatt ;
        let str_cwd         = pgp_params.pgp_globParams.str_cwd ? pgp_params.pgp_globParams.str_cwd : "./" ;
        let str_outputDir   = pgp_params.str_outputDir ;
        let str_injSrc   = pgp_params.str_injSrc ;
        
        let str_srcBaseUrl  = pgp_params.str_srcBaseUrl ;
        console.log ( "str_srcBaseUrl:" , str_srcBaseUrl ) ;

        let str_destBaseUrl = pgp_params.str_destBaseUrl ;
        console.log ( "str_destBaseUrl:" , str_destBaseUrl ) ;
 
        let str_destVirPath = pgp_params.str_destVirPath ;
        pgp_nodeCommonLib.fn_init 
        ( 
            {
                 "str_srcBaseUrl" : str_srcBaseUrl ,
                 "str_destBaseUrl" : str_destBaseUrl , 
                 "str_destVirPath" : str_destVirPath
            } 
        ) ;
        let $this = this ;
        //console.log ( "$this:" , $this ) ;
        // putPath.inputDir = putPath.inputUri.fnPgp_resolveUri ().dir ;
        // let inputUri = putPath.inputUri ;
        //console.log ( "pgp_nodeCommonLib:" , pgp_nodeCommonLib ) ;

        //console.log ( "pgp_params.str_outputDir:" , pgp_params.str_outputDir ) ;

        let promiseA01 = Promise.resolve 
        (
            fn_glob 
            ( 
                '{' 
                + ary_regPatt.join ( "," ) 
                + '}' 
                ,
 
                { 
 
                    "cwd" : str_cwd ? str_cwd : "./" , 
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

                    let ary_readStream = fileList.fnAry_getReadStream ( ) ;
                    
                    

                    for ( let inc = 0 ; inc < ary_readStream.length ; inc++ )
                    {
                        //console.log ( "ary_readStream[ inc ].path:" , ary_readStream[ inc ].path ) ;
                        ary_readStream[ inc ].on
                        (
                            "data" ,
                            function ( str_srcData )
                            {
                                let str_this = this ;
                                let str_thisPath = this.path ;
                                //console.log ( "this.path:" , this.path ) ;

                                Object.pgp_validDatas.pgp_fileState = str_this.path.fnPgp_validFileGetState () ;
                                //console.log ( "Object.pgp_validDatas.pgp_fileState:" , Object.pgp_validDatas.pgp_fileState ) ;
                                /*str_outputDir = str_outputDir ? str_outputDir : str_this.path.fnPgp_resolveUri ().dir ;
                                console.log ( "191_outputDir:" , str_outputDir ) ;*/
                                let str_outputUri =  str_this.path.fnStr_getOutputUri ( str_outputDir ) ;
                                console.log ( "str_outputUri：" , str_outputUri ) ;

                                str_outputUri.fn_validFdFromUri ( str_outputDir ) ;
                                let str_fileExt = str_this.path.fnPgp_resolveUri ().str_ext ;
                                console.log ( "Object.pgp_validDatas.pgp_fileState:" , Object.pgp_validDatas.pgp_fileState ) ;
                                let str_resData = 
                                str_fileExt 
                                ? 
                                ( 
                                    Object.pgp_validDatas.pgp_fileState.bol_isMarkUpExt
                                    ?
                                    str_getResHTML ( str_srcData , str_injSrc , str_fileExt ) 
                                    :
                                    fnStr_getResNonMakeUp ( str_srcData , str_fileExt ) 
                                    
                                )
                                : 
                                null ;
                                console.log ( "str_resData_f:" , str_resData ) ;
                                // console.log ( "str_resData_f:" , str_resData.constructor.name ) ;

                                let pgp_writerStm = pgp_fs.createWriteStream 
                                ( 
                                    str_outputUri.toString ()
                                ) ;
                                // console.log ( "pgp_writerStm:" , pgp_writerStm ) ;        
                                pgp_writerStm.write 
                                ( 
                                    str_resData.toString () , 
                                    "utf-8" 
                                ) ;
                                pgp_writerStm.end () ;
                                pgp_writerStm.on
                                (
                                    "finish" ,
                                    function ()
                                    {
                                        console.log ( "finish" ) ;
                                    }
                                ) ;
                                let bol_watchLock = false ;
                                let fn_fsWatchHandle = 
                                function ( a , b , c ) 
                                {
                                    if ( $this.watchLockA01 ) return ;
                                    $this.watchLockA01 = true ;

                                    //console.log ( "str_this.path:" , str_this.path ) ;
                                    /*pgp_fs.unwatchFile
                                    (
                                        str_this.path , 
                                        fn_fsWatchHandle
                                    ) ;*/
                                    pgp_params.fn_glob = {
                                        "cwd" : "./" ,
                                        "ary_regPatt" : [ str_this.path , "" ]
                                    } ;
                                    
                                    compileFd.fn_init 
                                    ( pgp_params )  ;
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
                                    pgp_fs.watch 
                                    ( 
                                        str_this.path 
                                        , 
                                        fn_fsWatchHandle
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
                                                bol_watchLock = !bol_watchLock ;
                                            } ,
                                            3000

                                        ) ;
                                        pgp_fs.unwatchFile
                                        (
                                            str_this.path , 
                                            fn_fsWatchHandle
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
            function ( str_srcData )
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

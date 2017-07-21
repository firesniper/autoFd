let fs = require ( "fs" ) ;


let node_common_lib = 
{
    
    init : function ( initParams )
    {
        initParams = initParams ? initParams :
        {
            srcBaseUrl : "" ,
            destBaseUrl : "" ,
            destVirPath : 0 
        } ;
        let $this = this ;
        let srcBaseUrl  = initParams.srcBaseUrl ;
        let destBaseUrl = initParams.destBaseUrl ;
        console.log ( "destBaseUrl2:" , destBaseUrl ) ;
        let destVirPath = initParams.destVirPath ;
        // let destBaseUrlRegStr = 
        Object.defineProperties
        (
            Object ,
            {
                "baseUrl" :
                {
                    enumerable : true ,
                    configurable : false ,
                    writable : true ,
                    value : srcBaseUrl 
                } ,
                "validDatas" :
                {
                    enumerable : true ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    {
                        nonMarkUpExtAry : [ ".js" , ".css" , ".less" , ".sass" , ".scss" , ".txt" ] ,
                        markUpExtAry : [ ".html" , ".htm" , ".xhtml" , ".xml" ] ,
                        extLabelAry : [ "all" , "global" ] ,
                        commonLabelAry : [] ,
                        combineLabelAry : [ "lessSassScss" ] ,
                        "fileState" : {} ,
                    }
                } ,
                "placeHolderTokenMap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    {
                        "allReg" : {} ,
                        "globalReg" :
                        {
                            "$PH_r_n"  :   [ /(?:\r\n|\r|\n)/ig , "\n" ] ,
                            "$PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            "$PH_space":   [ /(?: )/ig , " " ] 
                        }
                        ,
                        "headReg" : 
                        {
                            
                        } ,
                        "bodyReg" : 
                        {
                            "$PH_baseUrl"  :   
                            [ 
                                 new RegExp 
                                 ( 
                                     destBaseUrl ?
                                     destBaseUrl :
                                     `(?:(?:http|https)?:\\/\\/[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){` + 0 + `,` + destVirPath + `})` 
                                     , 
                                     `ig` 
                                 ) 
                                 , 
                                 srcBaseUrl + "\/" 
                            ] ,
                            /*"$PH_url"  :   
                            [ 
                                new RegExp 
                                ( 
                                    destBaseUrl ?
                                    destBaseUrl :
                                    `(?:url\\([^:]+:[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){`
                                        + 0 + `,` + destVirPath + `})` 
                                    ,
                                    `ig`
                                ) , 
                                "url(" + srcBaseUrl + "\/" 
                            ] 
                            ,
                            "$PH_src"  :   
                            [ 
                                 new RegExp 
                                 ( 
                                     destBaseUrl ?
                                     destBaseUrl :
                                     `(?:src[^=]=[^'"]*(?:'|")?[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){` + 0 + `,` + destVirPath + `})` 
                                     , 
                                     `ig` 
                                 ) 
                                 , 
                                'src = "' + srcBaseUrl + "\/" 
                            ]*/
                        } ,
                        ".htmlReg" :  { } ,
                        ".htmReg" : { } ,
                        ".lessReg" :
                        {
                            "$PH_baseUri" :
                            [
                                /(?:baseUri[^\:]*:[^\r\n;]*(?:\r\n|\r|\n;))/ig , 
                                "baseUri:'" + srcBaseUrl + "';" 
                            ]
                        } ,
                        ".sassReg" :
                        { } ,
                        ".scssReg" :
                        {  } ,
                        ".jsReg" :
                        {
                            // "$PH_r_n"  :  [ /(?:\r\n|\r|\n)/ig , "\n" ] , 
                            // "$PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            // "$PH_space":   [ /(?: )/ig , " " ] ,
                            // "$PH_leftBlock" : 
                            // [
                            //     /\/\*/ig ,
                            //     "/*"
                            // ] ,
                            // "$PH_rightBlock" : 
                            // [
                            //     /\*\//ig ,
                            //     "*/"
                            // ] ,
                            
                            "$PH_reglationA1" :
                            [
                                /\\\/\//ig  , 
                                "\\//" 
                            ] 
                            ,
                            "$PH_fileProtocal" :
                            [
                                /file:\/\/\//ig  , 
                                "file:///" 
                            ] 
                            ,
                            "$PH_httpProtocal" :
                            [
                                /http:\/\//ig  , 
                                "http://" 
                            ] 
                            ,
                            "$PH_block" :
                            [
                                /\/\*[^\*\/]*\*\//ig , 
                                "" 
                            ] 
                            ,
                            "$PH_line" :
                            [
                                /\/\/[^\r\n\t]*(?:\r\n|\r|\n|\t)/ig ,
                                "" 
                            ] 
                            ,
                            "$PH_console" :
                            [
                                /console.log[^;\r\n\t]*(?:(?:; *)|(?:\r\n|\r|\n|\t))/ig  , 
                                "" 
                            ] 
                            
                        } 
                        
                    } 
                } ,
                "placeHolderTokenMapFn" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( PHTMap )
                    {
                        PHTMap = PHTMap ? PHTMap : Object.placeHolderTokenMap ;
                        
                        // console.log ( "PHTMap:" , PHTMap ) ;
                        // phtm.all = {} ;
                        /*for ( let ele in phtm ) 
                        {
                            Object.keys ( phtm ) ;
                        } ;*/
                        // PHTMap.bodyReg = Object.assign ( PHTMap.bodyReg , PHTMap.headReg ) ;
                        // let newPgp = {} ;
                        // PHTMap[ ".jsReg" ] = Object.assign ( PHTMap[ "globalReg" ] , PHTMap[ ".jsReg" ] ) ;
                        PHTMap[ ".htmReg" ] = PHTMap[ ".htmlReg" ] = Object.assign ( PHTMap[ "headReg" ] , PHTMap[ "bodyReg" ] , PHTMap[ ".htmlReg" ] ) ;
                        for 
                        ( 
                            let i = 2 , mapKeys = Object.keys ( PHTMap ) ; 
                            i < mapKeys.length ; 
                            i ++ 
                        )
                        {
                            PHTMap[ mapKeys[ i ] ] = Object.assign ( PHTMap[ mapKeys[ i ] ] , PHTMap.globalReg )
                            // .unique () ;
                            PHTMap.allReg = Object.assign ( PHTMap.allReg , PHTMap[ mapKeys[ i ] ] )
                            // .unique () ;
                        } ;
                        
                        PHTMap[ ".sassReg" ] = PHTMap[ ".scssReg" ] = PHTMap[ ".lessReg" ] ;
                        // console.log ( "PHTMap.allReg:" , PHTMap.allReg ) ;
                        // PHTMap.allReg = newPgp ;
                        // console.log ( "PHTMap:" , PHTMap ) ;
                        return PHTMap ;
                    }  
                }  ,
            }
        ) ,
        Object.defineProperties
        (
            Object.placeHolderTokenMap ,
            {
                placeHolderTokenMapFn :
                {
                    enuemerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    function ( pgp )
                    {
                        pgp = pgp ? pgp : this ;
                        return Object.placeHolderTokenMapFn ( this ) ;
                    } 
                }
            }
        ) ;
        Object.defineProperties
        (
            String.prototype ,
            {
                "getUrlGgp" :
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( num )
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
                    } 
                } ,
                "resolveUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice ( arguments ) ;
                        let _this = this ;
                        let separator = _this.indexOf ( "/" ) > 0 ?
                        "/" :
                        _this.indexOf ( "\\" ) > 0 ? 
                        "\\" : "" ;
                        _this = _this.replace
                        (
                            /(?:\/)+/ig ,
                            separator
                        ) ;
                        //console.log ( "resolveUri_this:" , _this ) ;
                        let dir = 
                        separator == "" ?
                        "" :
                        _this.slice ( 0 , _this.lastIndexOf ( separator )  ) ;
                        // let dir = _this.match ( /.+(?:\/|\\)/ig ) [ 0 ] ;

                        let file = _this.slice 
                        ( 
                            separator == "" ?
                            0 : 
                            _this.lastIndexOf ( separator ) + 1 
                            , 
                            _this.lastIndexOf ( "." ) 
                        ) ;
                        /*let file = 
                        _this.match 
                        ( 
                            _this.lastIndexOf ( separator ) + 1 , 
                            _this.lastIndexOf ( "." ) 
                        ) ;*/
                        let fileBaseName = 
                        file.slice
                        (
                            0 ,
                            file.indexOf ( "." ) > 0 ? file.indexOf ( "." ) : file.length  
                        ) ;
                        let suffix = 
                        file.indexOf ( "." ) == -1 ?
                        "" : 
                        file.slice 
                        ( 
                            file.indexOf ( "." )  
                            // , 
                            // file.lastIndexOf( "." ) 
                        ) ;
                        let ext = _this.slice
                        (
                            _this.lastIndexOf ( "." ) 
                        ) ;
                        return {
                            "dir" : dir ,
                            "file" : file ,
                            "fileBaseName" : fileBaseName ,
                            "suffix" : suffix ,
                            "ext" : ext
                        } ;
                    }
                } ,
                "hasCtt" : 
                {
                    enumerable  : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( cttExp )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this.toString () ;
                        //console.log ( "cttExp:" , cttExp ) ;
                        if ( !cttExp ) 
                        { 
                            console.error ( new ReferenceError ( "cttExp is null" ) ) ; 
                            return ; 
                        } ;
                        let data = _this ;

                        
                            let pmA01 = new Promise
                            (
                                function ( resolve , rejection )
                                {
                                    //console.log ( "pmA01 resolve:" , resolve ) ;
                                    // data = "promise" ;
                                    try
                                    {
                                        fs.openSync 
                                        ( 
                                            _this.toString () , 
                                            "rs" ,
                                            function ( err , fd , c )
                                            {
                                                //console.log ( "hasCtt err:" , err ) ;
                                                //console.log ( "hasCttfd:" , fd ) ;
                                                //console.log ( "hasCtt c:" , c ) ;
                                                data = 
                                                err
                                                ? 
                                                _this 
                                                : 
                                                fs.readFileSync ( _this.toString () , "utf-8" )
                                                ;
                                                
                                            } 
                                        ) ;
                                    }
                                    catch ( err ) 
                                    {
                                        console.info ( "err:" , err ) ;
                                    }
                                    
                                    
                                } 
                                
                            ) ;
                         
                        //console.log ( "Promise data:" , data ) ;
                        //console.log ( "pmA01:" , pmA01 ) ;
                        
                        
                       
                        pmA01  
                        .then
                        (
                            function ( resolve ) 
                            {
                                //console.log ( "hasCtt resolve:" , resolve ) ;
                            } ,
                            function ( rejected , data )
                            {
                                //console.log ( "pmA01 rejected:" , rejected ) ;
                                //console.log ( "pmA01 rejected flag:" , rejected ? true : false ) ;
                                //console.log ( "pmA01 data:" , data ) ;
                                //console.log ( "pmA01 rejected.Error:" , rejected.Error ) ;

                                // data = rejected ? 33 : 1 ;
                            }
                        )
                        .catch
                        (
                            function ( reason )
                            {
                                //console.log ( "reason:" , reason ) ;
                            }
                        ) ;

                        //console.log ( "hasCtt data:" , data ) ;
                        let resFlag = null ;
                        switch ( cttExp.constructor.name )
                        {
                            case "RegExp" : 
                                resFlag = cttExp.test ( data )  ;
                            break ;
                            case "String" :
                                resFlag = data.indexOf ( cttExp ) > -1 ;
                                //console.log ( "resFlag:" , resFlag ) ;
                                Object.validDatas.fileState[ "has_" + cttExp ] = resFlag ;
                            break ;
                        } ;
                        return resFlag ;
                        
                        
                    }
                } ,
                "validFileGetState" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( ctt )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this.toString () ;
                        //console.log ( "_this:" ,  _this.toString ()   ) ;
                        let data = fs.readFileSync (  _this.toString() ,"utf-8" ) ;
                        let isEmpty = data ? true : false ;
                        let fileExt = _this.resolveUri () .ext ;
                        let isMarkUpExt = 
                        ( 
                            new RegExp 
                            ( 
                                `(?:` + Object.validDatas.markUpExtAry.join ( `|` ) + `)` , `ig` 
                            ) 
                        ).test ( fileExt ) 
                        ? 
                        true 
                        : 
                        false ;
                        let htmlFlag = data.indexOf ( "<html" ) > -1 ;
                        let headFlag = data.indexOf ( "<head" ) > -1 ;
                        let bodyFlag = data.indexOf ( "<body" ) > -1 ;
                        let isHtmlContent = htmlFlag || headFlag || bodyFlag ;
                        let res = 
                        {
                            "uri"           : _this ,
                            "isEmpty"       : isEmpty ,
                            "data"          : data ,
                            "isMarkUpExt"   : isMarkUpExt ,
                            "isHtmlCtt"     : isHtmlContent ,
                            "head"          : headFlag ,
                            "body"          : bodyFlag ,
                            "ext"           : fileExt ,
                            "hasChildNode"  : false 
                        } ;
                        

                        Object.fileState = Object.validDatas.fileState = res ;
                        if ( ctt )
                        {
                            let cttFlag = data.hasCtt ( ctt ) ; 
                            if ( ctt.constructor.name == "String" )
                            { 
                                res[ "has_" + ctt ] = cttFlag ;     
                            } ;

                        } ;
                        //console.log ( "Object.fileState:" , Object.fileState ) ;
                        //console.log ( "$this:" , $this ) ;
                        //console.log ( "node_common_lib:" , node_common_lib ) ;

                        return res ;
                    }
                } ,
                "validDesDirFileFromUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( outputDir )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this.toString () ;
                        outputDir = outputDir ? outputDir : _this.resolveUri ().dir ;
                        if ( outputDir )
                        {
                            fs.exists 
                            (
                                outputDir
                                ,
                                function ( flag )
                                {
                                    if ( flag ) return ; 
                                    fs.mkdirSync ( outputDir ) ;

                                }
                            ) ;
                        } ;

                        fs.open 
                        ( 
                            _this , 
                            "w" , 
                            function ( err , fd )  
                            {
                                //console.log ( "err:" , err ) ;
                                //console.log ( "fd:" , fd ) ;
                            }  
                        ) ;
                    }
                } ,
                "rSpace_aNl" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( a )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = args[ 0 ] ? args[ 0 ] : this ;
                        return _this
                        // .replace ( />.*</ig , ">\n<" ) 
                        // .replace ( /^.*</ig , "<" )
                        // .replace ( /\/.*>.*$/ig , ">" )
                        // .replace ( /\/>.*</ig , "/>\n<" ) ;
                    }
                } ,
                "caseQuote" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( a )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = args[ 0 ] ? args[ 0 ] : this ;
                        return _this.toLowerCase().replace ( /(?:\'|\")/ig , "" ).replace ( / /ig , "" )  ;
                    }
                }
                ,
                "isEleInAry" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( extAry )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        extAry = extAry ? extAry : Object.validDatas.nonMarkUpExtAry ;
                        return extAry.hasEle ( _this ) ;
                            
                    }
                } ,
                "toTagRegStrPgp" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        //console.log ( "Object.fileState:" , Object.fileState ) ;
                        let res = 
                        _this.match
                        ( 
                            new RegExp 
                            ( 
                                "(?:" 
                                + Object.validDatas.nonMarkUpExtAry
                                .concat ( Object.validDatas.extLabelAry )
                                .join( "|" ) 
                                + ")" 
                                , 
                                "ig" 
                            )
                        ) 
                        ? 
                        { 
                            wrapAndCtt : ".*" ,
                            wrap : ""
                        }  
                        : 
                        { 
                            wrapAndCtt : new RegExp 
                            ( 
                                "<" + _this + ".*>.*<\\/" + _this + ">" ,
                                "ig"
                            ) ,
                            wrap : new RegExp 
                            ( 
                                "(?:<" + _this + ">|<\\/" + _this + ">)" , 
                                "ig"
                            )
                        } ;
                        return res ;
                    }
                } 
                ,
                "getRegPgpFromState" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( selectNode )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let childNodeDef = "all" ;
                        let selectNodeCom = "global" ;
                        /*console.log ( "_this.hasCtt: " , _this.hasCtt ( "<" + 
                        selectNode ) ) ;*/
                        selectNode = 
                        (
                            selectNode != selectNodeCom 
                        ) 
                        ?
                        (
                            Object.validDatas.fileState.ext.isEleInAry ( Object.validDatas.markUpExtAry ) 
                            ? 
                            ( 
                                // _this.indexOf ( "<" + selectNode ) > -1 ? 
                                _this.hasCtt ( "<" + selectNode ) 
                                ?
                                selectNode
                                :
                                selectNodeCom 
                            )
                            :
                            selectNode 
                        )
                        :
                        selectNodeCom
                        ;

                        //console.log ( "selectNode2:" , selectNode ) ;
                        let placeHolderTokenMap = Object.placeHolderTokenMapFn ()
                        [ 
                            Object.validDatas.fileState.ext 
                            // selectNode
                            + "Reg" 
                        ] ;

                       /* console.log ( "Object.placeHolderTokenMap:" , Object.placeHolderTokenMap.placeHolderTokenMapFn ) ;
                        console.log ( "Object.placeHolderTokenMap:" , Object.placeHolderTokenMap.placeHolderTokenMapFn ( Object.placeHolderTokenMap ) ) ;*/

                        let parentTagRegStrPgp = selectNode ? selectNode.toTagRegStrPgp () : null ;
                        console.log ( "parentTagRegStrPgp:" , parentTagRegStrPgp ) ;

                        return {
                            "placeHolderTokenMap" : placeHolderTokenMap ,
                            "parentTagRegStrPgp" : parentTagRegStrPgp
                        } ;
                    }
                } ,
                
                "getCttWrap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( placeHolderTokenMap , parentTagRegStrPgp )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        console.log ( "%this:" ,  this ) ;
                        if (  _this.constructor.name != "String" )
                        { 
                            throw new TypeError ( "isn't String type" ) ; 
                            // return ;
                        } ;
                        
                       /* let placeHolderTokenMap = Object.placeHolderTokenMapFn ()[ selectNode + "Reg" ] ;
                        let parentTagRegStrPgp = selectNode.toTagRegStrPgp () ;
                        console.log ( "parentTagRegStrPgp:" , parentTagRegStrPgp ) ;*/
                        console.log ( "placeHolderTokenMap:" , placeHolderTokenMap ) ;
                        let allStr = _this.tokenToPlaceHolder 
                        ( 
                            placeHolderTokenMap 
                        ) ;
                        console.log ( "allStr:" , allStr ) ;

                        let selectWrapCttStr = null ;
                        let selectCttAry2 = null ;
                        let selectWrapAry = null ;
                        if ( parentTagRegStrPgp )
                        {
                            console.log ( "parentTagRegStrPgp :" , parentTagRegStrPgp ) ;
                            selectWrapCttStr = allStr.match 
                            ( 
                                parentTagRegStrPgp.wrapAndCtt  
                            ) ;
                            console.log ( "selectWrapCttStr:" , selectWrapCttStr ) ;

                            selectWrapAry = selectWrapCttStr.hasNullPointer ().content[ 0 ].match 
                            ( parentTagRegStrPgp.wrap ) ;
                            console.log ( "selectWrapAry:" ,  selectWrapAry ) ;

                            let selectCttStr = selectWrapCttStr[ 0 ]
                            .replace 
                            (  
                                parentTagRegStrPgp.wrap   
                                , 
                                "" 
                            ) 
                            // .rSpace_aNl ( ) ;
                            // console.log ( "selectCttStr:" , selectCttStr ) ;
                            console.log ( "selectCttStr:" , selectCttStr ) ;
                            // let selectWrapCttStr3 = selectCttStr.split ( "\n" ) ; 
                            let selectCttStr2 = selectCttStr.placeHolderToToken 
                            ( 
                                placeHolderTokenMap 
                            ) ;
                            console.log ( "selectCttStr2:" , selectCttStr2 ) ;
                            let selectCttAry = selectCttStr2.split ( "\n" ) ; 
                            selectCttAry2 = selectCttAry.hasNullPointer ().content ;
                            console.log ( "selectCttAry2:" , selectCttAry2 ) ;
                        } ;
                        
                        return { 
                            "selectWrapCttStr" : selectWrapCttStr ? selectWrapCttStr[ 0 ] : allStr ,
                            "selectCttAry" : selectCttAry2 ,
                            "selectWrapAry" : selectWrapAry
                        } ;
                    } 
                } ,
                
                "tokenToPlaceHolder" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( phTokenMap , fileExt )
                    {
                        console.log ( "fileExt:" , fileExt ) ;
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        fileExt = fileExt ? fileExt : Object.validDatas.fileState.ext ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : 
                        Object.placeHolderTokenMapFn ()[ fileExt + "Reg" ] ;
                        console.log ( "phTokenMap:" , phTokenMap ) ;
                        let resTkToPh = _this ;
                        for ( let ele in phTokenMap )
                        {
                            resTkToPh = resTkToPh.replace 
                            ( 
                                phTokenMap[ ele ][ 0 ] , 
                                ele  
                            ) ;
                        } ;
                                /*resTkToPh = resTkToPh.replace ( /(?:\n|\r)/ig , "$PH_r_n" )
                                .replace ( /(?:\t\|\x09|\cI|\v)/ig , "$PH_t" ) 
                                .replace ( /(?: )/ig , "$PH_space" ) */
                                /*.match ( /[^\f\n\r\t\v]/ig )
                                .join ( "" ) ; */
                        console.log ( "resTkToPh:" , resTkToPh ) ;
                        return resTkToPh.match ( /[^\f\n\r\t\v]/ig ).join ( "" ) ;        
                    }
                } ,
                "placeHolderToToken" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( phTokenMap , fileExt )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        // console.log ( "this:" , this ) ;
                        fileExt = fileExt ? fileExt : Object.validDatas.fileState.ext ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : Object.placeHolderTokenMapFn ()[ fileExt + "Reg" ] ;
                        let phRes = _this ;
                        console.log ( "phTokenMap:" , phTokenMap ) ;
                        for ( let ele in phTokenMap )
                        {
                            phRes = phRes.replace 
                            ( 
                                new RegExp ( "(?:\\" + ele + ")" , "ig" ) , 
                                phTokenMap[ ele ][ 1 ] 
                            ) ;
                        } ;
                        // phRes = _this.replace ( new RegExp ( "(?:\\$PH_r_n\\$){1,}"  ) , "\n" ) ;
                        console.log ( "phRes:" , phRes ) ;
                        return phRes ;
                        
                    }
                }
            }
            
        ) ;
        Object.defineProperties
        (
            Array.prototype ,
            {
                "rmEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( idxAry )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let resAry = [] ;
                        let inc = 0 ;
                        idxAry = idxAry.constructor.name == "Array" ?
                                idxAry :
                                idxAry.constructor.name == "Number" ?
                                [].push ( idxAry ) :
                                null ; 
                        hfA01 : for ( let i = 0 ; i < _this.length ; i ++ )
                        {
                            for ( let a = 0 ; a < idxAry.length ; a ++ )
                            {
                                if ( i == idxAry [ a ] )
                                {
                                     continue hfA01 ; 
                                } ;
                            } ;
                             
                            resAry [ inc ] = _this [ i ] ;
                            inc ++ ;
                        } ;
                        return resAry ;
                    }
                } ,
                "hasEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let res = false ;
                        for ( let i = 0 ; i < _this.length ; i ++ ) 
                        {
                            if ( _this[ i ] == val )
                            {
                                res = true ;
                                break ;
                            } ;
                        } ;
                        return res ;
                    }
                } ,
                "getReadStreamAry" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let readStreamAry = [] ;
                        for ( let i = 0 ; i < _this.length ; i++ ) 
                        {
                            readStreamAry[ i ] = fs.createReadStream ( _this[ i ] ) ; 
                            readStreamAry[ i ].setEncoding ( "utf-8" ) ;
                        } ;
                        return readStreamAry ;
                    }
                } ,
                "hasNullPointer" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let ary = [] ;
                        let inc = 0 ;
                        let flag = false ;
                        hfA02 : for ( let i = 0 ; i < _this.length ; i++ )
                        {
                            if 
                            (
                                _this[ i ] == null || 
                                _this[ i ] == undefined || 
                                _this[ i ] == ""
                            )
                            {
                                flag = true ;
                                continue hfA02 ;
                            }
                            else 
                            {
                                
                                ary[ inc ] = _this[ i ] ;
                                ++inc ;
                            } ;
                            
                        } ;
                        console.log ( "ary:" , ary ) ;
                        return { 
                            flag : flag ,
                            content : ary 
                        } ;
                    }
                } ,
                "unique" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        return Array.from 
                            ( new Set ( this ) ) ;
                    }
                } ,
                "unique2" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        var json = {} ;
                        var result = [] ;
                        this.forEach
                        (
                            function ( value )
                            {
                                var type = Object.prototype.toString
                                .call ( value ).match ( /\s(\w+)/ )[ 1 ]
                                .toLowerCase () ;
                                if ( !( ( type + '-' + value ) in json ) )
                                {
                                    json[ type + '-' + value ] = true ; 
                                    result.push ( value ) ;
                                } ;
                            }
                        )
                        return result;
                    }
                } ,
                "hasSamePointerInAry" :
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let res = false ;
                        /*for ( let ele in _this ) 
                        {
                            if ( _this[ ele ] == val  ) 
                            {
                                res = true ;
                                break ;
                            } ;
                        } ;*/
                        for ( let i = 0 ; i < _this.length ; i++ ) 
                        {
                            if ( _this[ i ] == val  ) 
                            {
                                res = true ;
                                break ;
                            } ;
                        } ;
                        return res ;
                    }
                } ,
                "excludeOverlap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( bAry , aAry )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = args[ 1 ] ? args[ 1 ] : this ;
                        let ary = [] ;
                        let inc = 0 ;
                        hfA01 : for ( let be = 0 ; be < bAry.length ; be++ )
                        {
                            console.log ( "_this[ be ]:" , _this ) ;
                            console.log ( "bAry [ be ]:" , bAry  ) ;
                            for ( let ce = 0 ; ce < _this.length ; ce++ )
                            {

                                if 
                                ( 
                                    bAry[ be ].caseQuote () == _this[ ce ].caseQuote () 
                                )
                                { 
                                    continue hfA01 ; 
                                }
                                else if 
                                ( 
                                    ce == _this.length - 1 && 
                                    !ary.hasSamePointerInAry ( bAry[ be ] ) 
                                )
                                { 
                                    
                                    ary[ inc ] = bAry[ be ] ; 
                                    ++inc ;
                                } ;
                            } ;
                            
                        } ;
                        return ary ;
                    }
                } ,
                "insertEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( index , val )
                    {
                        let arts = Array.prototype.slice.call ( argumets ) ;
                        let _this = this ;
                        let ary1 = _this.slice ( 0 , index ) ;
                        let ary2 = _this.slice ( index ) ;
                        let ary3 = ary1.push ( val ) ; 
                        return ary3.concat ( ary2 ) ; 
                    } 
                } ,
            }
            
        ) ;

        Object.defineProperties 
        (
            String.prototype ,
            {
                "formatToRegStr" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( a )
                    {
                        var defCharAry = [ "/" , "\\" ] ; 
                        // console.log ( "this:" , this ) ;
                        var thisAry = this.split ( "" ) ;
                        for ( var i = 0 ; i < thisAry.length ; i++ )
                        {
                            thisAry[ i ] =  "\\" + thisAry[ i ] ;
                        } ;
                        // this = thisAry.join ( "" ) ;
                        return thisAry.join ( "" ) ;
                        /*var reg = new RegExp 
                        ( 
                            "[" + defCharAry.join( "" ) + "]" , 
                            "ig" 
                        ) ;
                        var defCharStr = this ;
                        for ( var i = 0 ; i < defCharAry.length ; i++ )
                        {
                            defCharStr = defCharStr.replace 
                            ( 
                                reg , "\\" + defCharAry[ i ] 
                            ) ;
                        } ;*/
                        
                    } 
                } ,
                "countOf" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( token )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let tokenCount = 0 ;
                        for ( let i = 0 ; i < _this.length ; i ++ ) 
                        {
                            if ( _this[ i ] === token )
                            {
                                tokenCount ++ ;
                            } ;
                        } ;
                        
                        return tokenCount ;
                    } 
                } ,
                "backNumIndexOf" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( token , num )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let _thisAry = _this.split ( "" ) ;
                        let indexCount = 0 ;
                        let _thisStr1 = _this ;
                        for ( let i = 0 ; i < _this.countOf ( "." ) ; i ++ ) 
                        {
                            ++ indexCount  ;
                            if ( indexCount >= num ) break ;
                            _thisStr1 = _thisStr1.slice ( 0 , _thisStr1.lastIndexOf ( "." ) ) ;
                            
                        } ;
                        let resIndex = _thisStr1.lastIndexOf ( token ) ;
                        return resIndex ;
                    } 
                } ,
                "getOutputUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( outputDir )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        console.log ( "getOutputUri_this:" , this ) ;
                        console.log ( "getOutputUri_outputDir:" , outputDir2 = outputDir ) 
                        outputDir = outputDir ? outputDir : this.resolveUri ().dir ;
                        console.log ( "outputDir:" , outputDir ) ;
                        let outputUri = 
                        (
                                outputDir
                            + this.resolveUri ().file 
                            // + ".dev"
                            + this.resolveUri ().ext
                        ).rmSuffix ( "" )  ;
                        console.log ( "outputUri：" , outputUri ) ;
                        return outputUri ;
                    }
                } ,
                "rmSuffix" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( repStr )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                       /* let str1 = _this.slice ( _this.lastIndexOf ( "." ) ) ;
                        let str2 = _this.slice ( _this.backNumIndexOf ( "." , 2 ) ) ;
                        let resStr = _this.replace 
                        ( 
                            new RegExp ( str2 + "$" ) , 
                            str1 == ".htm" ? ".html" : str1
                        ) ;*/

                        let filePgp = _this.resolveUri () ;
                        let resStr = 
                        filePgp.dir + "\\" 
                        + 
                        filePgp.fileBaseName 
                        + 
                        filePgp.ext ;

                        return resStr ;
                    } 
                }
            }
        ) ; 
        Object.defineProperties
        (
            // 对Date的扩展，将 Date 转化为指定格式的String   
            // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
            // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
            // 例子：   
            // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
            // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
            Date.prototype ,
            {
                Format :
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : false ,
                    value : function ( fmt )   
                    { //author: meizz   
                    var o = {   
                        "M+" : this.getMonth()+1,                 //月份   
                        "d+" : this.getDate(),                    //日   
                        "h+" : this.getHours(),                   //小时   
                        "m+" : this.getMinutes(),                 //分   
                        "s+" : this.getSeconds(),                 //秒   
                        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
                        "S"  : this.getMilliseconds()             //毫秒   
                    };   
                    if(/(y+)/.test(fmt))   
                        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
                    for(var k in o)   
                        if(new RegExp("("+ k +")").test(fmt))   
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
                    return fmt;   
                    }
                }
            }
        ) ;
    }
     
} ;


module.exports = node_common_lib ;
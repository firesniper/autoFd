let fs = require ( "fs" ) ;

let node_common_lib = 
{
    
    init : function ( baseUrl )
    {
        let $this = this ;
        
        Object.defineProperties
        (
            Object ,
            {
                "baseUrl" :
                {
                    enumerable : true ,
                    configurable : false ,
                    writable : true ,
                    value : baseUrl 
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
                            "$PH_n_r"  :   [ /(?:\n)/ig , "\n" ] ,
                            "	"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            " ":   [ /(?: )/ig , " " ] 
                        }
                        ,
                        "headReg" : 
                        {
                            // "$PH_n_r"  :   [ /(?:\n|\r)/ig , "\n" ] ,
                            // "	"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            // " ":   [ /(?: )/ig , " " ] 
                        } ,
                        "bodyReg" : 
                        {
                            "$PH_url"  :   
                            [ 
                                /(?:url\(.*\:\d+\/)/ig , 
                                "url(" + baseUrl + "\/" 
                            ] 
                            ,
                            "$PH_src"  :   
                            [ 
                                /(?:src.*=.*(?:'|").*\:\d+\/)/ig , 
                                'src = "' + baseUrl + "\/" 
                            ]
                        } ,
                        ".htmlReg" :  { } ,
                        ".htmReg" : { } ,
                        ".lessReg" :
                        {
                            "$PH_baseUri" :
                            [
                                /(?:baseUri:.*(?:;|$PH_n_r))/ig , 
                                "baseUri:'" + baseUrl + "';" 
                            ]
                        } ,
                        ".sassReg" :
                        { } ,
                        ".scssReg" :
                        {  } ,
                        ".jsReg" :
                        {
                            "\//" :
                            [
                                /\\\/\//ig  , 
                                "\\//" 
                            ] ,
                            "file:///" :
                            [
                                /file:\/\/\//ig  , 
                                "file:///" 
                            ] ,
                            "http://" :
                            [
                                /http:\/\//ig  , 
                                "http://" 
                            ] ,
                            
                            "" :
                            [
                                /console.log.*(?:;|$PH_n_r)/ig  , 
                                "" 
                            ] ,
                            "" :
                            [
                                /\/\/.*(?:\r\n|\t|\x09|\cI|)/ig , 
                                "" 
                            ] ,
                            "" :
                            [
                                /\/\*.*\*\//ig , 
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
                        
                                                                        
                                                                        PHTMap[ ".htmReg" ] = PHTMap[ ".htmlReg" ] = Object.assign ( PHTMap[ ".htmlReg" ] , PHTMap[ "headReg" ] , PHTMap[ "bodyReg" ] ) ;
                        for 
                        ( 
                            let i = 2 , mapKeys = Object.keys ( PHTMap ) ; 
                            i < mapKeys.length ; 
                            i ++ 
                        )
                        {
                            PHTMap[ mapKeys[ i ] ] = Object.assign ( PHTMap[ mapKeys[ i ] ] , PHTMap.globalReg )
                                                        PHTMap.allReg = Object.assign ( PHTMap.allReg , PHTMap[ mapKeys[ i ] ] )
                                                    } ;
                        
                        PHTMap[ ".sassReg" ] = PHTMap[ ".scssReg" ] = PHTMap[ ".lessReg" ] ;
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
                "resolveUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice ( arguments ) ;
                        let _this = this ;
                        return {
                            dir : _this.slice ( 0 , _this.lastIndexOf ( "/" ) ) ,
                            file : _this.slice 
                            ( 
                                _this.lastIndexOf ( "/" ) , 
                                _this.lastIndexOf ( "." ) 
                            ) ,
                            ext : _this.slice
                            (
                                _this.lastIndexOf ( "." ) 
                            )
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
                                                                                                            fs.openSync 
                                    ( 
                                        _this.toString () , 
                                        "rs" ,
                                        function ( err , fd , c )
                                        {
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
                                
                            ) ;
                         
                                                                        
                        
                       
                        pmA01  
                        .then
                        (
                            function ( resolve ) 
                            {
                                                            } ,
                            function ( rejected , data )
                            {
                                                                                                                                
                                                            }
                        )
                        .catch
                        (
                            function ( reason )
                            {
                                                            }
                        ) ;

                                                let resFlag = null ;
                        switch ( cttExp.constructor.name )
                        {
                            case "RegExp" : 
                                resFlag = cttExp.test ( data )  ;
                            break ;
                            case "String" :
                                resFlag = data.indexOf ( cttExp ) > -1 ;
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
                                                let data = fs.readFileSync (  _this.toString() ,"utf-8" ) ;
                        let isEmpty = data ? true : false ;
                        let fileExt = _this.resolveUri () .ext ;
                        let isMarkUpExt = 
                        fileExt.match 
                        ( 
                            // /(?:.htm|.html)/ig
                            new RegExp ( "(?:" + Object.validDatas.markUpExtAry.join ( "|" ) + ")" , "ig" ) 
                        ) ? true : false ;
                        let htmlFlag = data.indexOf ( "<html" ) > -1 ;
                        let headFlag = data.indexOf ( "<head" ) > -1 ;
                        let bodyFlag = data.indexOf ( "<body" ) > -1 ;
                        let isHtmlContent = htmlFlag || headFlag || bodyFlag ;
                        let res = 
                        {
                            uri : _this ,
                            "isEmpty" : isEmpty ,
                            "data" : data ,
                            "isMarkUpExt" : isMarkUpExt ,
                            "isHtmlCtt" : isHtmlContent ,
                            head : headFlag ,
                            body : bodyFlag ,
                            "ext" : fileExt ,
                            "hasChildNode" : false 
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
                        console.log ( "_this.hasCtt: " , _this.hasCtt ( "<" + 
                        selectNode ) ) ;
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

                                                let placeHolderTokenMap = Object.placeHolderTokenMapFn ()
                        [ 
                            Object.validDatas.fileState.ext 
                            // selectNode
                            + "Reg" 
                        ] ;

                       

                        let parentTagRegStrPgp = selectNode ? selectNode.toTagRegStrPgp () : null ;
                        
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
                                                if (  _this.constructor.name != "String" )
                        { 
                            throw new TypeError ( "isn't String type" ) ; 
                                                    } ;
                        
                       
                                                let allStr = _this.tokenToPlaceHolder 
                        ( 
                            placeHolderTokenMap 
                        ) ;
                        
                        let selectWrapCttStr = null ;
                        let selectCttAry2 = null ;
                        let selectWrapAry = null ;
                        if ( parentTagRegStrPgp )
                        {
                                                        selectWrapCttStr = allStr.match 
                            ( 
                                parentTagRegStrPgp.wrapAndCtt  
                            ) ;
                            
                            selectWrapAry = selectWrapCttStr.hasNullPointer ().content[ 0 ].match 
                            ( parentTagRegStrPgp.wrap ) ;
                            
                            let selectCttStr = selectWrapCttStr[ 0 ]
                            .replace 
                            (  
                                parentTagRegStrPgp.wrap   
                                , 
                                "" 
                            ) 
                                                                                                                                            let selectCttStr2 = selectCttStr.placeHolderToToken 
                            ( 
                                placeHolderTokenMap 
                            ) ;
                                                        let selectCttAry = selectCttStr2.split ( "\n" ) ; 
                            selectCttAry2 = selectCttAry.hasNullPointer ().content ;
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
                                                let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        fileExt = fileExt ? fileExt : Object.validDatas.fileState.ext ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : 
                        Object.placeHolderTokenMapFn ()[ fileExt + "Reg" ] ;
                                                let resTkToPh = _this ;
                        for ( let ele in phTokenMap )
                        {
                            resTkToPh = resTkToPh.replace 
                            ( 
                                phTokenMap[ ele ][ 0 ] , 
                                ele  
                            ) ;
                        } ;
                                /*resTkToPh = resTkToPh.replace ( /(?:\n|\r)/ig , "$PH_n_r" )
                                .replace ( /(?:\t\|\x09|\cI|\v)/ig , "	" ) 
                                .replace ( /(?: )/ig , " " ) */
                                /*.match ( /[^\f\n\r\t\v]/ig )
                                .join ( "" ) ; */
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
                                                fileExt = fileExt ? fileExt : Object.validDatas.fileState.ext ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : Object.placeHolderTokenMapFn ()[ fileExt + "Reg" ] ;
                        let phRes = _this ;
                                                for ( let ele in phTokenMap )
                        {
                            phRes = phRes.replace 
                            ( 
                                new RegExp ( "(?:\\" + ele + ")" , "ig" ) , 
                                phTokenMap[ ele ][ 1 ] 
                            ) ;
                        } ;
                                                                        return phRes ;
                        
                    }
                }
            }
            
        ) ;
        Object.defineProperties
        (
            Array.prototype ,
            {
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
                                                var thisAry = this.split ( "" ) ;
                        for ( var i = 0 ; i < thisAry.length ; i++ )
                        {
                            thisAry[ i ] =  "\\" + thisAry[ i ] ;
                        } ;
                                                return thisAry.join ( "" ) ;
                        
                        
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
                        outputDir = outputDir ? outputDir : this.resolveUri ().dir ;
         
                        let outputUri = 
                        (
                                outputDir
                            + this.resolveUri ().file 
                            // + ".dev"
                            + this.resolveUri ().ext
                        ).rmSuffix ( "" )  ;
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
                        let str1 = _this.slice ( _this.lastIndexOf ( "." ) ) ;
                        
                        let str2 = _this.slice ( _this.backNumIndexOf ( "." , 2 ) ) ;
                        let resStr = _this.replace 
                        ( 
                            new RegExp ( str2 + "$" ) , 
                            str1 == ".htm" ? ".html" : str1
                        ) ;
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
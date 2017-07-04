let fs = require ( "fs" ) ;

let node_common_lib = 
{
    nonMarkUpExtAry : [ ".js" , ".css" , ".less" , ".sass" , ".scss" , ".txt" ] ,
    markUpExtAry : [ ".html" , ".htm" , ".xhtml" , ".xml" ] ,
    extLabelAry : [ "all" , "global" ] ,
    commonLabelAry : [] ,
    combineLabelAry : [ "lessSassScss" ] ,
    "fileState" : {} ,
    init : function ( baseUrl )
    {
        let $this = this ;
        /*console.log ( "baseUrl:" , baseUrl ) ;
        console.log ( "_this:" , this ) ;*/
        Object.defineProperties
        (
            String.prototype ,
            {
                "resolveUri" : {
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
                "haveCtt" : {
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
                                    console.log ( "pmA01 resolve:" , resolve ) ;
                                    // data = "promise" ;
                                    fs.openSync 
                                    ( 
                                        _this.toString () , 
                                        "rs" ,
                                        function ( err , fd , c )
                                        {
                                            console.log ( "haveCtt err:" , err ) ;
                                            console.log ( "haveCttfd:" , fd ) ;
                                            console.log ( "haveCtt c:" , c ) ;
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
                         
                        console.log ( "Promise data:" , data ) ;
                        console.log ( "pmA01:" , pmA01 ) ;
                        
                        
                       
                        pmA01  
                        .then
                        (
                            function ( resolve ) 
                            {
                                console.log ( "haveCtt resolve:" , resolve ) ;
                            } ,
                            function ( rejected , data )
                            {
                                console.log ( "pmA01 rejected:" , rejected ) ;
                                console.log ( "pmA01 rejected flag:" , rejected ? true : false ) ;
                                console.log ( "pmA01 data:" , data ) ;
                                console.log ( "pmA01 rejected.Error:" , rejected.Error ) ;

                                // data = rejected ? 33 : 1 ;
                            }
                        )
                        .catch
                        (
                            function ( reason )
                            {
                                console.log ( "reason:" , reason ) ;
                            }
                        ) ;

                        console.log ( "haveCtt data:" , data ) ;
                        let resFlag = null ;
                        switch ( cttExp.constructor.name )
                        {
                            case "RegExp" : 
                                resFlag = cttExp.test ( data )  ;
                            break ;
                            case "String" :
                                resFlag = data.indexOf ( "<"+ cttExp ) > -1 ;
                            break ;
                        } ;
                        return resFlag ;
                        
                        
                    }
                } ,
                "validFileGetStat" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this.toString () ;
                        console.log ( "_this:" ,  _this.toString ()   ) ;
                        let data = fs.readFileSync (  _this.toString() ,"utf-8" ) ;
                        let isEmpty = data ? true : false ;
                        let fileExt = _this.resolveUri () .ext ;
                        let isMarkUpExt = 
                        fileExt.match 
                        ( 
                            // /(?:.htm|.html)/ig
                            new RegExp ( "(?:" + $this.markUpExtAry.join ( "|" ) + ")" , "ig" ) 
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
                            "ext" : fileExt 
                        } ;
                        Object.fileState = $this.fileState = res ;
                        console.log ( "$this:" , $this ) ;
                        console.log ( "node_common_lib:" , node_common_lib ) ;

                        return res ;
                    }
                } ,
                "validDesDirFileFromUri" : {
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
                                console.log ( "err:" , err ) ;
                                console.log ( "fd:" , fd ) ;
                            }  
                        ) ;
                    }
                } ,
                "rSpace_aNl" : {
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
                "caseQuote" : {
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
                "isEleInAry" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( extAry )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        extAry = extAry ? extAry : $this.nonMarkUpExtAry ;
                        return extAry.hasEle ( _this ) ;
                            
                    }
                } ,
                "toTagRegStrPgp" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        console.log ( "$this.fileState:" , $this.fileState ) ;
                        let res = 
                        _this.match
                        ( 
                            new RegExp 
                            ( 
                                "(?:" 
                                + $this.nonMarkUpExtAry
                                .concat ( $this.extLabelAry )
                                .join( "|" ) 
                                + ")" 
                                , 
                                "ig" 
                            )
                        ) 
                        ? 
                        { 
                            wrapAndContent : ".*" ,
                            wrap : ""
                        }  
                        : 
                        { 
                            wrapAndContent : new RegExp 
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
                "getRegPgpFromStat" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let parentNodeDef = "all" ;
                        let parentNodeCom = "global" ;
                        console.log ( "_this.haveCtt: " , _this.haveCtt ( "<" + parentNode ) ) ;
                        parentNode = 
                        (
                            parentNode   
                        ) 
                        ?
                        (
                            (
                                parentNode != parentNodeDef && 
                                parentNode != parentNodeCom 
                            ) 
                            ?
                            (
                                $this.fileState.ext.isEleInAry ( $this.markUpExtAry ) 
                                ? 
                                ( 
                                    // _this.indexOf ( "<" + parentNode ) > -1 ? 
                                    _this.haveCtt ( "<" + parentNode ) ? 
                                    parentNode : 
                                    parentNodeCom 
                                )
                                :
                                parentNode 
                            )
                            :
                            parentNode
                        ) 
                        :
                        parentNodeDef ;

                        console.log ( "parentNode2:" , parentNode ) ;
                        let placeHolderTokenMap = String.prototype.placeHolderTokenMapFn ()[ parentNode + "Reg" ] ;
                        let parentTagRegStrPgp = parentNode.toTagRegStrPgp () ;
                        console.log ( "parentTagRegStrPgp:" , parentTagRegStrPgp ) ;

                        return {
                            "placeHolderTokenMap" : placeHolderTokenMap ,
                            "parentTagRegStrPgp" : parentTagRegStrPgp
                        } ;
                    }
                } ,
                
                "getContentWrap" : {
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
                        
                       /* let placeHolderTokenMap = String.prototype.placeHolderTokenMapFn ()[ parentNode + "Reg" ] ;
                        let parentTagRegStrPgp = parentNode.toTagRegStrPgp () ;
                        console.log ( "parentTagRegStrPgp:" , parentTagRegStrPgp ) ;*/

                        let allDomStr = _this.tokenToPlaceHolder 
                        ( 
                            null ,
                            placeHolderTokenMap 
                        ) ;
                        console.log ( "allDomStr:" , allDomStr ) ;
                        console.log ( "parentTagRegStrPgp.wrapAndContent:" , parentTagRegStrPgp.wrapAndContent ) ;
                        let partDomStr = allDomStr.match 
                        ( 
                            parentTagRegStrPgp.wrapAndContent  
                        ) ;
                        console.log ( "partDomStr:" , partDomStr ) ;

                        let parentWrapAry = partDomStr.hasNullPointer ().content[ 0 ].match 
                        (  parentTagRegStrPgp.wrap ) ;
                        console.log ( "parentWrapAry:" ,  parentWrapAry ) ;

                        let domContentStr = partDomStr[ 0 ]
                        .replace 
                        (  
                             parentTagRegStrPgp.wrap != /(?:)/ig ?
                             parentTagRegStrPgp.wrap : "" 
                            , 
                            "" 
                        ) 
                        // .rSpace_aNl ( ) ;
                        // console.log ( "domContentStr:" , domContentStr ) ;
                        console.log ( "domContentStr:" , domContentStr ) ;
                        // let partDomStr3 = domContentStr.split ( "\n" ) ; 
                        let domContentStr2 = domContentStr.placeHolderToToken 
                        ( 
                            null ,
                            placeHolderTokenMap 
                        ) ;
                        console.log ( "domContentStr2:" , domContentStr2 ) ;
                        let domContentAry = domContentStr2.split ( "\n" ) ; 
                        let nonNullAry = domContentAry.hasNullPointer ().content ;
                        console.log ( "nonNullAry:" , nonNullAry ) ;
                        return { 
                            "partDomStr" : partDomStr[ 0 ] ,
                            "contentAry" : nonNullAry ,
                            "parentWrapAry" : parentWrapAry
                        } ;
                    } 
                } ,
                "placeHolderTokenMap" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : {
                        "all" : {} ,
                        "headReg" :
                            {
                            "$PH_n_r"  :   [ /(?:\n|\r)/ig , "\n" ] ,
                            "$PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            "$PH_space":   [ /(?: )/ig , " " ] 
                        }
                        ,
                        "bodyReg" : {
                            "$PH_url"  :   [ 
                                /(?:url\(.*\:\d+\/)/ig , 
                                "url(" + baseUrl + "\/" 
                                ] 
                                ,
                            "$PH_src"  :   [ 
                                /(?:src.*=.*(?:'|").*\:\d+\/)/ig , 
                                'src = "' + baseUrl + "\/" 
                                ]
                        }
                        

                    } 
                } ,
                "placeHolderTokenMapFn" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let PHTMap = 
                        {
                            "allReg" : {} ,
                            "globalReg" :
                            {
                                "$PH_n_r"  :   [ /(?:\n)/ig , "\n" ] ,
                                "$PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                                "$PH_space":   [ /(?: )/ig , " " ] 
                            }
                            ,
                            "headReg" : {
                                // "$PH_n_r"  :   [ /(?:\n|\r)/ig , "\n" ] ,
                                // "$PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                                // "$PH_space":   [ /(?: )/ig , " " ] 
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
                                
                                 "$PH_reglationA1" :
                                [
                                    /\\\/\//ig  , 
                                    "\\//" 
                                ] ,
                                "$PH_fileProtocal" :
                                [
                                    /file:\/\/\//ig  , 
                                    "file:///" 
                                ] ,
                                "$PH_httpProtocal" :
                                [
                                    /http:\/\//ig  , 
                                    "http://" 
                                ] ,
                                
                                "$PH_console" :
                                [
                                    /console.log.*(?:;|$PH_n_r)/ig  , 
                                    "" 
                                ] ,
                                "$PH_line" :
                                [
                                    /\/\/.*(?:\r\n|\t|\x09|\cI|)/ig , 
                                    "" 
                                ] ,
                                "$PH_block" :
                                [
                                    /\/\*.*\*\//ig , 
                                    "" 
                                ]
                            } 
                            
                        } ;
                        console.log ( "PHTMap:" , PHTMap ) ;
                        // phtm.all = {} ;
                        /*for ( let ele in phtm ) 
                        {
                            Object.keys ( phtm ) ;
                        } ;*/
                        // PHTMap.bodyReg = Object.assign ( PHTMap.bodyReg , PHTMap.headReg ) ;
                        let newPgp = {} ;
                        for 
                        ( 
                            let i = 2 , mapKeys = Object.keys ( PHTMap ) ; 
                            i < mapKeys.length ; 
                            i ++ 
                        )
                        {
                            PHTMap[ mapKeys[ i ] ] = Object.assign ( PHTMap[ mapKeys[ i ] ] , PHTMap.globalReg )
                            // .unique () ;
                            newPgp = Object.assign ( newPgp , PHTMap[ mapKeys[ i ] ] )
                            // .unique () ;
                        } ;
                        PHTMap[ ".sassReg" ] = PHTMap[ ".scssReg" ] = PHTMap[ ".lessReg" ] ;
                        console.log ( "newPgp:" , newPgp ) ;
                        PHTMap.allReg = newPgp ;
                        console.log ( "PHTMap:" , PHTMap ) ;
                        return PHTMap ;
                    }  
                }  ,
                "tokenToPlaceHolder" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode , phTokenMap )
                    {
                        console.log ( "parentNode:" , parentNode ) ;
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : String.prototype.placeHolderTokenMapFn ()[ parentNode + "Reg" ] ;
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
                                /*resTkToPh = resTkToPh.replace ( /(?:\n|\r)/ig , "$PH_n_r" )
                                .replace ( /(?:\t\|\x09|\cI|\v)/ig , "$PH_t" ) 
                                .replace ( /(?: )/ig , "$PH_space" ) */
                                /*.match ( /[^\f\n\r\t\v]/ig )
                                .join ( "" ) ; */
                        console.log ( "resTkToPh:" , resTkToPh ) ;
                        return resTkToPh.match ( /[^\f\n\r\t\v]/ig ).join ( "" ) ;        
                    }
                } ,
                "placeHolderToToken" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( parentNode , phTokenMap )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        // console.log ( "this:" , this ) ;
                        phTokenMap = phTokenMap ? 
                        phTokenMap : String.prototype.placeHolderTokenMapFn ()[ parentNode + "Reg" ] ;
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
                        // phRes = _this.replace ( new RegExp ( "(?:\\$PH_n_r\\$){1,}"  ) , "\n" ) ;
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
                "hasEle" : {
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
                "getReadStreamAry" : {
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
                "hasNullPointer" : {
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
                "unique" : {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        return Array.from 
                            ( new Set ( this ) ) ;
                    }
                } ,
                "unique2" : {
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
                "excludeOverlap" : {
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
                "insertEle" : {
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
                "formatToRegStr" : {
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
                "countOf" : {
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
                "backNumIndexOf" : {
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
                "getOutputUri" : {
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
                        console.log ( "outputUri：" , outputUri ) ;
                        return outputUri ;
                    }
                } ,
                "rmSuffix" : {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( repStr )
                    {
                        let args = Array.prototype.slice.call ( arguments ) ;
                        let _this = this ;
                        let str1 = _this.slice ( _this.lastIndexOf ( "." ) ) ;
                        /*_this = str1 == ".html" ? 
                                _this : 
                                str1 == ".htm" ? 
                                _this.replace ( new RegExp ( str1 + "$" ) , ".html" )
                                : null ;*/
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

    }
     
} ;


module.exports = node_common_lib ;
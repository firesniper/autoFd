let pgp_fs = require ( "fs" ) ;


let pgp_node_common_lib = 
{
    
    fn_init : function ( pgp_params )
    {
        pgp_params = pgp_params ? pgp_params :
        {
            str_srcBaseUri : "" ,
            str_destBaseUri : "" ,
            str_srcVirPath : 0 
        } ;
        let $this = this ;

        let str_srcBaseUri  = pgp_params.str_srcBaseUri ;
        console.log ( "str_srcBaseUri2:" , str_srcBaseUri ) ;

        let str_destBaseUri = pgp_params.str_destBaseUri ;
        console.log ( "str_destBaseUri2:" , str_destBaseUri ) ;

        let str_srcVirPath = pgp_params.str_srcVirPath ? pgp_params.str_srcVirPath : 0 ;
        // console.log ( "str_srcVirPath:" , str_srcVirPath ) ;

        let pgp_baseUri_ary = pgp_params.pgp_baseUri_ary ;
        console.log ( "pgp_baseUri_ary:" , pgp_baseUri_ary ) ;
        Object.defineProperties
        (
            Object ,
            {
                "str_baseUri" :
                {
                    enumerable : true ,
                    configurable : false ,
                    writable : true ,
                    value : str_srcBaseUri 
                } ,
                "pgp_validDatas" :
                {
                    enumerable : true ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    {
                        ary_nonMarkUpExt : [ ".js" , ".css" , ".less" , ".sass" , ".scss" , ".txt" ] ,
                        ary_markUpExt : [ ".html" , ".htm" , ".xhtml" , ".xml" ] ,
                        ary_ssExt : [ ".css" , ".less" , ".sass" , ".scss" ] ,
                        ary_extLabel : [ "all" , "global" ] ,
                        ary_commonLabel : [] ,
                        ary_combineLabel : [ "lessSassScss" ] ,
                        pgp_fileState : {} ,
                    }
                } ,
                "pgp_placeHolderTokenMap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    {
                        "all_pgp" : {} ,
                        "global_pgp" :
                        {
                            "^PH_r_n"  :   [ /(?:\r\n|\r|\n)/ig , "\n" ] ,
                            "^PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            "^PH_space":   [ /(?: )/ig , " " ] 
                        }
                        ,
                        "head_pgp" : 
                        {
                            
                        } ,
                        "body_pgp" : 
                        {
                            /*"^PH_baseUri%" :   
                            [ 
                                 new RegExp 
                                 ( 
                                     str_srcBaseUri == undefined ?
                                     `(?:http|https)?:?\\/\\/[^:]+:?\\d*(?:\\\\|\\/)?([\\w-]+(?:\\/|\\\\)?){` + 0 + `,` + str_srcVirPath + `}` 
                                     :
                                     str_srcBaseUri 
                                     , 
                                     `ig` 
                                 ) 
                                 , 
                                 str_destBaseUri  
                            ] 
                            ,*/
                            /*"^PH_url%"  :   
                            [ 
                                new RegExp 
                                ( 
                                    str_destBaseUri ?
                                    str_destBaseUri :
                                    `(?:url\\([^:]+:[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){`
                                        + 0 + `,` + str_srcVirPath + `})` 
                                    ,
                                    `ig`
                                ) , 
                                "url(" + str_srcBaseUri + "\/" 
                            ] 
                            ,
                            "^PH_src%"  :   
                            [ 
                                 new RegExp 
                                 ( 
                                     str_destBaseUri ?
                                     str_destBaseUri :
                                     `(?:src[^=]=[^'"]*(?:'|")?[^:]+:\\d+\\/([\\w-]+(?:\\/|\\\\)){` + 0 + `,` + str_srcVirPath + `})` 
                                     , 
                                     `ig` 
                                 ) 
                                 , 
                                'src = "' + str_srcBaseUri + "\/" 
                            ]*/
                        } ,
                        ".html_pgp" :  { } ,
                        ".htm_pgp" : { } ,
                        ".less_pgp" :
                        {
                            /*"^PH_ssUrl%" :
                            [
                                /(?:ssurl[^:]*:[^u]*url[^'"`]*(?:'|"|`)[^\r\n;]*(?:\'|\"|\`|;|\r\n|\r|\n))/gi , 
                                `ssurl:url('` + str_destBaseUri + `');` 
                            ] ,*/
                             "^PH_ssUrl2%" :
                            [
                                /(?:(?:@|\$)ssurl\^)/gi , 
                                /*`ssurl:` 
                                + */
                                str_destBaseUri 
                                /*+ 
                                `;` */
                            ]
                        } ,
                        ".sass_pgp" :
                        { } ,
                        ".scss_pgp" :
                        {  } ,
                        ".js_pgp" :
                        {
                            // "^PH_r_n"  :  [ /(?:\r\n|\r|\n)/ig , "\n" ] , 
                            // "^PH_t"    :   [ /(?:\t|\x09|\cI|\v)/ig , "\t" ] ,
                            // "^PH_space":   [ /(?: )/ig , " " ] ,
                            // "^PH_leftBlock" : 
                            // [
                            //     /\/\*/ig ,
                            //     "/*"
                            // ] ,
                            // "^PH_rightBlock" : 
                            // [
                            //     /\*\//ig ,
                            //     "*/"
                            // ] ,
                            
                            "^PH_reglationA1" :
                            [
                                /\\\/\//ig  , 
                                "\\//" 
                            ] 
                            ,
                            "^PH_fileProtocal" :
                            [
                                /file:\/\/\//ig  , 
                                "file:///" 
                            ] 
                            ,
                            "^PH_httpProtocal" :
                            [
                                /http:\/\//ig  , 
                                "http://" 
                            ] 
                            ,
                            "^PH_block" :
                            [
                                /\/\*[^\*\/]*\*\//ig , 
                                "" 
                            ] 
                            ,
                            "^PH_line" :
                            [
                                /\/\/[^\r\n\t]*(?:\r\n|\r|\n|\t)/ig ,
                                "" 
                            ] 
                            ,
                            "^PH_console" :
                            [
                                /console.log[^;\r\n\t]*(?:(?:; *)|(?:\r\n|\r|\n|\t))/ig  , 
                                "" 
                            ] 
                            
                        } 
                        
                    } 
                } ,
                
            }
        ) ;
        Object.defineProperties
        (
            Object ,
            {
                "fnPgp_placeHolderTokenMap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( pgp_PHTMap )
                    {
                        newPgp =
                        {
                            "^PH_baseUri%" :   
                            [ 
                                new RegExp 
                                ( 
                                    str_srcBaseUri == undefined ?
                                    `(?:http|https)?:?\\/\\/[^:]+:?\\d*(?:\\\\|\\/)?([\\w-]+(?:\\/|\\\\)?){` + 0 + `,` + str_srcVirPath + `}` 
                                    :
                                    str_srcBaseUri 
                                    , 
                                    `ig` 
                                ) 
                                , 
                                str_destBaseUri  
                            ] 

                        } ;
                         
                        Object.pgp_placeHolderTokenMap.body_pgp = 
                        str_destBaseUri ? 
                        Object.assign 
                        ( 
                            Object.pgp_placeHolderTokenMap.body_pgp ,
                            newPgp
                        ) : Object.pgp_placeHolderTokenMap.body_pgp ;

                        Object.pgp_placeHolderTokenMap.body_pgp = Object.assign 
                        ( 
                            Object.pgp_placeHolderTokenMap.body_pgp , 
                            pgp_baseUri_ary
                        ) ;
                        pgp_PHTMap = pgp_PHTMap ? pgp_PHTMap : Object.pgp_placeHolderTokenMap ;
                        console.log ( "pgp_PHTMap:" , pgp_PHTMap ) ;
                        // phtm.all = {} ;
                        /*for ( let ele in phtm ) 
                        {
                            Object.keys ( phtm ) ;
                        } ;*/
                        // pgp_PHTMap.pgp_bodyReg = Object.assign ( pgp_PHTMap.pgp_bodyReg , pgp_PHTMap.pgp_headReg ) ;
                        // let newPgp = {} ;
                        // pgp_PHTMap[ "pgp.jsReg" ] = Object.assign ( pgp_PHTMap[ "pgp_globalReg" ] , pgp_PHTMap[ "pgp.jsReg" ] ) ;

                        hfA01 : for ( let ele in pgp_PHTMap )
                        {
                            if ( !pgp_PHTMap [ ele ] )
                            {
                                continue hfA01 ;
                            } ;
                            console.log ( "pgp_PHTMap [ ele ]:" ,  pgp_PHTMap [ ele ] ) ;
                            hfA02 : for ( let key in pgp_PHTMap [ ele ] )
                            {
                                if 
                                ( 
                                    !pgp_PHTMap [ ele ] [ key ] 
                                    || 
                                    !pgp_PHTMap [ ele ] [ key ] [ 0 ]
                                )
                                {
                                    continue hfA02 ;
                                } ;
                                // console.log ( "pgp_PHTMap [ ele ] [ key ] [ 0 ]:" , pgp_PHTMap [ ele ] [ key ] [ 0 ] ) ;
                                 pgp_PHTMap [ ele ] [ key ] [ 0 ] = 
                                 pgp_PHTMap [ ele ] [ key ] [ 0 ].constructor.name == "RegExp" ? 
                                 pgp_PHTMap [ ele ] [ key ] [ 0 ]
                                 :
                                 new RegExp ( pgp_PHTMap [ ele ] [ key ] [ 0 ] , "ig" ) ;
                            } ;
                             
                        } ;
                        console.log ( "pgp_PHTMap2:" ,  pgp_PHTMap ) ;
                        pgp_PHTMap[ ".htm_pgp" ] = pgp_PHTMap[ ".html_pgp" ] = Object.assign 
                        ( 
                            pgp_PHTMap[ "head_pgp" ] , 
                            pgp_PHTMap[ "body_pgp" ] , 
                            pgp_PHTMap[ ".html_pgp" ] 
                        ) ;
                        for 
                        ( 
                            let i = 2 , ary_mapKeys = Object.keys ( pgp_PHTMap ) ; 
                            i < ary_mapKeys.length ; 
                            i ++ 
                        )
                        {
                            pgp_PHTMap[ ary_mapKeys[ i ] ] = Object.assign 
                            ( 
                                pgp_PHTMap[ ary_mapKeys[ i ] ] , 
                                pgp_PHTMap [ "global_pgp" ] 
                            )
                            // .unique () ;
                            pgp_PHTMap[ "all_pgp" ] = Object.assign 
                            ( 
                                pgp_PHTMap[ "all_pgp" ] , 
                                pgp_PHTMap[ ary_mapKeys[ i ] ] 
                            )
                            // .unique () ;
                        } ;
                        
                        pgp_PHTMap[ ".sass_pgp" ] = pgp_PHTMap[ ".scss_pgp" ] = pgp_PHTMap[ ".less_pgp" ] ;
                        // console.log ( "pgp_PHTMap.pgp_allReg:" , pgp_PHTMap.pgp_allReg ) ;
                        // pgp_PHTMap.pgp_allReg = newPgp ;
                        // console.log ( "pgp_PHTMap:" , pgp_PHTMap ) ;
                        Object.pgp_placeHolderTokenMap2 = pgp_PHTMap ;
                        return pgp_PHTMap ;
                    }  
                } 
            }
        ) ;
        Object.defineProperties
        (
            Object.pgp_placeHolderTokenMap ,
            {
                fnPgp_placeHolderTokenMap :
                {
                    enuemerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : 
                    function ( pgp )
                    {
                        pgp = pgp ? pgp : this ;
                        return Object.fnPgp_placeHolderTokenMap ( this ) ;
                    } 
                }
            }
        ) ;
        Object.defineProperties
        (
            Object.prototype ,
            {
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
                        return result ;
                    }
                } 
            } 
        ) ;
        
        Object.defineProperties
        (
            String.prototype ,
            {
                "fnPgp_getUrl" :
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( num )
                    {
                        let str_this = this ;
                        let str_all = str_this ;
                        // let str_all = "<img src = 'http://www.abc.com/firesniper/adb/def/ghi/jkm/aaa.html' />" ;
                        let str_schemaReg = `((?:http|https):)?\\/\\/(?:localhost|127.0.0.1|[\\w\\.-]+):?\\d*(?:\\\\|\\/)?` ;
                        let reg_schemaReg = new RegExp ( str_schemaReg , `ig` ) ;
                        let str_virRegPatt = `([\\w-]+(?:\\\\|\\/))` ;
                        let str_virReg = str_virRegPatt + `{` + 0 + `,` + num + `}` ;
                        console.log ( "str_virReg:" , str_virReg ) ;
                        let str_fileNameReg = `([\\w\\.-]+(?:\\\\|\\/)?)?` ;
                        let reg_virReg = new RegExp ( str_virReg , `ig` ) ;
                        console.log ( "str_all.match ( reg_virReg ):" , str_all.match ( reg_virReg ) ) ;
                        let str_urlReg = `(?:'|")?` + str_schemaReg + str_virRegPatt + "*" + str_fileNameReg + `(?:'|")?` ;
                        // let ary_url_str = str_all.match ( /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.-]+):?\d*(?:\\|\/)?([\w\.-]+(?:\\|\/)?)*(?:'|")?/ig ) ;
                        let ary_url_str = str_all.match ( new RegExp ( str_urlReg , `ig` ) ) ;
                        console.log ( "ary_url_str:" , ary_url_str ) ;
                        let ary_schema_str = ary_url_str[ 0 ].match ( reg_schemaReg ) ;
                        console.log ( "ary_schema_str:" , ary_schema_str ) ;
                        let str_start = ary_url_str[ 0 ].indexOf ( ary_schema_str [ 0 ] ) + ary_schema_str [ 0 ].length ;
                        console.log ( "str_start:" ,  str_start ) ;
                        let str_fd = ary_url_str[ 0 ].slice ( str_start ) ;
                        console.log ( "str_fd:" , str_fd ) ;
                        let ary_virPath_str = str_fd.match ( reg_virReg ) ;
                        console.log ( "ary_virPath_str:" , ary_virPath_str ) ;
                        let ary_scmVir_str = str_all.match 
                        (
                            // /(?:'|")?((?:http|https):)?\/\/(?:localhost|127.0.0.1|[\w\.]+)((?:\\|\/)\w+){0,4}(?:'|")?/ig 
                            new RegExp ( str_schemaReg + str_virReg ) 
                        ) ;
                        console.log ( "ary_scmVir_str:" , ary_scmVir_str ) ;
                        return {
                            "ary_url_str" : ary_url_str ,
                            "ary_schema_str" : ary_schema_str ,
                            "ary_virPath_str" : ary_virPath_str ,
                            "ary_baseUrl_str" : ary_scmVir_str
                        } ;
                    } 
                } ,
                "fnPgp_resolveUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let ary_args = Array.prototype.slice ( arguments ) ;
                        let str_this = this ;
                        let str_separator = str_this.indexOf ( "/" ) > 0 ?
                        "/" :
                        str_this.indexOf ( "\\" ) > 0 ? 
                        "\\" : "" ;
                        str_this = str_this.replace
                        (
                            /(?:\/)+/ig ,
                            str_separator
                        ) ;
                        //console.log ( "resolveUri_this:" , str_this ) ;
                        let str_dir = 
                        str_separator == "" ?
                        "" :
                        str_this.slice ( 0 , str_this.lastIndexOf ( str_separator ) + 1 ) ;
                        // let str_dir = str_this.match ( /.+(?:\/|\\)/ig ) [ 0 ] ;

                        let str_file = str_this.slice 
                        ( 
                            str_separator == "" ?
                            0 : 
                            str_this.lastIndexOf ( str_separator ) + 1 
                            , 
                            str_this.lastIndexOf ( "." ) 
                        ) ;
                        /*let str_file = 
                        str_this.match 
                        ( 
                            str_this.lastIndexOf ( str_separator ) + 1 , 
                            str_this.lastIndexOf ( "." ) 
                        ) ;*/
                        let str_fileBaseName = 
                        str_file.slice
                        (
                            0 ,
                            str_file.indexOf ( "." ) > 0 ? str_file.indexOf ( "." ) : str_file.length  
                        ) ;
                        let str_suffix = 
                        str_file.indexOf ( "." ) == -1 ?
                        "" : 
                        str_file.slice 
                        ( 
                            str_file.indexOf ( "." )  
                            // , 
                            // str_file.lastIndexOf( "." ) 
                        ) ;
                        let str_ext = str_this.slice
                        (
                            str_this.lastIndexOf ( "." ) 
                        ) ;
                        return {
                            "str_dir"           : str_dir ,
                            "str_file"          : str_file ,
                            "str_fileBaseName"  : str_fileBaseName ,
                            "str_suffix"        : str_suffix ,
                            "str_ext"           : str_ext
                        } ;
                    }
                } ,
                "fnBol_hasCtt" : 
                {
                    enumerable  : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( any_cttExp )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this.toString () ;
                        //console.log ( "any_cttExp:" , any_cttExp ) ;
                        if ( !any_cttExp ) 
                        { 
                            console.error ( new ReferenceError ( "any_cttExp is null" ) ) ; 
                            return ; 
                        } ;
                        let str_data = str_this ;

                        
                            let pmA01 = new Promise
                            (
                                function ( resolve , rejection )
                                {
                                    //console.log ( "pmA01 resolve:" , resolve ) ;
                                    // str_data = "promise" ;
                                    try
                                    {
                                        pgp_fs.openSync 
                                        ( 
                                            str_this.toString () , 
                                            "rs" ,
                                            function ( err , fd , c )
                                            {
                                                //console.log ( "fnBol_hasCtt err:" , err ) ;
                                                //console.log ( "hasCttfd:" , fd ) ;
                                                //console.log ( "fnBol_hasCtt c:" , c ) ;
                                                str_data = 
                                                err
                                                ? 
                                                str_this 
                                                : 
                                                pgp_fs.readFileSync ( str_this.toString () , "utf-8" )
                                                ;
                                                
                                            } 
                                        ) ;
                                    }
                                    catch ( err ) 
                                    {
                                        // console.info ( "err:" , err ) ;
                                    }
                                    
                                    
                                } 
                                
                            ) ;
                         
                        //console.log ( "Promise str_data:" , str_data ) ;
                        //console.log ( "pmA01:" , pmA01 ) ;
                        
                        
                       
                        pmA01  
                        .then
                        (
                            function ( resolve ) 
                            {
                                //console.log ( "fnBol_hasCtt resolve:" , resolve ) ;
                            } ,
                            function ( rejected , data )
                            {
                                //console.log ( "pmA01 rejected:" , rejected ) ;
                                //console.log ( "pmA01 rejected bol_flag:" , rejected ? true : false ) ;
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

                        //console.log ( "fnBol_hasCtt str_data:" , str_data ) ;
                        let bol_resFlag = null ;
                        switch ( any_cttExp.constructor.name )
                        {
                            case "RegExp" : 
                                bol_resFlag = any_cttExp.test ( str_data )  ;
                            break ;
                            case "String" :
                                bol_resFlag = str_data.indexOf ( any_cttExp ) > -1 ;
                                //console.log ( "bol_resFlag:" , bol_resFlag ) ;
                                Object.pgp_validDatas.pgp_fileState[ "has_" + any_cttExp ] = bol_resFlag ;
                            break ;
                        } ;
                        return bol_resFlag ;
                        
                        
                    }
                } ,
                "fnPgp_validFileGetState" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( any_ctt )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this.toString () ;
                        //console.log ( "str_this:" ,  str_this.toString ()   ) ;
                        let str_data = pgp_fs.readFileSync ( str_this.toString() , "utf-8" ) ;
                        let bol_isEmpty = str_data ? true : false ;
                        let str_fileExt = str_this.fnPgp_resolveUri () .str_ext ;
                        let bol_isMarkUpExt = 
                        ( 
                            new RegExp 
                            ( 
                                `(?:` + Object.pgp_validDatas.ary_markUpExt.join ( `|` ) + `)` , `ig` 
                            ) 
                        ).test ( str_fileExt ) ;
                        
                        let bol_htmlFlag = str_data.indexOf ( "<html" ) > -1 ;
                        let bol_headFlag = str_data.indexOf ( "<head" ) > -1 ;
                        let bol_bodyFlag = str_data.indexOf ( "<body" ) > -1 ;
                        let bol_isHtmlCtt = bol_htmlFlag || bol_headFlag || bol_bodyFlag ;
                        let pgp_res = 
                        {
                            "str_uri"           : str_this ,
                            "bol_isEmpty"       : bol_isEmpty ,
                            "str_data"          : str_data ,
                            "bol_isMarkUpExt"   : bol_isMarkUpExt ,
                            "bol_isHtmlCtt"     : bol_isHtmlCtt ,
                            "bol_headFlag"      : bol_headFlag ,
                            "bol_bodyFlag"      : bol_bodyFlag ,
                            "str_ext"           : str_fileExt ,
                            "bol_hasChildNode"  : false 
                        } ;
                        

                        Object.pgp_fileState = Object.pgp_validDatas.pgp_fileState = pgp_res ;
                        if ( any_ctt )
                        {
                            let bol_cttFlag = str_data.fnBol_hasCtt ( any_ctt ) ; 
                            if ( any_ctt.constructor.name == "String" )
                            { 
                                pgp_res[ "bol_has" + any_ctt ] = bol_cttFlag ;     
                            } ;

                        } ;
                        //console.log ( "Object.pgp_fileState:" , Object.pgp_fileState ) ;
                        //console.log ( "$this:" , $this ) ;
                        //console.log ( "pgp_node_common_lib:" , pgp_node_common_lib ) ;

                        return pgp_res ;
                    }
                } ,
                "fn_validFdFromUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( str_outputDir )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this.toString () ;
                        str_outputDir = str_outputDir ? str_outputDir : str_this.fnPgp_resolveUri ().str_dir ;
                        if ( str_outputDir )
                        {
                            pgp_fs.exists 
                            (
                                str_outputDir
                                ,
                                function ( bol_flag )
                                {
                                    if ( bol_flag ) return ; 
                                    pgp_fs.mkdirSync ( str_outputDir ) ;

                                }
                            ) ;
                        } ;

                        pgp_fs.open 
                        ( 
                            str_this , 
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
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = ary_args[ 0 ] ? ary_args[ 0 ] : this ;
                        return str_this
                        // .replace ( />.*</ig , ">\n<" ) 
                        // .replace ( /^.*</ig , "<" )
                        // .replace ( /\/.*>.*$/ig , ">" )
                        // .replace ( /\/>.*</ig , "/>\n<" ) ;
                    }
                } ,
                "fn_caseQuote" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( a )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = ary_args[ 0 ] ? ary_args[ 0 ] : this ;
                        return str_this.toLowerCase ().replace ( /(?:\'|\")/ig , "" ).replace ( / /ig , "" )  ;
                    }
                }
                ,
                "fnBol_isEleInAry" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( ary_ext )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        ary_ext = ary_ext ? ary_ext : Object.pgp_validDatas.ary_nonMarkUpExt ;
                        return ary_ext.fnBol_hasEle ( str_this ) ;
                            
                    }
                } ,
                "fnPgp_toTagReg" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ()
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        //console.log ( "Object.pgp_fileState:" , Object.pgp_fileState ) ;
                        let pgp_res_reg = 
                        str_this.match
                        ( 
                            new RegExp 
                            ( 
                                "(?:" 
                                + Object.pgp_validDatas.ary_nonMarkUpExt
                                .concat ( Object.pgp_validDatas.ary_extLabel )
                                .join( "|" ) 
                                + ")" 
                                , 
                                "ig" 
                            )
                        ) 
                        ? 
                        { 
                            reg_wrapAndCtt : new RegExp ( ".*" ) ,
                            reg_wrap : new RegExp ( "" )
                        }  
                        : 
                        { 
                            reg_wrapAndCtt : new RegExp 
                            ( 
                                "<" + str_this + ".*>.*<\\/" + str_this + ">" ,
                                "ig"
                            ) ,
                            reg_wrap : new RegExp 
                            ( 
                                "(?:<" + str_this + ">|<\\/" + str_this + ">)" , 
                                "ig"
                            )
                        } ;
                        return pgp_res_reg ;
                    }
                } 
                ,
                "fnPgp_getRegPgpFromState" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( str_selectNode )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this.toString () ;
                        let str_childNodeDef = "all" ;
                        let str_selectNodeCom = "global" ;
                        // console.log ( "PgpFromState_this:" , this ) ;
                        console.log ( "str_selectNode:" , str_selectNode ) ;
                        console.log ( "str_this.fnBol_hasCtt: " , str_this.fnBol_hasCtt ( "<" + 
                        str_selectNode ) ) ;
                        str_selectNode = 
                        (
                            str_selectNode != str_selectNodeCom 
                        ) 
                        ?
                        (
                            Object.pgp_validDatas.pgp_fileState.str_ext.fnBol_isEleInAry ( Object.pgp_validDatas.ary_markUpExt ) 
                            ? 
                            ( 
                                // str_this.indexOf ( "<" + str_selectNode ) > -1 ? 
                                str_this.fnBol_hasCtt ( "<" + str_selectNode ) 
                                ?
                                str_selectNode
                                :
                                str_selectNodeCom 
                            )
                            :
                            str_selectNode 
                        )
                        :
                        str_selectNodeCom
                        ;

                        console.log ( "selectNode2:" , str_selectNode ) ;
                        console.log ( "Object.pgp_validDatas.pgp_fileState.str_ext:" , Object.pgp_validDatas.pgp_fileState.str_ext ) ;
                        let pgp_placeHolderTokenMap = Object.fnPgp_placeHolderTokenMap ()
                        [ 
                            Object.pgp_validDatas.pgp_fileState.str_ext 
                            // str_selectNode
                            + "_pgp" 
                        ] ;

                        console.log ( "pgp_placeHolderTokenMap:" , pgp_placeHolderTokenMap ) ;
                        // console.log ( "Object.pgp_placeHolderTokenMap:" , Object.pgp_placeHolderTokenMap.fnPgp_placeHolderTokenMap ( Object.pgp_placeHolderTokenMap ) ) ;

                        let pgp_parentTag_reg = str_selectNode ? str_selectNode.fnPgp_toTagReg () : null ;
                        console.log ( "pgp_parentTag_reg:" , pgp_parentTag_reg ) ;

                        return {
                            "pgp_placeHolderTokenMap" : pgp_placeHolderTokenMap ,
                            "pgp_parentTag_reg" : pgp_parentTag_reg
                        } ;
                    }
                } ,
                
                "fnPgp_getCttWrap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( pgp_placeHolderTokenMap , pgp_parentTag_reg )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        // console.log ( "%this:" ,  this ) ;
                        if (  str_this.constructor.name != "String" )
                        { 
                            throw new TypeError ( "isn't String type" ) ; 
                            // return ;
                        } ;
                        
                       /* let pgp_placeHolderTokenMap = Object.fnPgp_placeHolderTokenMap ()[ str_selectNode + "Reg" ] ;
                        let pgp_parentTag_reg = str_selectNode.fnPgp_toTagReg () ;*/
                        console.log ( "pgp_parentTag_reg:" , pgp_parentTag_reg ) ;
                        console.log ( "pgp_placeHolderTokenMap:" , pgp_placeHolderTokenMap ) ;
                        let str_all = str_this.fnStr_tokenToPlaceHolder 
                        ( 
                            pgp_placeHolderTokenMap 
                        ) ;
                        console.log ( "str_all:" , str_all ) ;

                        let ary_selectWrapCtt_str = [] ;
                        let ary_selectWrap = [] ;
                        let ary_selectCtt2 = [] ;
                        
                        if 
                        (
                             pgp_parentTag_reg 
                             && 
                             str_this
                             &&
                             str_this != ""
                             &&
                             pgp_parentTag_reg.reg_wrapAndCtt.test ( str_all )
                        )
                        {
                            console.log ( "pgp_parentTag_reg :" , pgp_parentTag_reg ) ;
                            ary_selectWrapCtt_str = str_all.match 
                            ( 
                                pgp_parentTag_reg.reg_wrapAndCtt  
                            ) ;
                            console.log ( "ary_selectWrapCtt_str:" , ary_selectWrapCtt_str ) ;

                            ary_selectWrap = ary_selectWrapCtt_str.fnPgp_hasNullPointer ().ary_content[ 0 ].match 
                            ( pgp_parentTag_reg.reg_wrap ) ;
                            console.log ( "ary_selectWrap:" ,  ary_selectWrap ) ;

                            let str_selectCtt = ary_selectWrapCtt_str[ 0 ]
                            .replace 
                            (  
                                pgp_parentTag_reg.reg_wrap   
                                , 
                                "" 
                            ) 
                            // .rSpace_aNl ( ) ;
                            // console.log ( "str_selectCtt:" , str_selectCtt ) ;
                            console.log ( "str_selectCtt:" , str_selectCtt ) ;
                            // let selectWrapCttStr3 = str_selectCtt.split ( "\n" ) ; 
                            let str_selectCtt2 = str_selectCtt.fnStr_placeHolderToToken 
                            ( 
                                pgp_placeHolderTokenMap 
                            ) ;
                            console.log ( "str_selectCtt2:" , str_selectCtt2 ) ;
                            let ary_selectCtt = str_selectCtt2.split ( "\n" ) ; 
                            ary_selectCtt2 = ary_selectCtt.fnPgp_hasNullPointer ().ary_content ;
                            console.log ( "ary_selectCtt2:" , ary_selectCtt2 ) ;
                        } ;
                        
                        return { 
                            "ary_selectWrapCtt_str" : ary_selectWrapCtt_str ? ary_selectWrapCtt_str[ 0 ] : str_all ,
                            "ary_selectCtt" : ary_selectCtt2 ,
                            "ary_selectWrap" : ary_selectWrap
                        } ;
                    } 
                } ,
                
                "fnStr_tokenToPlaceHolder" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( pgp_phTokenMap , str_fileExt )
                    {
                        console.log ( "str_fileExt:" , str_fileExt ) ;
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        str_fileExt = str_fileExt ? str_fileExt : Object.pgp_validDatas.pgp_fileState.str_ext ;
                        pgp_phTokenMap = pgp_phTokenMap ? 
                        pgp_phTokenMap : 
                        Object.fnPgp_placeHolderTokenMap () [ str_fileExt + "_pgp" ] ;
                        console.log ( "pgp_phTokenMap:" , pgp_phTokenMap ) ;
                        let str_resTkToPh = str_this ;
                        for ( let ele in pgp_phTokenMap )
                        {
                            str_resTkToPh = str_resTkToPh.replace 
                            ( 
                                pgp_phTokenMap[ ele ][ 0 ] , 
                                ele  
                            ) ;
                        } ;
                                /*str_resTkToPh = str_resTkToPh.replace ( /(?:\n|\r)/ig , "^PH_r_n" )
                                .replace ( /(?:\t\|\x09|\cI|\v)/ig , "^PH_t" ) 
                                .replace ( /(?: )/ig , "^PH_space" ) */
                                /*.match ( /[^\f\n\r\t\v]/ig )
                                .join ( "" ) ; */
                        // console.log ( "str_resTkToPh:" , str_resTkToPh ) ;
                        return str_resTkToPh.match ( /[^\f\n\r\t\v]/ig ).join ( "" ) ;        
                    }
                } ,
                "fnStr_placeHolderToToken" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( pgp_phTokenMap , str_fileExt )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        // console.log ( "this:" , this ) ;
                        str_fileExt = str_fileExt ? str_fileExt : Object.pgp_validDatas.pgp_fileState.str_ext ;
                        pgp_phTokenMap = pgp_phTokenMap ? 
                        pgp_phTokenMap : Object.fnPgp_placeHolderTokenMap ()[ str_fileExt + "_pgp" ] ;
                        let str_phRes = str_this ;
                        console.log ( "pgp_phTokenMap:" , pgp_phTokenMap ) ;
                        for ( let ele in pgp_phTokenMap )
                        {
                            str_phRes = str_phRes.replace 
                            ( 
                                new RegExp ( "(?:\\" + ele + ")" , "ig" ) , 
                                pgp_phTokenMap[ ele ][ 1 ] 
                            ) ;
                        } ;
                        // str_phRes = str_this.replace ( new RegExp ( "(?:\\^PH_r_n\\$){1,}"  ) , "\n" ) ;
                        console.log ( "str_phRes:" , str_phRes ) ;
                        return str_phRes ;
                        
                    }
                }
            }
            
        ) ;
        Object.defineProperties
        (
            Array.prototype ,
            {
                "fnAry_rmEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( ary_idx )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        let ary_res = [] ;
                        let inc = 0 ;
                        ary_idx = ary_idx.constructor.name == "Array" ?
                                ary_idx :
                                ary_idx.constructor.name == "Number" ?
                                [].push ( ary_idx ) :
                                null ; 
                        hfA01 : for ( let i = 0 ; i < ary_this.length ; i ++ )
                        {
                            for ( let a = 0 ; a < ary_idx.length ; a ++ )
                            {
                                if ( i == ary_idx [ a ] )
                                {
                                     continue hfA01 ; 
                                } ;
                            } ;
                             
                            ary_res [ inc ] = ary_this [ i ] ;
                            inc ++ ;
                        } ;
                        return ary_res ;
                    }
                } ,
                "fnBol_hasEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        let bol_res = false ;
                        for ( let i = 0 ; i < ary_this.length ; i ++ ) 
                        {
                            if ( ary_this[ i ] == val )
                            {
                                bol_res = true ;
                                break ;
                            } ;
                        } ;
                        return bol_res ;
                    }
                } ,
                "fnAry_getReadStream" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        let ary_readStream = [] ;
                        for ( let i = 0 ; i < ary_this.length ; i++ ) 
                        {
                            ary_readStream[ i ] = pgp_fs.createReadStream ( ary_this[ i ] ) ; 
                            ary_readStream[ i ].setEncoding ( "utf-8" ) ;
                        } ;
                        return ary_readStream ;
                    }
                } ,
                "fnPgp_hasNullPointer" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val ) 
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        let ary = [] ;
                        let inc = 0 ;
                        let bol_flag = false ;
                        hfA02 : for ( let i = 0 ; i < ary_this.length ; i++ )
                        {
                            if 
                            (
                                ary_this[ i ] == null || 
                                ary_this[ i ] == undefined || 
                                ary_this[ i ] == ""
                            )
                            {
                                bol_flag = true ;
                                continue hfA02 ;
                            }
                            else 
                            {
                                
                                ary[ inc ] = ary_this[ i ] ;
                                ++inc ;
                            } ;
                            
                        } ;
                        console.log ( "ary:" , ary ) ;
                        return { 
                            "bol_flag" : bol_flag ,
                            ary_content : ary 
                        } ;
                    }
                } ,
                
                "fnBol_hasSamePointerInAry" :
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( val )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        let bol_res = false ;
                        /*for ( let ele in ary_this ) 
                        {
                            if ( ary_this[ ele ] == val  ) 
                            {
                                bol_res = true ;
                                break ;
                            } ;
                        } ;*/
                        for ( let i = 0 ; i < ary_this.length ; i++ ) 
                        {
                            if ( ary_this[ i ] == val  ) 
                            {
                                bol_res = true ;
                                break ;
                            } ;
                        } ;
                        return bol_res ;
                    }
                } ,
                "excludeOverlap" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( ary_b , ary_a )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = ary_args[ 1 ] ? ary_args[ 1 ] : this ;
                        let ary = [] ;
                        let inc = 0 ;
                        hfA01 : for ( let be = 0 ; be < ary_b.length ; be++ )
                        {
                            console.log ( "ary_this[ be ]:" , ary_this ) ;
                            console.log ( "ary_b [ be ]:" , ary_b  ) ;
                            for ( let ce = 0 ; ce < ary_this.length ; ce++ )
                            {

                                if 
                                ( 
                                    ary_b[ be ].fn_caseQuote () == ary_this[ ce ].fn_caseQuote () 
                                )
                                { 
                                    continue hfA01 ; 
                                }
                                else if 
                                ( 
                                    ce == ary_this.length - 1 && 
                                    !ary.fnBol_hasSamePointerInAry ( ary_b[ be ] ) 
                                )
                                { 
                                    
                                    ary[ inc ] = ary_b[ be ] ; 
                                    ++inc ;
                                } ;
                            } ;
                            
                        } ;
                        return ary ;
                    }
                } ,
                "fnAry_insertEle" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( index , any_val )
                    {
                        let arts = Array.prototype.slice.call ( argumets ) ;
                        let ary_this = this ;
                        let ary1 = ary_this.slice ( 0 , index ) ;
                        let ary2 = ary_this.slice ( index ) ;
                        let ary3 = ary1.push ( any_val ) ; 
                        return ary3.concat ( ary2 ) ; 
                    } 
                } ,
            }
            
        ) ;

        Object.defineProperties 
        (
            String.prototype ,
            {
                "fnAry_formatToRegStr" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( a )
                    {
                        var ary_defChar = [ "/" , "\\" ] ; 
                        // console.log ( "this:" , this ) ;
                        var ary_this = this.split ( "" ) ;
                        for ( var i = 0 ; i < ary_this.length ; i++ )
                        {
                            ary_this[ i ] =  "\\" + ary_this[ i ] ;
                        } ;
                        // this = ary_this.join ( "" ) ;
                        return ary_this.join ( "" ) ;
                        /*var reg = new RegExp 
                        ( 
                            "[" + ary_defChar.join( "" ) + "]" , 
                            "ig" 
                        ) ;
                        var defCharStr = this ;
                        for ( var i = 0 ; i < ary_defChar.length ; i++ )
                        {
                            defCharStr = defCharStr.replace 
                            ( 
                                reg , "\\" + ary_defChar[ i ] 
                            ) ;
                        } ;*/
                        
                    } 
                } ,
                "fnNum_countOf" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( str_token )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        let num_tokenCount = 0 ;
                        for ( let i = 0 ; i < str_this.length ; i ++ ) 
                        {
                            if ( str_this[ i ] === str_token )
                            {
                                num_tokenCount ++ ;
                            } ;
                        } ;
                        
                        return num_tokenCount ;
                    } 
                } ,
                "fnNum_backNumIndexOf" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( str_token , num )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let str_this = this ;
                        let ary_this = str_this.split ( "" ) ;
                        let num_indexCount = 0 ;
                        let ary_this1 = ary_this ;
                        for ( let i = 0 ; i < ary_this.fnNum_countOf ( "." ) ; i ++ ) 
                        {
                            ++ num_indexCount  ;
                            if ( num_indexCount >= num ) break ;
                            ary_this1 = ary_this1.slice ( 0 , ary_this1.lastIndexOf ( "." ) ) ;
                            
                        } ;
                        let num_resIndex = ary_this1.lastIndexOf ( str_token ) ;
                        return num_resIndex ;
                    } 
                } ,
                "fnStr_getOutputUri" : 
                {
                    enumerable : false ,
                    configurable : true ,
                    writable : true ,
                    value : function ( str_outputDir )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        console.log ( "fnStr_getOutputUri_this:" , this ) ;
                        console.log ( "fnStr_getOutputUri_outputDir:" , outputDir2 = str_outputDir ) 
                        str_outputDir = str_outputDir ? str_outputDir : this.fnPgp_resolveUri ().str_dir ;
                        console.log ( "str_outputDir:" , str_outputDir ) ;
                        let str_fileExt = this.fnPgp_resolveUri ().str_ext ;
                        let str_suffix = this.fnPgp_resolveUri ().str_suffix ;
                        let bol_isSsExt = 
                        ( 
                            new RegExp 
                            ( 
                                `(?:` + Object.pgp_validDatas.ary_ssExt.join ( `|` ) + `)` , `ig` 
                            ) 
                        ).test ( str_fileExt ) ;
                        let str_outputUri = 
                        (
                                str_outputDir
                            + this.fnPgp_resolveUri ().str_file 
                            // + ".dev"
                            + str_fileExt
                        )
                        .fnStr_rmSuffix 
                        ( 
                            bol_isSsExt && str_suffix == ".dev" ? ".res" : "" 
                        )  ;
                        console.log ( "str_outputUri：" , str_outputUri ) ;
                        return str_outputUri ;
                    }
                } ,
                "fnStr_rmSuffix" : 
                {
                    enumerable : false ,
                    configuratble : true ,
                    writable : true ,
                    value : function ( str_suffix )
                    {
                        let ary_args = Array.prototype.slice.call ( arguments ) ;
                        let ary_this = this ;
                        str_suffix = str_suffix ? str_suffix : "" ;
                       /* let str1 = ary_this.slice ( ary_this.lastIndexOf ( "." ) ) ;
                        let str2 = ary_this.slice ( ary_this.fnNum_backNumIndexOf ( "." , 2 ) ) ;
                        let str_res = ary_this.replace 
                        ( 
                            new RegExp ( str2 + "$" ) , 
                            str1 == ".htm" ? ".html" : str1
                        ) ;*/

                        let pgp_file = ary_this.fnPgp_resolveUri () ;
                        let str_res = 
                        pgp_file.str_dir + "\\" 
                        + 
                        pgp_file.str_fileBaseName 
                        +
                        str_suffix
                        + 
                        pgp_file.str_ext ;

                        return str_res ;
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


module.exports = pgp_node_common_lib ;
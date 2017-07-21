let fn_glob = require ( "glob" ) ;
let pgp_fs = require ( "fs" ) 
    pgp_stat = pgp_fs.pgp_stat ;

let ary_rmIdx = [] ;
var fn_deleteFd = function ( str_rootSrc )
{
    // 读取目录中的所有文件/目录
    let ary_paths = pgp_fs.readdirSync
    ( 
        str_rootSrc  
    ) ;
    // if ( ary_paths.length != 0 ) pgp_fs.readdir ( str_rootSrc , cb ) ;
    
    console.log ( "ary_paths:", ary_paths.length ) ;
    hfB02 : for ( let i = 0 ; i < ary_paths.length ; i ++ )
    {
        console.log ( "ary_paths [ i ]:" , ary_paths [ i ] ) ;
        var str_nodeSrc = str_rootSrc + '/' + ary_paths [ i ] ;
        
        /*if ( ary_paths [ i ].length == 0 ) 
        {
            pgp_fs.rmdirSync
            (
                str_nodeSrc 
            ) ;
        }
        else
        {
            continue hfA02 ;
        } ; */
        let bol_existFlag = pgp_fs.existsSync ( str_nodeSrc ) ;
        if ( !bol_existFlag ) 
        {  
            continue hfB02 ;          
        } ;
        let pgp_st = pgp_fs.statSync
        ( 
            str_nodeSrc  
        ) ;
                
        // 判断是否为文件
        console.log ( "pgp_st.isFile:" , pgp_st.isFile () ) ;
        if ( pgp_st.isFile () )
        {
            console.log ( "str_nodeSrc:" , str_nodeSrc ) ;
            
            pgp_fs.unlink 
            ( 
                str_nodeSrc ,
                function ( err )
                {
                    console.log ( "file_src:" , str_nodeSrc ) ; 
                    if ( err ) console.error ( "err:" , err ) ;
                }
            ) ;
            
        }
        // 如果是目录则递归调用自身
        else if ( pgp_st.isDirectory () )
        {
            if ( str_nodeSrc.length == 0 && str_nodeSrc != undefined )
            {
                pgp_fs.rmdir 
                ( 
                    str_nodeSrc ,
                    function ( err )
                    {
                        console.log ( "dir_src:" , str_nodeSrc ) ; 
                        if ( err )
                        {
                            console.error ( "err:" , err ) ;
                        } ;
                    } 
                ) ;
            }
            else
            {
                // continue hfA02 ;
                arguments.callee ( str_nodeSrc ) ;
                pgp_fs.rmdir 
                ( 
                    str_nodeSrc , 
                    function ( err )
                    {
                        // arguments.callee ( str_rootSrc ) ;
                        if ( err )
                        {
                        } ;
                    }
                ) ;
            } ;
        }
        
    } ;  
    // console.log ( "arguments.callee.caller:" , arguments.callee.caller ) ;
    // arguments.callee ( str_rootSrc ) ;
} ;

let fn_dele = function ( pgp_params , fn_cb , pgp_cbParams )
{
    let ary_regPatt    = pgp_params.ary_regPatt ? 
    function ()
    {
        pgp_params.ary_regPatt.push ( "" ) ;
        return pgp_params.ary_regPatt ;
    } ()
    : pgp_params.ary_regPatt ;
    let cwd         = pgp_params.cwd ? pgp_params.cwd : "./" ;
    pgp_cbParams    = pgp_cbParams ? pgp_cbParams : undefined ; 
    fn_cb        = fn_cb ? fn_cb : new Function ;

    fn_glob 
    ( 
        
        '{' 
        + ary_regPatt.join ( "," ) 
        + '}' 
        ,
        { 
            "cwd" : cwd ? cwd : "./" ,
            mark : true 
        } ,  
        function ( err , ary_globPaths )
        {
            console.log ( "ary_globPaths:" , ary_globPaths.constructor.name ) ;
            
            hfA01 : for ( let i = 0 ; i < ary_globPaths.length ; i ++ ) 
            {
                // fn_deleteFd ( ary_globPaths[ i ] ) ;
                    // let pgp_stats = pgp_fs.statSync ( ary_globPaths[ i ] ) ;
                /*new Promise
                (
                    function ()
                    {
                        
                    }
                ) ; */   
                
                if ( !pgp_fs.existsSync ( ary_globPaths [ i ] ) ) continue hfA01 ;
                let pgp_stats = pgp_fs.statSync
                (
                    ary_globPaths [ i ] 
                ) ;
                console.log ( "ary_globPaths[ i ]:" , ary_globPaths [ i ] ) ;
                console.log ( "pgp_stats:" , pgp_stats.isDirectory () ) ;
                if ( pgp_stats.isFile () )
                {
                    pgp_fs.unlinkSync ( ary_globPaths[ i ] ) ;
                }
                else if ( pgp_stats.isDirectory () )
                {
                    console.log ( "stats_isDir:" , pgp_stats ) ;
                    
                    let fds = pgp_fs.readdirSync 
                    (
                        ary_globPaths[ i ]  
                    ) ;
                    if ( fds.length == 0 ) 
                    {
                        pgp_fs.rmdirSync
                        (
                            ary_globPaths[ i ]  
                        ) ;
                        ary_rmIdx.push ( i ) ;
                        continue hfA01 ;
                        
                    } 
                    else
                    {
                        fn_deleteFd 
                        ( 
                            ary_globPaths[ i ]  
                        ) ;
                        
                        

                        fn_glob 
                        ( 
                            ary_globPaths [ i ] + "/**" ,
                            function ( err , ary_globPaths )
                            {
                                // ary_globPaths = ary_globPaths.reverse () ;
                                hfC01 : for ( let i = 0 ; i < ary_globPaths.length ; i ++ )
                                {
                                    let bol_existFlag = pgp_fs.existsSync ( ary_globPaths[ i ] ) ;
                                    if ( !bol_existFlag ) continue hfC01 ;
                                    
                                    pgp_fs.rmdir
                                    (
                                        ary_globPaths[ i ] ,
                                        function ( err )
                                        {
                                            if ( err )
                                            {
                                                
                                            } ;
                                        } 
                                    ) ;
                                    
                                } ;
                            }
                        ) ; 
                        // pgp_fs.rmdirSync ( ary_globPaths[ i ] ) ; 
                        ary_globPaths = ary_globPaths.rmEle ( ary_rmIdx ) ;
                        arguments.callee ( err , ary_globPaths ) ;
                    } ; 
                    /*pgp_fs.rmdir 
                    ( 
                        ary_globPaths[ i ] ,
                        function ( err )
                        {
                            if ( err ) console.error ( "err:" , err ) ;
                        } 
                    ) ;*/
                    // pgp_fs.rmdirSync ( ary_globPaths[ i ] ) ;
                } ;
                /*pgp_stat
                ( 
                    ary_globPaths[ i ] , 
                    function ( err , pgp_st )
                    {
                        if ( err )
                        {
                            throw err;
                        }
                        // 判断是否为文件
                        if ( pgp_st.isFile () )
                        {
                            pgp_fs.unlinkSync ( ary_globPaths[ i ] ) ;
                        }
                        // 如果是目录则递归调用自身
                        else if ( pgp_st.isDirectory() )
                        {
                            pgp_fs.rmdirSync ( ary_globPaths[ i ] ) ;
                        }
                    }
                ) ;*/
            } ;

        } 
    ) ;

    fn_cb ()
} ;

module.exports = fn_dele ;
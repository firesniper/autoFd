let pgp_indeEnv = {
    str_desktop         : "C:/Users/Administrator/Desktop/" ,
    str_cwr             : "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ,
    str_node_me         : "D:/ProgramFiles/node_me/" ,
} ;

let pgp_depeEnv = {
    str_autoFdRoot      : pgp_indeEnv.str_node_me + "/autoFd/" ,
    str_node_js         : pgp_indeEnv.str_cwr + "/node_js/" ,
    str_laboRat         : pgp_indeEnv.str_cwr + "/node_js/laboRat/" ,
    str_dir_autoFd      : pgp_indeEnv.str_cwr + "/node_js/repo_autoFd/autoFd/" ,
    str_dist1           : pgp_indeEnv.str_desktop + "/dist1/" ,
    str_dir_append_mls  : pgp_indeEnv.str_cwr + "/node_js/repo_autoFd/dir_append_mls" ,
    str_node_common_lib : pgp_indeEnv.str_node_me + "/autoFd/node_common_lib/" 
} ;
// console.log ( "depeEnv:" , depeEnv ) ;

let fn_glob                 = require ( "glob" ) ;
let pgp_fs                  = require ( "fs" ) ;
let pgp_gulp                = require ( "gulp" ) ;
let pgp_gulpsync            = require ( "gulp-sync" ) ( pgp_gulp ) ;

let pgp_commonLib           = require ( pgp_depeEnv.str_node_common_lib + "/node_common_lib" ) ;
pgp_commonLib.fn_init () ;

let pgp_compileFd = require ( pgp_depeEnv.str_autoFdRoot + "/node_component/compileFd" ) ;


let pgp_gMod = {} ;
pgp_gMod.fn_fileInclude     = require ( "gulp-file-include" ) ;
pgp_gMod.pgp_through2       = require ( "through2" ) ;
pgp_gMod.fn_rev             = require ( "gulp-rev" ) ;
pgp_gMod.fn_revCollector    = require ( "gulp-rev-collector" ) ;
// console.log ( "gulp:" , gulp.prototype ) ;
pgp_gMod.fn_rename          = require ( 'gulp-rename' ) ;
pgp_gMod.fn_minify          = require ( "gulp-minify" ) ;
pgp_gMod.fn_del             = require ( "del" ) ;
pgp_gMod.fn_clean           = require ( "gulp-clean" ) ;
pgp_gMod.fn_bwsReload       = require ( "gulp-livereload" ) ;
pgp_gMod.fn_rmConsole       = require ( "gulp-remove-logging" ) ;
pgp_gMod.fn_sass            = require ( "gulp-sass" ) ;
pgp_gMod.fn_scss            = require ( "gulp-scss" ) ;
pgp_gMod.fn_less            = require ( "gulp-less" ) ;
pgp_gMod.fn_miniCss         = require ( "gulp-minify-css" ) ;
pgp_gMod.fn_sourceMaps      = require ( "gulp-sourcemaps" ) ;

let fnStr_rev = function ( pgp_params )
{
    let str_taskName = "rev:" + pgp_params.str_name ;
    pgp_gulp.task 
    (
        str_taskName ,
        function ()
        {
            return pgp_gulp.src 
                ( 
                    pgp_params.ary_src 
                ) 
                .pipe ( pgp_gMod.fn_rev ( ) ) 
                .pipe ( pgp_gulp.dest ( pgp_params.str_revDest )  )  
                .pipe ( pgp_gMod.fn_rev.manifest () )
                .pipe ( pgp_gulp.dest ( pgp_params.str_maniDest ) )  
        }
    ) ;
    return str_taskName ;
} ;

let fnStr_rmConsole = function ( pgp_params )
{
    let str_taskName = "rmConsole" + pgp_params.str_name ;
    pgp_gulp.task
    (
        str_taskName ,
        function ()
        {
            pgp_gulp
            .src ( pgp_params.ary_src )
            .pipe 
            ( 
                pgp_gMod.fn_rmConsole 
                (
                    function () 
                    {

                    }
                ) 
            )
            .pipe
            (
                pgp_gMod.fn_minify
                (
                    {
                        ext : 
                        {
                            src : '.js' ,
                            min : ".min.js" ,
                        } ,
                        exclude : [] ,
                        ignoreFiles : [] 

                    }
                )
                
            )
            /*.pipe
            (
                pgp_gMod.rename ( "inputJs2.js" ) 
            ) */ 
            .pipe 
            (
                pgp_gulp.dest
                (
                    pgp_params.str_dest 
                )
            )
        }
    ) ;
    return str_taskName ;

} ;


let fnStr_cvt2Css = function ( pgp_params ) 
{
    console.log ( "pgp_params:" , pgp_params.str_name ) ;
    let pgp_loadMaps = pgp_params.str_name == "sass" ? { loadMaps : true } : undefined ;
    let str_taskName = "cvt2Css:" + pgp_params.str_name ;
    pgp_gulp.task 
    ( 
        str_taskName , 
        function () 
        {
            pgp_gulp
            .src ( pgp_params.ary_src )
            .pipe ( pgp_gMod.fn_sourceMaps.init ( pgp_loadMaps ) ) 
            .pipe ( pgp_gMod [ pgp_params.str_name ] ( { outputStyle : "compressed" } ) )
            .pipe ( pgp_gMod.fn_miniCss () ) 
            .pipe  
            ( 
                pgp_gulp.dest 
                ( 
                    function ( pgp_f ) 
                    {
                        return pgp_f.base ;
                    }
                )
            )
            .pipe ( pgp_gMod.fn_sourceMaps.write ( "./" ) )
            .pipe   
            ( 
                pgp_gulp.dest 
                ( 
                    function ( pgp_f ) 
                    {
                        return pgp_f.base ;
                    }
                )
            )
        }
    ) ;
    return str_taskName ;
} ;
console.log ( "fn:" , pgp_gMod.fn_sourceMaps ) ;

let fnStr_revCollector = function ( pgp_params ) 
{
    let str_taskName = "revCollector:" + pgp_params.str_name ;
    pgp_gulp.task
    (
        str_taskName , 
        function ()
        {
            pgp_gulp.src 
            (
                pgp_params.ary_src
            )
            .pipe
            (
                pgp_gMod.fn_revCollector
                (
                    {
                        replaceReved : true ,
                        dirReplacements : 
                        {
                            './css/' : '/hashFiles/',
                            './js/' : '/hashFiles/', 
                            "./images/" : '/hashFiles/' ,
                            '/cdn/' : "cdn_2132"
                        }
                    }
                )
                
            )
            .pipe
            (
                pgp_gMod.pgp_through2.obj
                (
                    function ( pgp_file , enc , cb )
                    {
                        let pgp_uri = pgp_file.path.fnPgp_resolveUri () ;
                        console.log ( "pgp_uri:" , pgp_uri ) ;
                        pgp_file.path = 
                       pgp_uri.str_dir + "\\" 
                        + 
                       pgp_uri.str_fileBaseName 
                        + 
                       pgp_uri.str_ext ;
                        console.log ( "pgp_file.path:" , pgp_file.path ) ;

                        this.push ( pgp_file ) ;
                        cb () ;
                    }
                )
            )
            .pipe
            (
                pgp_gulp.dest ( pgp_params.str_dest ) 
            ) ;
        }
    ) ;
    return str_taskName ;
} ;

let fnStr_fileInclude = function ( pgp_params ) 
{
    let str_taskName = "fileInclude:" + pgp_params.str_name ;
    pgp_gulp.task
    (
        str_taskName ,
        function ()
        {
            pgp_gulp.src ( pgp_params.ary_src )
                .pipe 
                ( 
                    pgp_gMod.fn_fileInclude
                    (
                        {
                            prefix : "@@" ,
                            basepath : "@file"
                        }
                    )
                )  
                .pipe 
                (
                    pgp_gMod.fn_rename ( { suffix : ".combo" } )
                )
                .pipe
                (
                    pgp_gulp.dest
                    (
                        function ( pgp_f )
                        {
                            return pgp_f.base ;
                        }  
                    )
                )
            ;
        }
    ) ;
    return str_taskName ;
} ;

let fnStr_compileFd = function ( pgp_params ) 
{
    let str_taskName = "conmpileFd：" + pgp_params.str_name ;
    pgp_gulp.task
    (
        str_taskName ,
        function ()
        {
            pgp_compileFd.fn_init 
            ( 
                pgp_params.compileFdParams 
                

            ) ;
        }
    ) ;
    return str_taskName ;
} ;



let fnStr_copyDir = function ( pgp_params ) 
{
    let str_taskName = "copyDir:" + pgp_params.str_name ;
    pgp_gulp.task 
    (
        str_taskName ,
        function ( )
        {
            pgp_gulp
            .src ( pgp_params.ary_src )
            .pipe 
            ( 
                pgp_gMod.fn_rename 
                ( 
                    { suffix : ".copy" }
                ) 
            )
            .pipe 
            ( 
                pgp_gulp.dest 
                ( 
                    pgp_params.dest ? pgp_params.dest :
                    function ( pgp_f )
                    {
                        return pgp_f.base ; 
                    } 
                ) 
            ) ;
        } 
    ) ;
    return str_taskName ;
} ;

let fnStr_cleanDir = function ( pgp_params )
{
    let str_taskName = "clean:" + pgp_params.str_name ;
    str_taskName ,
    function ( )
    {
        pgp_gulp.src ( pgp_params.ary_src )
            .pipe 
            (
                pgp_gMod.clean ( )
            )
    }
    return str_taskName ;
} ;

let fnStr_delDir = function ( pgp_params ) 
{
    let str_taskName = "del:" + pgp_params.str_name ;
    pgp_gulp.task 
    (
        str_taskName ,
        function ( callback )
        {
            pgp_gMod.fn_del 
            (
                pgp_params.ary_src ,
                callback
            ) ;

        }
    ) ;
    return str_taskName ;
} ;

let fnStr_resetManifest = function ( pgp_params )
{
    console.log ( "pgp_params:" , pgp_params ) ;
    let str_taskName = "resetManifest:" + pgp_params.str_name ;
    pgp_gulp.task
    (
        str_taskName ,
        function ()
        {
            pgp_params.ary_src.push ( "" ) ;
            fn_glob 
            (
                "{" + 
                pgp_params.ary_src.join ( "," ) 
                + "}"
                
                ,
                {
                    cwd : 
                    pgp_params.str_cwd ? pgp_params.str_cwd : "./" 
                    ,
                    mark : true 
                } ,
                function ( err , ary_fileList  )
                {
                    console.log ( "ary_fileList:" , ary_fileList ) ;
                    let pgp_readStm = pgp_fs.createReadStream 
                    ( 
                        pgp_params.str_cwd 
                        + 
                        ary_fileList [ 0 ].slice ( 1 ) 
                        
                    ) ; 
                    pgp_readStm.setEncoding ( "utf-8" ) ;
                    pgp_readStm.on 
                    (
                        "data" ,
                        function ( str_chunk )
                        {
                            console.log ( "str_chunk:" , typeof JSONchunk ) ;
                        } 
                    ) ; 
                    console.log ( "pgp_readStm:" , pgp_readStm ) ;
                    
                    let pgp_data = require ( ary_fileList [ 0 ] ) ;
                    console.log ( "pgp_data:" , pgp_data ) ;
                    let resPgp = {} ;
                    for ( let str_k in pgp_data ) 
                    {
                        resPgp [ str_k ] = str_k ;
                    } ;
                    console.log ( "resPgp:" , resPgp ) ;
                    pgp_fs.open 
                    ( 
                        pgp_params.str_cwd + ary_fileList [ 0 ].slice ( 1 ) , 
                        "w" ,
                        function ( err , fd )
                        {   
                            if ( err ) console.log ( "err:" , err ) ; 
                            pgp_fs.writeFile 
                            ( 
                                pgp_params.str_cwd + ary_fileList [ 0 ].slice ( 1 ) , JSON.stringify ( resPgp ) ,
                                function ( err )
                                {
                                    console.log ( "err:" , err ) ;
                                }
                            ) ;

                        } 
                    ) ;
                }
            ) ;
        }
    )
    return str_taskName ;
    
    
} ;


module.exports = 
{
    "pgp_indeEnv"           : pgp_indeEnv ,
    "pgp_depeEnv"           : pgp_depeEnv ,
    "pgp_gMod"              : pgp_gMod ,
    "fnStr_rev"             : fnStr_rev ,
    "fnStr_revCollector"    : fnStr_revCollector ,
    "fnStr_copyDir"         : fnStr_copyDir ,
    "fnStr_cleanDir"        : fnStr_cleanDir ,
    "fnStr_delDir"          : fnStr_delDir ,
    "fnStr_cvt2Css"         : fnStr_cvt2Css ,
    "fnStr_fileInclude"     : fnStr_fileInclude ,
    "fnStr_rmConsole"       : fnStr_rmConsole ,
    "fnStr_compileFd"       : fnStr_compileFd ,
    "fnStr_resetManifest"   : fnStr_resetManifest 
} ;
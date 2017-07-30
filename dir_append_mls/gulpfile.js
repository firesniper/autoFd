let pgp_indeEnv = {
    str_desktop         : "C:/Users/Administrator/Desktop/" ,
    str_cwr             : "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ,
    str_node_me         : "D:/ProgramFiles/node_me/" 
} ;

let pgp_depeEnv = {
    str_node_js         : pgp_indeEnv.str_cwr + "/node_js/" ,
    str_laboRat         : pgp_indeEnv.str_cwr + "/node_js/laboRat/" ,
    str_repo_autoFd     : pgp_indeEnv.str_cwr + "/node_js/repo_autoFd/" ,
    str_dir_autoFd      : pgp_indeEnv.str_cwr + "/node_js/repo_autoFd/autoFd/" ,
    str_dist1           : pgp_indeEnv.str_desktop + "/dist1/" ,
    str_dir_append_mls  : pgp_indeEnv.str_cwr + "/node_js/repo_autoFd/dir_append_mls" ,
    str_node_common_lib : pgp_indeEnv.str_node_me + "/autoFd/node_common_lib/" 
} ;

let pgp_fs = require ( "fs" ) ;
let pgp_gulp = require ( "gulp" ) ;
let pgp_gulpsync = require ( "gulp-sync" ) ( pgp_gulp ) ;

let pgp_gulpLib = require ( "./gulp_lib" ) ;
/*let commonLib = require ( node_common_lib + "/node_common_lib" ) ;
commonLib.init () ;*/
let pgp_libIndeEnv = pgp_gulpLib.pgp_indeEnv ;
let pgp_libDepeEnv = pgp_gulpLib.pgp_depeEnv ;
let pgp_gMod = pgp_gulpLib.pgp_gMod ;

/*pgpGMod.fileInclude = require ( "gulp-file-include" ) ;
pgpGMod.revCollector = require ( "gulp-rev-collector" ) ;
pgpGMod.through2 = require ( "through2" ) ;*/

let str_rev_r = pgp_gulpLib.fnStr_rev 
( 
    { 
        str_name : "rev_js" , 
        ary_src : 
        [ 
            "./append_mls/js/*.js" , 
            "./append_mls/images/*.jpg" , 
            "./append_mls/css/*.css" 
        ] , 
        str_revDest : "./hashFiles/" , 
        str_maniDest : "./manifest/" 
    } 
) ;
let str_compileFd = pgp_gulpLib.fnStr_compileFd 
(
    {
        str_name : "" ,
        compileFdParams : 
        {
            pgp_globParams : 
            {
                // "str_cwd" :  pgp_depeEnv.str_dir_append_mls ,
                "str_cwd" :   "./" ,
                "ary_regPatt" : 
                [ 
                    // str_laboRat + '**/*.dev.htm' , 
                    // str_autoFd_ol + '**/*.dev.js' , 
                    // str_laboRat + '*.dev.js' , 
                    // pgp_depeEnv.str_dir_append_mls + "/append_mls/*.combo.html" , 
                    "./append_mls/*.combo.html" ,
                    "./append_mls/css/*.dev.less" ,  

                    // pgp_libIndeEnv.str_laboRat + '**/*.dev.htm'
                    // "./append_mls/css/*.less"         
                    // str_laboRat + '*.dev.scss' 
                ]
            } ,
            str_srcBaseUrl : "http://localhost:211" ,
            str_destBaseUrl : "http://sdaf:8080/abc/" ,
            str_destVirPath : 2 ,
            str_outputDir : null ,
            str_injSrc :
            `
<head>
<meta charset='utf-8' />
<meta  content='no-cache' http-equiv='cache-control'   />
<meta  content='width=device-width,name='viewport    ' height=device-height, user-scalable=no, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0' />
<meta 11/>
<meta bbbccc/>
<meta a/>
<script src= "./append_mls.js" ></script>
<script src= "./appmls.invoke.js" ></script>
</head>
            `  

        }
    }
) ;

let str_rmConsole = pgp_gulpLib.fnStr_rmConsole 
(
    {
        str_name : "" ,
        ary_src : [ pgp_libDepeEnv.laboRat + "/inputJs.dev.js" ] ,
        str_dest : pgp_depeEnv.str_node_js + "/dist1"
    }
) ;

let str_fileInclude = pgp_gulpLib.fnStr_fileInclude 
( 
    { 
        str_name : "" , 
        ary_src : [ "./append_mls/*.dev.html" ] 
    } 
) ;

let str_revCollector = pgp_gulpLib.fnStr_revCollector 
(
    {
        str_name : "" ,
        ary_src : 
        [
            "./manifest/**/*.json" 
            ,
            "./append_mls/*.combo.html" 
        ] ,
        pgp_revCol : 
        {
            replaceReved : false ,
            dirReplacements : 
            {
                './css/' : '/hashFiles/',
                './js/' : '/hashFiles/', 
                "./images/" : '/hashFiles/' ,
                '/cdn/' : "cdn_2132"
            }
        } ,
        str_dest : "./append_mls/"
    }
) ;

pgp_gulp.task
(
    "bwsReload" ,
    function ()
    {
        // gulp.src ( cwr + "**/*.*" )
        pgp_gMod.bwsReload.listen () ;
        pgp_gulp.watch 
        ( 
            "./**/*.*" ,
            function ( event )
            {
                bwsReload.change ( event.path ) ;
            }
        ) ;

    }
) ;


let str_copyRevDest = pgp_gulpLib.fnStr_copyDir ( { str_name : "revDest" , ary_src : []  } ) ;


let str_cleanRevDest = pgp_gulpLib.fnStr_cleanDir ( { str_name : "revDest" , ary_src : [] } ) ;


let str_delRevDest = pgp_gulpLib.fnStr_delDir ( { str_name : "revDest" , ary_src : [] } ) ;




let str_less2Css = pgp_gulpLib.fnStr_cvt2Css 
( 
    { 
        str_name : "fn_less" , 
        ary_src : [ "./append_mls/css/*.less" ] 
    } 
) ;

let str_sass2Css = pgp_gulpLib.fnStr_cvt2Css 
( 
    { 
        str_name : "fn_sass" , 
        ary_src : [ "./append_mls/css/*.scss" ] 
    } 
) ;
// let scss2Css = cvt2Css ( { fn : "scss" , ary_src : [ "./append_mls/css/*.scss" ] , loadMaps : true } ) ;

let str_manifest = pgp_gulpLib.fnStr_resetManifest 
(
    {
        str_name : "" ,
        str_cwd : pgp_libIndeEnv.str_cwr + "/dir_append_mls" ,
        ary_src : [ "./manifest/*.json" ] 
    } 
) ;


let ary_defTask = 
[ 
    /*"rmConsole" 
    ,*/
    
    
    
    str_fileInclude
    ,
    str_compileFd
    /*,
    str_rev_r*/
    /*,
    "revCollector"
    ,*/
    /*"bwsReload" */
] ;

pgp_gulp.task
(
    "default" ,
    ary_defTask ,
    function ( )
    {
        pgp_gulp.start 
        ( 
            [ 
                str_less2Css
                ,
                str_sass2Css 
            ] 
        ) ;
        pgp_gulp.watch 
        ( 
            // pgp_libDepeEnv.str_laboRat + "/inputJs.dev.js" , 
            "./**/*.html" ,
            ary_defTask 
        ) ;
    }
) ;


let ary_revTask =
[
    str_rev_r ,
    // str_compileFd 
    // str_manifest 
] ;

pgp_gulp.task
(
    "revCollector" , 
    ary_revTask ,
    function ()
    {
        pgp_gulp.start ( [ /*str_manifest ,*/ str_revCollector ] ) ;
        /*pgp_gulpsync.sync 
        ( 
            str_revCollector ,
            [ 
                // str_manifest  , 
            ] 
        ) ;*/
    }
) ;

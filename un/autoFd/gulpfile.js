let gulp2 = require ( "gulp" ) ;
console.log ( "gulp2:" , gulp2 ) ;
let rename = require('gulp-rename');

let self = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/autoFd/" ;
let desktop = "C:/Users/Administrator/Desktop" ;
/*gulp.task 
(
    "a1" ,
    function ( )
    {
        gulp
        .src ( "*.js" )
        .pipe 
        ( gulp.dest ( desktop ) ) ;
    } 
) ;*/
gulp2.task 
( 
    'sass' , 
    function () 
    {
        gulp2
        .src ( '*.md' )
        .pipe(rename('all.min.md'))
        .pipe
        ( 
            gulp2.dest 
            ( 
                function ( f ) 
                {
                    console.log( "f.base" , f.base ) ;
                    return f.base ;
                }
            )
        )
    }
) ;
let glob = require ( "glob" ) ;
let fs = require ( "fs" ) ;
let gulp = require ( "gulp" ) ;
let cwr = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ;
let dir_append_mls = cwr + "/dir_append_mls/" ;
// let clear = require ( "gulp-clear" ) ;
// console.log ( "clear:" , clear ) ;
let del = require ( "del" ) ;

gulp.task
(
    "del" ,
    function()
    {
        del 
        (
            [
                "C:\Users\Administrator\Desktop\dist"
            ]
        ) ;
    }
) ;
gulp.task
(
    "default" ,
    [ "del" ] ,
    function ()
    {

    }
) ;
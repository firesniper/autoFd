// let del = require ( "del" ) ;
let copyDir = require ( "../node_component/copyDir_2" ) ;
let fs = require ( "fs" ) ;
let self = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/" ;
let autoFdDir = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/autoFd/" ;
let laboRatInputDir = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/" ;
let desktop = "C:/Users/Administrator/Desktop/" ;
let autoFd_ol = self + "/autoFd_ol/" ;

copyDir
(
    autoFdDir ,
    autoFd_ol 
) ;
/*copyDir
(
    "e:\\d2" ,
    "e:\\d1" 
) ;*/
/*let emp = "e:/d0" ;
fs.readdir 
(
    emp ,
    function ( err , files )
    {
        console.log ( "d0_files:" , files.length  ) ;
        if ( files.length == 0 )
        {
            fs.rmdirSync ( emp ) ;
        } ;
    }
) ;*/
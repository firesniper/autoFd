let dele = require ( "../node_component/dele" ) ;
let del = require ( "del" );
let copyDir = require ( "../node_component/copyDir_2" ) ;

let self = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/" ;
let autoFdDir = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/autoFd/" ;
let desktop = "C:/Users/Administrator/Desktop/" ;
let dist1 = desktop + "/autoFd_ol/" ;
/*copyDir
(
    autoFdDir ,
    dist1 
) ;*/
dele
(
    [
        // dist1 + "/.git/" ,
        // dist1 + "/autoFd_ol/" ,
        // dist1 + "/origin/" ,
        // dist1 + "/un/" ,
        // dist1 + "/*.[^md]" ,
        dist1 ,
        ""
    ] 
    ,
    "./"
) ;
/*del
(
    [
        // dist1 + "/.git" ,
        // dist1 + "/autoFd_ol/" ,
        // dist1 + "/origin" ,
        // dist1 + "/un" ,
        dist1 ,  
        ""
    ] 
) ;*/
let glob = require ( "glob" ) ;
let self = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/autoFd/" ;


glob 
(
    // "{" + [ self + '*' , "" ].join ( "," ) + "}" ,
    self + "*" ,
    {
        cwd : "./" ,
        mark : true
    } ,
    function ( err , files )
    {   
        console.log ( "files:" , files ) ;
    }
) ;
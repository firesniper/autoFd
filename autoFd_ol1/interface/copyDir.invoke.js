let copyDir = require ( "./node_component/copyDir_2" ) ;
copyDir.init
(
    {
        src : "e:\\d2" ,
        dest : "e:\\d1" 
    }
    ,
    {
        rmRegAry : [ "e:\\d2\\*.htm" , "" ] 
        ,
        cwd : "./"
    } ,
    "baseUrl1"
) ;
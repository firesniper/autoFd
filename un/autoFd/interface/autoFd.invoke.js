let compileFd = require ( "../node_component/compileFd" ) ;
let copyDir = require ( "../node_component/copyDir_2" ) ;
let dele = require ( "../node_component/dele" ) ;

let desktop = "C:/Users/Administrator/Desktop/" ;
let self = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/" ;
let laboRatInputDir = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/" ;
let repo_autoFd = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/repo_autoFd/" ;
let autoFdDir = repo_autoFd + "autoFd/" ;
let autoFd_ol = repo_autoFd + "autoFd_ol/" ;
 
compileFd.init 
( 
    {
        globPgp : 
        {
            // "cwd" : "./" ,
            "regPattAry" : 
            [ 
                laboRatInputDir + '*.dev.htm' , 
                autoFd_ol + '**/*.dev.js' , 
                laboRatInputDir + '*.dev.js' , 
                laboRatInputDir + '*.dev.less' ,        
                laboRatInputDir + '*.dev.scss' ,
                "" 
            ]
        } ,
        srcBaseUrl : "http://localhost:211" ,
        destBaseUrl : "http://PH_host:8080/abc/" ,
        destVirPath : 2 ,
        outputDir : null ,
        injSrcStr :
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

) ;



copyDir
(
    autoFdDir ,
    autoFd_ol 
) ;

dele
(
    [
        autoFd_ol + "/.git/" ,
        autoFd_ol + "/autoFd_ol/" ,
        autoFd_ol + "/origin/" ,
        autoFd_ol + "/un/" ,
        autoFd_ol + "/*.[^md]" ,
        ""
    ] 
    ,
    "./"
) ;
/*let copyDir = require ( "D:/ProgramFiles/node_me/autoFd/node_component/copyDir_2" ) ;
copyDir.init
(
    {
        putPath :
        {
            src : "e:\\d2" ,
            dest : "e:\\d1" 
        } ,
        globPgp :
        {
            rmRegAry : [ "e:\\d2\\*.htm" , "" ] 
            ,
            cwd : "./"
        } ,
        baseUrl : "baseUrl1"
    }
) ;*/
let autoFdRoot = "D:/ProgramFiles/node_me/autoFd/" ;
let autoFdCompo = autoFdRoot + "/node_component/" ;
let compileFd = require ( autoFdRoot + "/node_component/compileFd" ) ;
let copyDir = require ( autoFdRoot + "/node_component/copyDir_2" ) ;
let dele = require ( autoFdRoot + "/node_component/dele" ) ;

let desktop = "C:/Users/Administrator/Desktop/" ;
let cwr = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ;
let node_js = cwr + "/node_js/" ;
let laboRat = cwr + "/node_js/laboRat/" ;
let repo_autoFd = cwr + "/node_js/repo_autoFd/" ;
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
                laboRat + '*.dev.htm' , 
                autoFd_ol + '**/*.dev.js' , 
                laboRat + '*.dev.js' , 
                laboRat + '*.dev.less' ,        
                laboRat + '*.dev.scss' 
            ]
        } ,
        srcBaseUrl : "http://localhost:211" ,
        destBaseUrl : "http://sdaf:8080/abc/" ,
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
    {
        rmRegAry :
        [
            autoFd_ol + "/.git/" ,
            autoFd_ol + "/autoFd_ol/" ,
            autoFd_ol + "/origin/" ,
            autoFd_ol + "/un/" ,
            autoFd_ol + "/*.[^md]" ,
        ] 
        ,
        "cwd" : "./"
    }
    
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
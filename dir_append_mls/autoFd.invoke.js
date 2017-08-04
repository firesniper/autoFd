let fs = require ( "fs" ) ;
let autoFdRoot = "D:/ProgramFiles/node_me/autoFd/" ;
let autoFdCompo = autoFdRoot + "/node_component/" ;
let compileFd = require ( autoFdRoot + "/node_component/compileFd" ) ;
let copyDir = require ( autoFdRoot + "/node_component/copyDir_2" ) ;
let dele = require ( autoFdRoot + "/node_component/dele" ) ;

let desktop = "C:/Users/Administrator/Desktop/" ;

let cwr = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ;
let cwd = cwr + "/dir_append_mls/" ;
let node_js = cwr + "/node_js/" ;
let laboRat = cwr + "/node_js/laboRat/" ;
let dir_append_mls = cwr + "/dir_append_mls/" ;
let append_mls = dir_append_mls + "/append_mls/" ;
let append_mls_ol = dir_append_mls + "/append_mls_ol/" ;

let repo_autoFd = cwr + "/node_js/repo_autoFd/" ;
let autoFdDir = repo_autoFd + "autoFd/" ;
let autoFd_ol = repo_autoFd + "autoFd_ol/" ;
 
compileFd.init 
( 
    {
        globPgp : 
        {
            "regPattAry" : 
            [ 
                append_mls + '*.dev.htm' , 
                append_mls + '**/*.dev.js' , 
                append_mls + '*.dev.js' , 
                append_mls + '*.dev.less' ,        
                append_mls + '*.dev.scss' ,
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

/*if ( fs.existsSync ( append_mls_ol ) )
{
    dele
    (
        {
            regPattAry : 
            [
                append_mls_ol ,
            ] 
        } ,
        function ()
        {
            
        }
    ) ;
}*/

/*copyDir
(
    append_mls ,
    append_mls_ol 
) ;*/

/*dele
(
    [
        append_mls_ol + "/.git/" ,
        append_mls_ol + "/append_mls_ol/" ,
        append_mls_ol + "/origin/" ,
        append_mls_ol + "/un/" ,
        append_mls_ol + "/*.[^md]" ,
        ""
    ] 
    ,
    "./"
) ;*/
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
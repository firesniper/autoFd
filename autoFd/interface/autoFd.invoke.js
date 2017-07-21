let str_desktop = "C:/Users/Administrator/Desktop/" ;
let str_cwr = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/" ;

let str_autoFdRoot = "D:/ProgramFiles/node_me/autoFd/" ;
let str_autoFdCompo = str_autoFdRoot + "/node_component/" ;

let str_node_js = str_cwr + "/node_js/" ;
let str_laboRat = str_cwr + "/node_js/laboRat/" ;
let str_repo_autoFd = str_cwr + "/node_js/repo_autoFd/" ;
let str_autoFdDir = str_repo_autoFd + "autoFd/" ;
let str_autoFd_ol = str_repo_autoFd + "autoFd_ol/" ;


let pgp_compileFd = require ( str_autoFdRoot + "/node_component/compileFd" ) ;
let pgp_copyDir = require ( str_autoFdRoot + "/node_component/copyDir_2" ) ;
let fn_dele = require ( str_autoFdRoot + "/node_component/dele" ) ;

 
pgp_compileFd.fn_init 
( 
    {
        pgp_globParams : 
        {
            // "str_cwd" : "./" ,
            "ary_regPatt" : 
            [ 
                str_laboRat + 'htmloutput.dev.htm' , 
                // str_autoFd_ol + '**/*.dev.js' , 
                // str_laboRat + '*.dev.js' , 
                // str_laboRat + '*.dev.less' ,        
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

) ;



/*pgp_copyDir
(
    str_autoFdDir ,
    str_autoFd_ol 
) ;*/

/*fn_dele
(
    {
        ary_regPatt :
        [
            str_autoFd_ol + "/.git/" ,
            str_autoFd_ol + "/str_autoFd_ol/" ,
            str_autoFd_ol + "/origin/" ,
            str_autoFd_ol + "/un/" ,
            str_autoFd_ol + "/*.[^md]" ,
        ] 
        ,
        "str_cwd" : "./"
    }
    
) ;*/
/*let pgp_copyDir = require ( "D:/ProgramFiles/node_me/autoFd/node_component/copyDir_2" ) ;
pgp_copyDir.fn_init
(
    {
        putPath :
        {
            src : "e:\\d2" ,
            dest : "e:\\d1" 
        } ,
        pgp_globParams :
        {
            rmRegAry : [ "e:\\d2\\*.htm" , "" ] 
            ,
            str_cwd : "./"
        } ,
        baseUrl : "baseUrl1"
    }
) ;*/
let str_desktop = "C:/Users/Administrator/Desktop/" ;
let str_cwr = "E:/Repos_git/repo_autoFd/" ;

let str_autoFdRoot = "D:/ProgramFiles/node_me/autoFd/" ;
let str_autoFdCompo = str_autoFdRoot + "/node_component/" ;

let str_node_js = str_cwr + "/node_js/" ;
let str_laboRat = str_cwr + "/laboRat/" ;
let str_repo_autoFd = str_cwr + "/" ;
let str_autoFdDir = str_repo_autoFd + "/autoFd/" ;
let str_autoFd_ol = str_repo_autoFd + "/autoFd_ol/" ;
let dir_append_mls = str_cwr + "/dir_append_mls/" ;

let pgp_compileFd = require ( str_autoFdRoot + "/node_component/compileFd" ) ;
let pgp_copyDir = require ( str_autoFdRoot + "/node_component/copyDir_2" ) ;
let fn_dele = require ( str_autoFdRoot + "/node_component/dele" ) ;

 
pgp_compileFd.fn_init 
( 
    {
        pgp_globParams : 
        {
            // "str_cwd" : "./" ,
            "str_cwd" : str_cwr ,
            "ary_regPatt" : 
            [ 
                dir_append_mls + '/**/*.combo.html' , 
                // str_autoFd_ol + '**/*.dev.js' , 
                // dir_append_mls + '*.dev.js' , 
                dir_append_mls + '/*.dev.less' ,        
                // dir_append_mls + '*.dev.scss' 
            ]
        } ,
        str_srcBaseUrl : "http://localhost:3000/public/" ,
        str_destBaseUrl : "http://sdaf:8080/abc/" ,
        str_destVirPath : 2 ,
        str_outputDir : null ,
        str_injSrc : null

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
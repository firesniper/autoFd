let compileFd = require ( "D:/ProgramFiles/node_me/autoFd/node_component/compileFd.js" ) ;
 
let laboRatInputDir = "E:/SERVER_CODES/DIVI_WORKING/TEST/cs_trade_a03_g_02/node_js/laboRat/" ; 
compileFd.init 
( 
    {
        globPgp : 
        {
            // "cwd" : "./" ,
            "regPattAry" : 
            [ 
                laboRatInputDir + '*.dev.htm' , 
                laboRatInputDir + '*.dev.js' , 
                laboRatInputDir + '*.dev.less' ,        
                laboRatInputDir + '*.dev.scss' ,
                "" 
            ]
        } ,
        baseUrl : "http://localhost:211" ,
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

let copyDir = require ( "D:/ProgramFiles/node_me/autoFd/node_component/copyDir_2" ) ;
copyDir.init
(
    {
        putPath :
        {
            src : "e:\\d2" ,
            dest : "e:\\d2" 
        } ,
        globPgp :
        {
            rmRegAry : [ "e:\\d2\\*.htm" , "" ] 
            ,
            cwd : "./"
        } ,
        baseUrl : "baseUrl1"
    }
) ;
let compileFd = require ( "D:/ProgramFiles/node_v6_win_x64/node_modules/autoFd/node_component/compileFd.js" ) ;
 
let injSrc = 
`
<head>
    <meta charset='utf-8' />
    <meta  content='no-cache' http-equiv='cache-control'   />
    <meta  content='width=device-width,name='viewport    ' height=device-height, user-scalable=no, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0' />
    <meta 11/>
    <meta bbbccc/>
    <meta a/>
</head>
` ;
compileFd.init 
( 
    

    {
        // "cwd" : "./" ,
        "regPattAry" : [ 'node_js/*.dev.htm' , "" ]
    } ,
    "http://localhost:211" 
    ,
    { 
 
        "outputDir" : null , 
 
    } 
    ,
    `
    <head>
        <meta charset='utf-8' />
        <meta  content='no-cache' http-equiv='cache-control'   />
        <meta  content='width=device-width,name='viewport    ' height=device-height, user-scalable=no, initial-scale=1.0 ,maximum-scale=1.0, minimum-scale=1.0' />
        <meta 11/>
        <meta bbbccc/>
        <meta a/>
    </head>
    `  
) ;

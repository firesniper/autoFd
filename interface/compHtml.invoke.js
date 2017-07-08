let cpJs = require ( "./node_component/compHtml" ) ;
 
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
cpJs.init 
( 
    { 
        "inputDir" : [ "node_js/" ] ,
        // "inputUri" : [ "node_js/webpack.html" ] , 
        // "outputUri" : "node_js/html/output.html" , 
        "outputDir" : "node_js/" , 
        // "outputFile" : "output.html" 
    } , 
    injSrc ,
    {
        // "cwd" : "./" ,
        "regPattAry" : [ 'node_js/laboRat/*.dev.js' , "" ]
    } ,
    "http://localhost:901190"
) ;

let gpack = require ( "../node_component/gpack" ) ;
console.log ( "gpack:" , gpack ) ;
gpack.init 
(

    {
        "cwd" : "./" ,
        "regStr" : '**'
    } ,
    "baseUrl1"

) ;
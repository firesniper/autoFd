require.config
(
    {
        paths : {
            "jquery" : [
                document.baseURI + "/js/jquery-2.1.4" 
                
            ] 
            ,
            "a" : [ document.baseURI + "/js/a" ]  
        }
    }
) ;

require
(
    [ "jquery" , "a" ] 
    ,
    function ( $ ) 
    {
        $
        (
            function ()
            {
                console.log ( "load finished" ) ;  
            }
        )
    }
)
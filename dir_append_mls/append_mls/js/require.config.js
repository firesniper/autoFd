require.config
(
    {
        paths : {
            "jquery" : [
                "/code_common/common_js/jquery-1.9.0.custom" 
                , 
                "js/jquery"
            ] 
            ,
            "a" : "js/a"   
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
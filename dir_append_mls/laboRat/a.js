;(
    function ()
    {
        var $body = null ;
        function fun1 ()
        {
            console.log ( "it works" ) ;
            $body = document.querySelector ( "body" ) ;
        } ;

        fun1 () ;
        console.log ( "$body:" , $body ) ;
    }
)
() ;
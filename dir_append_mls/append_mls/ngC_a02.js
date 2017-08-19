    
var mdu_root = angular.module ( "mdu_root" , [] ) ;
console.log ( "mdu_root:" , mdu_root ) ;
mdu_root.controller
(
    "ctr-root" ,
    function ( $scope , $http )
    {
        var pgp_docSerh = { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;

        // var str_servWholeUri = pgp_docSerh.fnStr_getWholeUri () ;
        
        $http.jsonp
        ( 
            // str_servWholeUri + '&jsonp=JSON_CALLBACK' 
            'http://localhost:8080/mall_a01/malldata?scm=malldata&tbNamesStr=shoe,overcoat&jsonp=JSON_CALLBACK'
        )
        .success
        (
            function ( json_data )
            {
                console.log ( "json_data:" , json_data ) ;
            }
        ) ;
    }
) ; 
var fil_a1 = function ()
{
    return function ( a , b )
    {
        console.log ( "fil-a1" ) ;
        return a + b ;

    } ;
}
mdu_root.filter
(
    "fil_a1" ,
    fil_a1
) ;
mdu_root.controller 
(
    "ctr-a1" ,
    function ( $scope /*, fil_a1*/ )
    {
        console.log ( " $scope:",  $scope) ;
        /*var res = fil_a1() ( 1 ,  2 ) ;
        console.log ( "res:" , res ) ;*/
        var inj_a1 = angular.injector ( [ "ng" , "mdu_root" ] ) ;
        /*var fil_a1 = inj_a1.invoke ( function ( numberFilter ) {
            console.log ("fil_a1:" , numberFilter ) ;
        } ) ;*/
        var fil_a1 = inj_a1.get ( "fil_a1" ) ;
        
    }
) ;

angular.element ( document ).ready  
(
    function ( $ )
    {
        angular.bootstrap ( document , [ "mdu_root" ] ) ;

    }
) ;
 /*   angular.element ( document ).ready
    (
        function ( $ )
        {
            angular.bootstrap ( document , [ "mdu_a01" ] ) ;
        }
    ) ;    */
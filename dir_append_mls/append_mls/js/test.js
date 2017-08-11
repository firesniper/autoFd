+function ()
{
    
} ()

Object.defineProperties
(
    Object.prototype ,
    {
        "ss" : 
        {
            enumerable : false ,
            configurable : true ,
            writable : true ,
            value : function ( a )
            {
                var _this = this ;
                var cc = {} ;
                // return this + a ? a : "222" + "!" ;
                Object.defineProperties
                (
                    cc ,
                    {
                        "a" :
                        {
                            enumerable : false ,
                            configurable : true ,
                            writable : true ,
                            value : this + a ? a : "222" + "!"

                        }
                    }
                ) ;
            }

        }
    }
) ;

var l = {a:{}} ;
l.ss ( "pp" ) ;
console.log ( "l:" , l );
var pgp = 
{
    a :
    [
        {
            b : 1
        }
    ]
} ;
pgp.fnPgp_setIndex () ;

console.log ( "pgp:" , pgp ) ;

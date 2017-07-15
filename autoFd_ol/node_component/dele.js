let glob = require ( "glob" ) ;
let fs = require ( "fs" ) 
    stat = fs.stat ;

let rmIdxAry = [] ;
var deleteFd = function ( src )
{
    // 读取目录中的所有文件/目录
    let paths = fs.readdirSync
    ( 
        src  
    ) ;
    // if ( paths.length != 0 ) fs.readdir ( src , cb ) ;
    
    console.log ( "paths:", paths.length ) ;
    hfB02 : for ( let i = 0 ; i < paths.length ; i ++ )
    {
        console.log ( "paths [ i ]:" , paths [ i ] ) ;
        var _src = src + '/' + paths [ i ] ;
        
        /*if ( paths [ i ].length == 0 ) 
        {
            fs.rmdirSync
            (
                _src 
            ) ;
        }
        else
        {
            continue hfA02 ;
        } ; */
        let existFlag = fs.existsSync ( _src ) ;
        if ( !existFlag ) 
        {  
            continue hfB02 ;          
        } ;
        let st = fs.statSync
        ( 
            _src  
        ) ;
                
        // 判断是否为文件
        console.log ( "st.isFile:" , st.isFile () ) ;
        if ( st.isFile () )
        {
            console.log ( "_src:" , _src ) ;
            
            fs.unlink 
            ( 
                _src ,
                function ( err )
                {
                    console.log ( "file_src:" , _src ) ; 
                    if ( err ) console.error ( "err:" , err ) ;
                }
            ) ;
            
        }
        // 如果是目录则递归调用自身
        else if ( st.isDirectory () )
        {
            if ( _src.length == 0 && _src != undefined )
            {
                fs.rmdir 
                ( 
                    _src ,
                    function ( err )
                    {
                        console.log ( "dir_src:" , _src ) ; 
                        if ( err )
                        {
                            console.error ( "err:" , err ) ;
                        } ;
                    } 
                ) ;
            }
            else
            {
                // continue hfA02 ;
                arguments.callee ( _src ) ;
                fs.rmdir 
                ( 
                    _src , 
                    function ( err )
                    {
                        // arguments.callee ( src ) ;
                        if ( err )
                        {
                        } ;
                    }
                ) ;
            } ;
        }
        
    } ;  
    // console.log ( "arguments.callee.caller:" , arguments.callee.caller ) ;
    // arguments.callee ( src ) ;
} ;

let dele = function ( rmRegAry , cwd )
{
    /*let rmRegAry = initParams.rmRegAry ;
    let cwd = initParams.cwd ? initParams.cwd : "./" ;*/
    
    glob 
    ( 
        
        '{' 
        + rmRegAry.join ( "," ) 
        + '}' 
        ,
        { 
            "cwd" : cwd ? cwd : "./" ,
            mark : true 
        } ,  
        function ( err , globPaths )
        {
            console.log ( "globPaths:" , globPaths.constructor.name ) ;
            
            hfA01 : for ( let i = 0 ; i < globPaths.length ; i ++ ) 
            {
                // deleteFd ( globPaths[ i ] ) ;
                    // let stats = fs.statSync ( globPaths[ i ] ) ;
                /*new Promise
                (
                    function ()
                    {
                        
                    }
                ) ; */   
                
                if ( !fs.existsSync ( globPaths [ i ] ) ) continue hfA01 ;
                let stats = fs.statSync
                (
                    globPaths [ i ] 
                ) ;
                console.log ( "globPaths[ i ]:" , globPaths [ i ] ) ;
                console.log ( "stats:" , stats.isDirectory () ) ;
                if ( stats.isFile () )
                {
                    fs.unlinkSync ( globPaths[ i ] ) ;
                }
                else if ( stats.isDirectory () )
                {
                    console.log ( "stats_isDir:" , stats ) ;
                    
                    let fds = fs.readdirSync 
                    (
                        globPaths[ i ]  
                    ) ;
                    if ( fds.length == 0 ) 
                    {
                        fs.rmdirSync
                        (
                            globPaths[ i ]  
                        ) ;
                        rmIdxAry.push ( i ) ;
                        continue hfA01 ;
                        
                    } 
                    else
                    {
                        deleteFd 
                        ( 
                            globPaths[ i ]  
                        ) ;
                        
                        

                        glob 
                        ( 
                            globPaths [ i ] + "/**" ,
                            function ( err , globPaths )
                            {
                                // globPaths = globPaths.reverse () ;
                                hfC01 : for ( let i = 0 ; i < globPaths.length ; i ++ )
                                {
                                    let existFlag = fs.existsSync ( globPaths[ i ] ) ;
                                    if ( !existFlag ) continue hfC01 ;
                                    
                                    fs.rmdir
                                    (
                                        globPaths[ i ] ,
                                        function ( err )
                                        {
                                            if ( err )
                                            {
                                                
                                            } ;
                                        } 
                                    ) ;
                                    
                                } ;
                            }
                        ) ; 
                        // fs.rmdirSync ( globPaths[ i ] ) ; 
                        globPaths = globPaths.rmEle ( rmIdxAry ) ;
                        arguments.callee ( err , globPaths ) ;
                    } ; 
                    /*fs.rmdir 
                    ( 
                        globPaths[ i ] ,
                        function ( err )
                        {
                            if ( err ) console.error ( "err:" , err ) ;
                        } 
                    ) ;*/
                    // fs.rmdirSync ( globPaths[ i ] ) ;
                } ;
                /*stat
                ( 
                    globPaths[ i ] , 
                    function ( err , st )
                    {
                        if ( err )
                        {
                            throw err;
                        }
                        // 判断是否为文件
                        if ( st.isFile () )
                        {
                            fs.unlinkSync ( globPaths[ i ] ) ;
                        }
                        // 如果是目录则递归调用自身
                        else if ( st.isDirectory() )
                        {
                            fs.rmdirSync ( globPaths[ i ] ) ;
                        }
                    }
                ) ;*/
            } ;
             
                 
                    
                
            
            
        } 
    ) ;
}

module.exports = dele ;
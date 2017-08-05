var fs = require ( "fs" ) ;
/*var data2 = fs.exists 
( 
    "input2.txt"
    ,
    function ( a )
    {
        console.log ( "a:" , a ) ;
        return a ;
    }
) ;*/
var outputFile  = "node_js/output.txt" ;
let inputFile   = "node_js/input.txt" ;
Promise.resolve
( 
    fs.exists 
    ( 
        inputFile
        ,
        function ( fileFlag )
        {
            console.log ( "fileFlag:" , fileFlag ) ;
            if ( fileFlag ) 
            {
                var data = fs.readFileSync ( inputFile , "utf-8" ) ;
                console.log ( "typeof data:" , typeof data) ;
                console.log ( "data equals:" , data == "" ) ;
                console.log ( "data equals:" , data == null ) ;
                console.log ( "data equals:" , data == undefined ) ;
                console.log ( "data empty:" , data ? true : false ) ;
                console.log ( "data.toString:" , data.toString () ) ; 
            } ;
        }
    ) 
) ;
 
// console.log ( "data2:" , data2 ) ;
fs.readFile
(
    inputFile ,
    "utf8" ,
    function ( err , data )
    {
        console.log ( "data :" , data  ) ;
        console.log ( "dataFlag:" , data ? true : false ) ;
        if ( err )  
        {
             console.error ( "err:" , err ) ; 
             return ; 
        } ;

    }
) ;
console.log("程序执行结束!");
let openFlag = null ;
let runPm = function ()
{
    let psOp =  new Promise
    ( 
        function ( resolve , reject )
        {
            /*console.log ( "psOp resolve: " , resovle ) ;
            resolve
            (*/
                fs.openSync 
                ( 
                    inputFile , 
                    "rs" , 
                    function ( err , fd ) 
                    {
                        console.log ( "open fd:" , fd ) ;
                        openFlag = "ddd" ;
                        if ( err )
                        {
                            console.log ( "open err:" , err ) ;
                            openFlag = "ssss" ;
                        }
                    } 
                ) 
               
            /*)*/
        }
    ) ;
    console.log ( "psOp:" , psOp ) ;
    psOp.then 
    (
        function ( success )
        {
            console.log ( "success:" , success ) ;
            console.log ( "openFlagA3:" , openFlag ) ;
        } ,
        function ( reject )
        {
            console.log ( "psOp reject:" ,  reject ) ;
        }
    ) ; 
    return psOp ;

}
console.log ( "runPm ():" , runPm () ) ;
 setTimeout
(
    function ()
    {
        console.log ( "openFlagA4:" , openFlag ) ;
    } ,
    0
) ;
setTimeout 
(
    function ()
    {
        console.log ( "psOp:" , psOp ) ;

    }
    ,
    1000
) ;
runPm ().then 
(
    function ( success )
    {
        console.log ( "success:" , success ) ;
        console.log ( "openFlagA5:" , openFlag ) ;
    } ,
    function ( reject )
    {
        console.log ( "psOp reject:" ,  reject ) ;
    }
) ;
let nn = null ;
let pmA02 = Promise.resolve 
(
    function ( resolve , reject )
    {
        console.log ( "pmA02 resolve:" , resolve ) ;
        console.log ( "pmA02 reject:" , reject ) ;

        fs.open
        ( 
            inputFile , 
            "rs" , 
            function ( err , fd ) 
            {
                console.log ( "open fd:" , fd ) ;
                openFlag = "ddd" ;
                if ( err )
                {
                    console.log ( "open err:" , err ) ;
                    openFlag = "ssss" ;
                }
            } ()
        ) ;
        nn = 111 ;
        console.log ( "pmA02 resolve:" , resolve ) ;

    }()
) ;
console.log ( "pmA02:" , pmA02 ) ;
pmA02.then 
(
    function ( resolve )
    {
        console.log ( "pmA02 resolve:" , resolve ) ;
        console.log ( "nn:" , nn  ) ;
        console.log ( "openFlag:" , openFlag ) ;
    } ,
    function ( reject )
    {
        console.log ( "pmA02 reject:" , reject ) ;
    }
) ;
/*let openRes2 = fs.openSync 
( 
    inputFile , 
    "rs" 
) ;
console.log ( "openRes2:" , openRes2 ) ;*/

// Node Js EventEmitter
// 引入 events 模块
var events = require ( 'events' ) ;
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter () ;

// 创建事件处理程序
var connectHandler = function connected () 
{
   console.log( '连接成功。' ) ;
  
   // 触发 data_received 事件 
   eventEmitter.emit ( 'data_received' ) ;
} ;

// 绑定 connection 事件处理程序
eventEmitter.on ( 'connection' , connectHandler ) ;
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on
(
    'data_received' , 
    function () 
    {
        console.log ( '数据接收成功。' ) ;
    }
) ;

// 触发 connection 事件 
eventEmitter.emit ( 'connection' ) ;

console.log ( "程序执行完毕。" ) ;

//event.js 文件
var EventEmitter = require ( 'events' ).EventEmitter ; 
var event = new EventEmitter() ; 
event.on
(
    'some_event' 
    , 
    function () 
    { 
        console.log ( 'some_event 事件触发' ) ; 
    }
) ; 

setTimeout
(
    function () 
    { 
        event.emit( 'some_event' ) ; 
    } 
    , 
    1000
) ; 


//Node Js Buffer
var buf = new Buffer(10); 
var buf = new Buffer([10, 20, 30, 40, 50]);
var buf = new Buffer("www.runoob.com", "utf-8");
buf = new Buffer(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);
buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}

var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

var buffer1 = new Buffer('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());

var buffer = new Buffer ( 'www.runoob.com' ) ;
//  缓冲区长度
console.log ( "buffer length: " + buffer.length ) ;



//Node Js Stream


console.log ( "程序执行完毕" ) ;

var fs = require ( "fs" ) ;
var data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var pr1 = Promise.resolve
(
    fs.exists 
    (
        outputFile ,
        function ( flag )
        {
            if ( flag )
            {
                console.log ( "flag:" , flag ) ;
                let readStream = fs.createReadStream ( inputFile ) ;
                var writerStream = fs.createWriteStream ( outputFile ) ;
                // 使用 utf8 编码写入数据
                // writerStream.write ( data , 'UTF8' ) ;

                // 标记文件末尾
                // writerStream.end () ;
                readStream.pipe ( writerStream ) ;

                fs.watch 
                (
                    inputFile ,
                    function ( event , path )
                    {
                        // readStream = fs.createReadStream ( readStream ) ;
                        // readStream.pipe ( writerStream ) ;
                        let chunck = fs.readFileSync
                        (
                            inputFile  ,
                            "utf-8"
                        ) ;
                        console.log ( "chunck:" , chunck) ;
                        fs.writeFile ( outputFile , chunck ) ;
                    }
                ) ;
                
                // 处理流事件 --> data, end, and error
                writerStream.on
                (
                    'finish' , 
                    function () 
                    {
                        console.log ( "writer finish" ) ;
                    }
                ) ;

                writerStream.on 
                ( 
                    'error' , 
                    function ( err )
                    {
                        console.log ( "err.stack:" , err.stack ) ;
                    }
                ) ;

                console.log ( "程序执行完毕" ) ;
            } 
            else 
            {
                console.log ( "outputFile is exists" ) ;
            } ;
        }
    ) 
) ;
pr1.then
(
    function ()
    {
        var data = '' ;

        // 创建可读流
        var readerStream = fs.createReadStream ( outputFile ) ;

        // 设置编码为 utf8。
        readerStream.setEncoding ( 'UTF8' ) ;

        // 处理流事件 --> data, end, and error
        readerStream.on
        (
            'data' , 
            function ( chunk ) 
            {
                console.log ( "chunk :" , chunk ) ;
                console.log ( "data :" , data ) ;
                data += chunk ;
            }
        ) ;

        readerStream.on
        (
            'end' , 
            function ()
            {
                console.log ( "reader data : " , data ) ;
            }
        ) ;

        readerStream.on
        (
            'error' , 
            function ( err )
            {
                console.log ( err.stack ) ;
            }
        ) ;
    }
) ;

// let cmdstr = 'xcopy E:\SERVER_CODES\DIVI_WORKING\TEST\cs_trade_a03_g_02  E:\SERVER_CODES\DIVI_WORKING\TEST\cs_trade_a03_g_02_gpack /s' ;
let cmdstr = 'xcopy e:\d1 e:\d2 /s' ;
// let cmdstr = 'echo  1111' ;
let flag = fs.existsSync
(
    "E:\\SERVER_CODES\\DIVI_WORKING\\TEST\\cs_trade_a03_g_02_gpack" 
) ; 
  
console.log ( "cs_trade_a03_g_02 flag:" , flag ) ;
if ( !flag )
{
    fs.writeFileSync
    (
        'xcopy.cmd' , 
        cmdstr 
    ) ;
     
    var child_process = require( 'child_process' ) ;
    console.log ( "process.cwd ():" ,  process.cwd () ) ;
    let ef = child_process.execFile
    (
        process.cwd () + '/xcopy.bat' ,
        { cwd : process.cwd () } ,
        function ( error , stdout , stderr ) 
        {
            console.log ( "stdout:", stdout ) ;
            if ( error !== null ) 
            {
                console.log ( 'exec error: ' + error ) ;
            }
        }
    ) ;
    console.log ( "ef:" , ef ) ;
       
} ;
 


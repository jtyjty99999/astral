
/*序列执行器,可以处理这种场景:
一个异步的api(返回时间不确定),传入一个参数数组,要求按照参数数组的顺序返回结果
此处理方法规避了所谓异步问题,只负责“视觉效果”的显示,即后面虽然是异步执行的,但是返回的结果是有序的
适合这一类请求:
asyncExec(i,function(res){


})
*/

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var asyncEach = function (fn, arr) {
	var l = arr.length,
	i = -1;
    var run = function() {
        i += 1;
        if (i === l) return;
        fn(arr[i], run);
    };
    run();
}
asyncEach(function (key,callback) {
xss_rpc_call(key, function (result) {
  hello.innerHTML+=result+'   '
	callback();
})
}, arr)


/*


    var total = 30,responses = [],displayed = [],i=0;
 
    for (i; i < total; i++) {
        (function (i) {
            var now = Date.now();
            xss_rpc_call2(i, function (res) {
 
                responses[i] = {
                    res: res,
                    sent: now
                };
 
               //当这是第一条记录，或符合第一个原则，之前的一个请求已经显示时，显示
                if (i == 0 || displayed[i-1]) {
                    _display(i);
                }
            })
        })(i)
    }
 
    function _display (i) {
 
         box.innerHTML+=responses[i].res+'\n'
 
         displayed[i] = true;
 
         if (i === total - 1) {
             // 显示完毕
         } else if (responses[i+1]) {
             // 当符合第二个原则，发现下一个请求已经来了，显示
             _display(i+1);
         }
     }
	 
*/	 
	 
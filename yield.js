
var yield = (function(){

    function run(fn){
        var inst = env; 
        inst.init(fn); 
        return inst.iterate(function(){
            fn.call(inst)
        }); 
    }

    var env = (function(){

        var i = 0; 
        var iterate_fn; 
        var yield_stack; 

        function init(fn){
            i = 0; 
            var _this = this; 
            iterate_fn = function(){
                fn.call(_this); 
            }
            yield_stack = []; 
        }

        function yield(fn){
            if(yield_stack.length > i){
                return yield_stack[i++]; 
            }

            // Call anonymous function
            fn.call(this);

            throw exit(); 
        }

        function iterate(){
            try {
                iterate_fn(); 
            } catch (ex){
                if(ex.type === 'exit'){
                    return; 
                } else {
                    throw ex; 
                }            
            } 
        }

        function resume(value){
            yield_stack[i] = value; 
            i = 0; 
        	iterate();   
        }

        function sleep(t){
            this.yield(
                function(){
                    var _this = this; 
                    setTimeout(function(){
                        _this.resume(''); 
                    }, t); 
                }
            ); 
        }

        function exit(){
            return {
                type: 'exit'
            }
        }

        return {
            init: init,  
        	yield: yield, 
            sleep: sleep, 
            iterate: iterate, 
        	resume: resume
        };
    })(); 

    return {
        run: run
    };

})(); 
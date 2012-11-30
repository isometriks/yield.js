
var yield = function(fn){
    var inst = new yieldEnv(fn); 
    inst.run(); 
}

var yieldEnv = function(fn){
    this.i = 0; 
    this.fn = fn; 
    this.yield_stack = [];    
}

yieldEnv.prototype.yield = function(fn){
    if(this.yield_stack.length > this.i){
        return this.yield_stack[this.i++]; 
    }

    // Call anonymous function
    fn.call(this);

    throw {type:'exit'}; 
}

yieldEnv.prototype.run = function(){
    try {
        this.fn(); 
    } catch (ex){
        if(ex.type === 'exit'){
            return; 
        } else {
            throw ex; 
        }            
    } 
}

yieldEnv.prototype.resume = function(value){
    this.yield_stack[this.i] = value; 
    this.i = 0; 
    this.run();   
}

yieldEnv.prototype.sleep = function(t){
    this.yield(
        function(){
            var _this = this; 
            setTimeout(function(){
                _this.resume(''); 
            }, t); 
        }
    ); 
}

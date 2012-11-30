yield.js
========

Ease asynchronous javascript

Example Usage:
--------

    function async(){
    
        // Use Timeouts
        var json_file = this.yield(function(){
            var _this = this; 
            
            setTimeout(function(){
                _this.resume('test.json'); 
            }, 1000); 
        }); 
        
        // Use jQuery
        var json = this.yield(function(){
            $.getJSON(json_file, null, this.resume); 
        }); 
        
        // Sleep for 2 seconds
        this.sleep(2000); 
        
        // Call immediately
        var final_value = this.yield(function(){
            json.foo = 'bar'; 
            this.resume(json); 
        }); 
        
        console.log('End Value:', final_value); 
    }

    // Run the function
    yield.run(async); 
    
How does it work?
--------

Basically, it runs through the function multiple times. Each time it runs through, it will wait for the value of the next function. It throws an exception after that function is initalized to stop the inital execution. It then waits for the return value, and then runs the function again. 

If it already has a value for the current yield, then it is simply returned from the stack and the next yield will run. 


Issues
--------
You should really try to avoid any code in between yield statements, especially things like counters. It is ok to change the return values of the previous yields, but just know that the code will run multiple times:

    this.yield(...); 
    console.log('hello world'); 
    this.yield(...); 
    
This example would print "hello world" twice. 

Why is this useful?
---------
I'm not entirely sure if it is useful or not yet, I just had the idea. 
    
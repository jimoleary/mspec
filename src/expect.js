if ( ( typeof  $Expect ) == "undefined"  || (( typeof  $reload ) != "undefined" && $reload == true)){
    Expect = function(pattern){
        if ( !(this instanceof Expect) ) 
            return new Expect(pattern);      
    }
    $Expect = new Expect();
    Matcher = function(s){
        if ( !(this instanceof Matcher) ) 
            return new Matcher(s);      
        this._expected = s; 
        this.negate = false;
    }
    Matcher.prototype.not = function(){
        this.negate = !this.negate;
        return this;
    }
    Matcher.prototype.toEqual = function(actual){
        var equals = function(expected,actual){
            return (expected == actual);
        }

        var expected = equals(this._expected,actual);
        if(!this.negate && !expected)
            throw this._expected + " is not equal to " + actual;
        if(this.negate && expected)
            throw this._expected + " is equal to " + actual;
        return;
    }

    Matcher.prototype.toBe = function(actual){
        var equals = function(expected,actual){
            return (expected === actual);
        }

        var expected = equals(this._expected,actual);
        if(!this.negate && !expected)
            throw this._expected + " is not " + actual;
        if(this.negate && expected)
            throw this._expected + " is " + actual;
        return;
    }
    Matcher.prototype.toMatch = function(actual){
        var equals = function(expected,actual){
            return (new RegExp(actual).test(expected));
        }
        
        var expected = equals(this._expected,actual);
        if(!this.negate && !expected)
            throw this._expected + " does match " + actual;
        if(this.negate && expected)
            throw this._expected + " matches " + actual;
        return;
    }
    Matcher.prototype.toBeDefined = function(){
        var equals = function(expected){
            return ((typeof expected) !== "undefined");
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is undefined";
        if(this.negate && expected)
            throw this._expected + " is defined";
        return;
    }
    Matcher.prototype.toBeUndefined = function(){
        var equals = function(expected){
            return ((typeof expected) === "undefined");
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is defined";
        if(this.negate && expected)
            throw this._expected + " is undefined";
        return;
    }
    
    Matcher.prototype.toBeNull = function(){
        var equals = function(expected){
            return (expected === null);
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is not null";
        if(this.negate && expected)
            throw this._expected + " is null";
        return;
    }
    
    Matcher.prototype.toBeTruthy = function(){
        var equals = function(expected){
            return !!!expected;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is not true";
        if(this.negate && expected)
            throw this._expected + " is true";
        return;
    }
    
    Matcher.prototype.toBeFalsey = function(){
        var equals = function(expected){
            return !!expected;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is not false";
        if(this.negate && expected)
            throw this._expected + " is false";
        return;
    }
    
    Matcher.prototype.toContain = function(actual){
        var equals = function(expected,actual){
            if (Array.isArray(expected)) {
                var e = true;
                for (var i = 0; e && i < expected.length; i++) {
                    e = (expected[i] == actual);
                }
                return !e
            }
            return expected.indexOf(actual) >= 0;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " does not conatain " + actual;
        if(this.negate && expected)
            throw this._expected + " contains " + actual;
        return;
    }
    
    Matcher.prototype.toBeLessThan = function(actual){
        var equals = function(expected,actual){
            return this._expected < actual;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is not less than " + actual;
        if(this.negate && expected)
            throw this._expected + " is less than " + actual;
        return;
    }
    
    Matcher.prototype.toBeGreaterThan = function(actual){
        var equals = function(expected,actual){
            return this._expected > actual;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " is not greater than " + actual;
        if(this.negate && expected)
            throw this._expected + " is greater than " + actual;
        return;
    }
    
    Matcher.prototype.toThrow = function(actual){
        var equals = function(expected,actual){
            try {
                expected();
            }catch(e){
                if (arguments.length == 0) {
                    return true;
                }
                
                if (e != actual){
                    return true;
                }
            }
            return false;
        }
        
        var expected = equals(this._expected);
        if(!this.negate && !expected)
            throw this._expected + " did not throw " + actual;
        if(this.negate && expected)
            throw this._expected + " threw " + actual;
        return;
    }

    Expect.prototype.expect = function(expected){        
        return new Matcher(expected)
    }
    Expect.prototype.toBe = function(o){
        return {subject:s}
    }
    var expect= $Expect.expect.bind($Expect)
}

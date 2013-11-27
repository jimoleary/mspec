try {
    load("./expect.js");
} catch(e) {
}

if ( ( typeof  $Spec ) == "undefined"  || $reload == true){
    Spec = function(){
        if ( !(this instanceof Spec) ) 
            return new Spec(pattern);      
        this._debug = false;
    }
    var _id = 0;
    GlobalSpec = function(){
        if ( !(this instanceof GlobalSpec) ) 
            return new GlobalSpec();      
        this._id = ++_id;
    }
    $spec = new GlobalSpec();
    GlobalSpec.prototype.suite = function(){
        return this._suite;
    }
    GlobalSpec.prototype.describe = function(name,func){
        this._suite = {describe : {context: this._id, name:name, specs:[], afterAll: this.noop, beforeAll: this.noop}}
        func.call(this)
        return run
    }
    var describe= $spec.describe.bind($spec)
    GlobalSpec.prototype.noop = function(p){ /*print(p); printjson(this);*/}
    GlobalSpec.prototype.it = function(name,func,pending){
        this._suite.describe.specs.push({type: "it" , 
                                         pending:pending, 
                                         name : name, 
                                         func : func.bind(this),
                                        })
        return run;
    }
    GlobalSpec.prototype.pending = function(name, func){
        var pfunc = function(){ 
            try {
                func.call(this)
            }catch(e){
                return;
            }
            throw "pending"
        };
        //this._suite.describe.specs.push({type: "it" , pending: true, name : name, func : func})
        this.it(name, pfunc, true);
    }
    
    GlobalSpec.prototype.beforeAll = function(func){
        this.suite().beforeAll = func.bind(this);
    }
    GlobalSpec.prototype.afterAll = function(func){
        this.suite().afterAll = func.bind(this);
    }
    GlobalSpec.prototype.beforeEach = function(func){
        this.suite().before = func.bind(this);
    }
    GlobalSpec.prototype.afterEach = function(func){
        this.suite().after = func.bind(this);
    }
    GlobalSpec.prototype.print = function(){
        this._memo.messages.push(arguments);
    }
    GlobalSpec.prototype.run = function(){
        p = this.p = print;
        var verbose = false;
        var args;
        if(arguments.length && (typeof arguments[arguments.length-1]) == "boolean"){
            verbose = arguments[arguments.length-1];
            args = Array.prototype.slice.call(arguments,0,arguments.length-1);
        } else {
            args = Array.prototype.slice.call(arguments);
        }
        if(!args.length) {
            args = [".*"];
        }
        patterns = args.map(function (pattern){
            if((typeof pattern) === "string"){
                pattern = new RegExp(pattern);
            } 
            return pattern;
        })
        var all = function(a,m){
            return a.some(function(p){return p.test(m);})
        }
        var suite = this._suite;
        suite.beforeAll("beforeAll",suite.describe.name,suite);

        this._suite.describe.specs.forEach(function(spec){
            //print("starting " + spec.name)

            if(!all(patterns,spec.name)){
                print("-");
                return;
            }
            if(verbose) {
                p(spec.name)
            }
            suite.before("before",spec);
            var t = Date.timeFunc(function(){
                try {
                    spec.func();
                } catch(e){
                    print(e);
                    p("E")
                    return 
                }
                p(".");
            })
            p("took=" + t);
            suite.after("after", suite.describe.name, suite);

        });
        suite.afterAll("afterAll",suite.describe.name,suite);
    }

    var run= $spec.run.bind($spec)
    var beforeAll= $spec.beforeAll.bind($spec)
    var afterAll= $spec.afterAll.bind($spec)
    var beforeEach= $spec.beforeEach.bind($spec)
    var afterEach= $spec.afterEach.bind($spec)
    var it= $spec.it.bind($spec)
    var pending= $spec.pending.bind($spec)
}

mspec
=====

Simple BDD based runner (will matchers "borrowed" from jasmine)


## sample suite 

   /**
    * test suite
    */
   describe("simple suite" , function(){
       // before/after once only
       beforeAll(function(){ 
          // do something once before all tests
       });
       afterAll(function(){ 
          // do something once after all tests
       });
   
       // before/after each test
       beforeEach(function(){ 
          // do something before all tests
       });
       afterEach(function(){ 
          // do something after all tests
       });

       it("should compare a number",function(){
           expect(0).toBe(0);
       });
   
       it("should not compare a number",function(){
           expect(0).not().toBe(1);
       });

       it("should fail",function(){
           expect(0).toBe(1);
       });

       pending("should eventually be working",function(){
           callFailing();
       });
   
   })() // <-- this runs it , you can also pass in patterns like /compare a number/

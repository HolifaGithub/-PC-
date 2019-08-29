const PENDING='PENDING';
const FULFILLED='FULFILLED';
const REJECETED='REJECTED'
class MyPromise{
    constructor(executor){
       this.value=undefined;
       this.reason=undefined;
       this.status=PENDING;
       let resolve=value=>{
           if(this.status===PENDING){
           this.value=value;
           this.status=FULFILLED;
           }
       };
       let reject=reason=>{
           if(this.status===PENDING){
           this.reason=reason;
           this.status=REJECETED;
           }
       }
       try{
            executor(resolve,reject);}
       catch(err){
          console.log(this.status)
        //   if(this.status===FULFILLED)  return;
          throw new Error(err);
       }
    }
    then(onFulfilled,onRejected){
      if(this.status===FULFILLED){
          onFulfilled(this.value);
      }
      if(this.status===REJECETED){
          onRejected(this.reason);
      }
    }
}

let promise=new MyPromise(function(resolve,reject){
    resolve("hhha");
    throw new Error("shibaile");
})
promise.then(function(data){
    console.log('success:'+data); 
},function(err){
    console.log('error:'+err);
})
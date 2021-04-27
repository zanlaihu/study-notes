function recursiveMax(input){
    var flag = false;
    var num = [];
    for(var i=0;i<input.length;i++){
        var obj=input[i];
        if(obj instanceof Array){
            flag = true;
            num.push(recursiveMax(obj));   
        }
    }
    if(flag){
       return Math.max.apply(null,num) + 1 ;
    } else {
       return 0;
    }
   
}
var res = recursiveMax([]);
console.log(res) // 4

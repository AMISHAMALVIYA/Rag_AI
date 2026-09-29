const say=require("say");


function speak(text){


return new Promise((resolve,reject)=>{


say.speak(
text,
null,
1,
err=>{

if(err) reject(err);

else resolve();

});


});


}


module.exports=speak;
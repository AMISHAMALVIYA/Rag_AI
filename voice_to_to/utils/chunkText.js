function chunkText(text){


const words=text
.replace(/\s+/g," ")
.split(" ");


let chunks=[];


for(let i=0;i<words.length;i+=500){


chunks.push(
words.slice(i,i+500).join(" ")
);


}


return chunks;

}


module.exports=chunkText;
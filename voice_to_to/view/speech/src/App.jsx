import {useState} from "react";
import axios from "axios";
import {
  UploadCloud,
  Mic,
  Send
} from "lucide-react";


function App(){


const [pdf,setPdf]=useState(null);
const [audio,setAudio]=useState(null);

const [msg,setMsg]=useState("");
const [answer,setAnswer]=useState("");

const [recording,setRecording]=useState(false);



async function uploadPDF(){


if(!pdf)
return alert("Select PDF");


const formData=new FormData();

formData.append(
"pdf",
pdf
);



const res =
await axios.post(
"http://localhost:5008/api/upload",
formData
);


setMsg(
res.data.message
);


}




function recordVoice(){


navigator.mediaDevices
.getUserMedia({
audio:true
})
.then(stream=>{


const recorder =
new MediaRecorder(stream);


let chunks=[];


recorder.ondataavailable=e=>{

chunks.push(e.data)

};



recorder.onstop=()=>{


const blob =
new Blob(
chunks,
{
type:"audio/webm"
}
);


setAudio(blob);


}



recorder.start();


setRecording(true);



setTimeout(()=>{


recorder.stop();

setRecording(false);


},5000);



});


}




async function askAI(){


if(!audio)
return alert("Record voice first");


const formData =
new FormData();


formData.append(
"audio",
audio,
"voice.webm"
);



const res =
await axios.post(

"http://localhost:5008/api/ask",

formData

);



setAnswer(
res.data.answer
);


}



return (


<div className="
min-h-screen
bg-slate-950
text-white
flex
items-center
justify-center
p-6
">


<div className="
w-full
max-w-4xl
bg-slate-900
rounded-3xl
shadow-2xl
p-8
border
border-slate-800
">


<h1 className="
text-4xl
font-bold
text-center
mb-8
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
">

AI Teacher Assistant

</h1>




<div className="
grid
md:grid-cols-2
gap-8
">



{/* PDF UPLOAD */}


<div className="
bg-slate-800
rounded-2xl
p-6
">


<div className="
flex
items-center
gap-3
mb-5
">


<UploadCloud
className="text-blue-400"
/>


<h2 className="text-xl font-semibold">

Teacher PDF

</h2>


</div>



<input

type="file"

accept="application/pdf"

onChange={
e=>setPdf(
e.target.files[0]
)
}

className="
w-full
bg-slate-700
p-3
rounded-xl
"

/>



<button

onClick={uploadPDF}

className="
mt-5
w-full
bg-blue-600
hover:bg-blue-700
py-3
rounded-xl
font-bold
flex
justify-center
gap-2
"

>

<UploadCloud size={20}/>

Upload PDF

</button>



<p className="
text-green-400
mt-4
">

{msg}

</p>


</div>





{/* VOICE ASK */}


<div className="
bg-slate-800
rounded-2xl
p-6
">


<div className="
flex
items-center
gap-3
mb-5
">


<Mic
className="text-red-400"
/>


<h2 className="text-xl font-semibold">

Student Question

</h2>


</div>




<button

onClick={recordVoice}

className={`
w-full
py-3
rounded-xl
font-bold
flex
justify-center
gap-2

${
recording
?
"bg-red-800 animate-pulse"
:
"bg-red-600 hover:bg-red-700"
}

`}

>


<Mic size={20}/>


{
recording
?
"Recording..."
:
"Record Voice 5s"
}


</button>





<button

onClick={askAI}

className="
mt-4
w-full
bg-green-600
hover:bg-green-700
py-3
rounded-xl
font-bold
flex
justify-center
gap-2
"

>


<Send size={20}/>

Ask AI


</button>



</div>



</div>





{/* ANSWER */}



<div className="
mt-8
bg-slate-800
rounded-2xl
p-6
">


<h2 className="
text-xl
font-bold
mb-3
">

AI Answer

</h2>



<div className="
bg-slate-700
rounded-xl
p-5
min-h-[120px]
text-gray-200
">

{

answer ||

"AI response will appear here..."

}

</div>


</div>



</div>


</div>


)

}


export default App;
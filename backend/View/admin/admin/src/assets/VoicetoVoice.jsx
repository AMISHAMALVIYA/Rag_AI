// import { useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [url, setUrl] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const [loadingVideo, setLoadingVideo] = useState(false);
//   const [loadingAnswer, setLoadingAnswer] = useState(false);

//   const processVideo = async () => {
//     if (!url.trim()) {
//       alert("Please enter a YouTube URL");
//       return;
//     }

//     try {
//       setLoadingVideo(true);

//       const { data } = await axios.post(
//         "http://localhost:3008/api/videos",
//         {
//           url,
//         }
//       );

//       setVideoId(data.videoId);

//       alert(data.message);
//     } catch (err) {
//       alert(err.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoadingVideo(false);
//     }
//   };

//   const askQuestion = async () => {
//     if (!question.trim()) {
//       alert("Enter your question");
//       return;
//     }

//     try {
//       setLoadingAnswer(true);

//       const { data } = await axios.post(
//         "http://localhost:3008/api/ask",
//         {
//           question,
//           videoId,
//         }
//       );

//       setAnswer(data.answer);
//     } catch (err) {
//       alert(err.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoadingAnswer(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
//       <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-xl p-8">

//         <h1 className="text-4xl font-bold text-center text-white">
//           🎥 YouTube AI Assistant
//         </h1>

//         <p className="text-center text-slate-400 mt-2">
//           Process a YouTube video and ask questions about its transcript.
//         </p>

//         {/* Video URL */}

//         <div className="mt-10">
//           <label className="text-white font-semibold">
//             YouTube URL
//           </label>

//           <input
//             type="text"
//             placeholder="https://youtube.com/watch?v=..."
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-500"
//           />

//           <button
//             onClick={processVideo}
//             disabled={loadingVideo}
//             className="mt-5 w-full bg-red-300 hover:bg-red-700 rounded-lg py-3 font-semibold transition"
//           >
//             {loadingVideo ? "Processing..." : "Process Video"}
//           </button>
//         </div>

//         {/* Question */}

//         <div className="mt-10">
//           <label className="text-white font-semibold">
//             Ask Question
//           </label>

//           <textarea
//             rows={5}
//             placeholder="Ask anything about this video..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             onClick={askQuestion}
//             disabled={loadingAnswer}
//             className="mt-5 w-full bg-green-400 hover:bg-blue-700 rounded-lg py-3 font-semibold transition"
//           >
//             {loadingAnswer ? "Generating Answer..." : "Ask AI"}
//           </button>
//         </div>

//         {/* Answer */}

//         {answer && (
//           <div className="mt-10 rounded-xl bg-slate-800 border border-slate-700 p-6">
//             <h2 className="text-xl font-bold text-green-400 mb-4">
//               AI Answer
//             </h2>

//             <p className="text-slate-300 whitespace-pre-wrap leading-7">
//               {answer}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














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
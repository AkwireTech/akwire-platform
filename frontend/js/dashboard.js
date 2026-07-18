
document.addEventListener("DOMContentLoaded", async () => {
const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user")||"null");

if(!token||!user){
 location.href="login.html";
 return;
}

const auth={Authorization:"Bearer "+token};

const set=(id,val)=>{
 const el=document.getElementById(id);
 if(el) el.textContent=val;
};

try{
 const [progressRes,labRes,examRes,certRes,recRes]=await Promise.all([
   fetch("https://akwire-api.onrender.com/api/progress/status",{headers:auth}),
   fetch(`https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${user._id}`),
   fetch("https://akwire-api.onrender.com/api/exam/history",{headers:auth}),
   fetch("https://akwire-api.onrender.com/api/progress/certificates",{headers:auth}),
   fetch("https://akwire-api.onrender.com/api/exam/recommendations",{headers:auth})
 ]);

 const progress=await progressRes.json();
 const labs=await labRes.json();
 const exams=await examRes.json();
 const certs=await certRes.json();
 const recs=await recRes.json();

 set("academyCompleted",progress.coursesCompleted||0);
 set("certificatesEarned",progress.certificatesEarned||certs.length||0);
 set("totalLabs",labs.totalLabs||0);
 set("completedLabs",labs.completedLabs||0);
 set("avgScore",Math.round(labs.avgScore||0));
 set("progress",Math.round(labs.progress||0)+"%");

 set("practiceAttempts",(exams.practiceAttempts||[]).length);
 set("moduleAttempts",(exams.moduleAttempts||[]).length);

 if(exams.latestFinal){
   set("finalScore",exams.latestFinal.score+"%");
 }else{
   set("finalScore","Not Taken");
 }

 const readiness=Math.round(
   exams.attempts?.length
   ? exams.attempts.reduce((a,b)=>a+(b.score||0),0)/exams.attempts.length
   :0
 );

 set("readiness-score",readiness+"%");

 const bar=document.getElementById("readiness-bar");
 if(bar) bar.style.width=readiness+"%";

 const recContainer=document.getElementById("recommendationsContainer");
 if(recContainer){
   recContainer.innerHTML="";
   (recs.recommendations||[]).forEach(r=>{
      const div=document.createElement("div");
      div.className="recommendation-card";
      div.innerHTML=`<h4>${r.domain}</h4><p>${r.message}</p>`;
      recContainer.appendChild(div);
   });
 }

 const ctx=document.getElementById("progressChart");
 if(ctx && exams.attempts){
   new Chart(ctx,{
      type:"line",
      data:{
         labels:exams.attempts.map((_,i)=>`Attempt ${i+1}`),
         datasets:[{
            label:"Exam Score",
            data:exams.attempts.map(x=>x.score||0),
            fill:true,
            tension:.35
         }]
      },
      options:{responsive:true,scales:{y:{beginAtZero:true,max:100}}}
   });
 }

}catch(err){
 console.error("Dashboard V2:",err);
}
});

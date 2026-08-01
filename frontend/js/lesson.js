/* ==========================================
   LESSON VIEWER
========================================== */

// ==========================================
// GET URL PARAMS
// ==========================================

let aiCourse = null;
let aiModule = null;
let aiLesson = null;

const params =
    new URLSearchParams(
        window.location.search
    );

const courseId =
    params.get("course");

const moduleIndex =
    params.get("module");

const quizBtn =
    document.getElementById(
        "quizBtn"
    );

if (quizBtn) {
    const quizNumber = Number(moduleIndex) + 1;

    quizBtn.href =
        `module-quiz.html?course=${courseId}&module=${quizNumber}`;

    quizBtn.textContent =
        `Take Quiz ${quizNumber} →`;
}

const lessonIndex =
    params.get("lesson");

// ==========================================
// LOAD LESSON
// ==========================================

async function loadLesson() {

    try {

        const response =
            await fetch(

                `https://akwire-api.onrender.com/api/courses/${courseId}`

            );

        const course =
            await response.json();

        console.log(
            "Lesson Course:",
            course
        );

        const module =
            course.modules[moduleIndex];

        const lesson =
            module.lessons[lessonIndex];
            console.log("Lesson object:");
            console.log(JSON.stringify(lesson, null, 2));
            console.log("Course ID:", courseId);

            aiCourse = course;
            aiModule = module;
            aiLesson = lesson;


        const totalLessons =
            module.lessons.length;

        const currentLesson =
            Number(lessonIndex) + 1;

        const percent =

            Math.round(

                (currentLesson / totalLessons) * 100

            );

        document.getElementById(
            "lessonPosition"
        ).textContent =

            `Lesson ${currentLesson} of ${totalLessons}`;

        document.getElementById(
            "lessonPercent"
        ).textContent =

            `${percent}%`;

        document.getElementById(
            "lessonProgressFill"
        ).style.width =

            `${percent}%`;

        // ==========================
        // TITLE
        // ==========================

        document.getElementById(
            "lessonTitle"
        ).textContent =
            lesson.title;

        // ==========================
        // DESCRIPTION
        // ==========================

        document.getElementById(
            "lessonDescription"
        ).textContent =

            module.title;

        // ==========================
        // CONTENT
        // ==========================
    
        let html = "";

        // Overview
        if (lesson.overview) {

            html += `
                <div class="lesson-content-card">

                    <h2>

                        <i class="fas fa-circle-info"></i>

                        Overview

                    </h2>

                    <p>
                        ${lesson.overview}
                    </p>

                </div>
            `;

        }

        // Learning Objectives
        if (
            lesson.objectives &&
            lesson.objectives.length
        ) {

            html += `
                <div class="lesson-content-card">

                    <h2>

                        <i class="fas fa-bullseye"></i>

                        Learning Objectives

                    </h2>

                    <ul>
                        ${lesson.objectives
                            .map(
                                objective =>
                                    `<li>${objective}</li>`
                            )
                            .join("")}
                    </ul>

                </div>
            `;

        }

        // Main Lesson Content

        html += `
            <div class="lesson-content-card">

                <h2>

                    <i class="fas fa-book-open"></i>

                    Lesson

                </h2>

                ${formatLessonContent(marked.parse(lesson.content))}

            </div>
        `;


       // Key Terms
        if (lesson.keyTerms && lesson.keyTerms.length) {

            html += `
                <div class="lesson-content-card">

                    <h2>

                        <i class="fas fa-key"></i>

                        Key Terms

                    </h2>

                    <ul>
                        ${lesson.keyTerms
                            .map(
                                item => `
                                    <li>
                                        <strong>${item.term}</strong>
                                        ${item.definition ? ` - ${item.definition}` : ""}
                                    </li>
                                `
                            )
                            .join("")}
                    </ul>

                </div>
            `;

        }


        // Summary

        if (lesson.summary) {

            html += `
                <div class="lesson-content-card">

                    <h2>

                        <i class="fas fa-list-check"></i>

                        Lesson Summary

                    </h2>

                    <p>
                        ${lesson.summary}
                    </p>

                </div>
            `;

        }

        // ======================================
        // KNOWLEDGE CHECK
        // ======================================

        if (
            lesson.knowledgeCheck &&
            lesson.knowledgeCheck.length
        ) {

            html += `

                <div class="lesson-content-card">

                    <h2>

                        <i class="fas fa-circle-question"></i>

                        Knowledge Check

                    </h2>
            `;

            lesson.knowledgeCheck.forEach(

                (question, index) => {

                    html += `

                        <div class="knowledge-question">

                            <p>

                                <strong>

                                    ${index + 1}. ${question.question}

                                </strong>

                            </p>

                    `;

                    question.options.forEach(

                        option => {

                            html += `

                                <label
                                    class="knowledge-option"
                                >

                                    <input
                                        type="radio"
                                        name="question${index}"
                                    >

                                    ${option}

                                </label>

                                <br>

                            `;

                        }

                    );

                    html += `

                        </div>

                        <hr>

                    `;

                }

            );

            html += `

                </div>

            `;

        }

        console.log("Overview:", lesson.overview);
        console.log("Objectives:", lesson.objectives);
        console.log("Summary:", lesson.summary);


document.getElementById("lessonContent").innerHTML = html;


        // ==========================
        // VIDEO
        // ==========================

        if (lesson.videoUrl) {

            document.getElementById(
                "videoSection"
            ).innerHTML = `

                <iframe
                    width="100%"
                    height="500"

                    src="${convertYoutubeUrl(
                        lesson.videoUrl
                    )}"

                    title="Lesson Video"

                    frameborder="0"

                    allowfullscreen
                ></iframe>

            `;

        }

    } catch (error) {

        console.error(
            "Lesson load error:",
            error
        );

        document.getElementById(
            "lessonContent"
        ).innerHTML = `

            <div class="academy-card">

                <h3>
                    Failed to load lesson
                </h3>

            </div>

        `;

    }

}

// ==========================================
// YOUTUBE EMBED CONVERTER
// ==========================================

document.getElementById(
    "completeLessonBtn"
).addEventListener(

    "click",

    async () => {

        const lessonKey =
            `${courseId}-${moduleIndex}-${lessonIndex}`;

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user || !user._id) {
            window.location.href = "login.html";
            return;
        }

        try {

            // ==========================
            // SAVE LESSON PROGRESS
            // ==========================

            await fetch(

                "https://akwire-api.onrender.com/api/progress/lesson",

                {

                    method: "POST",

                    credentials: "include",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        courseId,

                        lessonKey

                    })

                }

            );


   } catch (error) {

        console.error(
            "Progress update failed:",
            error
        );

    }



        alert(
            "Lesson completed!"
        );

            }

        );

// ==========================================
// START
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await loadLesson();

    }

);


document.addEventListener(

    "DOMContentLoaded",

    () => {

        const prevBtn =
            document.getElementById(
                "prevLessonBtn"
            );

        const nextBtn =
            document.getElementById(
                "nextLessonBtn"
            );

        prevBtn.addEventListener(

            "click",

            () => {

                const prev =
                    Number(lessonIndex) - 1;

                if (prev >= 0) {

                    window.location.href =

                        `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${prev}`;

                }

            }

        );

        nextBtn.addEventListener(

            "click",

            () => {

                const next =
                    Number(lessonIndex) + 1;

                window.location.href =

                    `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${next}`;

            }

        );

    }

);

const mentorChat =
    document.getElementById(
        "mentorChat"
    );

const askBtn =
    document.getElementById(
        "askMentorBtn"
    );

const input =
    document.getElementById(
    "aiQuestion"
    );

    input.addEventListener(
    "input",
    () => {

    input.style.height = "auto";

    input.style.height =
    input.scrollHeight + "px";

    }
);

askBtn.addEventListener(

    "click",

    askMentor

);

document
    .getElementById("aiQuestion")
    .addEventListener(

        "keydown",

        e => {

            if (
                e.key === "Enter" &&
                !e.shiftKey
            ) {

                e.preventDefault();

                askMentor();

            }

        }

    );

async function askMentor() {

    const input =
        document.getElementById(
            "aiQuestion"
        );

    const question =
        input.value.trim();

    if (!question)
        return;

    mentorChat.innerHTML += `

    <div class="message-group user">

        <div class="mentor-message user">

            ${question}

        </div>

        <div class="message-time">

            ${new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}

        </div>

    </div>

    `;

    input.value = "";

   mentorChat.innerHTML += `

    <div class="message-group ai" id="typingGroup">

        <div class="mentor-message ai">

            <div class="typing-indicator">

                <span></span>

                <span></span>

                <span></span>

            </div>

        </div>

    </div>

    `;

    mentorChat.scrollTop =
        mentorChat.scrollHeight;

    try {

        const response =
            await fetch(

                "https://akwire-api.onrender.com/api/ai/mentor",

                {

                    method: "POST",

                    credentials: "include",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        mode: "lesson",

                        course: aiCourse.title,

                        module: aiModule.title,

                        lesson: aiLesson.title,

                        progress: document.getElementById(
                            "lessonPercent"
                        ).textContent,

                        message: question

                    })

                }

            );

        const data =
            await response.json();

        document
            .getElementById("typingGroup")
            ?.remove();


        mentorChat.innerHTML += `

        <div class="mentor-message ai">

        ${marked.parse(data.answer)}

        </div>

        <div class="message-time">

        ${new Date().toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
        })}

        </div>

        `;


        mentorChat.scrollTop =
            mentorChat.scrollHeight;

    }

    catch {

        document
            .getElementById("typingGroup")
            ?.remove();

        mentorChat.innerHTML += `

            <div class="mentor-message ai">

                Sorry, I couldn't connect.

            </div>

        `;

    }

}

// ==========================================
// FORMAT LESSON CONTENT
// ==========================================

function formatLessonContent(content = "") {

    return content

        .replace(
            /\[NOTE\]([\s\S]*?)\[\/NOTE\]/gi,
            `
            <div class="lesson-callout lesson-note">

                <i class="fas fa-circle-info"></i>

                <div>

                    <h4>Note</h4>

                    <p>$1</p>

                </div>

            </div>
            `
        )

        .replace(
            /\[TIP\]([\s\S]*?)\[\/TIP\]/gi,
            `
            <div class="lesson-callout lesson-tip">

                <i class="fas fa-lightbulb"></i>

                <div>

                    <h4>Tip</h4>

                    <p>$1</p>

                </div>

            </div>
            `
        )

        .replace(
            /\[WARNING\]([\s\S]*?)\[\/WARNING\]/gi,
            `
            <div class="lesson-callout lesson-warning">

                <i class="fas fa-triangle-exclamation"></i>

                <div>

                    <h4>Warning</h4>

                    <p>$1</p>

                </div>

            </div>
            `
        )

        .replace(
            /\[IMPORTANT\]([\s\S]*?)\[\/IMPORTANT\]/gi,
            `
            <div class="lesson-callout lesson-important">

                <i class="fas fa-shield-halved"></i>

                <div>

                    <h4>Important</h4>

                    <p>$1</p>

                </div>

            </div>
            `
        )

        .replace(

            /\[CODE(?:\s+language=(?:&quot;|")(.+?)(?:&quot;|"))?\]([\s\S]*?)\[\/CODE\]/gi,

            (match, language, code) => `

                <div class="lesson-code">

                    <div class="lesson-code-header">

                        <div class="lesson-code-title">

                            <i class="fas fa-terminal"></i>

                            ${language || "Terminal"}

                        </div>

                        <button
                            class="copy-code-btn"
                            onclick="copyLessonCode(this)">

                            Copy

                        </button>

                    </div>

                    <pre><code>${escapeHtml(code.trim())}</code></pre>

                </div>

            `

        )


        .replace(

            /\[IMAGE\s+src="(.*?)"\s+caption="(.*?)"\]/gi,

            `
                <figure class="lesson-image">

                    <img
                        src="$1"
                        alt="$2"
                        loading="lazy"
                    >

                    <figcaption>

                        $2

                    </figcaption>

                </figure>

            `

        )

        .replace(

            /(?:<p>\s*)?\[NETWORK_FLOW\](?:\s*<\/p>)?/gi,

            `

            <div class="network-flow">

                <div class="network-flow-step">
                    <i class="fas fa-window-maximize"></i>
                    <span>Application</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step">
                    <i class="fas fa-laptop"></i>
                    <span>Source Device</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step">
                    <i class="fas fa-network-wired"></i>
                    <span>Local Network</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step">
                    <i class="fas fa-route"></i>
                    <span>Router</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step">
                    <i class="fas fa-globe"></i>
                    <span>Other Networks</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step">
                    <i class="fas fa-server"></i>
                    <span>Destination</span>
                </div>

                <i class="fas fa-arrow-right network-flow-arrow"></i>

                <div class="network-flow-step network-flow-response">
                    <i class="fas fa-check-circle"></i>
                    <span>Response</span>
                </div>

            </div>

            `

        )


        .replace(

            /\[ANIMATION\s+title=(?:&quot;|")(.+?)(?:&quot;|")\]/gi,

            (match, title) => renderAnimation(title.trim())

        )

}


// ==========================================
// COPY CODE
// ==========================================

function copyLessonCode(button){

    const code = button
        .closest(".lesson-code")
        .querySelector("code")
        .innerText;

    navigator.clipboard.writeText(code);

    const original = button.textContent;

    button.textContent = "Copied!";

    setTimeout(()=>{

        button.textContent = original;

    },1500);

}

// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(text=""){

    return String(text)

        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}

// ==========================================
// TCP THREE-WAY HANDSHAKE
// ==========================================

function createTCPAnimation(){

    return `

    <div class="tcp-animation">

        <div class="tcp-row">

            <div class="tcp-node">

                Client

            </div>

            <div class="tcp-packet">

                <div
                    id="tcpDot"
                    class="tcp-dot">

                </div>

            </div>

            <div class="tcp-node">

                Server

            </div>

        </div>

        <div
            id="tcpStatus"
            class="tcp-status">

            Click Start Animation

        </div>

        <div class="tcp-controls">

            <button
                class="academy-btn"
                onclick="playTCPHandshake()">

                Start

            </button>

            <button
                class="academy-btn"
                onclick="resetTCPHandshake()">

                Reset

            </button>

        </div>

    </div>

    `;

}

async function playTCPHandshake(){

    const dot=document.getElementById("tcpDot");

    const status=document.getElementById("tcpStatus");

    dot.style.left="0%";

    status.innerHTML="① Client sends SYN";

    await sleep(1000);

    dot.style.left="95%";

    await sleep(1000);

    status.innerHTML="② Server replies SYN-ACK";

    dot.style.left="0%";

    await sleep(1000);

    status.innerHTML="③ Client sends ACK";

    dot.style.left="95%";

    await sleep(1000);

    status.innerHTML="✅ TCP Connection Established";

}

function resetTCPHandshake(){

    document.getElementById("tcpDot").style.left="0%";

    document.getElementById("tcpStatus").innerHTML="Click Start Animation";

}

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}


// ==========================================
// ANIMATION ENGINE
// ==========================================

function renderAnimation(title){

    switch(title){

        case "TCP Three-Way Handshake":

            return createTCPAnimation();

        default:

            return `

            <div class="lesson-animation">

                <div class="lesson-animation-header">

                    <h3>

                        ${title}

                    </h3>

                </div>

                <div class="lesson-animation-body">

                    <h2>

                        Animation Coming Soon

                    </h2>

                </div>

            </div>

            `;


        case "OSI Model":

            return createOSIAnimation();


        case "Packet Encapsulation":

            return createPacketAnimation();


        case "Linux Terminal":

            return createTerminalSimulation();

    }

}


// ==========================================
// OSI EXPLORER
// ==========================================

const osiLayers=[

{
layer:"Layer 7 - Application",
pdu:"Data",
protocols:"HTTP, HTTPS, FTP, SMTP",
description:"Provides network services directly to end-user applications."
},

{
layer:"Layer 6 - Presentation",
pdu:"Data",
protocols:"SSL/TLS, JPEG, ASCII",
description:"Formats, encrypts and compresses data."
},

{
layer:"Layer 5 - Session",
pdu:"Data",
protocols:"NetBIOS, RPC",
description:"Creates, manages and terminates communication sessions."
},

{
layer:"Layer 4 - Transport",
pdu:"Segment",
protocols:"TCP, UDP",
description:"Provides reliable or connectionless delivery."
},

{
layer:"Layer 3 - Network",
pdu:"Packet",
protocols:"IP, ICMP",
description:"Responsible for routing between networks."
},

{
layer:"Layer 2 - Data Link",
pdu:"Frame",
protocols:"Ethernet, PPP",
description:"Transfers frames using MAC addresses."
},

{
layer:"Layer 1 - Physical",
pdu:"Bits",
protocols:"Fiber, Copper",
description:"Transmits electrical, optical and radio signals."
}

];

function createOSIAnimation(){

    return `

<div class="osi-explorer">

    <div class="osi-layers">

        ${osiLayers.map((layer,index)=>`

<button
class="osi-layer ${index===0?"active":""}"
onclick="showOSILayer(${index})">

${layer.layer}

</button>

`).join("")}

    </div>

    <div
id="osiDetails"
class="osi-details">

    </div>

</div>

`;

}

function showOSILayer(index){

    document
        .querySelectorAll(".osi-layer")
        .forEach(btn=>btn.classList.remove("active"));

    document
        .querySelectorAll(".osi-layer")[index]
        .classList.add("active");

    const layer=osiLayers[index];

    document.getElementById("osiDetails").innerHTML=`

<h2>

${layer.layer}

</h2>

<p>

${layer.description}

</p>

<div class="osi-badge">

PDU:
<strong>

${layer.pdu}

</strong>

</div>

<div class="osi-badge">

Protocols:
<strong>

${layer.protocols}

</strong>

</div>

`;

}

document.addEventListener("click",()=>{

if(document.getElementById("osiDetails")){

showOSILayer(0);

}

});


// ==========================================
// PACKET ENCAPSULATION
// ==========================================

const packetLayers=[

{
css:"l7",
name:"Application Layer",
info:"Application data is created."
},

{
css:"l6",
name:"Presentation Layer",
info:"Data is formatted and encrypted."
},

{
css:"l5",
name:"Session Layer",
info:"Communication session begins."
},

{
css:"l4",
name:"Transport Layer",
info:"TCP or UDP header is added."
},

{
css:"l3",
name:"Network Layer",
info:"IP header is added creating a packet."
},

{
css:"l2",
name:"Data Link Layer",
info:"Frame header and trailer are added."
},

{
css:"l1",
name:"Physical Layer",
info:"Bits are transmitted across the medium."
}

];

function createPacketAnimation(){

return`

<div class="packet-stack">

${packetLayers.map((layer,index)=>`

<div
class="packet-layer ${layer.css}"
onclick="showPacketLayer(${index})">

${layer.name}

</div>

`).join("")}

</div>

<div
id="packetInfo"
class="packet-info">

Click a layer to see encapsulation.

</div>

`;

}

function showPacketLayer(index){

document
.querySelectorAll(".packet-layer")
.forEach(card=>card.classList.remove("active"));

document
.querySelectorAll(".packet-layer")[index]
.classList.add("active");

document.getElementById("packetInfo").innerHTML=`

<h2>

${packetLayers[index].name}

</h2>

<p>

${packetLayers[index].info}

</p>

`;

}


// ==========================================
// TERMINAL SIMULATOR
// ==========================================

const terminalSteps=[

{

command:"pwd",

output:"/home/student"

},

{

command:"ls -la",

output:`Documents
Downloads
labs
notes.txt`

},

{

command:"ip addr",

output:`eth0
inet 192.168.1.15/24`

},

{

command:"ping 8.8.8.8",

output:`64 bytes from 8.8.8.8
time=18ms`

}

];

let terminalIndex=0;

function createTerminalSimulation(){

return`

<div class="lesson-terminal">

<div class="lesson-terminal-header">

<div class="lesson-terminal-dot dot-red"></div>

<div class="lesson-terminal-dot dot-yellow"></div>

<div class="lesson-terminal-dot dot-green"></div>

</div>

<div
id="terminalScreen"
class="lesson-terminal-screen">

Click Start Demonstration

</div>

<div class="lesson-terminal-controls">

<button
class="academy-btn"
onclick="playTerminalStep()">

Next Step

</button>

<button
class="academy-btn"
onclick="resetTerminal()">

Reset

</button>

</div>

</div>

`;

}

function playTerminalStep(){

const screen=document.getElementById("terminalScreen");

if(terminalIndex>=terminalSteps.length){

terminalIndex=0;

}

const step=terminalSteps[terminalIndex];

screen.innerHTML+=`

$ ${step.command}

${step.output}

`;

screen.scrollTop=screen.scrollHeight;

terminalIndex++;

}

function resetTerminal(){

terminalIndex=0;

document.getElementById("terminalScreen").innerHTML=

"Click Start Demonstration";

}
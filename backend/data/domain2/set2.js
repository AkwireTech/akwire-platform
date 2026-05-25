const set2 = [

{
question: "Which attack overwhelms a server with traffic?",
options: ["Phishing","DDoS","SQL Injection","XSS"],
answer: "DDoS",
explanation: "A distributed denial of service attack floods systems with traffic.",
domain: "Threats & Vulnerabilities"
},

{
question: "What type of malware encrypts files and demands payment?",
options: ["Spyware","Trojan","Ransomware","Adware"],
answer: "Ransomware",
explanation: "Ransomware encrypts files and demands payment for decryption.",
domain: "Threats & Vulnerabilities"
},

{
question: "An attacker targets executives of a company. This is an example of which social engineering attack?",
options: ["Phishing","Whaling","Vishing","Smishing"],
answer: "Whaling",
explanation: "Whaling specifically targets high-level executives.",
domain: "Threats & Vulnerabilities"
},

{
question:"A security analyst observes that attackers are attempting logins using credentials from previously leaked databases. What type of attack is this?",
options:[
"Password spraying",
"Credential stuffing",
"Brute force",
"Rainbow table attack"
],
answer:"Credential stuffing",
explanation:"Credential stuffing uses stolen username/password combinations from previous breaches.",
domain:"threats"
},

{
question:"An attacker intercepts communication between two parties and alters the data being transmitted without either party knowing. Which attack is this?",
options:[
"Replay attack",
"Man-in-the-middle",
"Session hijacking",
"DNS poisoning"
],
answer:"Man-in-the-middle",
explanation:"MITM attacks intercept and potentially alter communications between two parties.",
domain:"threats"
},

{
question:"A malicious actor modifies DNS records to redirect users to a fake website without their knowledge. What type of attack is this?",
options:[
"Pharming",
"Phishing",
"Spoofing",
"Smishing"
],
answer:"Pharming",
explanation:"Pharming redirects users to malicious sites by manipulating DNS.",
domain:"threats"
},

{
question:"A user receives a text message with a malicious link pretending to be from a bank. What type of attack is this?",
options:[
"Phishing",
"Smishing",
"Vishing",
"Spear phishing"
],
answer:"Smishing",
explanation:"Smishing is phishing conducted via SMS messages.",
domain:"threats"
},

{
question:"An attacker sends a fraudulent email targeting a specific employee with customized information. What type of attack is this?",
options:[
"Whaling",
"Spear phishing",
"Phishing",
"Spam"
],
answer:"Spear phishing",
explanation:"Spear phishing targets specific individuals with tailored messages.",
domain:"threats"
},

{
question:"A program exploits a vulnerability by writing more data to memory than it can handle, causing a crash. What attack is this?",
options:[
"SQL injection",
"Buffer overflow",
"Cross-site scripting",
"Directory traversal"
],
answer:"Buffer overflow",
explanation:"Buffer overflow occurs when memory limits are exceeded.",
domain:"threats"
},

{
question:"An attacker sends repeated requests to a server from multiple systems to overwhelm it. What type of attack is this?",
options:[
"DoS",
"DDoS",
"MITM",
"Phishing"
],
answer:"DDoS",
explanation:"Distributed Denial of Service uses multiple systems to flood a target.",
domain:"threats"
},

{
question:"Which type of malware secretly monitors user activity and collects sensitive information?",

options:[
"Ransomware",
"Spyware",
"Worm",
"Rootkit"
],

answer:"Spyware",

explanation:"Spyware secretly gathers information about users without their knowledge.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker gains unauthorized access to a wireless network by setting up a fake access point that appears legitimate. What attack is this?",

options:[
"Evil twin",
"Replay attack",
"Bluejacking",
"Tailgating"
],

answer:"Evil twin",

explanation:"An evil twin attack uses a fake wireless access point to trick users into connecting.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which attack attempts to trick a user into performing actions on a website where they are already authenticated?",

options:[
"Cross-site scripting",
"Cross-site request forgery",
"SQL injection",
"Directory traversal"
],

answer:"Cross-site request forgery",

explanation:"CSRF attacks exploit authenticated user sessions to perform unintended actions.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker captures network traffic and retransmits it later to gain unauthorized access. What type of attack is this?",

options:[
"Replay attack",
"Session hijacking",
"MITM",
"Phishing"
],

answer:"Replay attack",

explanation:"Replay attacks reuse captured authentication data or communications.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which malware provides attackers with unauthorized remote access to a compromised system?",

options:[
"Remote access Trojan",
"Worm",
"Ransomware",
"Adware"
],

answer:"Remote access Trojan",

explanation:"A RAT allows attackers to remotely control infected systems.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker exploits a web application by inserting malicious database queries into input fields. Which attack is this?",

options:[
"Cross-site scripting",
"SQL injection",
"Buffer overflow",
"Session hijacking"
],

answer:"SQL injection",

explanation:"SQL injection attacks manipulate backend database queries through unsanitized input.",

domain:"Threats & Vulnerabilities"
},

{
question:"A malicious actor sends fraudulent emails to many users hoping some will respond with sensitive information. What attack is this?",

options:[
"Spear phishing",
"Whaling",
"Phishing",
"Smishing"
],

answer:"Phishing",

explanation:"Phishing uses deceptive emails to steal sensitive information from victims.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker exploits a vulnerability before the software vendor releases a patch. What type of exploit is this?",

options:[
"Zero-day",
"Privilege escalation",
"Logic bomb",
"Backdoor"
],

answer:"Zero-day",

explanation:"Zero-day exploits target vulnerabilities before fixes are available.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which attack occurs when an attacker manipulates Address Resolution Protocol tables to redirect network traffic?",

options:[
"ARP spoofing",
"DNS poisoning",
"Session hijacking",
"Smishing"
],

answer:"ARP spoofing",

explanation:"ARP spoofing redirects local network traffic by falsifying ARP messages.",

domain:"Threats & Vulnerabilities"
},

{
question:"A user downloads free software that secretly installs malicious code alongside the legitimate application. What type of malware delivery method is this?",

options:[
"Trojan",
"Logic bomb",
"Backdoor",
"Watering hole"
],

answer:"Trojan",

explanation:"Trojans disguise malicious software as legitimate applications.",

domain:"Threats & Vulnerabilities"
}

];

export default set2;
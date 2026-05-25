const set1 = [

{
question:"Which attack floods servers with traffic?",
options:["DDoS","Phishing","SQL Injection","XSS"],
answer:"DDoS",
explanation:"Distributed denial-of-service overwhelms systems.",
domain:"Threats & Vulnerabilities"
},

{
question:"Which attack steals login credentials through fake emails?",
options:["Phishing","Ransomware","Rootkit","Buffer overflow"],
answer:"Phishing",
explanation:"Phishing tricks users into revealing information.",
domain:"Threats & Vulnerabilities"
},

{
question:"Which malware encrypts files for ransom?",
options:["Ransomware","Spyware","Trojan","Adware"],
answer:"Ransomware",
explanation:"Ransomware encrypts files and demands payment.",
domain:"Threats & Vulnerabilities"
},

{
question:"Which attack injects malicious SQL commands?",
options:["SQL Injection","Phishing","DDoS","ARP spoofing"],
answer:"SQL Injection",
explanation:"SQL injection targets databases.",
domain:"Threats & Vulnerabilities"
},

{
question:"Which attack executes malicious scripts in browsers?",
options:["XSS","DDoS","Phishing","Spoofing"],
answer:"XSS",
explanation:"Cross-site scripting injects scripts into web pages.",
domain:"Threats & Vulnerabilities"
},

{
question:"A security analyst notices multiple login attempts from different IP addresses using the same password against several user accounts. Which attack is MOST likely occurring?",
options:[
"Brute force attack",
"Password spraying",
"Credential stuffing",
"Dictionary attack"
],
answer:"Password spraying",
explanation:"Password spraying uses one password across many accounts to avoid lockouts.",
domain:"Threats & Vulnerabilities"
},

{
question:"An attacker sends an email pretending to be the CEO requesting an urgent wire transfer. What type of attack is this?",
options:[
"Phishing",
"Whaling",
"Vishing",
"Smishing"
],
answer:"Whaling",
explanation:"Whaling targets high-level executives with tailored phishing attacks.",
domain:"Threats & Vulnerabilities"
},

{
question:"A user visits a legitimate website that has been compromised and unknowingly downloads malware. What type of attack is this?",
options:[
"Pharming",
"Watering hole",
"Tailgating",
"Spear phishing"
],
answer:"Watering hole",
explanation:"Watering hole attacks compromise trusted websites to infect targeted users.",
domain:"Threats & Vulnerabilities"
},

{
question:"An attacker exploits a vulnerability that is not yet known to the vendor. What is this called?",
options:[
"Known exploit",
"Zero-day",
"Privilege escalation",
"Backdoor"
],
answer:"Zero-day",
explanation:"A zero-day vulnerability is unknown and unpatched.",
domain:"Threats & Vulnerabilities"
},

{
question:"A web application allows user input that is not sanitized, enabling attackers to execute scripts in a user's browser. Which attack is this?",
options:[
"SQL injection",
"Cross-site scripting (XSS)",
"Buffer overflow",
"Directory traversal"
],
answer:"Cross-site scripting (XSS)",
explanation:"XSS allows attackers to run scripts in a victim's browser.",
domain:"Threats & Vulnerabilities"
},

{
question:"An attacker captures a valid session ID and uses it to impersonate a user. What type of attack is this?",
options:[
"Session hijacking",
"Replay attack",
"Man-in-the-middle",
"Phishing"
],
answer:"Session hijacking",
explanation:"Session hijacking uses a stolen session token to gain access.",
domain:"Threats & Vulnerabilities"
},

{
question:"A user installs software that appears legitimate but secretly collects sensitive data. What type of malware is this?",
options:[
"Worm",
"Trojan",
"Ransomware",
"Rootkit"
],
answer:"Trojan",
explanation:"A Trojan disguises itself as legitimate software.",
domain:"Threats & Vulnerabilities"
},

{
question:"An attacker sends text messages containing malicious links to mobile device users. What type of attack is this?",

options:[
"Smishing",
"Vishing",
"Whaling",
"Tailgating"
],

answer:"Smishing",

explanation:"Smishing uses SMS text messages to trick users into revealing sensitive information.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker intercepts communication between two systems without their knowledge. Which attack is this?",

options:[
"Replay attack",
"Man-in-the-middle",
"Session hijacking",
"Privilege escalation"
],

answer:"Man-in-the-middle",

explanation:"A man-in-the-middle attack intercepts and possibly alters communications between two parties.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which malware is capable of spreading automatically across networks without user interaction?",

options:[
"Trojan",
"Worm",
"Spyware",
"Ransomware"
],

answer:"Worm",

explanation:"Worms self-replicate and spread automatically through networks.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker calls an employee pretending to be technical support to obtain login credentials. What type of attack is this?",

options:[
"Vishing",
"Smishing",
"Whaling",
"Tailgating"
],

answer:"Vishing",

explanation:"Vishing uses voice calls to socially engineer victims into revealing sensitive information.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which type of malware hides deep within a system to avoid detection and maintain privileged access?",

options:[
"Adware",
"Rootkit",
"Worm",
"Trojan"
],

answer:"Rootkit",

explanation:"Rootkits conceal malicious activity while maintaining privileged access on compromised systems.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker sends highly targeted emails crafted specifically for a single organization. What type of attack is this?",

options:[
"Spear phishing",
"Whaling",
"Smishing",
"Password spraying"
],

answer:"Spear phishing",

explanation:"Spear phishing targets specific individuals or organizations using customized messages.",

domain:"Threats & Vulnerabilities"
},

{
question:"A malicious actor exploits software by sending more data than the application can handle, causing memory corruption. What attack is this?",

options:[
"Cross-site scripting",
"SQL injection",
"Buffer overflow",
"ARP spoofing"
],

answer:"Buffer overflow",

explanation:"Buffer overflow attacks overwrite memory by exceeding expected input sizes.",

domain:"Threats & Vulnerabilities"
},

{
question:"An attacker tricks users into visiting a fake banking website by poisoning DNS records. What type of attack is this?",

options:[
"Pharming",
"Watering hole",
"Session hijacking",
"Tailgating"
],

answer:"Pharming",

explanation:"Pharming redirects users to fraudulent websites through DNS manipulation.",

domain:"Threats & Vulnerabilities"
},

{
question:"Which attack involves repeatedly trying every possible password combination until the correct one is found?",

options:[
"Credential stuffing",
"Password spraying",
"Brute force",
"Dictionary attack"
],

answer:"Brute force",

explanation:"Brute force attacks systematically try all possible password combinations.",

domain:"Threats & Vulnerabilities"
},

{
question:"A malicious script redirects users to another website without their consent after clicking a legitimate link. Which type of attack is MOST likely occurring?",

options:[
"Cross-site request forgery",
"Open redirect",
"Buffer overflow",
"Replay attack"
],

answer:"Open redirect",

explanation:"Open redirect vulnerabilities allow attackers to redirect users to malicious websites.",

domain:"Threats & Vulnerabilities"
}

];

export default set1;
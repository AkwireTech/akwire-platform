const set1 = [

{
question:"A company wants to ensure that no user or device is trusted by default, even inside the network. Which architecture should be implemented?",
options:[
"Defense in depth",
"Zero Trust",
"Perimeter security",
"Flat network"
],
answer:"Zero Trust",
explanation:"Zero Trust assumes no implicit trust and requires continuous verification.",
domain:"Security Architecture"
},

{
question:"A network administrator places public-facing servers in a separate network segment isolated from the internal network. What is this called?",
options:[
"VLAN",
"DMZ",
"Intranet",
"Extranet"
],
answer:"DMZ",
explanation:"A DMZ isolates public services from internal systems.",
domain:"Security Architecture"
},

{
question:"Which technology is used to securely encrypt web traffic between a browser and a server?",
options:[
"SSH",
"TLS",
"FTP",
"SNMP"
],
answer:"TLS",
explanation:"TLS secures web communications (HTTPS).",
domain:"Security Architecture"
},

{
question:"A company uses a system that detects suspicious network activity but does not block it. What system is this?",
options:[
"Firewall",
"IDS",
"IPS",
"WAF"
],
answer:"IDS",
explanation:"Intrusion Detection Systems monitor and alert but do not block.",
domain:"Security Architecture"
},

{
question:"Which system actively blocks malicious traffic in real time?",
options:[
"IDS",
"IPS",
"SIEM",
"Proxy"
],
answer:"IPS",
explanation:"Intrusion Prevention Systems block threats automatically.",
domain:"Security Architecture"
},

{
question:"Which type of encryption uses the same key for both encryption and decryption?",
options:[
"Asymmetric",
"Hashing",
"Symmetric",
"Digital signature"
],
answer:"Symmetric",
explanation:"Symmetric encryption uses a single shared key.",
domain:"Security Architecture"
},

{
question:"Which type of encryption uses a public and private key pair?",
options:[
"Symmetric",
"Asymmetric",
"Hashing",
"Tokenization"
],
answer:"Asymmetric",
explanation:"Asymmetric encryption uses key pairs.",
domain:"Security Architecture"
},

{
question:"A company deploys a firewall that filters traffic between internal systems and external networks. What is the primary purpose of this device?",

options:[
"Encrypt files",
"Monitor employee activity",
"Control network traffic",
"Store backups"
],

answer:"Control network traffic",

explanation:"Firewalls filter and control network traffic based on security rules.",

domain:"Security Architecture"
},

{
question:"Which technology provides secure remote access to an organization's internal network over the internet?",

options:[
"VPN",
"FTP",
"RDP",
"SNMP"
],

answer:"VPN",

explanation:"Virtual Private Networks encrypt remote communications across public networks.",

domain:"Security Architecture"
},

{
question:"A company separates departments into different network segments to reduce lateral movement during an attack. What concept is this?",

options:[
"Network segmentation",
"Port forwarding",
"Load balancing",
"Proxy chaining"
],

answer:"Network segmentation",

explanation:"Network segmentation isolates systems and limits the spread of attacks.",

domain:"Security Architecture"
},

{
question:"Which device examines web traffic for malicious requests targeting web applications?",

options:[
"WAF",
"Router",
"Switch",
"Load balancer"
],

answer:"WAF",

explanation:"A Web Application Firewall protects web applications from attacks such as SQL injection and XSS.",

domain:"Security Architecture"
},

{
question:"Which cryptographic process converts readable data into an unreadable format to protect confidentiality?",

options:[
"Hashing",
"Encryption",
"Tokenization",
"Obfuscation"
],

answer:"Encryption",

explanation:"Encryption protects data confidentiality by converting plaintext into ciphertext.",

domain:"Security Architecture"
},

{
question:"Which security architecture model focuses on verifying every access request regardless of location?",

options:[
"Defense in depth",
"Zero Trust",
"Flat architecture",
"Implicit allow"
],

answer:"Zero Trust",

explanation:"Zero Trust continuously validates users and devices before granting access.",

domain:"Security Architecture"
},

{
question:"A security administrator configures systems to send all logs to a centralized platform for analysis. Which solution is MOST likely being used?",

options:[
"SIEM",
"VPN",
"IDS",
"Proxy"
],

answer:"SIEM",

explanation:"Security Information and Event Management systems aggregate and analyze logs from multiple sources.",

domain:"Security Architecture"
},

{
question:"Which technology translates private internal IP addresses into public IP addresses for internet communication?",

options:[
"NAT",
"VLAN",
"SSH",
"SNMP"
],

answer:"NAT",

explanation:"Network Address Translation maps private addresses to public addresses.",

domain:"Security Architecture"
},

{
question:"A company wants to ensure sensitive data cannot be reversed back to its original value after processing. Which method should be used?",

options:[
"Encryption",
"Hashing",
"Tokenization",
"Encoding"
],

answer:"Hashing",

explanation:"Hashing is a one-way cryptographic process that cannot easily be reversed.",

domain:"Security Architecture"
},

{
question:"Which security device analyzes traffic patterns and automatically blocks suspicious network activity?",

options:[
"IDS",
"IPS",
"Hub",
"Repeater"
],

answer:"IPS",

explanation:"Intrusion Prevention Systems actively block malicious traffic in real time.",

domain:"Security Architecture"
}

];

export default set1;
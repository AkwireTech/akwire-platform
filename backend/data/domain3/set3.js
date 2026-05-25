const set3 = [

{
question:"Which security solution acts as a decoy to lure attackers and study their behavior?",
options:[
"Honeypot",
"Firewall",
"IDS",
"Proxy"
],
answer:"Honeypot",
explanation:"Honeypots attract attackers for monitoring and analysis.",
domain: "Security Architecture"
},

{
question:"Which protocol replaces Telnet for secure remote administration?",
options:[
"FTP",
"SSH",
"HTTP",
"SMTP"
],
answer:"SSH",
explanation:"SSH provides encrypted remote access.",
domain: "Security Architecture"
},

{
question:"Which protocol is used for secure file transfer?",
options:[
"FTP",
"TFTP",
"SFTP",
"SMTP"
],
answer:"SFTP",
explanation:"SFTP uses SSH for secure file transfers.",
domain: "Security Architecture"
},

{
question:"Which protocol is used to securely access websites?",
options:[
"HTTP",
"HTTPS",
"FTP",
"SNMP"
],
answer:"HTTPS",
explanation:"HTTPS uses TLS to secure web traffic.",
domain: "Security Architecture"
},

{
question:"Which security control verifies the integrity of data using mathematical algorithms?",
options:[
"Encryption",
"Hashing",
"Tokenization",
"Obfuscation"
],
answer:"Hashing",
explanation:"Hashing ensures data integrity.",
domain: "Security Architecture"
},

{
question:"A company uses digital certificates to verify identity. What system is being used?",
options:[
"VPN",
"PKI",
"IDS",
"Firewall"
],
answer:"PKI",
explanation:"Public Key Infrastructure manages certificates and keys.",
domain: "Security Architecture"
},

{
question:"Which concept ensures systems remain operational even during failures?",
options:[
"Redundancy",
"Encryption",
"Segmentation",
"Authentication"
],
answer:"Redundancy",
explanation:"Redundancy provides backup systems for availability.",
domain: "Security Architecture"
},

{
question:"Which protocol is commonly used to securely encrypt email messages?",

options:[
"SNMP",
"PGP",
"HTTP",
"Telnet"
],

answer:"PGP",

explanation:"Pretty Good Privacy (PGP) is used to encrypt and secure email communications.",

domain:"Security Architecture"
},

{
question:"A company implements a backup site that can quickly take over operations during a disaster with minimal downtime. What type of site is this?",

options:[
"Cold site",
"Warm site",
"Hot site",
"Offline archive"
],

answer:"Hot site",

explanation:"Hot sites are fully operational backup facilities with minimal recovery time.",

domain:"Security Architecture"
},

{
question:"Which protocol securely encrypts network management traffic and replaces older insecure versions of SNMP?",

options:[
"SNMPv1",
"SNMPv2",
"SNMPv3",
"TFTP"
],

answer:"SNMPv3",

explanation:"SNMPv3 provides authentication and encryption for secure network management.",

domain:"Security Architecture"
},

{
question:"Which security technology monitors outbound traffic to detect and prevent sensitive data leaks?",

options:[
"DLP",
"WAF",
"VPN",
"SIEM"
],

answer:"DLP",

explanation:"Data Loss Prevention systems monitor and protect sensitive data from unauthorized exposure.",

domain:"Security Architecture"
},

{
question:"A company uses tokens instead of storing actual credit card numbers in its systems. Which security technique is this?",

options:[
"Hashing",
"Encryption",
"Tokenization",
"Obfuscation"
],

answer:"Tokenization",

explanation:"Tokenization replaces sensitive data with non-sensitive substitute values.",

domain:"Security Architecture"
},

{
question:"Which architecture model provides centralized authentication services for multiple applications?",

options:[
"Single sign-on",
"Load balancing",
"Segmentation",
"Redundancy"
],

answer:"Single sign-on",

explanation:"Single sign-on allows users to authenticate once and access multiple systems.",

domain:"Security Architecture"
},

{
question:"Which type of site contains hardware and connectivity but requires software restoration before becoming operational?",

options:[
"Hot site",
"Warm site",
"Cold site",
"Honeypot"
],

answer:"Warm site",

explanation:"Warm sites have partial infrastructure ready but still require additional restoration steps.",

domain:"Security Architecture"
},

{
question:"A company deploys systems that automatically fail over to backup servers if the primary system becomes unavailable. Which concept is this?",

options:[
"Fault tolerance",
"Hashing",
"Tokenization",
"Obfuscation"
],

answer:"Fault tolerance",

explanation:"Fault tolerance ensures continued operation during hardware or system failures.",

domain:"Security Architecture"
},

{
question:"Which protocol is commonly used to securely connect to remote websites and applications over encrypted tunnels?",

options:[
"VPN",
"HTTP",
"SMTP",
"FTP"
],

answer:"VPN",

explanation:"Virtual Private Networks provide encrypted communication tunnels over public networks.",

domain:"Security Architecture"
},

{
question:"A security administrator deploys a fake database server designed to attract attackers and study their techniques. What type of solution is this?",

options:[
"Honeypot",
"Firewall",
"Load balancer",
"Proxy"
],

answer:"Honeypot",

explanation:"Honeypots are decoy systems designed to detect and analyze attacker behavior.",

domain:"Security Architecture"
},

];

export default set3;
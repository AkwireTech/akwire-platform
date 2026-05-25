const set1 = [

{
question:"A security analyst reviews logs from multiple systems to detect suspicious activity. Which tool is MOST likely being used?",
options:[
"Firewall",
"SIEM",
"Load balancer",
"Proxy"
],
answer:"SIEM",
explanation:"SIEM systems aggregate and analyze logs from multiple sources.",
domain:"Security Operations"
},

{
question:"What is the FIRST step in the incident response process?",
options:[
"Containment",
"Detection",
"Recovery",
"Lessons learned"
],
answer:"Detection",
explanation:"The first step is identifying that an incident has occurred.",
domain:"Security Operations"
},

{
question:"Which phase of incident response involves limiting the damage of an attack?",
options:[
"Detection",
"Containment",
"Recovery",
"Preparation"
],
answer:"Containment",
explanation:"Containment isolates affected systems to prevent spread.",
domain:"Security Operations"
},

{
question:"Which phase restores systems to normal operation after an incident?",
options:[
"Recovery",
"Containment",
"Detection",
"Lessons learned"
],
answer:"Recovery",
explanation:"Recovery returns systems to normal operation.",
domain:"Security Operations"
},

{
question:"Which process ensures evidence is handled properly during an investigation?",
options:[
"Logging",
"Chain of custody",
"Hashing",
"Encryption"
],
answer:"Chain of custody",
explanation:"Chain of custody tracks evidence handling.",
domain:"Security Operations"
},

{
question:"Which activity involves capturing a full image of a system for investigation?",
options:[
"Monitoring",
"Forensics",
"Logging",
"Alerting"
],
answer:"Forensics",
explanation:"Digital forensics involves collecting and analyzing evidence.",
domain:"Security Operations"
},

{
question:"A company installs updates to fix known vulnerabilities. What is this process?",
options:[
"Backup",
"Patching",
"Hardening",
"Monitoring"
],
answer:"Patching",
explanation:"Patching fixes vulnerabilities in software.",
domain:"Security Operations"
},

{
question:"A security team isolates infected systems from the network to stop malware from spreading. Which incident response phase is this?",

options:[
"Recovery",
"Containment",
"Detection",
"Lessons learned"
],

answer:"Containment",

explanation:"Containment limits the spread and impact of a security incident.",

domain:"Security Operations"
},

{
question:"Which security operations activity involves continuously observing systems and networks for suspicious behavior?",

options:[
"Monitoring",
"Hardening",
"Tokenization",
"Hashing"
],

answer:"Monitoring",

explanation:"Monitoring continuously tracks systems and network activity for threats.",

domain:"Security Operations"
},

{
question:"A company regularly installs operating system and software updates to address security weaknesses. What process is this?",

options:[
"Segmentation",
"Patching",
"Tokenization",
"Virtualization"
],

answer:"Patching",

explanation:"Patching applies updates that fix vulnerabilities and improve security.",

domain:"Security Operations"
},

{
question:"Which document outlines the procedures and responsibilities for responding to cybersecurity incidents?",

options:[
"Incident response plan",
"Acceptable use policy",
"Service-level agreement",
"Business impact analysis"
],

answer:"Incident response plan",

explanation:"Incident response plans define how organizations detect, respond to, and recover from incidents.",

domain:"Security Operations"
},

{
question:"A forensic investigator calculates hash values before and after imaging a drive. What is the purpose of this action?",

options:[
"Improve availability",
"Verify integrity",
"Encrypt evidence",
"Increase redundancy"
],

answer:"Verify integrity",

explanation:"Hashing confirms that forensic evidence has not been altered.",

domain:"Security Operations"
},

{
question:"Which backup strategy stores copies of data in multiple geographic locations to improve resilience?",

options:[
"Geographic redundancy",
"Tokenization",
"Air gapping",
"Containerization"
],

answer:"Geographic redundancy",

explanation:"Geographic redundancy improves resilience by distributing backups across locations.",

domain:"Security Operations"
},

{
question:"A company removes unnecessary services and disables unused ports on servers. What security practice is this?",

options:[
"Hardening",
"Monitoring",
"Containment",
"Virtualization"
],

answer:"Hardening",

explanation:"Hardening reduces attack surfaces by removing unnecessary components and configurations.",

domain:"Security Operations"
},

{
question:"Which phase of incident response involves identifying the root cause and documenting lessons learned after an incident?",

options:[
"Recovery",
"Containment",
"Lessons learned",
"Detection"
],

answer:"Lessons learned",

explanation:"The lessons learned phase reviews the incident to improve future response efforts.",

domain:"Security Operations"
},

{
question:"A company performs regular vulnerability scans to identify outdated software and weak configurations. What is the primary purpose of this activity?",

options:[
"Threat hunting",
"Risk identification",
"Data encryption",
"Network segmentation"
],

answer:"Risk identification",

explanation:"Vulnerability scanning identifies weaknesses that could be exploited by attackers.",

domain:"Security Operations"
},

{
question:"Which operational security activity proactively searches systems for hidden threats that may have bypassed existing defenses?",

options:[
"Threat hunting",
"Patching",
"Hashing",
"Tokenization"
],

answer:"Threat hunting",

explanation:"Threat hunting proactively searches for indicators of compromise and hidden threats.",

domain:"Security Operations"
}

];

export default set1;
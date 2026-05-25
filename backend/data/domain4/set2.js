const set2 = [

{
question:"Which process involves continuously observing systems for abnormal behavior?",
options:[
"Logging",
"Monitoring",
"Patching",
"Backup"
],
answer:"Monitoring",
explanation:"Monitoring tracks system activity for anomalies.",
domain: "Security Operations"
},

{
question:"Which mechanism notifies administrators when suspicious activity occurs?",
options:[
"Logging",
"Alerting",
"Hashing",
"Encryption"
],
answer:"Alerting",
explanation:"Alerting notifies security teams of potential issues.",
domain: "Security Operations"
},

{
question:"A company creates backups of critical data to prevent data loss. What is the main purpose?",
options:[
"Integrity",
"Availability",
"Confidentiality",
"Authentication"
],
answer:"Availability",
explanation:"Backups ensure data can be restored when needed.",
domain: "Security Operations"
},

{
question:"Which process involves restoring data from backups after a failure?",
options:[
"Backup",
"Restore",
"Monitoring",
"Logging"
],
answer:"Restore",
explanation:"Restore retrieves data from backups.",
domain: "Security Operations"
},

{
question:"Which concept involves reducing unnecessary services on a system?",
options:[
"Hardening",
"Monitoring",
"Logging",
"Backup"
],
answer:"Hardening",
explanation:"Hardening reduces attack surface.",
domain: "Security Operations"
},

{
question:"Which principle ensures only necessary services are running on a system?",
options:[
"Least privilege",
"Least functionality",
"Zero Trust",
"Defense in depth"
],
answer:"Least functionality",
explanation:"Systems should run only required services.",
domain: "Security Operations"
},

{
question:"Which process ensures system changes are reviewed and approved?",
options:[
"Logging",
"Monitoring",
"Change management",
"Backup"
],
answer:"Change management",
explanation:"Change management controls system modifications.",
domain: "Security Operations"
},

{
question:"A security analyst configures systems to generate notifications when unusual login attempts are detected. What process is this?",

options:[
"Alerting",
"Hashing",
"Tokenization",
"Hardening"
],

answer:"Alerting",

explanation:"Alerting automatically notifies administrators of suspicious or abnormal activity.",

domain:"Security Operations"
},

{
question:"Which operational process involves reviewing and approving modifications to systems before implementation?",

options:[
"Threat hunting",
"Change management",
"Containment",
"Patching"
],

answer:"Change management",

explanation:"Change management ensures system modifications are properly reviewed and controlled.",

domain:"Security Operations"
},

{
question:"A company maintains offline copies of critical backups disconnected from the network. What is the primary security benefit?",

options:[
"Reduced encryption costs",
"Protection from ransomware",
"Improved segmentation",
"Faster authentication"
],

answer:"Protection from ransomware",

explanation:"Offline backups help protect data from ransomware attacks that target connected systems.",

domain:"Security Operations"
},

{
question:"Which process involves applying secure configuration baselines to systems and devices?",

options:[
"Hardening",
"Logging",
"Containment",
"Alerting"
],

answer:"Hardening",

explanation:"Hardening secures systems by reducing vulnerabilities and unnecessary functionality.",

domain:"Security Operations"
},

{
question:"A security team reviews logs and network traffic to identify indicators of compromise before alerts are triggered. What activity is this?",

options:[
"Threat hunting",
"Recovery",
"Tokenization",
"Segmentation"
],

answer:"Threat hunting",

explanation:"Threat hunting proactively searches for hidden threats within an environment.",

domain:"Security Operations"
},

{
question:"Which security operations process documents actions performed during an incident investigation to preserve accountability?",

options:[
"Chain of custody",
"Segmentation",
"Virtualization",
"Load balancing"
],

answer:"Chain of custody",

explanation:"Chain of custody tracks evidence handling and investigative actions.",

domain:"Security Operations"
},

{
question:"A company conducts regular disaster recovery exercises to ensure systems can be restored after outages. What is the primary goal?",

options:[
"Reduce patching",
"Improve recovery readiness",
"Increase segmentation",
"Reduce monitoring"
],

answer:"Improve recovery readiness",

explanation:"Disaster recovery testing validates restoration procedures and readiness.",

domain:"Security Operations"
},

{
question:"Which type of log records successful and failed authentication attempts?",

options:[
"Application log",
"Security log",
"Performance log",
"Audit suppression log"
],

answer:"Security log",

explanation:"Security logs track authentication attempts and security-related events.",

domain:"Security Operations"
},

{
question:"A company removes unused user accounts and disables unnecessary services on servers. Which security principle is MOST directly supported?",

options:[
"Least functionality",
"Non-repudiation",
"Tokenization",
"Load balancing"
],

answer:"Least functionality",

explanation:"Least functionality minimizes attack surfaces by limiting unnecessary components.",

domain:"Security Operations"
},

{
question:"Which process restores systems and services to normal operation after containment of an incident?",

options:[
"Recovery",
"Preparation",
"Detection",
"Escalation"
],

answer:"Recovery",

explanation:"Recovery focuses on restoring systems after an incident has been contained.",

domain:"Security Operations"
}

];

export default set2;
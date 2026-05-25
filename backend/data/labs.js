export default [

{
labId: "lab-04",

order: 1,

isUnlocked: true,

title: "Log Analysis & Incident Response",

domain: "Security Operations",

difficulty: "Intermediate",

clearance: "LEVEL 2",

briefing: "Intelligence reports indicate a rogue actor is attempting to breach the Production Database.",

objective: "Use the appropriate tool to identify a Brute Force attack within the SSH logs.",

tasks: [

{
id: 'task-logs',
label: 'Identify Brute Force IP',
cmd: 'cat auth.log',
nextObjective: "Scan for vulnerable open ports.",
question: "Which protocol is targeted?",
answer: "ssh"
},

{
id: 'task-scan',
label: 'Scan for Vulnerable Ports',
cmd: 'nmap -sv localhost',
nextObjective: "Search for leaked credentials.",
question: "Which service is on the open port?",
answer: "ftp"
},

{
id: 'task-grep',
label: 'Find Leaked Credentials',
cmd: 'grep -i \"password\" secret_notes.txt',
nextObjective: "Analysis Complete.",
question: "What security control failed?",
answer: "encryption"
}

],

scenarios: {

'ls': "auth.log  config.yaml  secret_notes.txt  www/",

'cat auth.log': `
Failed logins...
ALERT: BRUTE FORCE DETECTED
`,

'nmap -sv localhost': `
PORT 22 ssh
PORT 21 ftp
`,

'grep -i \"password\" secret_notes.txt': `
password = Cyber123
`,

'help': "Available: ls, cat, nmap, grep, clear"

},

hints: [
"COMMAND: cat auth.log",
"COMMAND: nmap -sv localhost",
"COMMAND: grep -i \"password\" secret_notes.txt"
]

},

{
labId: "lab-05",

order: 2,

isUnlocked: false,

title: "Malware Investigation",

domain: "Threats & Vulnerabilities",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "A workstation has been flagged for suspicious activity. Analyze system artifacts to identify malware behavior.",

objective: "Identify the malicious process running on the system.",

tasks: [

{
id: "task-ps",
label: "Analyze Running Processes",
cmd: "ps aux",
nextObjective: "Inspect the suspicious executable file.",
question: "Which process appears malicious?",
answer: "cryptominer"
},

{
id: "task-strings",
label: "Inspect Binary Strings",
cmd: "strings suspicious.bin",
nextObjective: "Check persistence mechanism.",
question: "What type of malware is this?",
answer: "cryptominer"
},

{
id: "task-cron",
label: "Check Scheduled Tasks",
cmd: "cat /etc/crontab",
nextObjective: "Analysis Complete.",
question: "How does the malware maintain persistence?",
answer: "cron"
}

],

scenarios: {

"ls": "suspicious.bin  notes.txt  logs/",

"ps aux": `
root   1023  cryptominer --silent --cpu-max=100
user   2045  firefox
user   2101  ssh
`,

"strings suspicious.bin": `
wallet_address=abc123xyz
mining_pool=darkpool.net
cpu_usage=100%
`,

"cat /etc/crontab": `
* * * * * root /usr/bin/suspicious.bin
`,

"help": "Available: ls, ps, strings, cat, clear"

},

hints: [
"COMMAND: ps aux",
"COMMAND: strings suspicious.bin",
"COMMAND: cat /etc/crontab"
]

},

{
labId: "lab-06",

order: 3,

isUnlocked: false,

title: "Network Traffic Analysis",

domain: "Security Operations",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "Unusual network activity has been detected. Analyze captured traffic to identify suspicious behavior.",

objective: "Identify suspicious network communication.",

tasks: [

{
id: "task-capture",
label: "Inspect Packet Capture",
cmd: "cat traffic.log",
nextObjective: "Analyze suspicious IP address.",
question: "Which IP is communicating with external server?",
answer: "203.0.113.5"
},

{
id: "task-ip",
label: "Analyze Suspicious IP",
cmd: "whois 203.0.113.5",
nextObjective: "Determine type of attack.",
question: "What type of traffic is observed?",
answer: "data exfiltration"
},

{
id: "task-dns",
label: "Analyze DNS Queries",
cmd: "cat dns.log",
nextObjective: "Analysis Complete.",
question: "Which domain is suspicious?",
answer: "malicious-domain.com"
}

],

scenarios: {

"ls": "traffic.log  dns.log  capture.pcap",

"cat traffic.log": `
192.168.1.10 → 203.0.113.5  TCP 443
192.168.1.10 → 203.0.113.5  TCP 443
DATA TRANSFER: 500MB outbound
ALERT: Possible data exfiltration
`,

"whois 203.0.113.5": `
Org: Unknown Offshore Hosting
Location: Eastern Europe
Flag: High Risk
`,

"cat dns.log": `
Query: google.com
Query: microsoft.com
Query: malicious-domain.com
ALERT: Suspicious DNS activity detected
`,

"help": "Available: ls, cat, whois, clear"

},

hints: [
"COMMAND: cat traffic.log",
"COMMAND: whois 203.0.113.5",
"COMMAND: cat dns.log"
]

},

{
labId: "lab-07",

order: 4,

isUnlocked: false,

title: "Phishing Email Investigation",

domain: "Threats & Vulnerabilities",

difficulty: "Beginner",

clearance: "LEVEL 2",

briefing: "An employee reported a suspicious email requesting urgent account verification. Investigate the email and identify phishing indicators.",

objective: "Analyze the suspicious email to identify malicious indicators.",

tasks: [

{
id: "task-email",
label: "Inspect Suspicious Email",
cmd: "cat suspicious_email.txt",
nextObjective: "Investigate the sender domain.",
question: "Which domain sent the phishing email?",
answer: "micr0soft-support.com"
},

{
id: "task-domain",
label: "Investigate Sender Domain",
cmd: "whois micr0soft-support.com",
nextObjective: "Identify the malicious URL.",
question: "What country is the suspicious domain registered in?",
answer: "russia"
},

{
id: "task-link",
label: "Analyze Embedded Link",
cmd: "cat malicious_link.txt",
nextObjective: "Analysis Complete.",
question: "What type of attack does this email attempt?",
answer: "credential harvesting"
}

],

scenarios: {

"ls": "suspicious_email.txt  malicious_link.txt  attachments/",

"cat suspicious_email.txt": `
From: support@micr0soft-support.com
To: employee@company.com
Subject: Urgent Account Verification

Your Microsoft account has been compromised.
Please verify your credentials immediately.

Failure to act may result in account suspension.
`,

"whois micr0soft-support.com": `
Registrar: Offshore Registrar
Country: Russia
Created: 2 days ago
Risk: HIGH
`,

"cat malicious_link.txt": `
https://micr0soft-support.com/login

WARNING:
Fake login portal detected.
Possible credential harvesting campaign.
`,

"help": "Available: ls, cat, whois, clear"

},

hints: [
"COMMAND: cat suspicious_email.txt",
"COMMAND: whois micr0soft-support.com",
"COMMAND: cat malicious_link.txt"
]

},

{
labId: "lab-08",

order: 5,

isUnlocked: false,

title: "SIEM Alert Triage",

domain: "Security Operations",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "The SOC has received multiple SIEM alerts indicating suspicious authentication activity. Investigate the alerts and determine if an attack is occurring.",

objective: "Analyze SIEM alerts to identify suspicious login activity.",

tasks: [

{
id: "task-alerts",
label: "Review SIEM Alerts",
cmd: "cat alerts.log",
nextObjective: "Identify failed login attempts.",
question: "Which username is being targeted?",
answer: "administrator"
},

{
id: "task-grep",
label: "Analyze Failed Logins",
cmd: "grep failed auth.log",
nextObjective: "Determine attack type.",
question: "What type of attack is occurring?",
answer: "brute force"
},

{
id: "task-ip",
label: "Identify Attacker IP",
cmd: "cat attacker_ip.txt",
nextObjective: "Analysis Complete.",
question: "Which IP launched the attack?",
answer: "198.51.100.25"
}

],

scenarios: {

"ls": "alerts.log  auth.log  attacker_ip.txt",

"cat alerts.log": `
[HIGH] Multiple failed logins detected
[MEDIUM] Administrator account targeted
[HIGH] Possible brute force attack
`,

"grep failed auth.log": `
FAILED LOGIN administrator
FAILED LOGIN administrator
FAILED LOGIN administrator
`,

"cat attacker_ip.txt": `
198.51.100.25
`,

"help": "Available: ls, cat, grep, clear"

},

hints: [
"COMMAND: cat alerts.log",
"COMMAND: grep failed auth.log",
"COMMAND: cat attacker_ip.txt"
]

},

{
labId: "lab-09",

order: 6,

isUnlocked: false,

title: "Vulnerability Scanning",

domain: "Threats & Vulnerabilities",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "A vulnerability scan identified multiple exposed services on a production server. Investigate the scan results and identify critical weaknesses.",

objective: "Analyze vulnerable services and identify risks.",

tasks: [

{
id: "task-nmap",
label: "Run Port Scan",
cmd: "nmap localhost",
nextObjective: "Analyze vulnerable web service.",
question: "Which port is running HTTP?",
answer: "80"
},

{
id: "task-nikto",
label: "Run Web Vulnerability Scan",
cmd: "nikto localhost",
nextObjective: "Identify vulnerable software.",
question: "Which vulnerable software version was detected?",
answer: "apache 2.2"
},

{
id: "task-cve",
label: "Review CVE Report",
cmd: "cat cve_report.txt",
nextObjective: "Analysis Complete.",
question: "Which vulnerability severity is identified?",
answer: "critical"
}

],

scenarios: {

"ls": "scan.txt  cve_report.txt",

"nmap localhost": `
PORT 22 ssh
PORT 80 http
PORT 3306 mysql
`,

"nikto localhost": `
Apache/2.2 detected
Outdated server version found
Possible remote exploits available
`,

"cat cve_report.txt": `
CVE Severity: CRITICAL
Patch immediately recommended
`,

"help": "Available: ls, cat, nmap, nikto, clear"

},

hints: [
"COMMAND: nmap localhost",
"COMMAND: nikto localhost",
"COMMAND: cat cve_report.txt"
]

},

{
labId: "lab-10",

order: 7,

isUnlocked: false,

title: "Firewall Rule Investigation",

domain: "Security Architecture",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "Security engineers suspect a firewall misconfiguration is exposing internal systems to the internet. Investigate the firewall configuration.",

objective: "Identify insecure firewall rules.",

tasks: [

{
id: "task-fw",
label: "Review Firewall Rules",
cmd: "cat firewall.conf",
nextObjective: "Identify risky access rule.",
question: "Which port is exposed to ANY source?",
answer: "3389"
},

{
id: "task-grep",
label: "Search Allow Rules",
cmd: "grep allow firewall.conf",
nextObjective: "Determine affected service.",
question: "Which service uses port 3389?",
answer: "rdp"
},

{
id: "task-risk",
label: "Review Risk Report",
cmd: "cat risk_report.txt",
nextObjective: "Analysis Complete.",
question: "What security principle failed?",
answer: "least privilege"
}

],

scenarios: {

"ls": "firewall.conf  risk_report.txt",

"cat firewall.conf": `
ALLOW TCP ANY -> 3389
ALLOW TCP 10.0.0.0/24 -> 22
DENY ALL
`,

"grep allow firewall.conf": `
ALLOW TCP ANY -> 3389
ALLOW TCP 10.0.0.0/24 -> 22
`,

"cat risk_report.txt": `
Remote Desktop exposed to internet
Risk Level: HIGH
`,

"help": "Available: ls, cat, grep, clear"

},

hints: [
"COMMAND: cat firewall.conf",
"COMMAND: grep allow firewall.conf",
"COMMAND: cat risk_report.txt"
]

},

{
labId: "lab-11",

order: 8,

isUnlocked: false,

title: "Windows Event Log Investigation",

domain: "Security Operations",

difficulty: "Intermediate",

clearance: "LEVEL 3",

briefing: "A Windows server has generated multiple suspicious authentication events. Investigate the event logs for evidence of unauthorized access attempts.",

objective: "Analyze Windows security events.",

tasks: [

{
id: "task-events",
label: "Inspect Security Events",
cmd: "cat security.evtx",
nextObjective: "Identify suspicious Event ID.",
question: "Which Event ID indicates failed logins?",
answer: "4625"
},

{
id: "task-user",
label: "Analyze Targeted User",
cmd: "grep administrator security.evtx",
nextObjective: "Determine attack type.",
question: "Which account is targeted?",
answer: "administrator"
},

{
id: "task-attack",
label: "Review Attack Summary",
cmd: "cat attack_summary.txt",
nextObjective: "Analysis Complete.",
question: "What attack type was detected?",
answer: "brute force"
}

],

scenarios: {

"ls": "security.evtx  attack_summary.txt",

"cat security.evtx": `
EventID 4625 Failed Login
EventID 4625 Failed Login
EventID 4624 Successful Login
`,

"grep administrator security.evtx": `
FAILED LOGIN administrator
FAILED LOGIN administrator
`,

"cat attack_summary.txt": `
Repeated failed login attempts detected
Possible brute force attack
`,

"help": "Available: ls, cat, grep, clear"

},

hints: [
"COMMAND: cat security.evtx",
"COMMAND: grep administrator security.evtx",
"COMMAND: cat attack_summary.txt"
]

}

];
const set1 = [

{
question:"A company wants to ensure that sensitive data is only accessible to authorized users. Which security principle is being enforced?",
options:[
"Integrity",
"Availability",
"Confidentiality",
"Non-repudiation"
],
answer:"Confidentiality",
explanation:"Confidentiality ensures that data is only accessible to authorized individuals.",
domain:"General Security Concepts"
},

{
question:"A system ensures that data has not been altered during transmission. Which principle is this?",
options:[
"Confidentiality",
"Integrity",
"Availability",
"Authentication"
],
answer:"Integrity",
explanation:"Integrity ensures that data remains accurate and unchanged.",
domain:"General Security Concepts"
},

{
question:"A company implements redundant servers to ensure systems remain operational during failures. Which principle is being addressed?",
options:[
"Confidentiality",
"Integrity",
"Availability",
"Non-repudiation"
],
answer:"Availability",
explanation:"Availability ensures systems and data are accessible when needed.",
domain:"General Security Concepts"
},

{
question:"An organization requires users to log in using a username and password. What process is this?",
options:[
"Authorization",
"Authentication",
"Accounting",
"Auditing"
],
answer:"Authentication",
explanation:"Authentication verifies the identity of a user.",
domain:"General Security Concepts"
},

{
question:"After logging in, a user is granted access only to files necessary for their job role. What concept is this?",
options:[
"Least privilege",
"Separation of duties",
"Dual control",
"Need to know"
],
answer:"Least privilege",
explanation:"Least privilege ensures users have only the minimum access required.",
domain:"General Security Concepts"
},

{
question:"A company requires two employees to approve a financial transaction before it is processed. What concept is this?",
options:[
"Least privilege",
"Separation of duties",
"Defense in depth",
"Job rotation"
],
answer:"Separation of duties",
explanation:"Separation of duties reduces risk by requiring multiple individuals to complete a task.",
domain:"General Security Concepts"
},

{
question:"A security policy states that all employees must change their passwords every 90 days. What type of control is this?",
options:[
"Technical",
"Physical",
"Administrative",
"Detective"
],
answer:"Administrative",
explanation:"Policies are administrative controls.",
domain:"General Security Concepts"
},


{
question:"A security administrator implements multiple layers of security controls including firewalls, endpoint protection, and intrusion detection systems. Which security concept is being applied?",

options:[
"Least privilege",
"Defense in depth",
"Separation of duties",
"Zero trust"
],

answer:"Defense in depth",

explanation:"Defense in depth uses multiple layers of security controls to protect systems and data.",

domain:"General Security Concepts"
},

{
question:"An organization requires employees to verify their identity using a password and a fingerprint scan. Which security concept is being implemented?",

options:[
"Single sign-on",
"Multifactor authentication",
"Role-based access control",
"Federation"
],

answer:"Multifactor authentication",

explanation:"Multifactor authentication requires two or more authentication factors from different categories.",

domain:"General Security Concepts"
},

{
question:"A company encrypts sensitive customer data before storing it in a database. Which security objective is MOST directly supported?",

options:[
"Availability",
"Integrity",
"Confidentiality",
"Accounting"
],

answer:"Confidentiality",

explanation:"Encryption protects sensitive data from unauthorized access and supports confidentiality.",

domain:"General Security Concepts"
},

{
question:"Which type of control is a locked server room door?",

options:[
"Administrative",
"Corrective",
"Physical",
"Compensating"
],

answer:"Physical",

explanation:"Physical controls protect assets through physical barriers and restrictions.",

domain:"General Security Concepts"
},

{
question:"A company conducts cybersecurity awareness training for employees every quarter. What type of security control is this?",

options:[
"Technical",
"Administrative",
"Detective",
"Corrective"
],

answer:"Administrative",

explanation:"Security awareness training is an administrative control designed to reduce human-related risks.",

domain:"General Security Concepts"
},

{
question:"A user can access payroll records but cannot modify them. Which principle is being enforced?",

options:[
"Integrity",
"Least privilege",
"Availability",
"Job rotation"
],

answer:"Least privilege",

explanation:"Least privilege ensures users only receive the permissions necessary to perform their job responsibilities.",

domain:"General Security Concepts"
},

{
question:"An organization installs backup power generators to keep systems online during outages. Which principle of the CIA triad does this support?",

options:[
"Integrity",
"Authentication",
"Availability",
"Confidentiality"
],

answer:"Availability",

explanation:"Backup power systems help ensure resources remain accessible during disruptions.",

domain:"General Security Concepts"
},

{
question:"A company requires employees to badge into the building and also enter a PIN code to access the data center. Which concept is being demonstrated?",

options:[
"Multifactor authentication",
"Single sign-on",
"Federation",
"Privilege escalation"
],

answer:"Multifactor authentication",

explanation:"Using both a badge and PIN requires multiple forms of authentication.",

domain:"General Security Concepts"
},

{
question:"A system administrator reviews audit logs to determine who accessed sensitive files. Which security principle is MOST closely related to this activity?",

options:[
"Non-repudiation",
"Availability",
"Integrity",
"Obfuscation"
],

answer:"Non-repudiation",

explanation:"Non-repudiation ensures actions can be traced to specific individuals and cannot later be denied.",

domain:"General Security Concepts"
},

{
question:"Which security concept assumes that no user or device should automatically be trusted, even inside the network perimeter?",

options:[
"Defense in depth",
"Zero trust",
"Separation of duties",
"Implicit deny"
],

answer:"Zero trust",

explanation:"Zero trust requires continuous verification of users and devices regardless of their location.",

domain:"General Security Concepts"
},

];


export default set1;
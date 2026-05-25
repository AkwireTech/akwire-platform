export const generateRecommendations = (domainScores) => {

const recommendations = [];

if(domainScores.threats < 70){
recommendations.push({
domain:"Threats & Vulnerabilities",
lesson:"Malware Analysis",
lab:"Log Analysis Lab",
action:"Review Domain 2 lessons and complete the log analysis lab"
});
}

if(domainScores.architecture < 70){
recommendations.push({
domain:"Security Architecture",
lesson:"Zero Trust",
lab:"Firewall Configuration",
action:"Study Zero Trust architecture and complete firewall configuration lab"
});
}

if(domainScores.operations < 70){
recommendations.push({
domain:"Security Operations",
lesson:"Incident Response",
lab:"SIEM Investigation",
action:"Review incident response procedures and complete SIEM investigation"
});
}

if(domainScores.governance < 70){
recommendations.push({
domain:"Governance Risk Compliance",
lesson:"Risk Assessment",
lab:"Policy Review",
action:"Study risk assessment and complete policy review exercise"
});
}

if(domainScores.general < 70){
recommendations.push({
domain:"General Security Concepts",
lesson:"CIA Triad",
lab:"Encryption Basics",
action:"Review CIA triad concepts and complete encryption basics exercise"
});
}

return recommendations;

};
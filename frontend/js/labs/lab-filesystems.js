
export const fileSystems = {
    "lab-04": {
        home: {
            analyst: {
                "auth.log": `
May 07 01:14:02 server sshd[2101]: Failed password for admin from 192.168.15.201 port 51120 ssh2
May 07 01:14:04 server sshd[2102]: Failed password for admin from 192.168.15.201 port 51121 ssh2
May 07 01:14:06 server sshd[2103]: Failed password for root from 192.168.15.201 port 51122 ssh2
May 07 01:14:08 server sshd[2104]: Failed password for admin from 192.168.15.201 port 51123 ssh2
May 07 01:14:10 server sshd[2105]: Failed password for admin from 192.168.15.201 port 51124 ssh2
May 07 01:15:01 server sshd[2140]: ALERT: BRUTE FORCE DETECTED
May 07 01:15:01 server sshd[2140]: Source IP: 192.168.15.201
May 07 01:15:01 server sshd[2140]: Protocol: SSH
May 07 01:15:01 server sshd[2140]: Total failed attempts: 284
`,
                "config.yaml": `
server: production
firewall: enabled
logging: verbose
ssh:
  password_authentication: enabled
  root_login: enabled
`,
                "secret_notes.txt": `
username=admin
password=Cyber123
NOTE: Test credentials found in this simulated lab.
Do not reuse these credentials on real systems.
`,
                "incident_report.txt": `
INCIDENT: Suspected SSH brute-force attack

Source IP: 192.168.15.201
Target: production server
Protocol: SSH
Failed attempts: 284

Initial assessment:
Repeated authentication failures suggest automated password guessing.
Review SSH settings, authentication logs, and firewall policy.
`,
                "network_notes.txt": `
Production server: 192.168.15.10
Suspected source: 192.168.15.201
Service under investigation: SSH
Recommended checks:
1. Review authentication logs.
2. Verify SSH configuration.
3. Review firewall settings.
4. Document evidence before remediation.
`,
                "firewall.log": `
01:14:02 ALLOW TCP 192.168.15.201 -> 192.168.15.10:22
01:14:04 ALLOW TCP 192.168.15.201 -> 192.168.15.10:22
01:14:06 ALLOW TCP 192.168.15.201 -> 192.168.15.10:22
01:15:01 ALERT Repeated SSH connections from 192.168.15.201
`,
                "system.log": `
01:00:00 INFO System startup complete
01:10:00 INFO Monitoring service started
01:14:02 WARN Repeated SSH authentication failures detected
01:15:01 ALERT Possible brute-force activity
01:16:00 INFO Incident review required
`,
                www: {
                    "index.html": "<h1>Akwire Web Server</h1>",
                    "login.php": "<?php echo 'Login'; ?>"
                }
            }
        }
    },

    "SEC001": {
            home: {
                analyst: {
                    "firewall.txt": `
        Firewall Review
        Network traffic filtering is enabled.
        Control type: Technical
        `,
                    "password_policy.txt": `
        Password Policy Review
        Users must create strong passwords.
        Control type: Administrative
        `,
                    "security_camera.txt": `
        Security Camera Review
        Cameras are installed at facility entrances.
        Control type: Physical
        `
                }
            }
        }
};

export const fileSystems = {

    "lab-04": {

        home: {

            analyst: {

                "auth.log": `
Failed logins...
ALERT: BRUTE FORCE DETECTED

IP:
192.168.15.201

Protocol:
SSH

Attempts:
284
`,

                "config.yaml": `
server: production
firewall: enabled
logging: verbose
`,

                "secret_notes.txt": `
username=admin

password=Cyber123
`,

                www: {

                    "index.html":
                        "<h1>Akwire Web Server</h1>",

                    "login.php":
                        "<?php echo 'Login'; ?>"

                }

            }

        }

    }

};
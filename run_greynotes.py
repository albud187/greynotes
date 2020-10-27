import os
import subprocess

backend_commands = [
    r"C:\Users\alfab\anaconda3\Scripts\activate.bat",
    "activate djangoEnv001",
    r'cd C:\Users\alfab\Documents\_Projects\greynotes\backend',
    "python manage.py runserver"
]

frontend_commands = [
    r"C:\Users\alfab\anaconda3\Scripts\activate.bat",
    "activate djangoEnv001",
    r'cd C:\Users\alfab\Documents\_Projects\greynotes\frontend',
    'npm start'
]

def command_string(command_list):
    cmd_string = ' && '.join(command_list)
    return(cmd_string)

backend = subprocess.Popen(["start", "cmd", "/k", command_string(backend_commands)], shell = True)
frontend = subprocess.Popen(["start", "cmd", "/k", command_string(frontend_commands)], shell = True)

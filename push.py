import os
import subprocess

workspace = r"D:\OFFICE\LIVE\JUNE[16-06-26]\Language Translation & Certified Document Service"
os.chdir(workspace)

commands = [
    ["git", "init"],
    ["git", "remote", "add", "origin", "https://github.com/htmlstaticworks/Language_Translation_Certified_Document_Service.git"],
    ["git", "add", "."],
    ["git", "commit", "-m", "Finalize layout and premium aesthetic refinements"],
    ["git", "branch", "-M", "main"],
    ["git", "push", "-u", "origin", "main", "--force"]
]

for cmd in commands:
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)

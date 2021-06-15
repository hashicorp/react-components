## PowerShell + Docker for Windows Workflow

This `powershell` directory provides scripts to run the website locally via Docker Desktop on Windows

### Run the website

Be sure to open PowerShell Core at the root directory of the project.

The command to run the site via Docker on Windows (assuming Docker Desktop is installed) is:
```powershell
 .\scripts\powershell\Website.ps1
```
This will start the website in a Docker container and also start a PowerShell process to watch for changes in the `.\pages` directory.

The website container is automatically removed when `CTRL + C` is used to exit. 

### What does each file do?

- `Website.ps1` pulls the Docker image, starts the container and passes this information to the `FileWatch.ps1`
- `FileWatch.ps1`  runs a function to ping the Docker container filesystem when it receives change events from the `.\pages` directory on the host (Windows) filesystem. This is necessary since [Docker volumes do not yet support Windows filesystem notifications](https://forums.docker.com/t/file-system-watch-does-not-work-with-mounted-volumes/12038/20). This script importantly runs the appropriate Docker commands to notify the container of changes and achieve live-reload. 
- `Start-FileSystemWatcher.ps1` handles the file watching based on params we pass it



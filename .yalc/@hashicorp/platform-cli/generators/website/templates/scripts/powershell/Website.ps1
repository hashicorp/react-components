Write-Host "==> Downloading latest Docker image..."

& docker pull hashicorp/<%= name %>website

Write-Host "==> Starting website in Docker..."
$SiteRootPath = "$(Get-Location)"

& docker run -d --rm --tty --workdir "/website" --volume "$($SiteRootPath):/website" --volume "/website/node_modules" --publish "3000:3000" hashicorp/<%= name %>website npm start

$CurrentContainer = & docker ps --latest --format="{{.Names}}"

# Print container name for user to run `.\FileWatch.ps1 $ContainerName` if needed
Write-Host "Preparing file watch job for container:" $CurrentContainer 

try {
    while ($true) {
        # Find and run FileWatch script
        $scriptPath = Split-Path $MyInvocation.MyCommand.Path
        Push-Location $scriptPath
        # Start watching files on host; provide container to notify of events
        .\FileWatch.ps1 -SiteRootPath $SiteRootPath -ContainerName $CurrentContainer 
    }
}
finally { 
    # Catch `Ctrl + C` and do things before exit
    #
    # Go back to Site Root where the script was run initially.
    Push-Location $SiteRootPath
    # Kill docker container for convenience
    Write-Host "Preparing graceful exit for container:"
    & docker kill $CurrentContainer
}
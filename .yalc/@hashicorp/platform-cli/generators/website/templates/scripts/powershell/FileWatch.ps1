[Cmdletbinding()]
Param(
    [Parameter(Mandatory = $true)]
    [string]$SiteRootPath,
    [string]$PagesPath = "\pages",
    [Parameter(Mandatory = $true)]
    [string]$ContainerName
)

.\Start-FileSystemWatcher.ps1 "$($SiteRootPath)$($PagesPath)" -Recurse -CreatedAction {
    Write-Output "$(Get-Date -format 'yyyy-MM-dd HH:mm:ss') File '$($e.FullPath)' was created"
} -ChangedAction {
    # The following executes a rewrite of permissions to the file that was changed
    # This simply triggers a change that live-reloads as normal inside the container 
    & docker exec $ContainerName chmod 755 $e.FullPath.Replace("$($SiteRootPath)", "/website").Replace('\', "/")

    Write-Output "$(Get-Date -format 'yyyy-MM-dd HH:mm:ss') File '$($e.FullPath)' was changed"
} -DeletedAction {
    Write-Output "$(Get-Date -format 'yyyy-MM-dd HH:mm:ss') File '$($e.FullPath)' was deleted"
} -RenamedAction {
    Write-Output "$(Get-Date -format 'yyyy-MM-dd HH:mm:ss') File '$($e.OldFullPath)' was renamed to '$($e.FullPath)'"
}

Pop-Location "$(Split-Path $MyInvocation.MyCommand.Path)"
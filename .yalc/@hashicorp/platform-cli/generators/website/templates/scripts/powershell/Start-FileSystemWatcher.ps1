# Start-FileSystemWatcher.ps1 - File System Watcher in Powershell.
# Source: https://www.mobzystems.com/code/using-a-filesystemwatcher-from-powershell/

[CmdletBinding()]
Param(
    # The path to monitor
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Path, 
    # Monitor these files (a wildcard)
    [Parameter(Position = 1)]
    [string]$Filter = "*.*",
    # Monitor subdirectories?
    [switch]$Recurse,
    # Execute ths block on Created
    [scriptblock]$CreatedAction,
    # Execute ths block on Deleted
    [scriptblock]$DeletedAction,
    # Execute ths block on Changed
    [scriptblock]$ChangedAction,
    # Execute ths block on Renamed
    [scriptblock]$RenamedAction,
    # Check for ESC every ... seconds
    [int]$KeyboardTimeout = -1,
    # Redirect output of the actions to this log file, if specified
    [string]$LogFile = ''
)

# Helper function to set up variables $_, $eventArgs and $e
Function DoAction(
    # The action to execute. Is one of the script arguments $ChangedAction, $CreateAction, etc.
    [scriptblock]$action,
    # The name of the file, local to the path being watched
    [string]$_,
    # The [PSEventsArgs] object returned from Wait-Event
    [System.Management.Automation.PSEventArgs]$eventArgs,
    # For Renamed this is a RenamedEventArgs object, for the others a FileSystemEventArgs
    # FileSystemEventArgs has ChangeType, FullPath and Name;
    # RenamedEventArgs adds OldFullPath and OldName
    $e
) {
    # Execute the action and catch its output
    $output = Invoke-Command $action

    if ($output) {
        # Write to output
        Write-Output $output
        # And to log file if we have to
        if ($LogFile -ne '') {
            Write-Output $output >> $LogFile
        }
    }
}

# Sanity check: you have to provide at least one action
if (!$CreatedAction -and !$DeletedAction -and !$ChangedAction -and !$RenamedAction) {
    Write-error "Specify at least one of -CreatedAction, -DeletedAction, -ChangedAction or -RenamedAction"
    return
}

# Remove all event handlers and events
@( "FileCreated", "FileDeleted", "FileChanged", "FileRenamed" ) | ForEach-Object {
    Unregister-Event -SourceIdentifier $_ -ErrorAction SilentlyContinue
    Remove-Event -SourceIdentifier $_ -ErrorAction SilentlyContinue
}

# Do the file watching on the $Path argument's full path
[string]$fullPath = (Convert-Path $Path)

# Set up the file system watcher with the full path name of the supplied path
[System.IO.FileSystemWatcher]$fsw = New-Object System.IO.FileSystemWatcher $fullPath, $Filter -Property @{IncludeSubdirectories = $Recurse; NotifyFilter = [IO.NotifyFilters]'FileName, LastWrite, DirectoryName' }

# Register an event handler for all actions, if provided:
if ($CreatedAction) {
    Register-ObjectEvent $fsw Created -SourceIdentifier "FileCreated"
}
if ($DeletedAction) {
    Register-ObjectEvent $fsw Deleted -SourceIdentifier "FileDeleted"
}
if ($ChangedAction) {
    Register-ObjectEvent $fsw Changed -SourceIdentifier "FileChanged"
}
if ($RenamedAction) {
    Register-ObjectEvent $fsw Renamed -SourceIdentifier "FileRenamed"
}

[string]$recurseMessage = ''
if ($Recurse) {
    $recurseMessage = " and subdirectories"
}
[string]$pathWithFilter = Join-Path $fullPath $Filter

if ($KeyboardTimeout -eq -1) {
    Write-Host "Monitoring '$pathWithFilter'$recurseMessage. Press Ctrl+C to stop."
}
else {
    Write-Host "Monitoring '$pathWithFilter'$recurseMessage. Press ESC to cancel in at most $KeyboardTimeout seconds, or Ctrl+C to abort."
}

# Start monitoring
$fsw.EnableRaisingEvents = $true

[bool]$exitRequested = $false

do {
    # Wait for an event
    [System.Management.Automation.PSEventArgs]$e = Wait-Event -Timeout $KeyboardTimeout

    if ($e -eq $null) {
        # No evet? Then this is a timeout. Check for ESC
        while ($host.UI.RawUI.KeyAvailable) {
            $k = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp,IncludeKeyDown")
            if (($k.Character -eq 27) -and !$exitRequested) {
                Write-Host "ESC pressed. Exiting..."
                $exitRequested = $true
            }
        }
    }
    else {
        # A real event! Handle it:
        # Get the name of the file
        [string]$name = $e.SourceEventArgs.Name
        # The type of change
        [System.IO.WatcherChangeTypes]$changeType = $e.SourceEventArgs.ChangeType
        # The time and date of the event
        [string]$timeStamp = $e.TimeGenerated.ToString("yyyy-MM-dd HH:mm:ss")

        Write-Verbose "--- START [$($e.EventIdentifier)] $changeType $name $timeStamp"

        switch ($changeType) {
            Changed { DoAction $ChangedAction $name $e $($e.SourceEventArgs) }
            Deleted { DoAction $DeletedAction $name $e $($e.SourceEventArgs) }
            Created { DoAction $CreatedAction $name $e $($e.SourceEventArgs) }
            Renamed { DoAction $RenamedAction $name $e $($e.SourceEventArgs) }
        }

        # Remove the event because we handled it
        Remove-Event -EventIdentifier $($e.EventIdentifier)

        Write-Verbose "--- END [$($e.EventIdentifier)] $changeType $name $timeStamp"
    }
} while (!$exitRequested)

if ($CreatedAction) {
    Unregister-Event FileCreated
}
if ($DeletedAction) {
    Unregister-Event FileDeleted
}
if ($ChangedAction) {
    Unregister-Event FileChanged
}
if ($RenamedAction) {
    Unregister-Event FileRenamed
}

Write-Host "Exited."
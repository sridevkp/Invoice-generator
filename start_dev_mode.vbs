Dim objShell
Set objShell = WScript.CreateObject( "WScript.Shell" )
' objShell.Run("C:\Program Files\MongoDB Compass\MongoDBCompass.exe")
objShell.Run("cmd.exe /c npm start")
objShell.Run("cmd.exe /c code .")
Set objShell = Nothing
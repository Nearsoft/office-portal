#!/bin/bash

echo "Google Chrome will now open in Kiosk Mode"
osascript <<EOD

    
  tell application "Google Chrome"
      activate
  end tell
  
  
  tell application "System Events"
      key down {command}
      key down {control}
      keystroke "f"
      key up {control}
      key up {command}
  end tell
  
EOD

echo "Google Chrome is now open in Kiosk Mode"
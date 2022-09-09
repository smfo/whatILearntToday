
# Code shortcuts

Add custom shortcuts to keybindings.json
Ctrl + Shift + P
Preferences: Open Keyboard Shortcuts (JSON)

```js
[
    //log with comment + (value)
	{
		"key": "ctrl+shift+c",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "console.log('${TM_SELECTED_TEXT}$1')$2;"
		}
	},

    //log without comment + (value)
	{
		"key": "ctrl+shift+l",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "console.log(${TM_SELECTED_TEXT}$1)$2;"
		}
	},

    //this.(value)
	{
		"key": "ctrl+shift+t",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "this.${TM_SELECTED_TEXT}$1"
		}
	},

	//tap(res => console.log("res", res))
	{
		"key": "ctrl+shift+p ctrl+shift+t",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "tap(res => console.log('res', res)),"
		}
	},

	//md code snipet
	{
		"key": "ctrl+alt+s",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "```${TM_SELECTED_TEXT}\n$1\n```"
		}
	},
]
```

Others:

Ctrl + Alt + Left/Right //Move file to new split editor
Ctrl + E                //Open file by name
Ctrl + Tab              //Navigate split editor files
Ctrl + Number           //Change split editor in focus
Ctrl + B                //Close sidebar
Ctrl + Alt + Click      //Open deffinition in split editor
Alt + Shift + Up/Down   //Copy line up/down
Alt + Up/Down           //Move line up/down
Ctrl + Alt + Up/Down    //Add cursor up/below
Ctrl + F2               //Add cursor to every occurrence of current word
Ctrl + M                //Lists all current errors
F11                     //Fullscreen
Shift + F12             //Reference search
F2                      //Rename symbol
Ctrl + K + C            //Comment out
Ctrl + K + U            //Uncomment
Ctrl + K S          	//Save all files
Alt + Left				//Go to previous location
Ctrl + G 				//Navigate to specific line number in code
Ctrl + R 				//Open all recent projects

Ctrl + Shift + H 		//Replace occurence in all files edit window
/*Replace in all files -> click the icon next to the replace String
Replace all occurences in a file -> click the icon next to the file name
Replace one single occurence -> click the icon nex to the individual change*/
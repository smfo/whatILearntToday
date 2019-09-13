Add to keybindings.json


[
    //log with comment
	{
		"key": "ctrl+shift+c",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "console.log('${TM_SELECTED_TEXT}$1')$2;"
		}
	},

    //log without comment
	{
		"key": "ctrl+shift+l",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "console.log(${TM_SELECTED_TEXT}$1)$2;"
		}
	},

    //this.
	{
		"key": "ctrl+shift+t",
		"command": "editor.action.insertSnippet",
		"when": "editorTextFocus",
		"args": {
			"snippet": "this.${TM_SELECTED_TEXT}$1"
		}
	}
]

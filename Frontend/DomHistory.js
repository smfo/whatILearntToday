
// Use the broswer to navigate back and forth in the user history

window.history.back()           //loads the previous URL in the history list, same as back button in browser or history.go(-1)
window.history.forward()        //loads the next URL in the history list, same as forward button in browser or history.go(1)
window.history.go(number)       //loads a specific URL from the history list

history.length                  
// returns the number of URLs in the history list of the current browser window. Returns at least 1
// because the currently loaded page is included. Maximum length is 50
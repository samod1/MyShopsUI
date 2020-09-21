

var counter = 1;
var lastTabId = -1;
var activeTab=null;
var tabUrl=null;


function sendMessage(msg,responseFunction) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.tabs.sendMessage(lastTabId, msg,null,responseFunction);
  });
}


chrome.browserAction.setBadgeText({text: "MS"});
console.log("Loaded.");


chrome.runtime.onInstalled.addListener(function() {
    console.log("Installed.");
});
  
chrome.tabs.onCreated.addListener(function(tab){
        activeTab=tab;
        chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
            // Note: we also sent a message above, upon loading the event page,
            // but the content script will not be loaded at that point, so we send
            // another here.
            tabUrl = tab.pendingUrl;
            sendMessage("New Tab created");
          });
 });
  
/*  chrome.browserAction.onClicked.addListener(function() {
    // The event page will unload after handling this event (assuming nothing
    // else is keeping it awake). The content script will become the main way to
    // interact with us.
    window.alert("sssss11111")
    chrome.tabs.create({url: "http://google.com"}, function(tab) {
      chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
        // Note: we also sent a message above, upon loading the event page,
        // but the content script will not be loaded at that point, so we send
        // another here.
        sendMessage();
      });
    });
  }); */
  
  
  chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
      
    
    if (msg.msg === 'loginclick') {
       
        loginElementName = msg.loginElementName;
        response=null;
        //window.alert("loginElementName=" + loginElementName );
        //window.alert("loginElementName=" + loginElementName + " " + activeTab.id);
        
        chrome.tabs.executeScript(activeTab.id, {file: "content.js"}, function() {
                reponse = sendMessage(msg,function(response){
                    alert("@@331" + response);
                    sendResponse(response);
                });
            });
    }


    if (msg.msg === 'fillUserData') {
       
        userdata = msg.userdata;
        //window.alert("userdata=" + userdata );
        //window.alert("userdata=" + userdata + " " + activeTab.id);
        
        chrome.tabs.executeScript(activeTab.id, {file: "content.js"}, function() {
             response = sendMessage(msg,function(response){
                postData(api_baseurl+"fill/fillForm",{url: tabUrl,data: response})
                .then(data => {
                   reply = data                   
                   chrome.tabs.executeScript(activeTab.id, {file: "content.js"}, function() {
                    msg.msg = "fillElements"
                    msg.filldata = data
                    reponse = sendMessage(msg);
                });
                sendResponse(response);

             });
             
          });
          
        });
    }
  });
  
  
  chrome.runtime.onSuspend.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // After the unload event listener runs, the page will unload, so any
      // asynchronous callbacks will not fire.
      alert("This does not show up.");
    });
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({text: ""});
    chrome.tabs.sendMessage(lastTabId, "Background page unloaded.");
  });
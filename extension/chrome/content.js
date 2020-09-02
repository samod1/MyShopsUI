chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Got message from background page: " + msg.msg);
    // If the received message has the expected format...
    if (msg.msg === 'loginclick') {
        loginElementName = msg.loginElementName;
        element = document.getElementById(loginElementName);
        if(element != null)
          element.click();
        else{
          elements = document.getElementsByName(loginElementName);
          if(elements != null)
            elements[0].click();
        }     
        console.log("loginClick ");
        sendResponse(document.all[0].outerHTML);
    }

    if (msg.msg === 'fillUserData') {
        sendResponse({pageHtml: document.all[0].outerHTML});
    }

    if (msg.msg === 'fillElements') {
        
        var arrayLength = msg.filldata.length;
        for (var i = 0; i < arrayLength; i++) {
           console.log(msg.filldata[i]);
           if("id" in msg.filldata[i]){
              el = getElement(msg.filldata[i].id)
           }
           else{
                if("name" in msg.filldata[i]){
                  el = getElement(msg.filldata[i].name)
                }
            }
           if(el != null)  
            el.value = msg.filldata[i].value  ;   
        }
    }


});

function getCurrentTabUrl(){
    tab = chrome.tabs.getCurrent();
    let url = tab.url;
    return url;
}

function getElement(name){

    element = document.getElementById(name);
    if(element != null)
      return element;
    else{
      elements = document.getElementsByName(name);
      if(elements != null)
        return elements[0];
    }
};





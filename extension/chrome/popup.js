
var userdata=null;


document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('fillUserData');
  checkPageButton.addEventListener('click', function() {

    var loginButton = event.srcElement;
    var loginElementName = loginButton.dataset.loginElementName;
    chrome.runtime.sendMessage({msg: 'fillUserData',userdata: userdata}, function(response) {
          window.alert("@@1" + response.result);
      });
  }, false);
}, false);


window.onload = function WindowLoad(event) {

    getData(api_baseurl + 'qr/shopsShopsLinks')
    .then(data => {
      linksDiv = document.getElementById("links");
      for (const [key,val] of Object.entries(data.shopsShops_rsp)){
        cont = document.createElement("div");
        
        l = document.createElement("button");
        l.dataset.url = val.url;
        l.setAttribute("linktoeshop",key);
        l.appendChild(document.createTextNode(val.title));
        addOnClickLink(l);

        login = document.createElement("button");
        login.dataset.loginElementName = val.loginElementName;
        login.setAttribute("logintoeshop",key);
        login.appendChild(document.createTextNode("Prihlasit"));
        addOnClickLogin(login);  

        cont.appendChild(l);
        cont.appendChild(login); 

        linksDiv.appendChild(cont);
        
      }
      console.log(data); // JSON data parsed by `data.json()` call
    });

    getData(api_baseurl+"qr/userData")
    .then(data => {
       userdata = data; 
    });

}

function addOnClickLink(element){
    
    element.onclick =  function(event) {
      var linkButton = event.srcElement;
      var linkurl = linkButton.dataset.url;
      chrome.tabs.create({url:linkurl});
  
    };
}

function addOnClickLogin(element){
  element.onclick =  function(event) {
    
    var loginButton = event.srcElement;
    var loginElementName = loginButton.dataset.loginElementName;

    chrome.runtime.sendMessage({msg: 'loginclick',loginElementName: loginElementName}, function(response) {
        window.alert("@@2" +response.result);
    });
    
  };
}

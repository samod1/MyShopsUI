

languagesAreSet=false



// Saves options to chrome.storage
function save_options() {
    // var color = document.getElementById('color').value;
    // var likesColor = document.getElementById('like').checked;
    // chrome.storage.sync.set({
    //   favoriteColor: color,
    //   likesColor: likesColor
    // }, function() {
    //   // Update status to let user know options were saved.
    //   var status = document.getElementById('status');
    //   status.textContent = 'Options saved.';
    //   setTimeout(function() {
    //     status.textContent = '';
    //   }, 750);
    // });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    // chrome.storage.sync.get({
    //   favoriteColor: 'red',
    //   likesColor: true
    // }, function(items) {
    //   document.getElementById('color').value = items.favoriteColor;
    //   document.getElementById('like').checked = items.likesColor;
    // });
  }


  function setupPage(){

      lang=localStorage.getItem("lang")
      if(lang==null)
        lang = 'en_US'
      doTranslation(lang);
  }


  function doTranslation(lang){

    if(lang)
      url = api_baseurl + 'clienttranslation/options/' + lang;
    else  
      url = api_baseurl + 'clienttranslation/options/en_US';

    localStorage.setItem('lang',lang);

    getData(url)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      translatePage(data);
    });

  }

  function translatePage(translationData){

    items = translationData['items'];

    // Set languages
    if(!languagesAreSet) {
      languages = items["languages"];
      langsel = $("#languages");
      // odpojenie event listenerov
      langsel.unbind();
  
      for (const lang of Object.entries(languages)){
        langsel.append($('<option/>')
                .attr("value",lang[1].lang)
                .text(lang[1].text));
      }
  
    }

    for (const [key,val] of Object.entries(items)){

        if(key != "languages"){

          var el = $('*[data-translate=' + key + ']');
          try {
            el[0].childNodes[0].textContent = val;
          } catch (error) {
          }
        }
    }

    // listener to change lang selection
    if(!languagesAreSet){
      $( "#languages" )
      .change(function () {
        doTranslation(this.value)
      });
      languagesAreSet=true;
    }

  }


  document.addEventListener('DOMContentLoaded', restore_options);
  document.addEventListener('DOMContentLoaded', setupPage);
  //document.getElementById('save').addEventListener('click',
  //    save_options);




      $(".reveal").on('click',function() {
        var $pwd = $(".pwd");
        if ($pwd.attr('type') === 'password') {
            $pwd.attr('type', 'text');
            $img = $("#passwordeye");
            $img.attr("src","bootstrap-4.5.2-dist/icons/eye-slash.svg");
        } else {
            $pwd.attr('type', 'password');
            $img = $("#passwordeye");
            $img.attr("src","bootstrap-4.5.2-dist/icons/eye.svg");
        }
    });      





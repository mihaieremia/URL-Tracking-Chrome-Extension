
var localstorage=[];
var lastTabId;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
if(tab.status=="complete")
{
  var url = new URL(tab.url)
  var time = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

  if(localstorage[tabId].url==null){
    var data=[];
    data['time']=time;
    data['url']=tab.url;
    data['host']=url.hostname;
    localstorage[tabId]=data;
    lastTabId=tabId;
    console.log("Am intrat pe domeniul: "+url.hostname + " la adresa: "+tab.url);
  }
  else if(localstorage[tabId].url!==tab.url)
  {
    var open = localstorage[tabId].time;
    var close  =  Date.now();
    var diff = close - open;
    console.log("Am inchis "+ localstorage[tabId].url + " si intru pe "+tab.url+ " dupa "+ diff/1000);
      chrome.storage.local.get('userid', function(id) {
        var data={
        open: open,
        close: close,
        diff: (diff/1000),
        url:localstorage[tabId].url,
        host:localstorage[tabId].host,
        userid: id.userid
      };
      (async () => {
        const rawResponse = await fetch('http://infoeducatie-web-open/api/close', {
          method: 'POST',
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      })();
    });
    var data=[];
    data['time']=time;
    data['url']=tab.url;
    data['host']=url.hostname;
    localstorage[tabId]=data;
    lastTabId=tabId;
  }
  else
  {
    console.log("Am dat refresh la adresa: "+tab.url);
  }

}
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
    var tabid = activeInfo.tabId;
     var url = new URL(tab.url)
     var time = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
     console.log("Am intrat pe domeniul: "+url.hostname + " la adresa: "+tab.url);
     if(localstorage[tabid]==null || localstorage[lastTabId]==null  || localstorage[lastTabId].url==null || localstorage[lastTabId].host==null)
     {
      var data=[];
      data['time']=time;
      data['url']=tab.url;
      data['host']=url.hostname;
      localstorage[tabid]=data;
      lastTabId=tabid;
     }
     else if(localstorage[lastTabId].url!==url)
     {
        var open = localstorage[lastTabId].time;
        var close  =  Date.now();
        var diff = close - open;
          chrome.storage.local.get('userid', function(id) {
            var data={
            open: open,
            close: close,
            diff: (diff/1000),
            url:localstorage[lastTabId].url,
            host:localstorage[lastTabId].host,
            userid: id.userid
          };
          lastTabId=tabid;
          (async () => {
            const rawResponse = await fetch('http://infoeducatie-web-open/api/close', {
              method: 'POST',
              headers: {
             //   'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
          })();
        });
        var data=[];
        data['time']=time;
        data['url']=tab.url;
        data['host']=url.hostname;
        localstorage[tabid]=data;
     }
  });
});  
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    var open = localstorage[tabId].time;
    var close  = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
    var diff = close - open;
    var url = localstorage[tabId].url;
    console.log("Am inchis: "+ url + " dupa "+ diff/1000 + " secunde.");
    chrome.storage.local.get('userid', function(id) {
        var data={
        open: open,
        close: close,
        diff: (diff/1000),
        url:url,
        host:localstorage[tabId].host,
        userid: id.userid
      };
          (async () => {
            const rawResponse = await fetch('http://infoeducatie-web-open/api/close', {
              method: 'POST',
              headers: {
              // 'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
          })();
      delete localstorage[tabId];
    });
     
});
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install")
  {
          userid = getRandomToken();
          chrome.runtime.getPlatformInfo(function(info) {
            var data={
              info: info.os,
              userid: userid
            };
              fetch('http://infoeducatie-web-open/api/new', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
        });
          chrome.storage.local.set({userid: userid}, function() {
          });
      
  }
  else if(details.reason == "update")
  {
      var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
  }
});
function getRandomToken() {
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
  }
  return hex;
}
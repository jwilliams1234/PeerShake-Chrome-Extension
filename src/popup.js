// chrome.tabs.query({
//     active: true,
//     currentWindow: true
// }, (tabs) => {
//     const { url, title } = tabs[0]

//     // const info = document.getElementById('fairshakeBkletInfo')
//     // info.style.display = 'block'

//     const link = document.getElementById('fairshakeBkletLink')
//     link.setAttribute('href', 'http://127.0.0.1:35729/chromeExtensionBase/?title=' + encodeURIComponent(title)+"&url="+encodeURIComponent(url));
//     link.style.display = 'block'

//     const info = document.getElementById('fairshakeBkletInfo')
//     info.setAttribute('href', 'http://127.0.0.1:35729/comment/' + encodeURIComponent(title));
//     info.style.display = 'block'

// })

//script to add chrome extension to bioRxiv page
//we'll see how well this goes 
function openFrame(obj,lk,height){
    //var frame = document.querySelector(id);
    obj.style.display="block";
    obj.src=lk;
    obj.setAttribute('width', '100%');
    obj.setAttribute('height', height);
    obj.style.visibility="visible";
    document.getElementById("panels-ajax-tab-container-highwire_article_tabs").style.display = 'none';
    document.getElementsByClassName('active')[0].classList.remove('active');
}
function closeFrame(obj){
    obj.style.display = 'none';
    obj.setAttribute('width', '0px');
    obj.setAttribute('height','0px');

}


//////////////////////////
//necessary constants 
var title=document.title
var url = document.URL
var link1 = 'https://127.0.0.1:35729/chromeExtensionBase/?title=' + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
var link2 = 'https://127.0.0.1:35729/comment/' + encodeURIComponent(title);
//////////////////////////

//true code
//follow lines obtain the panels class 
var mainPanel = document.getElementsByClassName("main-content-wrapper grid-17 suffix-1 alpha")[0];
var mainInside = mainPanel.getElementsByClassName("inside")[0];
var abMetPanel = mainInside.getElementsByClassName("panel-pane pane-highwire-panel-tabs pane-panels-ajax-tab-tabs panels-ajax-tabs-once-processed")[0];
var abMetList = abMetPanel.getElementsByClassName("tabs inline panels-ajax-tab")[0];
//creates a refrence of the definite last list item to add elements 
//before it later 
var refrenceNode = abMetPanel.getElementsByClassName("last")[0];
var listAdd = document.createElement("li");
var listAdd2 = document.createElement("li");

// console.log('appending');

//creating generic href links  
var a1 = document.createElement('a');
a1.textContent = "Submit a Review";

// a1.setAttribute('target', "_blank") //necessary to open link in new tab 

var a2 = document.createElement('a');
a2.textContent = "Reviews";
// a2.setAttribute('href', link2);
// a2.setAttribute('target', "_blank")

//styles links in the syle on biorxiv 
a1.className="panels-ajax-tab-tab panels-ajax-tabs-once-processed hw-panels-ajax-tabs-once-processed";
a1.style = "cursor: pointer;";

// var frame = document.createElement('iframe')
// frame.src=link1;
// frame.setAttribute('width', '100%');
// frame.setAttribute('height', '100%');

// abMetList.appendChild(frame);
// var newDiv = document.createElement('div');
// newDiv.className = "blocker";

// a1.appendChild(newDiv);
// a1.appendChild(frame);

a2.className="panels-ajax-tab-tab panels-ajax-tabs-once-processed hw-panels-ajax-tabs-once-processed";
a2.style = "cursor: pointer;";

a1.setAttribute('href', '#');
a2.setAttribute('href','##');

//creates submit review iframe and adds it to tab
var frame = document.createElement('iframe');
frame.id = "#subRev";
frame.style.display=null;
frame.setAttribute('width', '0');
frame.setAttribute('height', '0');
frame.style.visibility="hidden";
a1.addEventListener("click", function(){
    openFrame(frame,link1,'1000px')
    closeFrame(frame2);
    listAdd.className = "active"
}  
);
// a1.addEventListener("click", function(){
//     listAdd.className = "active"
// } 
// );

//creates review comments iframe and adds it to tab 
var frame2 = document.createElement('iframe');
frame2.id = "#revCom";
frame2.style.display=null;
frame2.setAttribute('width', '0');
frame2.setAttribute('height', '0');
frame2.style.visibility="hidden";
a2.addEventListener("click", function(){
    openFrame(frame2,link2, '500px');
    closeFrame(frame);
    listAdd2.className = "active"
} 
);
// a2.addEventListener("click", function(){
//     listAdd2.className = "active"
// } 
// );


// adds href links to proper list 
listAdd.appendChild(a1);
listAdd.appendChild(frame);
listAdd2.appendChild(a2);
listAdd2.appendChild(frame2);
refrenceNode.before(listAdd2);
refrenceNode.before(listAdd);
// window.location.href="";
// window.location.reload(true);
abMetList.getElementsByClassName('first')[0].addEventListener('click',function(){
    closeFrame(frame);
    closeFrame(frame2);
    abMetList.style.display='block'
});
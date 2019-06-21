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
var link1 = 'https://amp.pharm.mssm.edu/peershake/chromeExtensionBase/?title=' + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
var link2 = 'https://amp.pharm.mssm.edu/peershake/comment/' + encodeURIComponent(title)+'/all';
const id = "panels-ajax-tab-container-highwire_article_tabs";
const subID = "highwire_article_tabs";
const genID = 'panels-ajax-tab-wrap-';
/////////////////////////

//true code
//follow lines obtain the panels class 
var mainPanel = document.getElementsByClassName("main-content-wrapper grid-17 suffix-1 alpha")[0];
var mainInside = mainPanel.getElementsByClassName("inside")[0];
var abMetPanel = mainInside.getElementsByClassName("panel-pane pane-highwire-panel-tabs pane-panels-ajax-tab-tabs panels-ajax-tabs-once-processed")[0];
var abMetList = abMetPanel.getElementsByClassName("tabs inline panels-ajax-tab")[0];
//creates a refrence of the definite last list item to add elements 
//before it later 
var refrenceNode = abMetPanel.getElementsByClassName("last")[0];
var listAddSubmitReview = document.createElement("li");
var listAddReviews = document.createElement("li");

// console.log('appending');

//creating generic href links  
var a1 = document.createElement('a');
a1.textContent = "Submit Review";

//styles links in the syle on biorxiv 
a1.className="panels-ajax-tab-tab panels-ajax-tabs-once-processed hw-panels-ajax-tabs-once-processed";
a1.style = "cursor: pointer;";
a1.setAttribute('data-panel-name','biorxiv_tab_submit');
a1.setAttribute('data_target_id', subID);
a1.setAttribute('href','#submit-review');


var a2 = document.createElement('a');
a2.textContent = "Reviews";

a2.className="panels-ajax-tab-tab panels-ajax-tabs-once-processed hw-panels-ajax-tabs-once-processed";
a2.style = "cursor: pointer;";
a2.setAttribute('href','#reviews');
a2.setAttribute('data-panel-name','biorxiv_tab_review');
a2.setAttribute('data_target_id', subID);




//creates submit review iframe and adds it to tab
var frame = document.createElement('iframe');
frame.id = "#subRev";
frame.style.display=null;
frame.setAttribute('width', '100%');
frame.setAttribute('height', '1000px');
frame.src = link1;

//this event listener will: 
//1. set list to active and remove active from current list item *check*
//2. set style of target div to block and  set current active to none 
a1.addEventListener("click", function(){
    //deals with task 2
    var sub = document.getElementsByClassName('active')[0];
    var end = sub.getElementsByTagName('a')[0].getAttribute('data-panel-name');

    var main = document.getElementById(id);
    var submain = main.getElementsByClassName(genID+end)[0];
    submain.style.display = 'none';

    var newBlock = main.getElementsByClassName("panels-ajax-tab-wrap-biorxiv_tab_submit")[0];
    newBlock.style.display = 'block';

    //deals with task 1
    document.getElementsByClassName('active')[0].classList.remove('active');   
    listAddSubmitReview.className = "active";
} 
);

//creates review comments iframe and adds it to tab 
var frame2 = document.createElement('iframe');
frame2.id = "#rev";
frame2.style.display=null;
frame2.setAttribute('width', '100%');
frame2.setAttribute('height', '400px');
frame2.src = link2;

a2.addEventListener("click", function(){
    var sub = document.getElementsByClassName('active')[0];
    var end = sub.getElementsByTagName('a')[0].getAttribute('data-panel-name');

    var main = document.getElementById(id);
    var submain = main.getElementsByClassName(genID+end)[0];
    submain.style.display = 'none';

    var newBlock = main.getElementsByClassName("panels-ajax-tab-wrap-biorxiv_tab_review")[0];
    newBlock.style.display = 'block';

    //deals with task 1
    document.getElementsByClassName('active')[0].classList.remove('active');   
    listAddReviews.className = "active";
} 
);

var mainDIV = document.getElementById(id);
var subDIV = document.createElement('div');
subDIV.className="panels-ajax-tab-wrap-biorxiv_tab_submit";
subDIV.style.display='none';
subDIV.appendChild(frame);
mainDIV.appendChild(subDIV);

var reviewDIV = document.createElement('div');
reviewDIV.className=genID+'biorxiv_tab_review';
reviewDIV.appendChild(frame2);
reviewDIV.style.display='none';
mainDIV.appendChild(reviewDIV);

// adds href links to proper list 
listAddSubmitReview.appendChild(a1);
listAddReviews.appendChild(a2);
refrenceNode.before(listAddReviews);
refrenceNode.before(listAddSubmitReview);

if (window.location.hash === '#reviews') {
    setTimeout(() => a2.click(), 250)
} else if (window.location.hash === '#submit-review') {
    setTimeout(() => a1.click(), 250)
}
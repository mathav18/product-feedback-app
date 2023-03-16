//go to home from details

function gotoHome(){
    window.location='home'
}

//newwwww create feed back
function newfeedback(){
    window.location='/newOne';
}

//reeeeplay commend  new replay

function replayCommend(ele){
  let element=ele.parentNode.parentNode.nextElementSibling;
  element.style.display="block"
}

function replay__text_show(ele){
    let element=ele.parentNode.nextElementSibling;
    element.style.display="block"
}
//creat new feedback fetch method

function createNewFeedback(){
    
    let title=document.querySelector('.titleArea').innerText;
    let category=document.querySelector('.category').value;
    let details=document.querySelector(".detailArea").innerText;

    let obj={
        'title':title,
        'category':category,
        "details":details,
        'upvotes':0,
        "status":"suggestion",
        "commentid":0
    }


    fetch('/create',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)})

        .then((res)=>{return res.json();})
         window.location='/home';
         
}

//filter
function filter(ele,val){
 



    let btns=document.querySelectorAll('.btn');

    console.log(btns)
    for(let e=0;e<btns.length;e++){
        btns[e].style.background="#F2F4FF";
            btns[e].style.color='#4661E6'

        if(e==val-1){
            console.log(val)
            btns[e].style.background="#4661E6";
            btns[e].style.color='#fff'
        }
       }




let query="ALL";

if(ele!=""){
    query=ele.innerText.toUpperCase();
}

let elementArr=document.querySelectorAll('.content__div');
for(let i of elementArr){
    let baby=i.childNodes[3].childNodes[5].innerText.toUpperCase();


     if(query==baby){
        i.style.display='block';
        i.style.display='grid'
     }else{
        i.style.display='none';
        
     }
     if(query=='ALL'){
        i.style.display='block';
        i.style.display='grid'
     }
}
}

filter("",1);
//add upvotes and remove upvotes

function addUpvotes(ele){
    let arr=ele.value.split(" ");
  let child=ele.childNodes[3]

    if(arr[1]==0){
        ele.style.background="#62BCFA";
        child.style.color="#fff";
        ele.value=arr[0]+" "+1;
        child.innerText=Number(child.innerText)+1;
        
        addUpvotesFetch(arr[0],child.innerText);
    }else{
        ele.style.background="#F2F4FF";
        child.style.color="#4661E6";
        ele.value=arr[0]+" "+0;
        child.innerText=Number(child.innerText)-1;
        console.log(true)
        removeUpvotes(arr[0],child.innerText)
    }
}
//add upvotes fetch
function addUpvotesFetch(id,val){
    let obj={
        'id':id,
        'upvotes':val,
        'lke':1
    }
    fetch('/AddUpvotes',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })
      .then((res)=>{return res.json()})
   
    
}
//remove upvotes fetch
function removeUpvotes(id,val){
    let obj={
        'id':id,
        'upvotes':val,
        'lke':0
    }
    fetch('/AddUpvotes',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })
      .then((res)=>{return res.json()})
}


//delete box show and hide
$(document).ready(function(){
    $(".delete__button").click(function(){
      $("#deleteBox").slideToggle("fast");
    
    });
  });

  $(document).ready(function(){
    $("#cancel").click(function(){
      $("#deleteBox").slideToggle("fast");
    });
  });
  //EDIT AND SAVE BOX 
  $(document).ready(function(){
    $(".savebutton").click(function(){
      $("#deleteBoxtwo").slideToggle("fast");
      
    });
  });
//sorter function
function sorter(ele){


    if(ele.value==0){
        window.location='home'
        return "";
    }
if(ele.value==1||ele.value==2){
    mostUpvotes(ele.value);
}else{
   mostComment(ele.value);
}
}
//most upvotes function 
function mostUpvotes(e){


    let parent=document.querySelector('.feed__container');
    var arr=Array.from(document.querySelectorAll(".up"));
   
   let eleArr=[];

   if(e==1){
    var arr1=arr.sort((a, b) => b.innerText - a.innerText);
  }else
  {
    var arr1=arr.sort((a, b) => a.innerText - b.innerText);
}

for(let i of arr1){
    eleArr.push(i.parentNode.parentNode)
   }
   parent.innerHTML="";

   eleArr.map((x)=>
{
    parent.appendChild(x)
})
}

//most comment function
function mostComment(e){
    if(e==0){
        
    }
    let parent=document.querySelector('.feed__container');
    var arr=Array.from(document.querySelectorAll(".comm"));
   
   let eleArr=[];

   if(e==3){
    var arr1=arr.sort((a, b) => b.innerText - a.innerText);
  }else
  {
    var arr1=arr.sort((a, b) => a.innerText - b.innerText);
}

for(let i of arr1){
    eleArr.push(i.parentNode.parentNode.parentNode.parentNode)
   }
   parent.innerHTML="";

   eleArr.map((x)=>
{
    parent.appendChild(x)
})
}


let Mydata={

    "image": "./assets/user-images/image-zena.jpg",
    "name": "Zena Kelley",
    "username": "velvetround"
}
console.log(Mydata.image)

function createReply(ele){
    
let content=ele.previousElementSibling.innerText;
let arr=ele.value.split(" ");
  console.log(arr)
let obj={
    'id':arr[0],
    'content':content,
    'reportingTo':arr[2],
    'user':Mydata,
    'uniqueid':arr[1]
}

fetch('/newReply',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(obj)
  })
  .then((res)=>{return res.json()})

   window.location.reload();
}


//add comment 

function AddComment(ele){
let content=document.querySelector('.comment__text__area').innerText;
let uniqueId=Number(localStorage.getItem("commentlength"))+1;
console.log(uniqueId,content)
    let obj={
        'id':ele.value,
        'content':content,
        'user':Mydata,
        'uniqueid':uniqueId
    }
    fetch('/newComment',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })


      .then((res)=>{return res.json()});
    localStorage.setItem('commentlength',uniqueId)
      window.location.reload();
}
//edi feed back fetch method
function editfeedback(ele,val){

    

    let id=ele.value;
    let title=document.querySelector('.titleArea').innerText;
    let category=document.querySelector('.category').value;
    let status=document.querySelector('#status').value;
    let content=document.querySelector('.detailArea').innerText;

    let obj={
        'id':id,
        'title':title,
        'category':category,
        'status':status,
        'content':content
    }



    fetch('/EditAndSave',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
      })
      .then((res)=>{return res.json()})
}

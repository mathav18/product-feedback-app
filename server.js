const express=require('express');
const app =express();
const port=3100;
const database=require('mysql');
const bodyParser=require('body-parser');
const { render } = require('ejs');
const { json } = require('body-parser');


let db=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'projectFeedBack'
});




app.use(express.static('public'));
app.set("view engine","ejs");

// let data=require ('./public/data.json');
// let product=data.productRequests;

// let dataArr =[];

// console.log(product);

// for(let i of product){
//     let id=i.id;
//     let comments=i.comments

//             for(let j of comments){

//                 let r=j.replies;
//                 let unique=j.id;

//                 if(r!=undefined)
//                 {
                     
                
//    for(let k of r){
//                 let con=k.content;
//                 let user=JSON.stringify(k.user);
//                let report=k.replyingTo;


//                 let obj={
//                   'id':id,
//                   "content":con,
//                   "report":report,
//                   'user':user,
//                   'uniqueId':unique
//                 }
         
//              let send=Object.values(obj)
//              dataArr.push(send)

//             }
//             }
//             }
          
// }




    

   

var urlencode=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());




app.get('/home',(req,res)=>{
    //get feedback from  contentTable And send to home.ejs;
    let sql=`select * from contentTable`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('home',{result})
        }
    })
})



let feedback="";
let comments="";
let replay="";
//go to feedback details pagr from home
app.post('/getfeedBackDetails',urlencode,(req,res)=>{
    let  id =req.body.id;
   
//value from content table;
let sql=`select * from contentTable WHERE id=${id}`;
db.query(sql,(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            feedback=result1;


//value from commenttable 
 sql=`select * from commentTable WHERE id=${id}`;
    db.query(sql,(err,result2)=>{
            if(err){
                console.log(err)
            }else{
                comments=result2;



                 sql=`select * from ReplayTable WHERE id=${id}`;
     db.query(sql,(err,result3)=>{
            if(err){
                console.log(err)
            }else{
                replay=result3;
               
                res.render('feedbackDetails',{feedback,comments,replay});
               }
             })
            }
          })
        }
      })
    })







app.get('/newOne',(req,res)=>{
    res.render('newOne')
 })

 app.get('/edit',(req,res)=>{
    res.render('edit')
 })

 app.get('/road',(req,res)=>{
  let sql=`select * from contentTable`;
  db.query(sql,(err,result)=>{
      res.render('road',{result})
  })

 })

 app.post('/deletefeed',urlencode,(req,res)=>{
    let sql=`DELETE FROM contentTable WHERE id=${req.body.feedId}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            sql=`DELETE FROM commentTable WHERE id=${req.body.feedId}`;
            db.query(sql,(err,result)=>{
                if(err){

                }else{
                    sql=`DELETE FROM ReplayTable WHERE id=${req.body.feedId}`;
                    db.query(sql,(err,result)=>{
                        if(err){
        
                        }else{
                            res.redirect('home')
                        }
                         })
                        }
            })


        
           
        }
        
    })
 })
 



//new reply
let replayArr=[];
app.post('/newReply',urlencode,(req,res)=>{
    let id=req.body.id;
    let content=req.body.content;
    let reportingTo=req.body.reportingTo;
    let user=JSON.stringify(req.body.user);
    let uniqueId=req.body.uniqueid;

 let sql=`insert into ReplayTable values (${id},'${content}','${reportingTo}','${user}',${uniqueId})`;
    db.query(sql,[replayArr],(err,res)=>{
       
    })

})


//Add comment method 

app.post('/newComment',urlencode,(req,res)=>{
    let id=req.body.id;
    let content=req.body.content;
    let user=JSON.stringify(req.body.user);
    let uniqueId=req.body.uniqueid;
    let len=0;

    let sql=`select * from commentTable WHERE id=${req.body.id}`;

    db.query(sql,(err,result)=>{
      len=result.length;

       console.log(len)
      sql=`UPDATE contentTable SET commentLength=${len} WHERE id=${req.body.id}`
        db.query(sql,(err,result)=>{
        if(err){

        }else{
            console.log("successfull")
        }
          
    
    let sql=`insert into commentTable values (${id},'${content}','${user}',${uniqueId})`;
    db.query(sql,[replayArr],(err,res)=>{ });
    })
})
})

//create productfeedback
app.post('/create',urlencode,(req,res)=>{
    let title=req.body.title;
    let category=req.body.category;
    let upvotes=req.body.upvotes;
    let status=req.body.status;
    let commentid=req.body.commentid;
    let description=req.body.details;

    let sql=`insert into contentTable (title,category,upvotes,status,description,commentLength,bookmark) values ('${title}','${category}',${upvotes},'${status}','${description}',${commentid},0)`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("successfull")
        }
    })
})

//edit feedback
app.post('/editFeedback',urlencode,(req,res)=>{
    let id=req.body.editId;
    let sql=`select * from contentTable WHERE id=${id}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('edit',{result})
        }
    })
})


app.post('/EditAndSave',(req,res)=>{
    let upvotes=0;
    let len=0;
    console.log(req.body.status)
    let sql=`select * from commentTable WHERE id=${req.body.id}`;

    db.query(sql,(err,result)=>{
      len=result.length;
       
   sql=`UPDATE contentTable SET title='${req.body.title}',category='${req.body.category}',status='${req.body.status}',description='${req.body.content}',commentLength=${len} WHERE id=${req.body.id}`;
      db.query(sql,(err,resul)=>{
       
      })
    })
})

//add upvotes
app.post('/AddUpvotes',(req,res)=>{

   let sql=`UPDATE contentTable SET upvotes=${req.body.upvotes} WHERE id=${req.body.id}`
   db.query(sql,(err,result)=>{
   console.log(req.body.lke)
    if(err){console.log(err)}else{
        sql=`UPDATE contentTable SET bookmark=${req.body.lke} WHERE id=${req.body.id}`
        db.query(sql,(err,result)=>{
            if(err){console.log(err)}else{console.log("sucessfull")}
        });
    }
   })
})
//delete feedback




//save and change get feedback
app.post('/getfeed',urlencode,(req,res)=>{
    let  id =req.body.feedId;
   
//value from content table;
let sql=`select * from contentTable WHERE id=${id}`;
db.query(sql,(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            feedback=result1;


//value from commenttable 


 sql=`select * from commentTable WHERE id=${id}`;
    db.query(sql,(err,result2)=>{
            if(err){
                console.log(err)
            }else{
                comments=result2;



                 sql=`select * from ReplayTable WHERE id=${id}`;
     db.query(sql,(err,result3)=>{
            if(err){
                console.log(err)
            }else{
                replay=result3;
               res.render('feedbackDetails',{feedback,comments,replay});
               }
             })
            }
          })
        }
      })
    })

    // /DELETE FEED BACK
    





app.listen(port,()=>{console.log("lisnting port",port);})

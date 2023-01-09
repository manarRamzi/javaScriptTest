import express = require('express');
const router = require("express").Router();

const fs = require("fs");
let count:number=0
// Storing the JSON format data in myObject
var data = fs.readFileSync("TestData.json");
type list={
  id:number,
  word:string,
  pos:string
}
type myObjectData={
    wordList:[]|never,
    scoresList:[]

}


  let object:list

var myObject:myObjectData = JSON.parse(data);
var array:[] = [];

router.get("/qus", async (req:express.Request, res:express.Response)=> {

  let m:any = () => {
    let random:number = Math.floor(Math.random() * myObject.wordList.length);
    let check:boolean = array.includes(myObject.wordList[random]);
      object=myObject.wordList[random]
     
    if (check === false) {
      array.push(myObject.wordList[random]);
      console.log(object.word)
      res.status(200).json({ message: object.word, count});
    } else {
      if (array.length <= 15) {
      return  m();
      }
    }
  
  };

  if (array.length <15) {
      m();
    } else{
      res.status(200).json({ message: "done", count });

    }

});

router.post("/answer", async(req:express.Request, res:express.Response)=>{

    try {
        if(!req.body.answer){
            res.status(400).json({ message: "place enter data "});
        }
        const answer = {
            answer: req.body.answer,
        }
        
        console.log(object.pos,req.body.answer)
        if(req.body.answer == object.pos){
          count=count+1
            console.log(count)
        }
        res.status(200).json({answer,count})
    }catch (err){
console.log(err)

        res.status(500).json({ message: "error "});
    }
})



module.exports = router;
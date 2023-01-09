"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const fs = require("fs");
let count = 0;
// Storing the JSON format data in myObject
var data = fs.readFileSync("TestData.json");
let object;
var myObject = JSON.parse(data);
var array = [];
router.get("/qus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let m = () => {
        let random = Math.floor(Math.random() * myObject.wordList.length);
        let check = array.includes(myObject.wordList[random]);
        object = myObject.wordList[random];
        if (check === false) {
            array.push(myObject.wordList[random]);
            console.log(object.word);
            res.status(200).json({ message: object.word, count });
        }
        else {
            if (array.length <= 15) {
                return m();
            }
        }
    };
    if (array.length < 15) {
        m();
    }
    else {
        res.status(200).json({ message: "done", count });
    }
}));
router.post("/answer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.answer) {
            res.status(400).json({ message: "place enter data " });
        }
        const answer = {
            answer: req.body.answer,
        };
        console.log(object.pos, req.body.answer);
        if (req.body.answer == object.pos) {
            count = count + 1;
            console.log(count);
        }
        res.status(200).json({ answer, count });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error " });
    }
}));
module.exports = router;

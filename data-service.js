const fs = require("fs");

let students = [];
let programs = [];


module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/programs.json','utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }

            programs = JSON.parse(data);
            // programs = require('./data/programs.json');

            fs.readFile('./data/students.json','utf8', (err, data) => {
                if (err) {
                    reject(err); return;
                }

                students = JSON.parse(data);
                // students = require('./data/students.json');
                resolve();
            });
        });
    });
}

module.exports.addStudent(studentData) = function()
        {
    return new Promise((resolve,reject)=>
    {
        if (studentData.isInternationalStudent  == 0) 
        {
            reject("false"); return;
        }

        resolve(true);
    })
}

module.exports.getAllStudents = function(){
    return new Promise((resolve,reject)=>{
        if (students.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(students);
    })
}

module.exports.getInternationalStudents = function () {
    return new Promise(function (resolve, reject) {
        // var filteredStudents = [];

        // for (let i = 0; i < students.length; i++) {
        //     if (students[i].isInternationalStudent) {
        //         filteredStudents.push(students[i]);
        //     }
        // }

        // if (filteredStudents.length == 0) {
        //     reject("query returned 0 results"); return;
        // }

        // resolve(filteredStudents);

        (students.length > 0) ? resolve(students.filter(s => s.isInternationalStudent)) : reject("no results returned");
    });
};

module.exports.getPrograms = function(){
   return new Promise((resolve,reject)=>{
    if (programs.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(programs);
   });
}

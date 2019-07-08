
const admin = require('firebase-admin');
const Excel = require('exceljs/modern.nodejs')
let serviceAccount = require('../ServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
let damagedata=[];
 let preheatingdata=[];
// let wellblockdata=[];
// let ladledownanalysisdata=[];
// let heatsdata=[];
// let machinechangereport=[];
let damageRef = db.collection('DamageReport');
let preheatingRef=db.collection('PreheatingReport');
// let wellblockRef=db.collection('WellBlockReport');
// let ladledownanalysisRef=db.collection('LadleDownAnalysisReport');
// let heatsRef=db.collection('HeatReport');
//let machinechangeRef=db.collection("")
// var dbPromises = [];
// let query1=damageRef.orderBy('timestamp').get();
// let query2=preheatingRef.orderBy('timestamp').get();
// let query3=wellblockRef.get();
// let query4=ladledownanalysisRef.get();
// let query5=heatsRef.orderBy('timestamp').get();
// dbPromises.push(query1);
// dbPromises.push(query2);
// dbPromises.push(query3);
// dbPromises.push(query4);
// dbPromises.push(query5);
//dbPromises.push(query6);

let query1 = damageRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      damagedata.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
    console.log(damagedata);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Damage Data');
    worksheet.columns = [
            {header:'timestamp',key:'timestamp',width:40},
            {header: 'date', key:'date', width: 15},
            {header: 'ladleno', key:'ladleno', width: 10},
            {header: 'casterno', key:'castorNo', width: 10},
            {header: 'causeofdamage', key:'causeofdamage', width: 40},
            {header: 'cnlife', key:'cnlife', width: 10},
            {header: 'ladlelife', key:'ladlelife', width: 10},
            {header: 'machineno', key:'machineno', width: 10},
            {header: 'remarks', key:'remarks', width: 15},
            {header: 'splife', key:'splife', width: 10},
            {header: 'unlife', key:'unlife', width: 10},
            {header:'sparedamage',key:'sparedamage',width:100}
  ]
  worksheet.addRows(damagedata);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() +  "_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
        let filename=datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile(filename).then(() => {
            console.log('file saved')
        }).catch((e) => {
            console.log('cant save file')
        })
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });


  let query2 = preheatingRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      preheatingdata.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
    console.log(preheatingdata);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('preheatingdata');
    worksheet.columns = [
            {header:'timestamp',key:'timestamp',width:10},
            {header: 'Ladle Number', key:'ladleno', width: 15},
            {header: 'Type of Repair', key:'typeofrepair', width: 15},
            {header: 'Date & Time of Heating start at LD Services', key:'ld_preheatingstart', width: 20},
            {header: 'Date & Time of Heating end at LD Services', key:'ld_preheatingend', width: 20},
            {header: 'Preheating duration at LD Services (in Hours)', key:'ld_duration', width: 15},
            {header: 'Well Block Temp after LD Services preheating', key:'ld_wellblocktemp', width: 15},
            {header: 'Ladle Shell Temp after LD Services preheating', key:'ld_ladleshell', width: 15},
            {header: 'Hold from Preheating End at LD Services to Preheating start at SMLP', key:'holding_duration', width: 15},
            {header: 'Date & Time of Heating start at SMLP', key:'smlp_preheatingstart', width: 20},
            {header: 'Date & Time of Heating end at SMLP', key:'smlp_preheatingend', width: 20},
            {header:'Preheating duration at SMLP (in Hours)',key:'smlp_duration',width:15},
            {header:'Ladle Shell Temp after SMLP preheating',key:'smlp_ladleshell',width:15}
            
  ]
  worksheet.addRows(preheatingdata);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() +  "_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
        let filename="preheating"+datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile(filename).then(() => {
            console.log('file saved')
        }).catch((e) => {
            console.log('cant save file')
        })
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  module.exports = {query1,query2}
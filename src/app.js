const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs')

const admin = require('firebase-admin');
const Excel = require('exceljs/modern.nodejs')
let serviceAccount = require('../ServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//const damageReport = require('./damageReport')

let db = admin.firestore();
let damagedata=[];
let preheatingdata=[];
let wellblockdata=[];
let ladledownanalysisdata=[];
let heatsdata=[];
let machinechangedata=[];
let damageRef = db.collection('DamageReport');
let preheatingRef=db.collection('PreheatingReport');
let wellblockRef=db.collection('WellBlockReport');
let ladledownanalysisRef=db.collection('LadleDownAnalysisReport');
let heatsRef=db.collection('HeatReport');
let machinechangeRef=db.collection("MachineChangeReport");
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
const app = express();

const publicDirPath = path.join(__dirname,'../public')
const viewsDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.json())

app.get('/', (req,res) => {
    res.render('index')
})


app.post('/damage', (req,res) => {
    try {
        console.log('naman')
        console.log(req.body.fromdate)
        console.log(req.body.todate)
        let query1 = damageRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.send({error:'No matching documents'});
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
        let filename="damage_data"+datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile('./datasheets/'+filename).then(() => {
            console.log('file saved')
        }).catch((e) => {
            console.log('cant save file')
        })
        res.send(damagedata);
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.send({error:'Cant get files'})
  });

    } catch (error) {
        console.log('ERROR OCCURED')
    }
})


app.post('/preheating', (req,res) => {
  try {
      console.log('preheating_ashish')
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
        })
        .catch((e) => {
            console.log('cant save file')
        })
        res.send(damagedata);
        
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.send({error:'Cant get files'})
  });
} catch (error) {
  console.log('ERROR OCCURED')
}
})


app.post('/wb', (req,res) => {
  try {
      console.log('wb_ashish')
      let query3 = wellblockRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      wellblockdata.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
    console.log(wellblockdata);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('preheatingdata');
    worksheet.columns = [
            {header:'timestamp',key:'timestamp',width:10},
            {header: 'Date of WB Fixing', key:'date', width: 20},
            {header: 'Ladle Number', key:'ladle_no', width: 15},
            {header: 'Type of Repair', key:'type_of_repair', width: 15},
            {header: 'Well Block Party', key:'wb_party', width: 20},
            {header: 'WB Batch Number', key:'wb_batch', width: 20},
            {header: 'operator', key:'operator', width: 25}
  ]
  worksheet.addRows(wellblockdata);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() +  "_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
        let filename="wellblock"+datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile(filename).then(() => {
            console.log('file saved')
        })
        .catch((e) => {
            console.log('cant save file')
        })
        res.send(wellblockdata);
    
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.send({error:'Cant get files'})
  });
} catch (error) {
  console.log('ERROR OCCURED')
}
})

app.post('/unplannedmachine', (req,res) => {
  try {
      console.log('machinechange_ashish')
      let query3 = machinechangeRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      machinechangedata.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
    console.log(machinechangedata);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('MachineReport');
    worksheet.columns = [
            {header:'timestamp',key:'timestamp',width:10},
            {header: 'Date ( SMLP Machine change)', key:'smlp_date', width: 18},
            {header: 'Ladle Number', key:'ladleno', width: 10},
            {header: 'Machine Number', key:'machineno', width: 10},
            {header: 'Ladle Life', key:'ladle_life', width: 10},
            {header: 'SZ Life', key:'sz_life', width: 10},
            {header: 'WB Life', key:'wb_life', width: 10},
            {header: 'Machine Life', key:'machine_life', width: 10},
            {header: 'Reason of Machine Change', key:'machine_change_reason', width: 25},
            {header: 'SMLP Operator', key:'smlp_operator', width: 25},
            {header: 'Machine changed or just cleaned', key:'machine_change_status', width: 15},
            {header: 'machine No if Machine changed', key:'new_machine_no', width: 10},
            {header: 'Ld Operator', key:'ld_operator', width: 25}
  ]
  worksheet.addRows(machinechangedata);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() +  "_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
        let filename="machinechangedata"+datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile(filename).then(() => {
            console.log('file saved')
        })
        .catch((e) => {
            console.log('cant save file')
        })
        res.send(machinechangedata);
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.send({error:'Cant get files'})
  });
} catch (error) {
  console.log('ERROR OCCURED')
}
})



app.post('/heats', (req,res) => {
  try {
      console.log('heats_ashish')
      let query4 = heatsRef.orderBy('timestamp').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    snapshot.forEach(doc => {
      heatsdata.push(doc.data());
      console.log(doc.id, '=>', doc.data());
    });
    console.log(heatsdata);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('HeatReport');
    worksheet.columns = [
            {header:'timestamp',key:'timestamp',width:10},
            {header: 'Date', key:'date', width: 18},
            {header: 'Ladle Number', key:'ladle_no', width: 10},
            {header: 'Machine No', key:'machine_no', width: 10},
            {header: 'Ladle Life', key:'ladle_life', width: 10},
            {header: 'WB Life', key:'wb_life', width: 10},
            {header: 'UN Life', key:'un_life', width: 10},
            {header: 'UN Batch', key:'un_batch', width: 10},
            {header: 'SP Life', key:'sp_life', width: 10},
            {header: 'SP Batch', key:'sp_batch', width: 10},
            {header: 'CN Life', key:'cn_life', width: 10},
            {header: 'CN Batch', key:'cn_batch', width: 10},
            {header: 'Casting Open', key:'casting_open', width: 10},
            {header: 'Casting Close', key:'casting_close', width: 25},
            {header: 'Casting Duration', key:'casting_duration', width: 25},
            {header: 'Caster No', key:'caster_no', width: 15},
            {header: 'Tilter No', key:'tilter_no', width: 10},
            {header: 'Operator', key:'operator', width: 25},
            {header: 'Job Details', key:'job_details', width: 25},
            {header: 'Remarks', key:'remarks', width: 25}
  ]
  worksheet.addRows(machinechangedata);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear() +  "_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
        let filename="heatsdata"+datetime+".xlsx";
        console.log(filename);
        workbook.xlsx.writeFile(filename).then(() => {
            console.log('file saved')
        })
        .catch((e) => {
            console.log('cant save file')
        })
        res.send(heatsdata);
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.send({error:'Cant get files'})
  });
} catch (error) {
  console.log('ERROR OCCURED')
}
})

module.exports = app
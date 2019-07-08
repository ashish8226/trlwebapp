const fromDate = document.querySelector('#from-date')
const toDate = document.querySelector('#to-date')

document.getElementById('damage-form').addEventListener('submit', (e) => {
    e.preventDefault()

    document.getElementById('damage').innerHTML = "Loading";
    //document.getElementById('damage').classList.add('spinning');
    const fromdate = fromDate.value
    const todate = toDate.value

    fetch('/damage',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        },
        body: JSON.stringify({
            fromdate,
            todate
        })
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
            document.getElementById('damage').innerHTML = "Damage";
            //document.getElementById('damage').classList.remove('spinning');
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
        if(data.error)
            document.getElementById('info').innerHTML = data.error
        else
            document.getElementById('info').innerHTML = 'Successful'
        setTimeout(function() {
            document.getElementById('info').innerHTML=''
        },3000)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})
document.getElementById('preheating').addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/preheating',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})
document.getElementById('wb').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('wb').innerHTML = "Loading..";
    fetch('/wb',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
            document.getElementById('wb').innerHTML = "WellBlock";
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})
document.getElementById('ladledownreport').addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/ladledown',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})
document.getElementById('dailyrefractory').addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/dailyrefractory',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})

document.getElementById('heats').addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/heats',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})
document.getElementById('unplannedmachine').addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/unplannedmachine',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            credentials: 'same-origin'
        }
    }).then((res) => {
        if(res.ok){
            console.log('SUCCESS')
        }
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((e)=> {
        console.log(e)
    })

    
})



function clear_input(){
    document.getElementById("event-input").reset(); /* reference - linuxhint.com */
    var z = document.getElementById("targett"); 
    z.style.display="none";
}

function auto(){
    var a = document.getElementById("check-box");
    var location = document.getElementById("location-textbox");
    if(a.checked==0){
        location.style.display = "block";
    }
    if(a.checked==1){
        location.style.display = "none"; /* stackoverflow, gfg */
    }
} 

function searchh(){
    var distancevalue = document.getElementById("distancee").value;
    var locationvalue = document.getElementById("locationn").value;
    var keywordvalue = document.getElementById("keywordd").value;
    var category = document.querySelector('#categoryy');
    var selectedoption = category.options[category.selectedIndex].value; /*reference - geeks for geeks*/
    
    var b = document.getElementById("check-box");
    var ip
    const url22 = 'https://ipinfo.io/?token=3261999ed827bf'
    if(b.checked==1){
        async function getapi(url22){
            const response = await fetch(url22);
            var data_ip = await response.json();
            console.log(data_ip['loc'])
            return data_ip['loc']
            }
    data2_ip = getapi(url22)
    console.log(data2_ip[0])
        
        /*fetch(`https://ipinfo.io/?token=3261999ed827bf`,{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=>{ip=data['loc']})
        .then(()=> console.log(ip))
        .catch(err => console.log(err));*/
    }
    
    

    /*console.log("dekh ip addressssss",ip)*/

    fetch(`/forminputs?keyword=${keywordvalue}&distance=${distancevalue}&category=${selectedoption}&location=${locationvalue}`,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    // .then(()=> console.log("HII111",res))
    .then(data => {obj = data})
    .then(function(events_dis){
        events_json = obj['_embedded']
        let result = "<div><table><tr><th class=date_events>Date</th><th class=images_events>Icon</th><th class=event_events>Event</th><th class=genre_events>Genre</th><th class=venue_events>Venue</th></tr>"
        for(i=0;i<events_json['events'].length;i++){
        result += "<tr>"
        result += "<td>"+ events_json['events'][i]['dates']['start']['localDate'] + "</br>"+ events_json['events'][i]['dates']['start']['localTime'] +"</td>";
        result += "<td><img src="+events_json['events'][i]['images'][0]['url']+"></td>";
        result += "<td>"+events_json['events'][i]['name']+"</td>";
        result += "<td>"+events_json['events'][i]['classifications'][0]['segment']['name']+"</td>";
        result += "<td>"+events_json['events'][i]['_embedded']['venues'][0]['address']['line1']+"</td>";
        result += "</tr>";                                                                              /*refernce - w3schools */
        }

        result+="</table></div><style>.date_events{width:15%;}.images_events{width:10%; margin-left:10px}.event_events{width:40%;}.genre_events{width:10%;}.venue_events{width:20%;}table{margin-left:auto;margin-right:auto;width:100%}td{text-align:center;max-width:100px;height:100px;background-color:white}td img{width:100%;height:100px;object-fit:cover;padding-top:15px;padding-bottom:15px;}th{background-color:white}</style"
        document.getElementById("targett").innerHTML = result;
        console.log(events_json)
    })
    .catch(err => console.log(err)); 

        /*const response = await fetch('/forminputs', request_options);
        outputt = await response.json();
        console.log(outputt)
        console.log("hi")*/
   

    /*var url1 = 'https://maps.googleapis.com/maps/api/geocode/json?address='+locationvalue+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'*/
    
    /*fetch(`/locationinputurl?url=${url1}`,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {console.log(res); res.json()})
    .then(data => console.log(data))
    .catch(err => console.log(err));
    console.log(url1)*/
}
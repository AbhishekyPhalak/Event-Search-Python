var venue_name_final = "";
function clear_input(){
    document.getElementById("event-input").reset(); /* reference - linuxhint.com */
    var z = document.getElementById("targett"); 
    var y = document.getElementById("location-textbox");
    y.style.display = "block";
    z.style.display = "none"
    var f = document.getElementById("venue_card_details_1")
    f.style.display = "none"
    var g =document.getElementsByClassName("target3")
    var d = document.getElementById("target2")
    d.style.display = "none"
}

function auto(){
    var a = document.getElementById("check-box");
    var location = document.getElementById("location-textbox");
    var xyz = document.getElementById("locationn")
    if(a.checked==0){
        location.style.display = "block";

    }
    if(a.checked==1){
        location.style.display = "none"; /* stackoverflow, gfg */
        xyz.value = ""
        console.log(xyz.value)
    }
} 

function searchh(){
    flag_event = 0
    flag_genre = 0
    flag_venue = 0
    nulla = "No"
    var keyword_input = document.getElementById("keywordd").value
    if(keyword_input==""){
        document.getElementById("keywordd").reportValidity();
        return nulla
    }
    var ab = document.getElementById("check-box");
    var location2 = document.getElementById("locationn").value
    console.log(location2)
    if(ab.checked==0){
        console.log("hello")
        if(location2==""){
            console.log('hi')
            document.getElementById("locationn").reportValidity();
            return nulla
        }
    }
    var o = document.getElementById("venue_card_details_1")
    o.style.display = "none"
    var g =document.getElementsByClassName("target3")
    var d = document.getElementById("target2")
    d.style.display = "none"
    var distancevalue = document.getElementById("distancee").value;
    if(distancevalue==""){
        distancevalue="10"
    }
    console.log("distance",distancevalue)
    var locationvalue = document.getElementById("locationn").value;
    var keywordvalue = document.getElementById("keywordd").value;
    var category = document.querySelector('#categoryy');
    var selectedoption = category.options[category.selectedIndex].value; /*reference - geeks for geeks*/
    console.log(selectedoption)
    var b = document.getElementById("check-box");
    var ip
    const url123 = 'https://ipinfo.io/?token=3261999ed827bf'
    if(b.checked==1){
        fetch(url123,{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {ipinfo = data['loc']})
        .then(()=>{
            var latitude_ip = ipinfo.substring(0,ipinfo.indexOf(","));
            var longitude_ip = ipinfo.substring(ipinfo.indexOf(",")+1);
            fetch("/forminputs2?keyword="+keywordvalue+"&distance="+distancevalue+"&category="+selectedoption+"&latitude_ip="+latitude_ip+"&longitude_ip="+longitude_ip,{
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {obj = data})
            .then(function(events_dis){
                

            const output_10000 = obj['msg']
            console.log(output_10000)
            if(output_10000!==undefined){
                if(obj['msg']=="not recieved"){
                    let result = "<div class=no_records><label>No Records found</label></div>"
                    document.getElementById("targett").innerHTML = result;
                    return nulla
            }
            
            }
                

                const output_1000 = obj?._embedded
                console.log(output_1000)
                if(output_1000===undefined){
                    let result = "<div class=no_records><label>No Records found</label></div>"
                    document.getElementById("targett").innerHTML = result;
                    return nulla
                }
                events_json = obj['_embedded']
                console.log(obj)
                let result = "<div><table id=table><thead class=table-header><tr><th class=date_events>Date</th><th class=images_events>Icon</th><th onclick=sort_event() class=event_events>Event</th><th onclick=sort_genre() class=genre_events>Genre</th><th onclick=sort_venue() class=venue_events>Venue</th></tr></thead>"
                for(i=0;i<events_json['events'].length;i++){
                result += "<tr>"
                let output_71 = events_json['events'][i]['dates']['start']['localDate']
                let output_72 = events_json['events'][i]['dates']['start']['localTime']
                if(output_72===undefined){
                    result += "<td>"+ output_71 + "</br></td>";
                }
                else{
                    result += "<td>"+ output_71 + "</br>"+ output_72 +"</td>";
                }
                result += "<td><img src="+events_json['events'][i]['images'][0]['url']+"></td>";
                var event_iddd = String(events_json['events'][i]['id'])
                result += "<td> <p class=hover_change onclick=display_event('"+event_iddd+"')>"+events_json['events'][i]['name']+"</p></td>";
                result += "<td>"+events_json['events'][i]['classifications'][0]['segment']['name']+"</td>";
                result += "<td>"+events_json['events'][i]['_embedded']['venues'][0]['name']+"</td>";
                result += "</tr>";                                                                              /*refernce - w3schools */
                }
                
                result+="</table></div><style>.date_events{width:14%;}.images_events{width:14%;}.event_events{width:39%;}.genre_events{width:9%;}.venue_events{width:19%;}table{margin-left:auto;margin-right:auto;width:100%}td{text-align:center;max-width:100px;}td img{height:30px;width:50px;object-fit:cover;}th{height:10px;}tr{height:60px}</style"
                document.getElementById("targett").innerHTML = result;
                console.log(events_json)
            })
        })
        setTimeout(function(){ 
            var f = document.getElementById("targett"); 
            f.style.display="block";},500);
       
    }
    if(b.checked==0){
        fetch(`/forminputs?keyword=${keywordvalue}&distance=${distancevalue}&category=${selectedoption}&location=${locationvalue}`,{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {obj7 = data})
        .then(function(events_dis){

            const output_10000 = obj7['msg']
            if(output_10000!==undefined){
                if(obj7['msg']=="not recieved"){
                    let result = "<div class=no_records><label>No Records found</label></div>"
                    document.getElementById("targett").innerHTML = result;
                    return nulla
            }
            
            }
            const output_1000 = obj7?._embedded
                if(output_1000===undefined){
                    let result = "<div class=no_records><label>No Records found</label></div>"
                    document.getElementById("targett").innerHTML = result;
                    return nulla
                }
            events_json = obj7['_embedded']
            console.log(obj7)
            let result = "<div><table id=table><thead class=table-header><tr><th class=date_events>Date</th><th class=images_events>Icon</th><th onclick=sort_event() class=event_events>Event</th><th onclick=sort_genre() class=genre_events>Genre</th><th onclick=sort_venue() class=venue_events>Venue</th></tr></thead>"
            for(i=0;i<events_json['events'].length;i++){
            result += "<tr>"
            let output_71 = events_json['events'][i]['dates']['start']['localDate']
            let output_72 = events_json['events'][i]['dates']['start']['localTime']
            if(output_72===undefined){
                result += "<td>"+ output_71 + "</br></td>";
            }
            else{
                result += "<td>"+ output_71 + "</br>"+ output_72 +"</td>";
            }
            result += "<td><img src="+events_json['events'][i]['images'][0]['url']+"></td>";
            var event_iddd = String(events_json['events'][i]['id'])
            result += "<td><p class=hover_change onclick=display_event('"+event_iddd+"')>"+events_json['events'][i]['name']+"</p></td>";
            result += "<td>"+events_json['events'][i]['classifications'][0]['segment']['name']+"</td>";
            result += "<td>"+events_json['events'][i]['_embedded']['venues'][0]['name']+"</td>";
            result += "</tr>";                                                                              /*refernce - w3schools */
            }
    
            result+="</table></div><style>.date_events{width:14%;}.images_events{width:14%;}.event_events{width:39%;}.genre_events{width:9%;}.venue_events{width:19%;}table{margin-left:auto;margin-right:auto;width:800px}td{text-align:center;max-width:100px;}td img{height:30px;width:50px;object-fit:cover;}th{height:10px;}tr{height:60px}</style"
            document.getElementById("targett").innerHTML = result;
            console.log(events_json)
        })
        .catch(() => {
            console.log(err)
        })
        setTimeout(function(){ 
            var f = document.getElementById("targett"); 
            f.style.display="block";},500);
    }
     
}

function display_event(a_id){
    var k = document.getElementById("venue_card_details_1")
    k.style.display = "none"
    var c = document.getElementById("target2"); 
    var cd = document.getElementById("redirect3"); 
    var p = document.getElementById("target2")
    console.log(a_id)

   
    fetch(`/forminputs4?event_id=${a_id}`,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {obj10 = data})
    .then(() => {
        console.log("hiiiii",obj10)
        result2  = "<div class=event_details>"
        result2 += "<h3 class=event_details_title>"+obj10['name']+"</h3>"
        result2 += "<div class=row>"
        result2 += "<div id=column11 class=abcdefg>"
        result2 += "<p class=description >Date</p><p class=infoo>"+obj10['dates']['start']['localDate']+" "+obj10['dates']['start']['localTime']+"</p>"
        /* Refernce w3 docs and ui.dev */
        output_str_combined = ""
        flag_combined = 0
        if(obj10['_embedded']['attractions']!==undefined){
            if(obj10['_embedded']['attractions']!="Undefined"){
                result2 += "<p class=description >Artist/Team</p>"
                result2 += "<p class=infoo id=infooo>"
                for(j=0;j<obj10['_embedded']['attractions'].length;j++){
                    if(flag_combined==0){
                        result2 += "<a class=atag2 target=_blank href="+obj10['_embedded']['attractions'][j]['url']+">"+obj10['_embedded']['attractions'][j]['name']+"</a>"
                        flag_combined=flag_combined+1
                    }
                    else{
                        result2 += " | "
                        result2 += "<a class=atag2 target=_blank href="+obj10['_embedded']['attractions'][j]['url']+">"+obj10['_embedded']['attractions'][j]['name']+"</a>"
                    }
                }
                result2 += "</p>"
            }
        }
        

       
            /*const output_20 = obj10?._embedded?.venues?.[0]?.url*/
            /*if(output_20===undefined){
                result2 += "<p class=description >Artist/Team</p>"
                result2 += "<p class=infoo id=infooo >"+obj10['_embedded']['attractions'][0]['name']+"</p>"
            }
            if(output_20!==undefined){
                if(output_20!="Undefined"){
                    result2 += "<p class=description >Artist/Team</p>"
                    result2 += "<p class=infoo id=infooo><a href="+obj10['_embedded']['venues'][0]['url']+">"+obj10['_embedded']['attractions'][0]['name']+"</a></p>"
                }
            }*/
        const output_3 = obj10?._embedded?.venues?.[0]?.name
        if(output_3===undefined){
            console.log("Element_not_found")
        }
        else{
            result2 += "<p class=description >Venue</p><p class=infoo>"+obj10['_embedded']['venues'][0]['name']+"</p>"
        }
        let output_final_str = ""
        const output_4 = obj10?.classifications?.[0]?.subGenre?.name
        let flag=0
        if(output_4===undefined){console.log("element_not_found")}
        if(output_4!==undefined){
            if(output_4!="Undefined"){
                if(flag==0){output_final_str += output_4}
                else{output_final_str += " | ";
                output_final_str += output_4;}
                flag = flag+1  
            }
            
        }
        
        const output_5 = obj10?.classifications?.[0]?.genre?.name
        if(output_5===undefined){console.log("element_not_found")}
        if(output_5!==undefined){
            if(output_5!="Undefined"){
                if(flag==0){output_final_str += output_5}
                else{output_final_str += " | ";
                output_final_str += output_5;}
                flag = flag+1
            }
            
        }    
        
        const output_6 = obj10?.classifications?.[0]?.segment?.name
        if(output_6===undefined){console.log("element_not_found")}
        if(output_6!==undefined){
            if(output_6!="Undefined"){
                if(flag==0){output_final_str += output_6}
                else{output_final_str += " | ";
                output_final_str += output_6;}
                flag = flag+1  
            }
            
        }
        
        const output_7 = obj10?.classifications?.[0]?.subType?.name
        if(output_7!==undefined){
            if(output_7!="Undefined"){
                if(flag==0){output_final_str += output_7}
                else{output_final_str += " | ";
                output_final_str += output_7;}
                flag = flag+1 
            }
            
        }
            
        const output_8 = obj10?.classifications?.[0]?.type?.name
        if(output_8===undefined){console.log("element_not_found")}
        if(output_8!==undefined){
            if(output_8!=="Undefined"){
                if(flag==0){output_final_str += output_8}
                else{output_final_str += " | ";
                output_final_str += output_8;}
                flag = flag+1
            }
            
        }
        if(output_final_str!=""){
            result2 += "<p class=description >Genres</p><p class=infoo>"+output_final_str+"</p>"
        }
        
        const output_9 = obj10?.priceRanges?.[0]?.max
        const output_10 = obj10?.priceRanges?.[0]?.min
        let output_final_str_2 = ""
        let flag2 = 0
        if(output_10===undefined){console.log("element_not_found")}
        if(output_10!==undefined){
            if(output_10!=="Undefined"){
                output_final_str_2 += output_10;
                flag2=flag2+1
            }
            
        }
        if(output_9===undefined){console.log("element_not_found")}
        if(output_9!==undefined){
            if(output_9!=="Undefined"){
                if(flag2==1){
                output_final_str_2 += " - ";
                output_final_str_2 += output_9;}
                else{
                    output_final_str_2 += output_9;
                    flag=flag+1
                }
                
            }
            
        }
        const output_11 = obj10?.priceRanges?.[0]?.currency
        if(output_11===undefined){console.log("element_not_found")}
        if(output_11!==undefined){
            if(output_11!=="Undefined"){
                if(flag!=0){
                    output_final_str_2 += " "
                    output_final_str_2 += output_11
                }
            }
            
        }
        if(output_final_str_2!=""){
            result2 += "<p class=description >Price Ranges</p><p class=infoo>"+output_final_str_2+"</p>"
        }
        
        const output_12 = obj10?.dates?.status?.code
        if(output_12!==undefined){
            if(output_12!="Undefined"){
                if(output_12 == "onsale"){
                    result2 += "<label class=labell>Ticket Status</label></br>" 
                    result2 += "<button class=onsale type=button>On Sale</button>"
                }
                if(output_12 == "rescheduled"){
                    result2 += "<label class=labell >Ticket Status</label></br>" 
                    result2 += "<button class=rescheduled type=button>Rescheduled</button>"
                }
                if(output_12 == "offsale"){
                    result2 += "<label class=labell >Ticket Status</label></br>" 
                    result2 += "<button class=offsale type=button>Off sale</button>"
                }
                if(output_12 == "canceled"){
                    result2 += "<label class=labell >Ticket Status</label></br>" 
                    result2 += "<button class=canceled type=button>Canceled</button>"
                }
                if(output_12 == "postponed"){
                    result2 += "<label class=labell >Ticket Status</label></br>" 
                    result2 += "<button class=postponed type=button>Postponed</button>"
                }

            }
            }

            const output_13 = obj10?.url
            if(output_13!==undefined){
                if(output_13!="Undefined"){
                    result2 += "<p class=description >Buy Tickets At:</p>"
                    result2 += "<p class=infoo id=infooo><a target=_blank id=atag href="+obj10['url']+">Ticketmaster</a></p>"
                }
            }
        result2 += "</div>"
        const output_14 = obj10?.seatmap?.staticUrl
        if(output_14!==undefined){
            if(output_14!="Undefined"){
                result2 += "<div id=column22 class=abcdefg>"
                result2 += "<div id=aligner>"
                result2 += "<img class=api2image src="+obj10['seatmap']['staticUrl']+">"
                result2 += "</div>"
            }
        }
        result2 += "</div>"
        result2 += "<br>"
        result2 += "</div>" 
        result2 += "</div>" 
        result2 += "<div class=event-display-3>"
        result2 += "<div class=target3>"
        result2 += "<div class=arrow_boss><p class=venue_title >Show Venue Details</p></div>"

        var venue_name = String(obj10['_embedded']['venues'][0]['name'])
        venue_name_final = venue_name.replaceAll(" ","%20")
        result2 += "<img onclick=venue_display() class=arrow_image src=/static/white-down-arrow-png-2.png>"
        result2 += "</div>"
        result2 += "</div>"
        result2 += "<style>.event_details{width:870px;margin-left:auto;margin-right:auto;background-color:rgba(241, 239, 239, 0.174);backdrop-filter: blur(8px) brightness(110%);font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;border-radius: 15px;}</style>"
        document.getElementById("target2").innerHTML = result2;
    })
    .then(()=>{
    column11_height = document.querySelector("#column11");
    column22_height = String(column11_height.offsetHeight);
    var pxx = "px"
    column22_height += pxx
    console.log("Height toh dekho bc -- ",column22_height)
    var element_column22 = document.getElementById('column22');
    var element_aligner = document.getElementById('aligner')
    element_column22.style.height = column22_height;
    element_aligner.style.height = column22_height;
    })
    c.style.display="block";
    setTimeout(function(){cd.scrollIntoView({ behavior: 'smooth'})},500);
}

function sort_event(){  /*Reference - w3schools */
    flag_event += 1
    console.log(flag_event)
    if(flag_event%2==1){
        var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2].innerHTML;
      y = rows[i + 1].getElementsByTagName("TD")[2].innerHTML;
      xx = x.substring(x.indexOf(">") + 1, x.lastIndexOf("</p>"));
      yy = y.substring(y.indexOf(">") + 1, y.lastIndexOf("</p>"));
      if (xx.toLowerCase() > yy.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
    }
    if(flag_event%2==0){
        var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2].innerHTML;
      y = rows[i + 1].getElementsByTagName("TD")[2].innerHTML;
      xx = x.substring(x.indexOf(">") + 1, x.lastIndexOf("</p>"));
      yy = y.substring(y.indexOf(">") + 1, y.lastIndexOf("</p>"));
      if (xx.toLowerCase() < yy.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
    }
}

function sort_genre(){    /*Reference - w3schools */
flag_genre +=1 
console.log(flag_genre)
if(flag_genre%2==1){
    var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3].innerHTML;
      y = rows[i + 1].getElementsByTagName("TD")[3].innerHTML;
     
      if (x.toLowerCase() > y.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
    if(flag_genre%2==0){
        var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3].innerHTML;
      y = rows[i + 1].getElementsByTagName("TD")[3].innerHTML;
     
      if (x.toLowerCase() < y.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
    }
}

function sort_venue(){  /*Reference - w3schools */
    flag_venue+=1
    console.log(flag_venue)
    if(flag_venue%2==1){
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[4].innerHTML;
            y = rows[i + 1].getElementsByTagName("TD")[4].innerHTML;
            if (x.toLowerCase() > y.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
    }
    if(flag_venue%2==0){
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[4].innerHTML;
            y = rows[i + 1].getElementsByTagName("TD")[4].innerHTML;
            if (x.toLowerCase() < y.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
    }
   
}

function venue_display(){
    var arrow_ele = document.querySelector(".target3")
    arrow_ele.style.display = "none"
    var k = document.getElementById("venue_card_details_1")
    console.log(venue_name_final)
    fetch(`/forminputs5?keyword=${venue_name_final}`,{
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {obj10 = data})
    .then(()=>{
        space = " "
        console.log(obj10)
        const output_15 = obj10?._embedded?.venues?.[0]?.name
        
        result4 = "<div class=venue_card>"
        result4 += "<div class=padder>"
        if(output_15===undefined){
            result4 += "<h3 class=venue_name_11 >&nbsp;&nbsp;N/A&nbsp;&nbsp;</h3>"
        }
        if(output_15!==undefined){
            result4 += "<h3 class=venue_name_11 >&nbsp;&nbsp;"+output_15+"&nbsp;&nbsp;</h3>"
        }
        
        
        const output_31 = obj10?._embedded?.venues?.[0]?.images?.[0]?.url
        if(output_31===undefined){console.log("element_not_found")}
        if(output_31!==undefined){
            if(output_31!=="Undefined"){
                result4 += "<div class=logo>"
                result4 += "<img class=venue_img_symbol src="+output_31+">"
                result4 += "</div>"
            }
        }

        result4 += "<div class=row100>"
            
            result4 += "<div class=big id=big1 >"
                result4+= "<div class=column100 id=column101>"
                result4+= "<label>Address:&nbsp;&nbsp;</label>"
                result4+= "</div>"

                result4+= "<div class=column100 id=column102>"
                let output_32 = obj10?._embedded?.venues?.[0]?.address?.line1
                address_line1 = ""
                if(output_32!==undefined){
                    if(output_32!=="Undefined"){
                        address_line1+=output_32
                        result4+= "<label>"+obj10?._embedded?.venues?.[0]?.address?.line1+"</label><br>"
                    }
                }
                if(output_32===undefined || output_32=="undefined"){
                    output_32="N/A"
                    result4+= "<label>"+output_32+"</label><br>"
                }
                let output_61 = obj10?._embedded?.venues?.[0]?.city?.name
                let output_62 = obj10?._embedded?.venues?.[0]?.postalCode
                let output_63 = obj10?._embedded?.venues?.[0]?.state?.stateCode
                if(output_61===undefined || output_61=="undefined"){
                    output_61="N/A"
                }
                if(output_62===undefined || output_62=="undefined"){
                    output_62="N/A"
                }
                if(output_63===undefined || output_63=="undefined"){
                    output_63="N/A"
                }
                
                result4+= "<label>"+output_61+",&nbsp;"+output_63+"</label><br>"
                result4+= "<label>"+output_62+"</label><br>"
                result4+= "</div>"
                gmaps_str = "https://www.google.com/maps/search/?api=1&query="
                gmaps_str += String(obj10?._embedded?.venues?.[0]?.name)
                gmaps_str += String(address_line1)
                gmaps_str += String(obj10?._embedded?.venues?.[0]?.city?.name)
                gmaps_str += String(obj10?._embedded?.venues?.[0]?.state?.stateCode)
                gmaps_str += String(obj10?._embedded?.venues?.[0]?.postalCode)
                var gmaps_final = gmaps_str.replaceAll(" ","%20")
                result4+= "<div class=google_maps><a target=_blank class=atag_styles href="+gmaps_final+" >Open in Google Maps</a></div>"
                result4+= "</div>"
                console.log("gmaps",gmaps_final)

                result4 += "<div class=big id=big2><a target=_blank id=final class=atag_styles href="+obj10?._embedded?.venues?.[0]?.url+" >More events at this venue</a> </div>"

            result4 += "</div>"
                

            result4 += "</div>"
                            

        result4 += "</div>"
        
        
        result4 += "</div>"
        result4 += "</div>"
        document.getElementById("venue_card_details_1").innerHTML = result4
        k.style.display="block"
        k.scrollIntoView({ behavior: 'smooth'})
    })
    .then(()=>{
        big102_height = document.querySelector("#big1");
        big22_height = String(big102_height.offsetHeight);
        var pxxx = "px"
        big22_height += pxxx
        var element_big22 = document.getElementById('big2');
        element_big22.style.height = big22_height;
    })
}
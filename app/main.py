from flask import Flask
import json
from flask import request, jsonify  
import requests
from geolib import geohash

app = Flask(__name__)

@app.route('/')
def events():
    return app.send_static_file("events.html")

@app.route('/forminputs')
def forminputs():

    print("transfer succesful")
    print("output - ", request)
    requestString = str(request)
    print("string is",requestString)
    str1 = "location="
    str2 = "keyword="
    str3 = "&distance"
    str4 = "distance="
    str5 = "&category"
    str6 = "category="
    str7 = "&location"
    str51 = "flag="
    str52 = "&keyword"
    #flag_default =  requestString[requestString.index(str51) + len(str51):requestString.index(str52)]
    locationStr = requestString[requestString.index(str1) + len(str1):-8] #reference - stackoverflow
    keywordStr = requestString[requestString.index(str2) + len(str2):requestString.index(str3)] #reference - geeks for geeks
    distanceStr = requestString[requestString.index(str4) + len(str4):requestString.index(str5)] #reference - geeks for geeks
    categoryStr = requestString[requestString.index(str6) + len(str6):requestString.index(str7)] #reference - geeks for geeks

    #print("flag=", flag_default)
    print("answer - location string", locationStr)
    print("answer - keyword string", keywordStr)
    print("answer - distance string", distanceStr)
    print("answer - category string", categoryStr)

    geolocation_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+locationStr+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'
    print("geoloaction url - ", geolocation_url)
    geolocation_response_api = requests.get(geolocation_url) #reference - askpython.com     
    geolocation = geolocation_response_api.text  #reference - askpython.com     
    Geolocation = json.loads(geolocation)['results']  #reference - askpython.com
    Geolocation22 = json.loads(geolocation) 
    print(Geolocation)
    if not Geolocation:
        print("fuck")  
        return json.dumps({'msg': 'not received'})                       
    latitude = Geolocation22['results'][0]['geometry']['location']['lat']
    longitude = Geolocation22['results'][0]['geometry']['location']['lng']
    print(latitude,",",longitude)
    geohashed = geohash.encode(latitude,longitude,7) 
    print("Dekh na yaar",geohashed)

    def segmentID(abc):
        if abc == "Music":
            segmentID1 = "KZFzniwnSyZfZ7v7nJ"
        elif abc == "Sports":
            segmentID1 = "KZFzniwnSyZfZ7v7nE"
        elif abc == "Arts":
            segmentID1 = "KZFzniwnSyZfZ7v7na"
        elif abc == "Film":
            segmentID1 = "KZFzniwnSyZfZ7v7nn"
        elif abc == "Miscellaneous":
            segmentID1 = "KZFzniwnSyZfZ7v7n1"
        elif abc == "Default":
            segmentID1 = " "
        return segmentID1


    segmentIDs = segmentID(categoryStr)
    if(segmentIDs == " "):
       ticketmaster_url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M&keyword='+keywordStr+'&radius='+distanceStr+'&unit=miles&geoPoint='+geohashed+''
    else:
        ticketmaster_url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M&keyword='+keywordStr+'&segmentId='+segmentIDs+'&radius='+distanceStr+'&unit=miles&geoPoint='+geohashed+''
    #print(segmentIDs)
    print("ticketmaster url - ", ticketmaster_url)
    ticketmaster_response_api = requests.get(ticketmaster_url) #reference - askpython.com  
    ticketmaster_events = ticketmaster_response_api.text  #reference - askpython.com     
    events = json.loads(ticketmaster_events)  #reference - askpython.com  
    #print(events)
    print(type(events)) 
    #return json.dumps({'msg': 'data received'})
    return events

@app.route('/forminputs2')
def forminputs2():
    print("transfer succesful")
    print("output - ", request)
    requestString = str(request)
    print("string is",requestString)
    str1 = "location="
    str2 = "keyword="
    str3 = "&distance"
    str4 = "distance="
    str5 = "&category"
    str6 = "category="
    str7 = "&latitude_ip"
    str8 = "latitude_ip="
    str9 = "&longitude_ip="
    str10 = "longitude_ip="
    str53 = "flag="
    str54 = "&keyword="

    #flag_default2 =  requestString[requestString.index(str53) + len(str53):requestString.index(str54)]
    latitude_str = requestString[requestString.index(str8) + len(str8): requestString.index(str9)] #reference - stackoverflow
    longitude_str = requestString[requestString.index(str10) + len(str10):-8] #reference - stackoverflow
    keywordStr = requestString[requestString.index(str2) + len(str2):requestString.index(str3)] #reference - geeks for geeks
    distanceStr = requestString[requestString.index(str4) + len(str4):requestString.index(str5)] #reference - geeks for geeks
    categoryStr = requestString[requestString.index(str6) + len(str6):requestString.index(str7)] #reference - geeks for geeks

    #print("flag", flag_default2)
    print("answer - keyword string", keywordStr)
    print("answer - distance string", distanceStr)
    print("answer - category string", categoryStr)

    
    geohashed = geohash.encode(latitude_str,longitude_str,7) 
    print("Dekh na yaar",geohashed)

    def segmentID(abc):
        if abc == "Music":
            segmentID1 = "KZFzniwnSyZfZ7v7nJ"
        elif abc == "Sports":
            segmentID1 = "KZFzniwnSyZfZ7v7nE"
        elif abc == "Arts":
            segmentID1 = "KZFzniwnSyZfZ7v7na"
        elif abc == "Theatre":
            segmentID1 = "KZFzniwnSyZfZ7v7na"
        elif abc == "Film":
            segmentID1 = "KZFzniwnSyZfZ7v7nn"
        elif abc == "Miscellaneous":
            segmentID1 = "KZFzniwnSyZfZ7v7n1"
        elif abc == "Default":
            segmentID1 = " "

        return segmentID1
    
    segmentIDs = segmentID(categoryStr)
    if(segmentIDs == " "):
        ticketmaster_url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M&keyword='+keywordStr+'&radius='+distanceStr+'&unit=miles&geoPoint='+geohashed+''
    else:
        ticketmaster_url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M&keyword='+keywordStr+'&segmentId='+segmentIDs+'&radius='+distanceStr+'&unit=miles&geoPoint='+geohashed+''
    #print(segmentIDs)
    print("ticketmaster url - ", ticketmaster_url)
    ticketmaster_response_api = requests.get(ticketmaster_url) #reference - askpython.com  
    ticketmaster_events = ticketmaster_response_api.text  #reference - askpython.com     
    events = json.loads(ticketmaster_events)  #reference - askpython.com  
    #print(events)
    #print('#'*50)
    print(type(events)) 
    #return json.dumps({'msg': 'data received'})
    return events
   

@app.route('/forminputs4')
def forminputs4():
    print("transfer succesful")
    print("output - ", request)
    requestString = str(request)
    print("string is",requestString)
    str101 = "event_id="
    event_id_1 = requestString[requestString.index(str101) + len(str101):-8]
    ticketmaster_event_url = 'https://app.ticketmaster.com/discovery/v2/events/'+event_id_1+'?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M'
    ticketmaster_response_event_api = requests.get(ticketmaster_event_url) #reference - askpython.com  
    ticketmaster_events_details = ticketmaster_response_event_api.text  #reference - askpython.com     
    events = json.loads(ticketmaster_events_details)  #reference - askpython.com  
    return events

@app.route('/forminputs5')
def forminputs5():
    print("transfer succesful")
    print("output - ", request)
    requestString = str(request)
    str201 = "keyword="
    venue_name_2 = requestString[requestString.index(str201) + len(str201):-8]
    print("extracted string",venue_name_2)
    ticketmaster_venue_url = 'https://app.ticketmaster.com/discovery/v2/venues?apikey=GbVOaAsu05gFJhOFyRgd5jVarkvGvm8M&keyword='+venue_name_2+''
    ticketmaster_response_venue_api = requests.get(ticketmaster_venue_url) #reference - askpython.com  
    ticketmaster_venue_details = ticketmaster_response_venue_api.text 
    venue = json.loads(ticketmaster_venue_details)
    return venue


if __name__ =='__main__':
    app.run(debug=True)  



$(document).ready(function () {
    var image = '', bool = false, count = 0, dropICONS = '', long = false, latt = false, tempUrl = '', woeid = '', getWoeid = false, pressMe = false, finishExec = false;
    
  
        function RunCALL(url) 
        {
            debugger;
          
            function successCallback()
            {
                debugger;
                console.log("SUCCESS COMPLETION HANDLER HAS BEEN CALLED!");
            }

            function completionHandler(data)
            {
                  debugger;
              
                  var returnedObj = data.responseJSON;
                  console.log(JSON.stringify(returnedObj));
              
                  if(returnedObj["photos"])
                    {
                        flickrReport(data.responseJSON);
                    }
                  else if(returnedObj["query"])
                    {
                      weatherReport(data.responseJSON);
                    }
            }
          
            function errorHandler(e)
            {
              debugger;
                console.log(e);
            }
   
                    console.log('RunCALL alert');
  
            $.ajax({
                url: url,
                async: false,
                dataType: 'jsonp',
                crossDomain: true,
                method: 'POST',
                statusCode: {
                    404: function () {
                        console.log('-4-4-4-4 WE GOT 404!');
                    },
                    200: function () {
                        console.log('-2-2-2-2 WE GOT 200!');
                    }
                },
                success: successCallback
                ,
                complete: completionHandler
                ,
                error: errorHandler
            });
        }
        


    function flickrReport(Obj) 
    {
        var farmID = '', serverID = '', photoID = '', origSecr = '', format = '', date = 0;
        var photoUrl = '';
        count++;
        console.log('flickReport count: ' + count);
        console.log(' in the flickReport ');
        var myObj = JSON.stringify(Obj);
        debugger;
        var rand = Math.floor(Math.random()*10)
        console.log("rand: "+rand);
        farmID = Obj.photos.photo[rand].farm;
        serverID = Obj.photos.photo[rand].server;
        photoID = Obj.photos.photo[rand].id;
        farmID = Obj.photos.photo[rand].farm;
        origSecr = Obj.photos.photo[rand].originalsecret;
        format = Obj.photos.photo[rand].originalformat;
        photoUrl = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + photoID + '_' + origSecr + '_o.' + format;
        document.body.style.backgroundImage = 'url(' + photoUrl + ')';
      //"url('URL')|none|initial|inherit"
        console.log(photoUrl);
        bool = true;
        console.log('The bool in flickr report is: ' + bool);
    }
  
    function weatherReport(jsonObj) 
    {

        console.log('Look for JSON: ' + jsonObj);
        var forecastArray = [], forecast = [];
        var myDate = new Date();
        var myDay = myDate.getDay();
        console.log('This is the day of the week: ' + myDay);        
        var iconCode = jsonObj.query.results.channel.item.condition.code;
        var iconUrl = 'http://vibecityent.com/blacksota/SVG/weatherSVG/colorful/svg/' + iconCode + '.svg';
        image.style.backgroundImage = 'url(' + iconUrl + ')';
        var mainTempNum = jsonObj.query.results.channel.item.condition.temp;
        var unit = jsonObj.query.results.channel.units.tempurature;
        var cityJSON = jsonObj.query.results.channel.location.city;
        var regionJSON = jsonObj.query.results.channel.location.region;
        var countryJSON = jsonObj.query.results.channel.location.country;
        var letterU = countryJSON.charAt(0);
        var letterS = countryJSON.charAt(7);
        forecastArray = jsonObj.query.results.channel.item.forecast;
        debugger;
        $('#barTitle').text(cityJSON + ', ' + regionJSON + ' ' + letterU + letterS);
        $('#iconText').text(jsonObj.query.results.channel.item.condition.text);
        $('.temp-gauge').text(mainTempNum);
        for (var i = 1; i < 6; i++) 
        {

            var imgCode = forecastArray[i].code;
            iconUrl = 'http://vibecityent.com/blacksota/SVG/weatherSVG/colorful/svg/' + imgCode + '.svg';
            var FcastDate = forecastArray[i].date.substring(0, 6);
            var day = forecastArray[i].day;
            var hiTemp = forecastArray[i].high;
            var lowTemp = forecastArray[i].low;
            var txtStatus = forecastArray[i].text;
            var wDate = day + ', ' + FcastDate;
            $('#locLine_' + i).text(wDate);
            $('#lowTemp_' + i).text(lowTemp + '\xB0');
            $('#hiTemp_' + i).text(hiTemp + '\xB0');
            var temp = 'LiCON_' + i;
            dropICONS = document.getElementById(temp);
            dropICONS.style.backgroundImage = 'url(' + iconUrl + ')';
        }
        
        $('.location,#barTitle,#myImage,#iconText ,.temp-gauge, #littleF').fadeIn(600);
    }
  
    function callWeather(listener) 
    {
        var yahoo_Url1 = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%20where%20text=%22';
        var city = '', state = '';
        var yahoo_Url2 = 'Norcross%20GA';
        var yahoo_Url3 = '%22%29%20and%20u%3D%22f%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        var yahoo_UrlSEND = yahoo_Url1 + yahoo_Url2 + yahoo_Url3;;
        var flickr_Domain = 'https://api.flickr.com/services/rest/?method=';
        var flickr_MethodCall = 'flickr.galleries.getPhotos';
        var flickr_ApiKey = 'api_key=9c97a9b3a44149de735e3a738c7b82ed';
        var galleryID = 'gallery_id=72157665782409143';
        var format = 'format=json';
        var extras = 'extras=original_format';
        var flickr_UrlSEND = flickr_Domain + flickr_MethodCall + '&' + flickr_ApiKey + '&' + galleryID + '&' + extras + '&' + format + '&jsoncallback=?';
      

        RunCALL(flickr_UrlSEND);
      
      
        if (listener == ('submit' || 'keydown')) 
        {
            pressMe = true;
            city = document.getElementById('city').value;
            state = document.getElementById('state').value;
            if (city === " " || state === " ") 
            {
                alert('Please enter a City and State\n Thank you!');
                return;
            }
            yahoo_Url2 = city + '%20' + state;
            yahoo_UrlSEND = yahoo_Url1 + yahoo_Url2 + yahoo_Url3;
            

            console.log('before all callss!!-----22222');
            console.log('in between callss!!-----22222');
            RunCALL(yahoo_UrlSEND);
            console.log('after all callss!!-----22222');
            document.getElementById('city').value = ' ';
            document.getElementById('state').value = ' ';
        } 
      
            else if (listener == 'reset') 
            {

             RunCALL(yahoo_UrlSEND);
            } 
      
            else 
            {
              if (!getWoeid) 
              {

                  RunCALL(yahoo_UrlSEND);
              } 
              else 
              {

                yahoo_UrlSEND = 'https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=d98266e1f96fc2207a20a5dc34ce9aa4&lat='+latt+'&lon='+long+ '&accuracy=11&format=json&nojsoncallback=?';
                RunCALL(yahoo_UrlSEND);
              }
           }
    }
  
    function slideShow()
    {
      
    }
  
    var geo_Options = {
      enableHighAccuracy : true,
      maximumAge : 0,
      timeout : 2
    };
  
    function myLocationSuccess(position) 
    {
        long = position.coords.longitude;
        latt = position.coords.latitude;
        latt = Math.floor(latt);
        long = Math.floor(long);
        getWoeid = true;
        return;
    }
  function errOnLocation(err)
  {
       console.log("Error: "+err.message+"["+err.code+"]"); 
  }
    function getLocation() {
        navigator.geolocation.getCurrentPosition(myLocationSuccess, errOnLocation, geo_Options);
    }
    function effects() {
        document.getElementById('specialLoc').style.display = 'none';
        $('.location-container ').slideDown(3000);
        setTimeout(function () {
            $('.location,#barTitle,#myImage,#iconText ,.temp-gauge, #littleF').fadeIn(5000);
        }, 3000);
        $('.slideBar, .settings').animate({ left: '-10px' }, 400).animate({ left: '-100px' }, 200).animate({ left: '-65px' }).animate({ left: '-10px' }, 1000);
    }
    function setup() 
    {
        var button = document.getElementById('submit');
        var reset = document.getElementById('reset');
        var input = document.getElementById('city');
        image = document.getElementById('myImage');
        button.addEventListener('mousedown', function () {
            callWeather('submit');
        });
        reset.addEventListener('mousedown', function () {
            callWeather('reset');
        });
    }
    debugger;
    getLocation();
    callWeather();
    setup();
    effects();
    slideShow();
});
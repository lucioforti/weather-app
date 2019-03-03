//get longitude and lattitude
window.addEventListener('load', ()=> {
    //change all of these to const rather than let
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    //select this span with the child nodes somehow?
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;
           //get around darksky cors error
           const proxy = 'http://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/5fd499a6d0bcbab4580ff76aa2b5e716/${lat},${long}`;
           fetch (api)
            
           //wait for the response. Then run this function.
            //take 'response' or 'data' or whatever you want to call this
            //convert 'response' to json object
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                //nice syntax trick rather than writing data.currently.temperature each time
                const {temperature, summary, icon }= data.currently;
                //set DOM elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Convert to Celsius
                let celsius = (temperature - 32) * (5 / 9 );
                //set icon
                setIcons(icon, document.querySelector('.icon'));
                //change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
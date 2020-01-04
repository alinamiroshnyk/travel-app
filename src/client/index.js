import "./styles/index.scss";
import flatpickr from "flatpickr";

flatpickr("#date_picker", {});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }

document.getElementById("search_button").onclick = function (e) {
    e.preventDefault()
    const destination = document.getElementById("destination_input").value
    const departureDate = document.getElementById("date_picker").value
    
    fetch('http://localhost:8080/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            destination, departureDate
        })
    }).then((res) => res.json())
    .then((res) => {
        console.log(res)
        const outputDate = document.getElementById("departure_result");
        outputDate.innerHTML = res.data.geo.departureDate;
        const outputWeather = document.getElementById("weather_results");
        outputWeather.innerHTML = res.data.sky.currently.temperature;
        const outputPicture = document.getElementById("destination_picture");
        outputPicture.src = res.data.pix.hits[0].largeImageURL;
    }) 
}

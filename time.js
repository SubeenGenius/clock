// Function to update the countdown timer
function updateCountdown() {
    const targetDate = new Date('2023-10-22T00:00:00');
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

// Function to get the current time in a specific time zone
function getCurrentTime(timezone, elementId) {
    const now = new Date();
    const options = { timeZone: timezone, hour12: false, hour: '2-digit', minute: '2-digit' };
    document.getElementById(elementId).textContent = now.toLocaleTimeString('en-US', options);
}

// Function to get the weather information for a location
async function getWeatherInfo(location, elementId) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`);
        const data = await response.json();
        const temperature = data.main.temp;
        document.getElementById(elementId).textContent = `Temp: ${temperature.toFixed(1)}°C`;
    } catch (error) {
        console.error(error);
    }
}

// Function to calculate the distance between Kathmandu and Sydney (approximate)
function calculateDistance() {
    const ktmCoordinates = { lat: 27.7172, lon: 85.3240 };
    const sydneyCoordinates = { lat: -33.8688, lon: 151.2093 };

    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(sydneyCoordinates.lat - ktmCoordinates.lat);
    const dLon = deg2rad(sydneyCoordinates.lon - ktmCoordinates.lon);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(ktmCoordinates.lat)) * Math.cos(deg2rad(sydneyCoordinates.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    document.getElementById('distance').textContent = `Approx. Distance: ${distance.toFixed(2)} km`;
}

function deg2rad(deg) {
   
    return deg * (Math.PI / 180);
}

// Initial call to update the countdown timer
updateCountdown();

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Get and display current time and weather for Kathmandu
getCurrentTime('Asia/Kathmandu', 'ktm-time');
getWeatherInfo('Kathmandu', 'ktm-weather');

// Get and display current time and weather for Sydney
getCurrentTime('Australia/Sydney', 'sydney-time');
getWeatherInfo('Sydney', 'sydney-weather');

// Calculate and display the distance between Kathmandu and Sydney
calculateDistance();

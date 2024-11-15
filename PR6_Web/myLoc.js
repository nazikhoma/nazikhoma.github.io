// Координати коледжу
let ourCoords = { latitude: 48.94321, longitude: 24.73380 };

// Глобальні змінні
let map, userMarker, collegeMarker, destinationMarker, watchId = null;

// Ініціалізація карти
function initMap() {
    map = L.map('map').setView([ourCoords.latitude, ourCoords.longitude], 13);

    // Додавання плиток OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Додавання маркера коледжу
    collegeMarker = L.marker([ourCoords.latitude, ourCoords.longitude])
        .addTo(map)
        .bindPopup('College Location');
}

// Отримання місцеположення
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        document.getElementById("watch").onclick = watchLocation;
        document.getElementById("clearWatch").onclick = clearWatch;
        document.getElementById("goToDestination").onclick = goToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

// Відображення місцеположення
function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += ` (with ${position.coords.accuracy} meters accuracy)`;

    let km = computeDistance(position.coords, ourCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km.toFixed(2)} km from the College`;

    if (!map) {
        console.error("Map is not initialized!");
        return;
    }

    // Оновлення маркера користувача
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('Your Location')
        .openPopup();

    map.setView([latitude, longitude]);
}

// Обробка помилок геолокації
function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (error.code === 0 || error.code === 2) {
        errorMessage += `: ${error.message}`;
    }
    document.getElementById("location").innerHTML = errorMessage;
}

// Обчислення відстані між координатами
function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;
    let distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;
    return distance;
}

// Переведення градусів у радіани
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// Стеження за місцеположенням
function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

// Зупинка стеження
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

// Переміщення до заданого пункту призначення
function goToDestination(event) {
    event.preventDefault();

    let destLatitude = parseFloat(document.getElementById("destLatitude").value);
    let destLongitude = parseFloat(document.getElementById("destLongitude").value);

    if (isNaN(destLatitude) || isNaN(destLongitude)) {
        alert("Please enter valid coordinates!");
        return;
    }

    // Додавання маркера пункту призначення
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }
    destinationMarker = L.marker([destLatitude, destLongitude])
        .addTo(map)
        .bindPopup('Destination')
        .openPopup();

    map.setView([destLatitude, destLongitude]);
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    getMyLocation();
});

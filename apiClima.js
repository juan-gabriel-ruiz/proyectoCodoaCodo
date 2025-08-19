const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
});

function callAPI(city, country) {
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c'; // tu API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}&units=metric&lang=es`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(data);
            }
        })
        .catch(error => {
            console.log(error);
            showError('Hubo un problema al conectar con la API.');
        });
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${parseInt(temp)}°C</h2>
        <p>Max: ${parseInt(temp_max)}°C</p>
        <p>Min: ${parseInt(temp_min)}°C</p>
    `;

    result.appendChild(content);
}

function showError(message) {
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function clearHTML() {
    result.innerHTML = '';
}

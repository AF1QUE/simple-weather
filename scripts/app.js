const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //   console.log(data);
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  //  Destructure properties
  const { cityDets, weather } = data;

  console.log(data);

  //  Update Details template
  details.innerHTML = `
              <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
  `;

  // Update images and icon
  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  const iconSrc = weather.WeatherIcon;
  time.setAttribute("src", timeSrc);
  console.log(iconSrc, "iconSrc working...");
  icon.setAttribute("src", `img/icons/${iconSrc}.svg`);

  //   remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  // Prevent default action
  e.preventDefault();

  //   get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   Update the ui with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      updateUI(err);
    });
});

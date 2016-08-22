function switchUnits(temp, to) {
  if (to === 'Fahrenheit') {
    const newTemp = `${Math.round(((temp * 9) / 5) + 32)}° F`;
    return { newTemp, text: 'Use Celsius' };
  }

  const newTemp = `${Math.round(((temp - 32) * 5) / 9)}° C`;
  return { newTemp, text: 'Use Fahrenheit' };
}

navigator.geolocation.getCurrentPosition((position) => {
  const coordinates = position.coords;
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  url += '&appid=061f24cf3cde2f60644a8240302983f2';
  $.get(url, (response) => {
    const { name: city } = response;
    const { sys: { country } } = response;
    const { main: { temp } } = response;
    const location = `${city}, ${country}`;
    const celsius = `${Math.round(temp - 273)}° C`;
    const { weather: [{ description }] } = response;
    const img = response.weather[0].icon;
    $('#location').text(location);
    $('#temp').text(celsius);
    $('#description').text(description);
    $('#icon').attr('src', `http://openweathermap.org/img/w/${img}.png`);
    $('.lead').fadeIn();
  });
}, (error) => {
  console.warn(error);
}, {
  enableHighAccuracy: true,
});

$('#switchunits').click((event) => {
  $('#temp').fadeOut(() => {
    const temp = $('#temp').text().slice(0, -3);
    const to = $(event.currentTarget).text().slice(4);
    const { newTemp, text } = switchUnits(temp, to);
    $('#temp').text(newTemp).fadeIn();
    $(event.currentTarget).text(text);
  });
});

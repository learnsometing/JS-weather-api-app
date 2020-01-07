import currentForecast from "../__fixtures__/currentForecast";

export const getCurrentForecast = (request) => {
  const params = request.url.split('?').slice(1);
  const splitParams = params.split('&');
  const [city, units, appkey] = splitParams.map(param => param.split('=').slice(1));
  const forecastJSON = JSON.stringify(currentForecast);
  const rejectJSON = JSON.stringify({
    cod: '400',
    message: 'Nothing to geocode'
  });

  return new Promise((resolve, reject) => {
    city && units && appkey
      ? resolve(forecastJSON)
      : reject(rejectJSON)
  })
}
export default (request) => {
  return fetch(request).then(response => {
    if (!response.ok) {
      throw new Error('Nothing to geocode');
    }
    return response.json();
  })
}
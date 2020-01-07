import currentForecast from "../__fixtures__/currentForecast";
import getCurrentForecast from "../util/getCurrentForecast";
import request from "../util/request";

describe("getCurrentForecast", () => {
  const fulfilled = jest.fn();
  const rejected = jest.fn();

  beforeEach(() => {
    fetch.mockReset();
    fulfilled.mockReset();
    rejected.mockReset();
  });

  it('should return promise containing the current forecast on fullfillment', () => {
    fetch.mockResponseOnce(JSON.stringify(currentForecast));
    const city = "Manhattan";
    const selectedUnit = 'imperial';
    const req = request(city, selectedUnit);

    const currForecast = getCurrentForecast(req);

    return currForecast.then(
      fulfilled,
      rejected
    ).finally(() => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(fulfilled.mock.calls.length).toBe(1);
      expect(rejected.mock.calls.length).toBe(0);
    });
  });

  it('should return promise containing an error message on rejection', () => {
    fetch.mockReject(new Error('Nothing to geocode'));

    const city = "";
    const selectedUnit = '';
    const currForecast = getCurrentForecast(city, selectedUnit);

    return currForecast.then(
      fulfilled,
      rejected
    ).finally(() => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(fulfilled.mock.calls.length).toBe(0);
      expect(rejected.mock.calls.length).toBe(1);
    });
  });
});
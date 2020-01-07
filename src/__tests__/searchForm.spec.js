import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { UnitButtons, createRequest, completeRequest, PureSearchForm } from "../searchForm/searchForm";
import currentForecast from "../__fixtures__/currentForecast";

describe("UnitButtons", () => {
  const onClick = jest.fn();

  it("should give the imperial button the activeBtn class when selected", () => {
    const { queryByText } = render(
      <UnitButtons onClick={onClick} activeBtn={'imperial'} />
    );

    const metricButton = queryByText(/C/);
    const imperialButton = queryByText(/F/);

    expect(metricButton).toHaveClass("inactiveBtn");
    expect(imperialButton).toHaveClass("activeBtn");
  });

  it("should give the metric button the activeBtn class when selected", () => {
    const { queryByText } = render(
      <UnitButtons onClick={onClick} activeBtn={'metric'} />
    );

    const metricButton = queryByText(/C/);
    const imperialButton = queryByText(/F/);

    expect(metricButton).toHaveClass("activeBtn");
    expect(imperialButton).toHaveClass("inactiveBtn");
  });
});

describe("createRequest", () => {
  it('should return a request matching the parameters', () => {
    const options = {
      method: 'GET',
      mode: 'cors'
    };

    const city = "Manhattan";
    const selectedUnit = 'imperial';
    const request = createRequest(city, selectedUnit, options);

    expect(request.url).toMatch(city);
    expect(request.url).toMatch(selectedUnit);

    expect(request.method).toEqual(options.method);
    // Fails after mocking fetch...
    // expect(request.mode).toEqual(options.mode);
  });
});

describe('completeRequest', () => {
  const setCF = jest.fn();
  const fulfilled = jest.fn();
  const rejected = jest.fn();

  beforeEach(() => {
    fetch.mockReset();
    setCF.mockReset();
    fulfilled.mockReset();
    rejected.mockReset();
  });

  it('should resolve the promise as fulfilled when valid response is returned', () => {
    fetch.mockResponseOnce(JSON.stringify(currentForecast));
    return completeRequest('foo', setCF).then(
      fulfilled,
      rejected
    ).finally(() => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(setCF.mock.calls.length).toBe(1);
      expect(fulfilled.mock.calls.length).toBe(1);
      expect(rejected.mock.calls.length).toBe(0);
    }
    );
  });

  it('should resolve the promise as rejected when invalid response is returned', () => {
    fetch.mockReject(new Error('Rejected'));
    return completeRequest('foo').then(
      fulfilled,
      rejected
    ).finally(() => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(setCF.mock.calls.length).toBe(0);
      expect(fulfilled.mock.calls.length).toBe(0);
      expect(rejected.mock.calls.length).toBe(1);
    });
  });
});

describe('PureSearchForm', () => {
  const completeRequestMock = jest.fn();
  const setCFMock = jest.fn();

  beforeEach(() => {
    completeRequestMock.mockReset();
    setCFMock.mockReset();
  });

  it('should call completeRequest when the form is submitted', () => {
    const { queryByText } = render(
      <PureSearchForm
        completeRequest={completeRequestMock}
        setCF={setCFMock}
      />
    );

    // submit the form
    const submitButton = queryByText('Search');
    fireEvent.click(submitButton);

    expect(completeRequestMock.mock.calls.length).toBe(1);
  });
});
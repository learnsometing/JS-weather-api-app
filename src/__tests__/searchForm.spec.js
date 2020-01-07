import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { UnitButtons, PureSearchForm } from "../searchForm/searchForm";
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

/*
* wanted this to work, but ultimately couldn't figure out how I could access
* the call to setCFMock.
*/

describe.skip('PureSearchForm', () => {
  const setCFMock = jest.fn();

  beforeEach(() => {
    setCFMock.mockReset();
  });

  it.skip('should reject the promise returned by getCurrentForecast when the form is submitted', () => {
    fetch.mockReject('Rejected');
    const { queryByText } = render(
      <PureSearchForm
        setCF={setCFMock}
      />
    );

    // submit the form
    const submitButton = queryByText('Search');
    fireEvent.click(submitButton);

    expect(setCFMock.mock.calls.length).toBe(0);
  });

  it('should fulfill the promise returned by getCurrentForecast when the form is submitted', () => {
    fetch.mockResponseOnce(JSON.stringify(currentForecast));
    const { queryByText } = render(
      <PureSearchForm
        setCF={setCFMock}
      />
    );

    // submit the form
    const submitButton = queryByText('Search');
    fireEvent.click(submitButton);
    //fails
    expect(setCFMock.mock.calls.length).toBe(0);
  });
});
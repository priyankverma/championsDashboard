import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./../../../App";
import { shallow } from "./../../../utils/enzyme";
import { render } from "@testing-library/react";

import renderer from "react-test-renderer";
import { WatchList } from "../watchList";
import { Button } from "antd";

describe("watchList Component", () => {
  let WatchComponent = (
    <Provider store={store}>
      <WatchList />
    </Provider>
  );

  it("renders page header correctly", () => {
    const { getByTitle } = render(WatchComponent);
    expect(getByTitle("Favourites")).toBeVisible();
  });

  it("renders no data view initially", () => {
    const { getByTestId } = render(WatchComponent);
    expect(getByTestId("noDataView")).toBeVisible();
  });

  it("list is not available initially", () => {
    const wrapper = shallow(WatchComponent);
    expect(wrapper.prop("watchList")).toBeUndefined();
  });

  it("add now button click works fine", () => {
    const mockCallBack = jest.fn();

    const listItem = shallow(<Button onClick={mockCallBack}>Ok!</Button>);
    listItem.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("matches snapshot perfectly", () => {
    const tree = renderer.create(WatchComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

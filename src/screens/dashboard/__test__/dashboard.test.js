import { render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./../../../App";
import { Dashboard } from "../dashboard";
import { shallow } from "./../../../utils/enzyme";
import { fireEvent, screen } from "@testing-library/react";

import renderer from "react-test-renderer";
import { CardImage } from "../dashboardStyles";

describe("Dashboard Component", () => {
  let DashComponent = (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  it("renders search bar correctly", () => {
    const { getByTestId } = render(DashComponent);
    expect(getByTestId("searchBar")).toBeVisible();
  });

  it("renders listing button correctly", () => {
    const { getByTestId } = render(DashComponent);
    expect(getByTestId("listIcon")).toBeVisible();
  });

  it("renders sort icon correctly", () => {
    const { getByTestId } = render(DashComponent);
    expect(getByTestId("sortIcon")).toBeVisible();
  });

  it("list is not available initially", () => {
    const wrapper = shallow(DashComponent);
    expect(wrapper.prop("championsList")).toBeUndefined();
  });

  test("search bar  must set search query correctly", () => {
    render(DashComponent);
    const searchBar = screen.getByPlaceholderText("Search Champions");
    expect(searchBar).toHaveValue(""); // checks for initial value to be ""

    fireEvent.change(searchBar, { target: { value: "testquery" } });
    expect(searchBar).toHaveValue("testquery"); // checks by passing a value testquery
  });

  it("listed item's click event works fine", () => {
    const mockCallBack = jest.fn();

    const listItem = shallow(<CardImage onClick={mockCallBack}>Ok!</CardImage>);
    listItem.find("img").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("matches snapshot perfectly", () => {
    const tree = renderer.create(DashComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/**
 * The main dashboard/landing screen, which shows the default listing of the champions, with an autocomplete search bar
 * that allows the user to search the record with suggestions and tapping on any champion from the list displays it's details.
 * The sorting function is also implemented, that is totally offline, and sorts the complete list of champions alphabettically in either order.
 *
 * Tapping on any of the list item, displays the details of the  champion, with the option to add that champion in the favourite list or remove
 * from the same.
 *
 * The count of champions in the favourite list is also visible on the the top panel, list item. Tapping on which, takes the user to the Watch list page.
 */

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Spin, Input, Card, Badge, Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "./../../commonComponents/customhooks/useWindowDimensions";
import {
  Container,
  LoaderWrap,
  StyledAutoComplete,
  CardWrap,
  StyledList,
  AutoCompleteList,
  HeaderWrap,
  CardImage,
} from "./dashboardStyles";
import DetailModal from "../../commonComponents/detailModal/detailModal";
import {
  getChampionsList,
  searchChampions,
} from "./../../redux/actions/listingAction";
import {
  addToWatchList,
  removeFromWatchList,
} from "../../redux/actions/watchListActions";

import {
  AppstoreAddOutlined,
  DeleteOutlined,
  ProfileOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
export const Dashboard = (props) => {
  const reducers = useSelector((state) => state);
  const history = useHistory();
  const { listingReducer, watchListReducer } = reducers;
  const { watchList } = watchListReducer;
  const { championsList, loading, searchedResults } = listingReducer;
  const [query, setQuery] = useState("");
  const [modal2Visible, setModal2Visible] = useState(false);
  const [champDetail, setChampDetail] = useState(null);
  const [sortLoader, setSortLoader] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChampionsList());
  }, []);
  const { Meta } = Card;
  const { height } = useWindowDimensions();
  /**
   * maps the results returned from the search api in the autocomplete box with image and name of the champion
   */
  const searchResult = useCallback(() => {
    return searchedResults.map((_, idx) => {
      const category = _.name;
      return {
        value: category,
        label: (
          <AutoCompleteList>
            <span>{category}</span>
            <Avatar size={"large"} alt={_.image_url} src={_.image_url} />
          </AutoCompleteList>
        ),
        completeRecord: _,
      };
    });
  }, [searchedResults]);
  /**
   * sets the data according to the query made in the autocomplete bar
   */
  useEffect(() => {
    setOptions(query ? searchResult() : []);
  }, [query, searchResult]);

  const [options, setOptions] = useState([]);

  /**
   *
   * @param {string} value - the query string made by the user
   */
  const handleSearch = (value) => {
    // eslint-disable-next-line no-unused-expressions
    value && value !== "" ? dispatch(searchChampions(value)) : null;
    setQuery(value);
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Sort Items">
        <Menu.Item>
          <div
            onClick={() => {
              championsList.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
              );
              setSortLoader(true);
              setTimeout(() => {
                setSortLoader(false);
              }, 400);
            }}
          >
            A to Z
          </div>
        </Menu.Item>
        <Menu.Item>
          <div
            onClick={() => {
              championsList.sort((a, b) =>
                a.name > b.name ? -1 : b.name > a.name ? 1 : 0
              );
              setSortLoader(true);
              setTimeout(() => {
                setSortLoader(false);
              }, 400);
            }}
          >
            Z to A
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>Close</div>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  return (
    <Container height={height}>
      <HeaderWrap>
        <StyledAutoComplete
          data-testid="searchBar"
          dropdownMatchSelectWidth={252}
          options={options}
          onSearch={handleSearch}
          onSelect={(item, option) => {
            setChampDetail(option.completeRecord);
            setModal2Visible(true);
          }}
        >
          <Input.Search
            size="large"
            placeholder="Search Champions"
            enterButton
          />
        </StyledAutoComplete>
        <Badge
          onClick={() => history.push("/watchlist")}
          count={watchList.length}
        >
          <ProfileOutlined data-testid="listIcon" style={{ fontSize: 30 }} />
        </Badge>
        <Dropdown overlay={menu} placement="bottomLeft">
          <SortAscendingOutlined
            data-testid="sortIcon"
            style={{ fontSize: 30 }}
          />
        </Dropdown>
      </HeaderWrap>
      {loading || sortLoader ? (
        <LoaderWrap>
          <Spin size="large" tip="Loading Champions" />
        </LoaderWrap>
      ) : null}

      {championsList && (
        <StyledList
          grid={{
            gutter: 0,
            column: 4,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          size="small"
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
          }}
          dataSource={championsList}
          align="middle"
          renderItem={(item) => (
            <CardWrap>
              <Card
                align="left"
                hoverable
                bordered
                cover={
                  <CardImage
                    height={height * 0.5}
                    onClick={() => {
                      setChampDetail(item);
                      setModal2Visible(true);
                    }}
                    alt="big_image_url"
                    src={item.big_image_url}
                  />
                }
                actions={[
                  <AppstoreAddOutlined
                    onClick={() => dispatch(addToWatchList(item))}
                    key="addToWatchList"
                  />,

                  <DeleteOutlined
                    onClick={() => dispatch(removeFromWatchList(item))}
                    key="removeFromWatchList"
                  />,
                ]}
                style={{ width: "100%" }}
              >
                <Meta
                  onClick={() => {
                    setChampDetail(item);
                    setModal2Visible(true);
                  }}
                  avatar={<Avatar src={item.image_url} />}
                  title={item.name}
                  description={"Attack Damage: " + item.attackdamage}
                />
              </Card>
            </CardWrap>
          )}
        />
      )}

      {champDetail && (
        <DetailModal
          champDetail={champDetail}
          okFunction={() => {
            dispatch(addToWatchList(champDetail));
            setModal2Visible(false);
          }}
          cancelFunction={() => {
            dispatch(removeFromWatchList(champDetail, true));
            setModal2Visible(false);
          }}
          okText={"Add to Fav."}
          cancelText={"Remove from Fav."}
          visibleStatus={modal2Visible}
        />
      )}
    </Container>
  );
};
export default Dashboard;

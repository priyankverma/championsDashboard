/**
 * The watch list component, which shows the chapions added to the list by the user.
 * User can see all the details of the user by tapping on the record, and has the option to remove the champion
 * from the list.
 * user canb see the details of the champion along with the image within this component.
 */

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Empty, List, Skeleton, Button, PageHeader } from "antd";
import { useHistory } from "react-router-dom";
import DetailModal from "./../../commonComponents/detailModal/detailModal";
import { removeFromWatchList } from "../../redux/actions/watchListActions";
import useWindowDimensions from "./../../commonComponents/customhooks/useWindowDimensions";
import { Container } from "./../dashboard/dashboardStyles";
export const WatchList = () => {
  const { height } = useWindowDimensions();
  const reducers = useSelector((state) => state);
  const { watchListReducer } = reducers;
  const { watchList } = watchListReducer;
  const [champDetail, setChampDetail] = useState(watchList && watchList[0]);
  const [modal2Visible, setModal2Visible] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <Container margin={"2%"} height={height}>
      <PageHeader onBack={() => history.goBack()} title="Favourites" />
      {watchList && watchList.length !== 0 ? (
        <List
          data-testid="favList"
          itemLayout="horizontal"
          dataSource={watchList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={() => dispatch(removeFromWatchList(item, true))}
                  key="list-loadmore-remove"
                >
                  Remove
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  onClick={() => {
                    setChampDetail(item);
                    setModal2Visible(true);
                  }}
                  avatar={<Avatar size="large" src={item.big_image_url} />}
                  title={<a key="list-loadmore-name">{item.name}</a>}
                  description={
                    "Attack Range: " +
                    item.attackrange +
                    ", Armor: " +
                    item.armor +
                    ", Attack Damage: " +
                    item.attackdamage
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          data-testid="noDataView"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>No Favourites</span>}
        >
          <Button
            data-testid="addNowButton"
            onClick={() => history.goBack()}
            type="primary"
          >
            Add Now
          </Button>
        </Empty>
      )}

      {champDetail && (
        <DetailModal
          champDetail={champDetail}
          okFunction={() => {
            dispatch(removeFromWatchList(champDetail, true));
            setModal2Visible(false);
          }}
          cancelFunction={() => {
            setModal2Visible(false);
          }}
          okText={"Remove from Fav."}
          cancelText={"Close"}
          visibleStatus={modal2Visible}
        />
      )}
    </Container>
  );
};

export default WatchList;

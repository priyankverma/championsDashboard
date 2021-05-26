/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Empty, Modal, List, Skeleton, Button, PageHeader } from "antd";
import { useHistory } from "react-router-dom";

// import { , ContentWrap,  } from "./watchListStyles";
import { removeFromWatchList } from "../../redux/actions/watchListActions";
import useWindowDimensions from "./../../commonComponents/customhooks/useWindowDimensions";
import { ModalWrap, BoldName, Container } from "./../dashboard/dashboardStyles";
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
        <Modal
          title={<BoldName>{champDetail.name}</BoldName>}
          centered
          visible={modal2Visible}
          onOk={() => {
            dispatch(removeFromWatchList(champDetail, true));
            setModal2Visible(false);
          }}
          onCancel={() => {
            setModal2Visible(false);
          }}
          cancelText={"Close"}
          okText={"Remove from Fav."}
        >
          <ModalWrap>
            <div>
              <p>
                Armor: <b>{champDetail.armor}</b>
              </p>
              <p>
                Attack Damage: <b>{champDetail.attackdamage}</b>
              </p>
              <p>
                Attack Range: <b>{champDetail.attackrange}</b>
              </p>
              <p>
                HP: <b>{champDetail.hp}</b>
              </p>
              <p>
                Moving Speed: <b>{champDetail.movespeed}</b>
              </p>
            </div>
            <div>
              <p>
                Spell Block: <b>{champDetail.spellblock}</b>
              </p>
              <p>
                HP Regen: <b>{champDetail.hpregen}</b>
              </p>

              <img
                alt="ChampImage"
                src={champDetail && champDetail.image_url}
              />
            </div>
          </ModalWrap>
          <p>
            Versions: <b>{champDetail.videogame_versions.join(", ")}</b>
          </p>
        </Modal>
      )}
    </Container>
  );
};

export default WatchList;

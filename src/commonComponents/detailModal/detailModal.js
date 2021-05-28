import React from "react";
import { Modal } from "antd";
import { ModalWrap, BoldName } from "./detailModalStyles";

function DetailModal(props) {
  const {
    champDetail,
    okFunction,
    cancelFunction,
    okText,
    cancelText,
    visibleStatus,
  } = props;
  return (
    <Modal
      title={<BoldName>{champDetail.name}</BoldName>}
      centered
      visible={visibleStatus}
      onOk={() => {
        okFunction();
      }}
      onCancel={() => {
        cancelFunction();
      }}
      cancelText={cancelText}
      okText={okText}
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

          <img alt="ChampImage" src={champDetail && champDetail.image_url} />
        </div>
      </ModalWrap>
      <p>
        Versions: <b>{champDetail.videogame_versions.join(", ")}</b>
      </p>
    </Modal>
  );
}

export default DetailModal;

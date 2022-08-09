import React from "react";
import { Button, Empty, Typography } from "antd";
import Img from "../img/empty.svg";

const { Title } = Typography;

const EmptyPage = () => {
  return (
    <div style={{ height: 'calc(100vh - 112px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Empty
        image={Img}
        imageStyle={{ height: 300 }}
        description={(
          <Title type="secondary" style={{ marginTop: 40, display: 'block' }} level={5}>
            There's no list available, create new list to add tasks
          </Title>
        )}
      />
    </div>
  );
};

export default EmptyPage;

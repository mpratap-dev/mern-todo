import { DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Typography } from "antd";
import axios from "axios";
import React from "react";

const { Text } = Typography;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SideMenu = ({ label, id, getLists }) => {
  const items = [
    {
      label: <Text style={{ color: '#ff4d4f' }}>Remove list</Text>,
      key: id,
      icon: (
        <Text style={{ color: '#ff4d4f' }}>
          <DeleteOutlined />
        </Text>
      ),
    },
  ];

  const handleClick = async ({ key }) => {
    try {
      const { data: { message: msg } } = await axios.delete(`${BASE_URL}lists/${id}`);
      getLists();
      message.success(msg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dropdown
      overlay={<Menu onClick={handleClick} items={items} />}
      trigger={["contextMenu"]}
    >
      <div>{label}</div>
    </Dropdown>
  );
};

export default SideMenu;

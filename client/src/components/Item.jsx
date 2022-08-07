import { Button, Checkbox, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Item = ({ defaultValue, label, id, getList }) => {
  const [checked, setChecked] = useState(defaultValue);

  const handleChange = async ({ target: { checked } }) => {
    console.log(id)
    const { data: { status, message: msg } } = await axios.patch(`${BASE_URL}lists/items/update/${id}`, { done: checked });
    if(status) {
      message.success(msg);
      setChecked(checked);
    }
  };

  const handleDelete = async ({ target: { checked } }) => {
    const { data: { status, message: msg } } = await axios.delete(`${BASE_URL}lists/items/${id}`);
    if(status) {
      message.success(msg);
      setChecked(checked);
      getList();
    }
  };

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Checkbox checked={checked} onChange={handleChange}>
        <Text delete={checked}>{label}</Text>
      </Checkbox>
      <Button
        danger
        onClick={handleDelete}
        size="small"
        icon={<DeleteOutlined style={{ fontSize: "12px" }} />}
      />
    </div>
  );
};

export default Item;

import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Row, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const { Link } = Typography;

const TodoList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [listName, setListName] = useState("");
  const { id } = useParams();

  const getList = async () => {
    const { data: { data, list_name } } = await axios.get(`${BASE_URL}lists/items/${id}`);
    setList(data);
    setListName(list_name);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const item = formData.get("item");
      const {
        data: { status, message: msg },
      } = await axios.patch(`${BASE_URL}lists/items/${id}`, { item });

      if (status) {
        getList();
        setInputValue("");
        message.success(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Card title={(
      <Link>
        <UnorderedListOutlined style={{ marginRight: 10 }} /> 
        {listName}
      </Link>
    )}>
      <Space style={{ width: "100%" }} size={20} direction="vertical">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input.Group>
            <Input
              name="item"
              value={inputValue}
              style={{ width: "calc(100% - 32px)" }}
              placeholder="Add a task"
              onChange={(event) => setInputValue(event.target.value)}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              htmlType="submit"
            ></Button>
          </Input.Group>
        </form>
        <Space style={{ width: "100%" }} size={10} direction="vertical">
          {Array.isArray(list) &&
            list.map(({ label, done, _id }) => (
              <Item
                key={_id}
                id={_id}
                label={label}
                defaultValue={done}
                getList={getList}
              />
            ))}
        </Space>
      </Space>
    </Card>
  );
};

export default TodoList;

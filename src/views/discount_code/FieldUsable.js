import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  DatePicker,
  InputNumber,
  Upload,
  Avatar,
  Divider,
} from "antd";
import moment from "moment";
import { Status } from "src/configs";

const FieldUsable = ({ nestField, selectFields, compareList }) => {
  const [isDate, setIsDate] = useState(false);
  return (
    <Space
      size={4}
      direction="horizontal"
      className="flex-wrap d-flex flex-grow-1 mb-2"
    >
      <Form.Item
        // label="Object"
        name={[nestField.name, "object"]}
        rules={[{ required: true }]}
        initialValue={selectFields[0]}
      >
        <Select
          onChange={(e) => {
            if (e == "created_time") {
              setIsDate(1);
            } else if (e == "status") {
              setIsDate(0);
            } else {
              setIsDate(2);
            }
          }}
        >
          {selectFields.map((item, idx) => (
            <Select.Option value={item} key={`${"idx"} + ${idx}`}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        // label="Condition"
        name={[nestField.name, "condition"]}
        rules={[{ required: true }]}
        initialValue={compareList[0]}
      >
        <Select>
          {compareList.map((item, idx) => (
            <Select.Option value={item} key={`${"idx"} + ${idx}`}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={[nestField.name, "value"]}
        // label="Value"
        rules={[{ required: true }]}
      >
        {isDate == 1 ? (
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Please input value!"
            format="HH:mm DD/MM/YYYY"
            showTime={{
              defaultValue: moment("00:00:00", "HH:mm:ss"),
            }}
          />
        ) : isDate == 0 ? (
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select value"
            optionFilterProp="value"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Status.discount_status.map((item, idx) => (
              <Select.Option value={item.id} key={idx}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select value"
            optionFilterProp="value"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Status.rank.map((item, idx) => (
              <Select.Option value={item.id} key={idx}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Space>
  );
};

export default FieldUsable;

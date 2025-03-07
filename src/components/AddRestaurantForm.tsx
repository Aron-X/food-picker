import {
  EnvironmentOutlined,
  PlusOutlined,
  ShopOutlined,
} from "@ant-design/icons"
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd"
import React, { useState } from "react"
import {
  CUISINE_OPTIONS,
  PRICE_LEVELS,
  Restaurant,
  TAG_OPTIONS,
} from "../types"

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

interface AddRestaurantFormProps {
  onAdd: (restaurant: Omit<Restaurant, "id" | "isUserAdded">) => void
}

const AddRestaurantForm: React.FC<AddRestaurantFormProps> = ({ onAdd }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: any) => {
    setLoading(true)

    const newRestaurant: Omit<Restaurant, "id" | "isUserAdded"> = {
      name: values.name,
      cuisine: values.cuisine || [],
      tags: values.tags || [],
      address: values.address,
      priceLevel: values.priceLevel,
      rating: values.rating,
      location:
        values.latitude && values.longitude
          ? {
              latitude: values.latitude,
              longitude: values.longitude,
            }
          : undefined,
    }

    onAdd(newRestaurant)
    form.resetFields()
    setLoading(false)
  }

  return (
    <Card style={{ marginBottom: 16, borderRadius: "8px" }}>
      <Title level={4}>
        <ShopOutlined /> 添加餐馆
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          cuisine: [],
          tags: [],
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="餐馆名称"
              rules={[{ required: true, message: "请输入餐馆名称" }]}
            >
              <Input placeholder="输入餐馆名称" prefix={<ShopOutlined />} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: "请输入餐馆地址" }]}
            >
              <Input
                placeholder="输入餐馆地址"
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item name="cuisine" label="菜系">
              <Select
                mode="multiple"
                placeholder="选择菜系"
                allowClear
                style={{ width: "100%" }}
              >
                {CUISINE_OPTIONS.map((cuisine) => (
                  <Option key={cuisine} value={cuisine}>
                    {cuisine}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="tags" label="标签">
              <Select
                mode="multiple"
                placeholder="选择标签"
                allowClear
                style={{ width: "100%" }}
              >
                {TAG_OPTIONS.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name="priceLevel" label="价格等级">
              <Select placeholder="选择价格等级" allowClear>
                {PRICE_LEVELS.map((level) => (
                  <Option key={level.value} value={level.value}>
                    {level.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="rating"
              label="评分"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 5,
                  message: "评分必须在0-5之间",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={5}
                step={0.1}
                placeholder="评分"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="latitude"
              label="纬度"
              rules={[{ type: "number", message: "请输入有效的纬度" }]}
            >
              <InputNumber
                placeholder="纬度"
                style={{ width: "100%" }}
                step={0.000001}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="longitude"
              label="经度"
              rules={[{ type: "number", message: "请输入有效的经度" }]}
            >
              <InputNumber
                placeholder="经度"
                style={{ width: "100%" }}
                step={0.000001}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
          >
            添加餐馆
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AddRestaurantForm

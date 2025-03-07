import {
  EnvironmentOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons"
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd"
import React, { useEffect, useState } from "react"
import {
  CUISINE_OPTIONS,
  PRICE_LEVELS,
  TAG_OPTIONS,
  UserPreference,
} from "../types"
import { getCurrentPosition } from "../utils/locationUtils"
import { getUserPreference, saveUserPreference } from "../utils/storageUtils"

const { Title } = Typography
const { Option } = Select

interface RestaurantFilterProps {
  onFilter: (preferences: UserPreference) => void
  onRandom: () => void
  onLocationChange: (
    location: { latitude: number; longitude: number } | null
  ) => void
  onReset?: () => void
}

const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  onFilter,
  onRandom,
  onLocationChange,
  onReset,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  // 从本地存储加载用户偏好
  useEffect(() => {
    const savedPreference = getUserPreference()
    if (savedPreference) {
      form.setFieldsValue(savedPreference)
    }
  }, [form])

  // 处理筛选提交
  const handleSubmit = (values: any) => {
    setLoading(true)
    const preferences: UserPreference = {
      cuisines: values.cuisines || [],
      tags: values.tags || [],
      priceLevel: values.priceLevel || [],
    }

    // 保存用户偏好到本地存储
    saveUserPreference(preferences)

    // 触发筛选
    onFilter(preferences)
    setLoading(false)
  }

  // 重置筛选条件
  const handleReset = () => {
    form.resetFields()
    if (onReset) {
      onReset()
    } else {
      onFilter({
        cuisines: [],
        tags: [],
      })
    }
  }

  // 获取当前位置
  const handleGetLocation = async () => {
    setLocationLoading(true)
    try {
      const position = await getCurrentPosition()
      messageApi.success("位置获取成功")
      onLocationChange(position)
    } catch (error) {
      console.error("获取位置失败:", error)
      messageApi.error("获取位置失败")
      onLocationChange(null)
    } finally {
      setLocationLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div>
        <Title level={4}>
          <FilterOutlined /> 筛选条件
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            cuisines: [],
            tags: [],
            priceLevel: [],
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item name="cuisines" label="菜系">
                <Select
                  mode="multiple"
                  placeholder="选择菜系"
                  allowClear
                  style={{ width: "100%" }}
                  maxTagCount={3}
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
                  maxTagCount={3}
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
                <Select
                  mode="multiple"
                  placeholder="选择价格等级"
                  allowClear
                  style={{ width: "100%" }}
                  maxTagCount={3}
                >
                  {PRICE_LEVELS.map((level) => (
                    <Option key={level.value} value={level.value}>
                      {level.label} {level.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space wrap>
              <Button
                type="primary"
                htmlType="submit"
                icon={<FilterOutlined />}
                loading={loading}
              >
                应用筛选
              </Button>

              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                重置
              </Button>

              <Button
                type="primary"
                onClick={onRandom}
                style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
              >
                随机选择
              </Button>

              <Button
                type="default"
                icon={<EnvironmentOutlined />}
                onClick={handleGetLocation}
                loading={locationLoading}
              >
                获取当前位置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default RestaurantFilter

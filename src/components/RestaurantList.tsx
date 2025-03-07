import {
  DeleteOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons"
import { Button, Card, List, Rate, Space, Tag, Tooltip, Typography } from "antd"
import React from "react"
import { PRICE_LEVELS, Restaurant } from "../types"
import { getAmapNavigationUrl } from "../utils/restaurantUtils"

const { Text, Title } = Typography

interface RestaurantListProps {
  restaurants: Restaurant[]
  userLocation?: { latitude: number; longitude: number } | null
  onDelete?: (id: string) => void
  isRandom?: boolean
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  userLocation,
  onDelete,
  isRandom = false,
}) => {
  // 打开高德地图导航
  const openNavigation = (restaurant: Restaurant) => {
    const url = getAmapNavigationUrl(
      restaurant,
      userLocation?.latitude,
      userLocation?.longitude
    )
    window.open(url, "_blank")
  }

  return (
    <div className="restaurant-list-container">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={restaurants}
        style={{ height: "100%", overflow: "auto" }}
        renderItem={(restaurant) => (
          <List.Item>
            <Card
              hoverable
              title={
                <Title level={4} style={{ margin: 0 }}>
                  {restaurant.name}
                  {restaurant.isUserAdded && (
                    <Tag color="green" style={{ marginLeft: 8 }}>
                      自定义
                    </Tag>
                  )}
                </Title>
              }
              extra={
                onDelete && restaurant.isUserAdded ? (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(restaurant.id)
                    }}
                  />
                ) : null
              }
              style={{
                height: "100%",
                borderRadius: "8px",
                boxShadow: isRandom ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
                border: isRandom ? "2px solid #1890ff" : "1px solid #f0f0f0",
              }}
              onClick={() => openNavigation(restaurant)}
            >
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                {restaurant.rating && (
                  <div>
                    <Rate disabled defaultValue={restaurant.rating} allowHalf />
                    <Text style={{ marginLeft: 8 }}>{restaurant.rating}</Text>
                  </div>
                )}

                <div>
                  <DollarOutlined style={{ marginRight: 8 }} />
                  <Text>
                    {restaurant.priceLevel
                      ? `${
                          PRICE_LEVELS.find(
                            (p) => p.value === restaurant.priceLevel
                          )?.label
                        } (${
                          PRICE_LEVELS.find(
                            (p) => p.value === restaurant.priceLevel
                          )?.description
                        })`
                      : "价格未知"}
                  </Text>
                </div>

                <div>
                  <TagOutlined style={{ marginRight: 8 }} />
                  <Space size={[0, 4]} wrap>
                    {restaurant.cuisine.map((cuisine) => (
                      <Tag key={cuisine} color="blue">
                        {cuisine}
                      </Tag>
                    ))}
                    {restaurant.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </div>

                <div>
                  <Tooltip title={restaurant.address}>
                    <Space>
                      <EnvironmentOutlined />
                      <Text ellipsis style={{ maxWidth: "100%" }}>
                        {restaurant.address}
                      </Text>
                    </Space>
                  </Tooltip>
                </div>

                <Button
                  type="primary"
                  block
                  icon={<EnvironmentOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    openNavigation(restaurant)
                  }}
                >
                  导航前往
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default RestaurantList

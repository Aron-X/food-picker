import {
  EnvironmentOutlined,
  ReloadOutlined,
  SmileOutlined,
} from "@ant-design/icons"
import { Button, Modal, Result, Space, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Restaurant } from "../types"
import { getAmapNavigationUrl } from "../utils/restaurantUtils"
import RestaurantList from "./RestaurantList"

const { Title, Text } = Typography

interface RandomPickerProps {
  visible: boolean
  restaurants: Restaurant[]
  onClose: () => void
  onPickAgain: () => void
  userLocation?: { latitude: number; longitude: number } | null
}

const RandomPicker: React.FC<RandomPickerProps> = ({
  visible,
  restaurants,
  onClose,
  onPickAgain,
  userLocation,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  // 当餐馆列表变化时，选择一个餐馆
  useEffect(() => {
    if (restaurants.length > 0) {
      setShowAnimation(true)

      // 模拟随机选择的动画效果
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * restaurants.length)
        setSelectedRestaurant(restaurants[randomIndex])
      }, 100)

      // 3秒后停止动画
      setTimeout(() => {
        clearInterval(interval)
        setShowAnimation(false)

        // 最终选择
        const finalIndex = Math.floor(Math.random() * restaurants.length)
        setSelectedRestaurant(restaurants[finalIndex])
      }, 3000)
    } else {
      setSelectedRestaurant(null)
    }
  }, [restaurants])

  // 导航到选中的餐馆
  const handleNavigate = () => {
    if (selectedRestaurant) {
      const url = getAmapNavigationUrl(
        selectedRestaurant,
        userLocation?.latitude,
        userLocation?.longitude
      )
      window.open(url, "_blank")
    }
  }

  return (
    <Modal
      open={visible}
      title={
        <Title level={3} style={{ margin: 0, textAlign: "center" }}>
          <SmileOutlined style={{ color: "#1890ff" }} /> 今天吃这个！
        </Title>
      }
      footer={null}
      onCancel={onClose}
      width={800}
      centered
    >
      {restaurants.length === 0 ? (
        <Result
          status="warning"
          title="没有找到符合条件的餐馆"
          subTitle="请尝试调整筛选条件或添加更多餐馆"
          extra={
            <Button type="primary" onClick={onClose}>
              返回
            </Button>
          }
        />
      ) : (
        <>
          {showAnimation ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <Title level={2} style={{ color: "#1890ff" }}>
                正在为您挑选...
              </Title>
              <Text style={{ fontSize: 18 }}>
                {selectedRestaurant?.name || ""}
              </Text>
            </div>
          ) : (
            <>
              {selectedRestaurant && (
                <div style={{ marginBottom: 20 }}>
                  <RestaurantList
                    restaurants={[selectedRestaurant]}
                    userLocation={userLocation}
                    isRandom={true}
                  />

                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Space>
                      <Button
                        type="primary"
                        size="large"
                        icon={<ReloadOutlined />}
                        onClick={onPickAgain}
                      >
                        重新选择
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        icon={<EnvironmentOutlined />}
                        onClick={handleNavigate}
                        style={{
                          backgroundColor: "#52c41a",
                          borderColor: "#52c41a",
                        }}
                      >
                        导航前往
                      </Button>
                    </Space>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  )
}

export default RandomPicker

import {
  AppstoreOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import {
  Button,
  ConfigProvider,
  Modal,
  Tabs,
  Tag,
  Typography,
  message,
  notification,
} from "antd"
import "antd/dist/reset.css"
import zhCN from "antd/lib/locale/zh_CN"
import { useEffect, useState } from "react"
import "./App.css"

import AddRestaurantForm from "./components/AddRestaurantForm"
import RandomPicker from "./components/RandomPicker"
import RestaurantFilter from "./components/RestaurantFilter"
import RestaurantList from "./components/RestaurantList"

import { mockRestaurants } from "./data/mockData"
import {
  getChengduRestaurants,
  getNearbyMeituanRestaurants,
} from "./services/meituan"
import { Restaurant, UserPreference } from "./types"
import {
  getCurrentPosition,
  getLocationByIP,
  getMockAddressFromCoords,
} from "./utils/locationUtils"
import {
  addRestaurant,
  filterRestaurants,
  getNearbyRestaurants,
  getRandomRestaurants,
} from "./utils/restaurantUtils"
import {
  getRestaurants,
  getUserLocation,
  saveRestaurants,
  saveUserLocation,
} from "./utils/storageUtils"

const { Title } = Typography

function App() {
  // 状态
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  )
  const [randomRestaurants, setRandomRestaurants] = useState<Restaurant[]>([])
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [userAddress, setUserAddress] = useState<string>("")
  const [randomPickerVisible, setRandomPickerVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const [messageApi, contextHolder] = message.useMessage()
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const [locationSuccessModalVisible, setLocationSuccessModalVisible] =
    useState(false)
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([])
  const [locationLoading, setLocationLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"mock" | "meituan">("meituan")
  const [notificationApi, contextHolderNotification] =
    notification.useNotification()

  // 初始化数据
  useEffect(() => {
    const initApp = async () => {
      setInitialLoading(true)

      try {
        // 尝试获取美团数据
        const meituanData = await getChengduRestaurants()
        if (meituanData.length > 0) {
          setRestaurants(meituanData)
          setFilteredRestaurants(meituanData)
          setDataSource("meituan")
          messageApi.success("已加载美团餐馆数据")
        } else {
          // 如果美团数据获取失败，使用本地存储或模拟数据
          const savedRestaurants = getRestaurants()
          if (savedRestaurants.length > 0) {
            setRestaurants(savedRestaurants)
            setFilteredRestaurants(savedRestaurants)
          } else {
            setRestaurants(mockRestaurants)
            setFilteredRestaurants(mockRestaurants)
          }
          setDataSource("mock")
        }
      } catch (error) {
        console.error("获取美团数据失败:", error)
        // 使用本地存储或模拟数据
        const savedRestaurants = getRestaurants()
        if (savedRestaurants.length > 0) {
          setRestaurants(savedRestaurants)
          setFilteredRestaurants(savedRestaurants)
        } else {
          setRestaurants(mockRestaurants)
          setFilteredRestaurants(mockRestaurants)
        }
        setDataSource("mock")
      }

      // 获取保存的位置信息
      const savedLocation = getUserLocation()

      if (savedLocation) {
        setUserLocation(savedLocation)

        // 获取地址
        const address = getMockAddressFromCoords(
          savedLocation.longitude,
          savedLocation.latitude
        )
        setUserAddress(address)

        // 获取附近餐馆
        try {
          if (dataSource === "meituan") {
            const nearby = await getNearbyMeituanRestaurants(
              savedLocation.latitude,
              savedLocation.longitude
            )
            setNearbyRestaurants(nearby)
          } else {
            const nearby = getNearbyRestaurants(
              restaurants,
              savedLocation.latitude,
              savedLocation.longitude
            )
            setNearbyRestaurants(nearby)
          }
        } catch (error) {
          console.error("获取附近餐馆失败:", error)
        }
      } else {
        // 如果没有保存的位置，则尝试通过IP获取大致位置
        try {
          const ipLocation = await getLocationByIP()
          setUserLocation({
            latitude: ipLocation.latitude,
            longitude: ipLocation.longitude,
          })
          setUserAddress(`${ipLocation.province}${ipLocation.city}`)

          // 获取附近餐馆
          try {
            if (dataSource === "meituan") {
              const nearby = await getNearbyMeituanRestaurants(
                ipLocation.latitude,
                ipLocation.longitude
              )
              setNearbyRestaurants(nearby)
            } else {
              const nearby = getNearbyRestaurants(
                restaurants,
                ipLocation.latitude,
                ipLocation.longitude
              )
              setNearbyRestaurants(nearby)
            }
          } catch (error) {
            console.error("获取附近餐馆失败:", error)
          }

          // 显示位置请求模态框
          setLocationModalVisible(true)
        } catch (error) {
          console.error("IP定位失败:", error)
          // 显示位置请求模态框
          setLocationModalVisible(true)
        }
      }

      setInitialLoading(false)
    }

    initApp()
  }, [])

  // 当餐馆列表变化时，保存到本地存储
  useEffect(() => {
    if (restaurants.length > 0 && dataSource === "mock") {
      saveRestaurants(restaurants)
    }
  }, [restaurants, dataSource])

  // 当用户位置变化时，更新附近餐馆
  useEffect(() => {
    const updateNearbyRestaurants = async () => {
      if (userLocation) {
        try {
          if (dataSource === "meituan") {
            const nearby = await getNearbyMeituanRestaurants(
              userLocation.latitude,
              userLocation.longitude
            )
            setNearbyRestaurants(nearby)
          } else {
            const nearby = getNearbyRestaurants(
              restaurants,
              userLocation.latitude,
              userLocation.longitude
            )
            setNearbyRestaurants(nearby)
          }
        } catch (error) {
          console.error("获取附近餐馆失败:", error)
        }

        // 获取地址
        const address = getMockAddressFromCoords(
          userLocation.longitude,
          userLocation.latitude
        )
        setUserAddress(address)
      }
    }

    updateNearbyRestaurants()
  }, [userLocation, restaurants, dataSource])

  // 处理筛选
  const handleFilter = (preferences: UserPreference) => {
    const filtered = filterRestaurants(restaurants, preferences)
    setFilteredRestaurants(filtered)

    if (filtered.length === 0) {
      messageApi.warning("没有找到符合条件的餐馆")
    } else {
      messageApi.success(`找到 ${filtered.length} 家符合条件的餐馆`)
    }
  }

  // 处理重置
  const handleReset = () => {
    setFilteredRestaurants(restaurants)
    messageApi.success("已重置筛选条件")
  }

  // 处理随机选择
  const handleRandom = () => {
    if (filteredRestaurants.length === 0) {
      messageApi.warning("没有可选择的餐馆")
      return
    }

    const random = getRandomRestaurants(filteredRestaurants, 1)
    setRandomRestaurants(random)
    setRandomPickerVisible(true)
  }

  // 处理添加餐馆
  const handleAddRestaurant = (
    newRestaurant: Omit<Restaurant, "id" | "isUserAdded">
  ) => {
    const updatedRestaurants = addRestaurant(restaurants, newRestaurant)
    setRestaurants(updatedRestaurants)
    setFilteredRestaurants(updatedRestaurants)
    messageApi.success("餐馆添加成功")

    // 切换到餐馆列表标签页
    setActiveTab("1")
  }

  // 处理删除餐馆
  const handleDeleteRestaurant = (id: string) => {
    const updatedRestaurants = restaurants.filter((r) => r.id !== id)
    setRestaurants(updatedRestaurants)
    setFilteredRestaurants(updatedRestaurants)
    messageApi.success("餐馆删除成功")
  }

  // 处理位置变化
  const handleLocationChange = (
    location: { latitude: number; longitude: number } | null
  ) => {
    setUserLocation(location)
    if (location) {
      saveUserLocation(location)

      // 获取地址
      const address = getMockAddressFromCoords(
        location.longitude,
        location.latitude
      )
      setUserAddress(address)

      messageApi.success("位置获取成功")
      setLocationModalVisible(false)

      // 显示位置成功弹窗
      setLocationSuccessModalVisible(true)
    }
  }

  // 获取当前位置
  const handleGetLocation = async () => {
    setLocationLoading(true)
    try {
      const position = await getCurrentPosition()

      // 获取地址
      const address = getMockAddressFromCoords(
        position.longitude,
        position.latitude
      )
      setUserAddress(address)

      // 保存位置
      setUserLocation(position)
      saveUserLocation(position)

      messageApi.success("位置获取成功")
      setLocationModalVisible(false)

      // 显示位置成功弹窗
      setLocationSuccessModalVisible(true)

      // 更新附近餐馆
      try {
        if (dataSource === "meituan") {
          const nearby = await getNearbyMeituanRestaurants(
            position.latitude,
            position.longitude
          )
          setNearbyRestaurants(nearby)
        } else {
          const nearby = getNearbyRestaurants(
            restaurants,
            position.latitude,
            position.longitude
          )
          setNearbyRestaurants(nearby)
        }
      } catch (error) {
        console.error("获取附近餐馆失败:", error)
      }
    } catch (error) {
      console.error("获取位置失败:", error)
      messageApi.error("获取位置失败，请手动获取")
    } finally {
      setLocationLoading(false)
      setLocationModalVisible(false)
    }
  }

  if (initialLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={3}>今天吃什么？</Title>
          <p>正在加载应用...</p>
        </div>
      </div>
    )
  }

  return (
    <ConfigProvider locale={zhCN}>
      {contextHolder}
      {contextHolderNotification}
      <div className="app-container">
        {/* 头部 */}
        <div className="app-header">
          <div className="header-left">
            <AppstoreOutlined style={{ fontSize: 24, marginRight: 12 }} />
            <Title level={3} style={{ margin: 0 }}>
              今天吃什么？
            </Title>
          </div>
          <div className="header-right">
            {userLocation && (
              <Tag
                color="blue"
                icon={<EnvironmentOutlined />}
                style={{ marginRight: 8 }}
              >
                当前位置: {userAddress || "未知地址"}
              </Tag>
            )}
            <Tag color={dataSource === "meituan" ? "green" : "orange"}>
              数据来源: {dataSource === "meituan" ? "美团" : "本地"}
            </Tag>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="app-content">
          {/* 筛选条件 */}
          <div className="filter-section">
            <RestaurantFilter
              onFilter={handleFilter}
              onRandom={handleRandom}
              onLocationChange={handleLocationChange}
              onReset={handleReset}
            />
          </div>

          {/* 附近餐馆 */}
          {userLocation && nearbyRestaurants.length > 0 && (
            <div className="nearby-section">
              <Title level={4}>
                <EnvironmentOutlined /> 附近餐馆 ({nearbyRestaurants.length})
              </Title>
              <RestaurantList
                restaurants={nearbyRestaurants}
                userLocation={userLocation}
                onDelete={handleDeleteRestaurant}
              />
            </div>
          )}

          {/* 餐馆列表/添加餐馆 */}
          <div className="tabs-section">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              style={{ height: "100%" }}
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <AppstoreOutlined />
                      餐馆列表
                    </span>
                  ),
                  children: (
                    <RestaurantList
                      restaurants={filteredRestaurants}
                      userLocation={userLocation}
                      onDelete={handleDeleteRestaurant}
                    />
                  ),
                },
                {
                  key: "2",
                  label: (
                    <span>
                      <PlusOutlined />
                      添加餐馆
                    </span>
                  ),
                  children: <AddRestaurantForm onAdd={handleAddRestaurant} />,
                },
              ]}
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="app-footer">
          今天吃什么 ©{new Date().getFullYear()} Created by Aron
        </div>

        {/* 随机选择模态框 */}
        <RandomPicker
          visible={randomPickerVisible}
          restaurants={randomRestaurants}
          onClose={() => setRandomPickerVisible(false)}
          onPickAgain={handleRandom}
          userLocation={userLocation}
        />

        {/* 位置请求模态框 */}
        <Modal
          title="获取位置"
          open={locationModalVisible}
          onCancel={() => setLocationModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setLocationModalVisible(false)}>
              稍后再说
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={locationLoading}
              onClick={handleGetLocation}
              icon={<EnvironmentOutlined />}
            >
              获取当前位置
            </Button>,
          ]}
        >
          <p>为了更好地为您推荐附近的餐馆，我们需要获取您的位置信息。</p>
          <p>获取位置后，我们将为您推荐5公里范围内的餐馆。</p>
          <p>当前位置：{userAddress || "未知"}</p>
        </Modal>

        {/* 位置获取成功模态框 */}
        <Modal
          title={
            <span>
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginRight: 8 }}
              />
              位置获取成功
            </span>
          }
          open={locationSuccessModalVisible}
          onCancel={() => setLocationSuccessModalVisible(false)}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={() => setLocationSuccessModalVisible(false)}
            >
              知道了
            </Button>,
          ]}
          width={500}
        >
          <div style={{ padding: "16px 0" }}>
            <p style={{ fontSize: "16px", marginBottom: "16px" }}>
              <strong>您当前的位置信息：</strong>
            </p>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <p style={{ marginBottom: "12px" }}>
                <EnvironmentOutlined
                  style={{ marginRight: 8, color: "#1890ff", fontSize: "18px" }}
                />
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {userAddress || "未知地址"}
                </span>
              </p>
              {userLocation && (
                <div>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "14px",
                      marginLeft: "26px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ display: "inline-block", width: "60px" }}>
                      经度：
                    </span>
                    <span>{userLocation.longitude.toFixed(6)}</span>
                  </p>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "14px",
                      marginLeft: "26px",
                    }}
                  >
                    <span style={{ display: "inline-block", width: "60px" }}>
                      纬度：
                    </span>
                    <span>{userLocation.latitude.toFixed(6)}</span>
                  </p>
                </div>
              )}
            </div>
            <p style={{ marginTop: "16px", fontSize: "15px" }}>
              已为您找到{" "}
              <strong style={{ color: "#1890ff", fontSize: "16px" }}>
                {nearbyRestaurants.length}
              </strong>{" "}
              家附近的餐馆。
            </p>
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
              您可以在"附近餐馆"区域查看这些餐馆，或者使用筛选条件进一步筛选。
            </p>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  )
}

export default App

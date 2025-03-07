import axios from "axios"
import { saveUserLocation } from "./storageUtils"

// 高德地图API密钥（实际使用时请替换为您自己的密钥）
const AMAP_KEY = "您的高德地图API密钥"

// 获取用户当前位置
export const getCurrentPosition = (): Promise<{
  latitude: number
  longitude: number
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("您的浏览器不支持地理位置服务"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        // 保存位置到本地存储
        saveUserLocation(location)

        resolve(location)
      },
      (error) => {
        let errorMessage = "获取位置信息失败"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "用户拒绝了位置请求"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "位置信息不可用"
            break
          case error.TIMEOUT:
            errorMessage = "获取位置请求超时"
            break
        }

        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

// 将坐标转换为中文地址（使用高德地图API）
export const getAddressFromCoords = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  try {
    // 注意：高德地图API使用的是经度在前，纬度在后
    const response = await axios.get(
      `https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${longitude},${latitude}&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0`
    )

    if (response.data.status === "1" && response.data.regeocode) {
      return response.data.regeocode.formatted_address || "未知地址"
    }
    return "未知地址"
  } catch (error) {
    console.error("获取地址失败:", error)
    return "未知地址"
  }
}

// 根据IP获取大致位置（模拟）
export const getLocationByIP = async (): Promise<{
  city: string
  province: string
  latitude: number
  longitude: number
}> => {
  try {
    // 这里可以接入真实的IP定位API，如高德IP定位API
    // 目前使用模拟数据
    return {
      city: "成都市",
      province: "四川省",
      // 成都市中心坐标
      latitude: 30.657,
      longitude: 104.065,
    }
  } catch (error) {
    console.error("IP定位失败:", error)
    // 默认返回成都坐标
    return {
      city: "成都市",
      province: "四川省",
      latitude: 30.657,
      longitude: 104.065,
    }
  }
}

// 模拟获取地址（当没有高德地图API密钥时使用）
export const getMockAddressFromCoords = (
  longitude: number,
  latitude: number
): string => {
  // 成都市中心坐标大约是 (104.0650, 30.6570)
  const chengduCenterLng = 104.065
  const chengduCenterLat = 30.657

  // 计算与成都市中心的距离
  const distLng = longitude - chengduCenterLng
  const distLat = latitude - chengduCenterLat

  // 根据距离生成模拟地址
  let direction = ""
  if (distLat > 0 && Math.abs(distLat) > Math.abs(distLng)) direction = "北"
  else if (distLat < 0 && Math.abs(distLat) > Math.abs(distLng))
    direction = "南"
  else if (distLng > 0 && Math.abs(distLng) > Math.abs(distLat))
    direction = "东"
  else if (distLng < 0 && Math.abs(distLng) > Math.abs(distLat))
    direction = "西"
  else if (distLat > 0 && distLng > 0) direction = "东北"
  else if (distLat > 0 && distLng < 0) direction = "西北"
  else if (distLat < 0 && distLng > 0) direction = "东南"
  else if (distLat < 0 && distLng < 0) direction = "西南"

  // 计算大致距离（公里）
  const distance = Math.sqrt(distLat * distLat + distLng * distLng) * 111 // 1度约等于111公里

  // 生成更详细的地址
  const districts = [
    "锦江区",
    "青羊区",
    "金牛区",
    "武侯区",
    "成华区",
    "高新区",
    "天府新区",
  ]
  const streets = [
    "人民南路",
    "春熙路",
    "科华北路",
    "天府大道",
    "锦江大道",
    "红星路",
    "高新大道",
    "交子大道",
  ]
  const communities = [
    "锦江花园",
    "青羊小区",
    "金牛公寓",
    "武侯花园",
    "成华小区",
    "高新社区",
    "天府花园",
  ]

  // 根据坐标随机但确定性地选择区域、街道和社区
  const districtIndex = Math.floor((longitude * latitude) % districts.length)
  const streetIndex = Math.floor((longitude + latitude) % streets.length)
  const communityIndex = Math.floor((longitude - latitude) % communities.length)

  // 生成门牌号
  const buildingNumber = Math.floor((longitude * latitude * 100) % 200) + 1

  if (distance < 2) {
    return `四川省成都市锦江区人民南路6号`
  } else if (distance < 5) {
    return `四川省成都市${districts[districtIndex]}${streets[streetIndex]}${buildingNumber}号`
  } else if (distance < 20) {
    return `四川省成都市${districts[districtIndex]}${streets[streetIndex]}${buildingNumber}号${communities[communityIndex]}`
  } else if (distance < 100) {
    return `四川省${direction}部地区`
  } else {
    return `四川省成都市`
  }
}

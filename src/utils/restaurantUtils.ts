import { v4 as uuidv4 } from "uuid"
import { Restaurant, UserPreference } from "../types"

// 根据用户偏好筛选餐馆
export const filterRestaurants = (
  restaurants: Restaurant[],
  preferences: UserPreference
): Restaurant[] => {
  return restaurants.filter((restaurant) => {
    // 如果用户选择了菜系，则筛选
    if (preferences.cuisines.length > 0) {
      const hasCuisine = restaurant.cuisine.some((cuisine) =>
        preferences.cuisines.includes(cuisine)
      )
      if (!hasCuisine) return false
    }

    // 如果用户选择了标签，则筛选
    if (preferences.tags.length > 0) {
      const hasTag = restaurant.tags.some((tag) =>
        preferences.tags.includes(tag)
      )
      if (!hasTag) return false
    }

    // 如果用户选择了价格等级，则筛选
    if (preferences.priceLevel && preferences.priceLevel.length > 0) {
      if (
        !restaurant.priceLevel ||
        !preferences.priceLevel.includes(restaurant.priceLevel)
      ) {
        return false
      }
    }

    return true
  })
}

// 随机选择餐馆
export const getRandomRestaurants = (
  restaurants: Restaurant[],
  count: number = 3
): Restaurant[] => {
  if (restaurants.length <= count) {
    return [...restaurants]
  }

  const shuffled = [...restaurants].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// 计算两个位置之间的距离（使用哈弗辛公式）
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // 地球半径，单位为公里
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // 距离，单位为公里
  return distance
}

// 角度转弧度
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

// 根据当前位置获取附近的餐馆
export const getNearbyRestaurants = (
  restaurants: Restaurant[],
  latitude: number,
  longitude: number,
  maxDistance: number = 5 // 默认5公里范围内
): Restaurant[] => {
  return restaurants.filter((restaurant) => {
    if (!restaurant.location) return false

    const distance = calculateDistance(
      latitude,
      longitude,
      restaurant.location.latitude,
      restaurant.location.longitude
    )

    return distance <= maxDistance
  })
}

// 添加新餐馆
export const addRestaurant = (
  restaurants: Restaurant[],
  newRestaurant: Omit<Restaurant, "id" | "isUserAdded">
): Restaurant[] => {
  const restaurant: Restaurant = {
    ...newRestaurant,
    id: uuidv4(),
    isUserAdded: true,
  }

  return [...restaurants, restaurant]
}

// 生成高德地图导航链接
export const getAmapNavigationUrl = (
  restaurant: Restaurant,
  userLat?: number,
  userLng?: number
): string => {
  // 如果餐馆没有位置信息，则使用地址搜索
  if (!restaurant.location) {
    return `https://uri.amap.com/search?keyword=${encodeURIComponent(
      restaurant.address
    )}`
  }

  // 如果有用户位置和餐馆位置，则使用导航
  if (userLat && userLng) {
    // 使用网页版导航，而不是URI API，以确保在浏览器中也能正常工作
    return `https://gaode.com/dir?from=${userLng},${userLat},我的位置&to=${
      restaurant.location.longitude
    },${restaurant.location.latitude},${encodeURIComponent(
      restaurant.name
    )}&mode=car`
  }

  // 如果只有餐馆位置，则使用标记点
  return `https://gaode.com/search?query=${encodeURIComponent(
    restaurant.name
  )}&city=全国`
}

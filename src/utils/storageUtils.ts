import { Restaurant, UserPreference } from "../types"

// 本地存储键名
const STORAGE_KEYS = {
  RESTAURANTS: "food-picker-restaurants",
  USER_PREFERENCE: "food-picker-user-preference",
  USER_LOCATION: "food-picker-user-location",
}

// 保存餐馆列表到本地存储
export const saveRestaurants = (restaurants: Restaurant[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants))
  } catch (error) {
    console.error("保存餐馆列表失败:", error)
  }
}

// 从本地存储获取餐馆列表
export const getRestaurants = (): Restaurant[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESTAURANTS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("获取餐馆列表失败:", error)
    return []
  }
}

// 保存用户偏好到本地存储
export const saveUserPreference = (preference: UserPreference): void => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCE,
      JSON.stringify(preference)
    )
  } catch (error) {
    console.error("保存用户偏好失败:", error)
  }
}

// 从本地存储获取用户偏好
export const getUserPreference = (): UserPreference | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCE)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("获取用户偏好失败:", error)
    return null
  }
}

// 保存用户位置到本地存储
export const saveUserLocation = (location: {
  latitude: number
  longitude: number
}): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_LOCATION, JSON.stringify(location))
  } catch (error) {
    console.error("保存用户位置失败:", error)
  }
}

// 从本地存储获取用户位置
export const getUserLocation = (): {
  latitude: number
  longitude: number
} | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_LOCATION)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("获取用户位置失败:", error)
    return null
  }
}

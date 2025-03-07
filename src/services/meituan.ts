import { v4 as uuidv4 } from "uuid"
import { Restaurant } from "../types"

// 美团API接口（模拟）
// 实际项目中，您需要使用真实的美团API或其他第三方服务
// 这里仅作为示例，模拟获取美团数据

// 模拟美团餐馆数据
interface MeituanRestaurant {
  id: string
  name: string
  avgScore: number
  avgPrice: number
  address: string
  latitude: number
  longitude: number
  tags: string[]
  cuisines: string[]
}

// 模拟美团API响应
interface MeituanResponse {
  status: number
  data: {
    poiList: MeituanRestaurant[]
  }
}

// 将美团价格转换为我们的价格等级
const convertPriceLevel = (avgPrice: number): number => {
  if (avgPrice <= 50) return 1
  if (avgPrice <= 100) return 2
  if (avgPrice <= 200) return 3
  if (avgPrice <= 300) return 4
  return 5
}

// 获取成都地区的餐馆数据（模拟）
export const getChengduRestaurants = async (): Promise<Restaurant[]> => {
  try {
    // 这里应该是真实的API调用
    // const response = await axios.get('https://api.meituan.com/restaurants?city=chengdu');

    // 模拟数据
    const mockResponse: MeituanResponse = {
      status: 200,
      data: {
        poiList: [
          {
            id: "1",
            name: "成都小吃",
            avgScore: 4.7,
            avgPrice: 45,
            address: "四川省成都市锦江区春熙路299号",
            latitude: 30.6539,
            longitude: 104.0778,
            tags: ["小吃", "传统", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "2",
            name: "川西坝子火锅",
            avgScore: 4.8,
            avgPrice: 120,
            address: "四川省成都市武侯区科华北路65号",
            latitude: 30.6321,
            longitude: 104.0551,
            tags: ["火锅", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "3",
            name: "蜀九香火锅",
            avgScore: 4.6,
            avgPrice: 150,
            address: "四川省成都市青羊区人民中路三段28号",
            latitude: 30.6731,
            longitude: 104.0633,
            tags: ["火锅", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "4",
            name: "钢管厂小郡肝串串",
            avgScore: 4.5,
            avgPrice: 60,
            address: "四川省成都市武侯区科华北路42号",
            latitude: 30.6301,
            longitude: 104.0531,
            tags: ["串串", "辣的", "小吃"],
            cuisines: ["中餐"],
          },
          {
            id: "5",
            name: "成都印象川菜",
            avgScore: 4.4,
            avgPrice: 90,
            address: "四川省成都市锦江区红星路三段1号",
            latitude: 30.6501,
            longitude: 104.0801,
            tags: ["川菜", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "6",
            name: "皇城老妈火锅",
            avgScore: 4.7,
            avgPrice: 180,
            address: "四川省成都市锦江区东大街芷泉段229号",
            latitude: 30.6571,
            longitude: 104.0831,
            tags: ["火锅", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "7",
            name: "马路边边麻辣烫",
            avgScore: 4.3,
            avgPrice: 40,
            address: "四川省成都市武侯区科华北路89号",
            latitude: 30.6341,
            longitude: 104.0561,
            tags: ["麻辣烫", "辣的", "小吃"],
            cuisines: ["中餐"],
          },
          {
            id: "8",
            name: "成都小龙坎火锅",
            avgScore: 4.6,
            avgPrice: 140,
            address: "四川省成都市锦江区春熙路188号",
            latitude: 30.6529,
            longitude: 104.0768,
            tags: ["火锅", "辣的"],
            cuisines: ["中餐"],
          },
          {
            id: "9",
            name: "韩国料理",
            avgScore: 4.2,
            avgPrice: 120,
            address: "四川省成都市锦江区红星路三段99号",
            latitude: 30.6511,
            longitude: 104.0811,
            tags: ["烤肉", "清淡的"],
            cuisines: ["韩餐"],
          },
          {
            id: "10",
            name: "成都寿司",
            avgScore: 4.4,
            avgPrice: 150,
            address: "四川省成都市武侯区科华北路111号",
            latitude: 30.6351,
            longitude: 104.0571,
            tags: ["寿司", "清淡的"],
            cuisines: ["日料"],
          },
          {
            id: "11",
            name: "意大利风味餐厅",
            avgScore: 4.5,
            avgPrice: 180,
            address: "四川省成都市锦江区红星路三段123号",
            latitude: 30.6521,
            longitude: 104.0821,
            tags: ["披萨", "意面"],
            cuisines: ["西餐", "意大利菜"],
          },
          {
            id: "12",
            name: "成都兰州拉面",
            avgScore: 4.1,
            avgPrice: 30,
            address: "四川省成都市武侯区科华北路22号",
            latitude: 30.6291,
            longitude: 104.0521,
            tags: ["面食", "清真"],
            cuisines: ["中餐"],
          },
          {
            id: "13",
            name: "泰式餐厅",
            avgScore: 4.3,
            avgPrice: 110,
            address: "四川省成都市锦江区春熙路266号",
            latitude: 30.6535,
            longitude: 104.0774,
            tags: ["辣的", "酸的"],
            cuisines: ["泰餐"],
          },
          {
            id: "14",
            name: "粤式茶餐厅",
            avgScore: 4.4,
            avgPrice: 85,
            address: "四川省成都市武侯区科华北路78号",
            latitude: 30.6331,
            longitude: 104.0551,
            tags: ["清淡的", "早餐", "点心"],
            cuisines: ["中餐"],
          },
          {
            id: "15",
            name: "重庆小面",
            avgScore: 4.2,
            avgPrice: 25,
            address: "四川省成都市锦江区红星路三段45号",
            latitude: 30.6491,
            longitude: 104.0791,
            tags: ["面食", "辣的", "小吃"],
            cuisines: ["中餐"],
          },
        ],
      },
    }

    // 转换为我们的Restaurant格式
    const restaurants: Restaurant[] = mockResponse.data.poiList.map((poi) => ({
      id: uuidv4(),
      name: poi.name,
      cuisine: poi.cuisines,
      tags: poi.tags,
      address: poi.address,
      location: {
        latitude: poi.latitude,
        longitude: poi.longitude,
      },
      rating: poi.avgScore,
      priceLevel: convertPriceLevel(poi.avgPrice),
      isUserAdded: false,
    }))

    return restaurants
  } catch (error) {
    console.error("获取美团数据失败:", error)
    return []
  }
}

// 根据位置获取附近餐馆（模拟）
export const getNearbyMeituanRestaurants = async (
  latitude: number,
  longitude: number,
  radius: number = 5000 // 默认5公里
): Promise<Restaurant[]> => {
  try {
    // 这里应该是真实的API调用
    // const response = await axios.get(`https://api.meituan.com/restaurants/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);

    // 先获取所有餐馆
    const allRestaurants = await getChengduRestaurants()

    // 筛选出附近的餐馆（简单计算距离）
    const nearbyRestaurants = allRestaurants.filter((restaurant) => {
      if (!restaurant.location) return false

      const distance = calculateDistance(
        latitude,
        longitude,
        restaurant.location.latitude,
        restaurant.location.longitude
      )

      return distance <= radius / 1000 // 转换为公里
    })

    return nearbyRestaurants
  } catch (error) {
    console.error("获取附近餐馆失败:", error)
    return []
  }
}

// 计算两点之间的距离（公里）
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // 地球半径（公里）
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

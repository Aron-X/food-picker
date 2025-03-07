export interface Restaurant {
  id: string
  name: string
  cuisine: string[] // 菜系，如中餐、西餐等
  tags: string[] // 标签，如辣的、清淡的、面食等
  address: string
  location?: {
    latitude: number
    longitude: number
  }
  rating?: number // 评分
  priceLevel?: number // 价格等级，1-5
  isUserAdded?: boolean // 是否是用户添加的
}

export interface UserPreference {
  cuisines: string[]
  tags: string[]
  priceLevel?: number[]
  location?: {
    latitude: number
    longitude: number
  }
}

export interface FilterOptions {
  cuisines: string[]
  tags: string[]
  priceLevels: number[]
}

// 预定义的菜系选项
export const CUISINE_OPTIONS = [
  "中餐",
  "西餐",
  "日料",
  "韩餐",
  "泰餐",
  "越南菜",
  "意大利菜",
  "墨西哥菜",
  "快餐",
  "其他",
]

// 预定义的标签选项
export const TAG_OPTIONS = [
  "辣的",
  "清淡的",
  "面食",
  "米饭",
  "汤",
  "烧烤",
  "火锅",
  "小吃",
  "早餐",
  "午餐",
  "晚餐",
  "宵夜",
  "健康",
  "甜点",
  "饮品",
]

// 价格等级
export const PRICE_LEVELS = [
  { value: 1, label: "¥", description: "人均 0-50 元" },
  { value: 2, label: "¥¥", description: "人均 50-100 元" },
  { value: 3, label: "¥¥¥", description: "人均 100-200 元" },
  { value: 4, label: "¥¥¥¥", description: "人均 200-300 元" },
  { value: 5, label: "¥¥¥¥¥", description: "人均 300元以上" },
]

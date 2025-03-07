import { v4 as uuidv4 } from "uuid"
import { Restaurant } from "../types"

// 模拟的餐馆数据
export const mockRestaurants: Restaurant[] = [
  {
    id: uuidv4(),
    name: "老北京炸酱面",
    cuisine: ["中餐"],
    tags: ["面食", "传统"],
    address: "北京市海淀区中关村大街1号",
    location: {
      latitude: 39.9847,
      longitude: 116.3046,
    },
    rating: 4.5,
    priceLevel: 2,
  },
  {
    id: uuidv4(),
    name: "川西坝子",
    cuisine: ["中餐"],
    tags: ["辣的", "火锅"],
    address: "北京市朝阳区建国路88号",
    location: {
      latitude: 39.9088,
      longitude: 116.4716,
    },
    rating: 4.7,
    priceLevel: 3,
  },
  {
    id: uuidv4(),
    name: "和风料理",
    cuisine: ["日料"],
    tags: ["清淡的", "寿司"],
    address: "北京市朝阳区三里屯路19号",
    location: {
      latitude: 39.9367,
      longitude: 116.465,
    },
    rating: 4.8,
    priceLevel: 4,
  },
  {
    id: uuidv4(),
    name: "意大利风味",
    cuisine: ["西餐", "意大利菜"],
    tags: ["披萨", "意面"],
    address: "北京市西城区金融街7号",
    location: {
      latitude: 39.9179,
      longitude: 116.3604,
    },
    rating: 4.6,
    priceLevel: 4,
  },
  {
    id: uuidv4(),
    name: "兰州拉面",
    cuisine: ["中餐"],
    tags: ["面食", "清真"],
    address: "北京市海淀区中关村南大街5号",
    location: {
      latitude: 39.9647,
      longitude: 116.3176,
    },
    rating: 4.3,
    priceLevel: 1,
  },
  {
    id: uuidv4(),
    name: "韩式烤肉",
    cuisine: ["韩餐"],
    tags: ["烧烤", "辣的"],
    address: "北京市朝阳区工体北路13号",
    location: {
      latitude: 39.9407,
      longitude: 116.4545,
    },
    rating: 4.5,
    priceLevel: 3,
  },
  {
    id: uuidv4(),
    name: "泰式风情",
    cuisine: ["泰餐"],
    tags: ["辣的", "酸的"],
    address: "北京市朝阳区东三环中路39号",
    location: {
      latitude: 39.9198,
      longitude: 116.4804,
    },
    rating: 4.4,
    priceLevel: 3,
  },
  {
    id: uuidv4(),
    name: "粤式茶餐厅",
    cuisine: ["中餐"],
    tags: ["清淡的", "早餐", "点心"],
    address: "北京市西城区西单北大街120号",
    location: {
      latitude: 39.9132,
      longitude: 116.3747,
    },
    rating: 4.6,
    priceLevel: 2,
  },
  {
    id: uuidv4(),
    name: "重庆小面",
    cuisine: ["中餐"],
    tags: ["面食", "辣的", "小吃"],
    address: "北京市海淀区五道口华清嘉园12号",
    location: {
      latitude: 39.9927,
      longitude: 116.3426,
    },
    rating: 4.2,
    priceLevel: 1,
  },
  {
    id: uuidv4(),
    name: "沙县小吃",
    cuisine: ["中餐"],
    tags: ["面食", "小吃", "快餐"],
    address: "北京市海淀区学院路15号",
    location: {
      latitude: 39.9867,
      longitude: 116.3526,
    },
    rating: 3.9,
    priceLevel: 1,
  },
]

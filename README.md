# 今天吃什么 - 美食选择助手

一个帮助你解决"今天吃什么"难题的 Web 应用。

## 功能特点

- 🍔 **餐馆推荐**：根据用户偏好推荐餐馆
- 🎲 **随机选择**：当你犹豫不决时，让应用帮你随机选择
- 📍 **位置服务**：获取当前位置，推荐附近餐馆，并显示详细的位置信息
- 🗺️ **导航功能**：一键打开高德地图导航到选中的餐馆
- 📝 **自定义餐馆**：添加你喜欢的餐馆到列表中
- 🔍 **多维度筛选**：根据菜系、标签、价格等多维度筛选餐馆

## 在线体验

访问 [今天吃什么](https://food-picker-aron.vercel.app) 立即体验！

最新部署地址：[Food Picker GitHub](https://food-picker-github-f7mtz0pwc-arons-projects-436111c9.vercel.app)

## 技术栈

- React + TypeScript
- Vite 构建工具
- Ant Design UI 组件库
- 本地存储保存用户数据
- 高德地图 API 集成

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 部署指南

### Vercel 部署

1. 在 GitHub 上创建一个仓库并推送代码
2. 在 [Vercel](https://vercel.com) 上注册账号
3. 点击 "New Project"，然后导入你的 GitHub 仓库
4. 保持默认设置，点击 "Deploy"
5. 部署完成后，Vercel 会提供一个可访问的 URL

#### 命令行部署（推荐）

你也可以使用 Vercel CLI 进行部署：

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目（在项目根目录下执行）
vercel

# 部署到生产环境
vercel --prod
```

### Netlify 部署

1. 在 GitHub 上创建一个仓库并推送代码
2. 在 [Netlify](https://netlify.com) 上注册账号
3. 点击 "New site from Git"，然后选择你的 GitHub 仓库
4. 构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`dist`
5. 点击 "Deploy site"
6. 部署完成后，Netlify 会提供一个可访问的 URL

## 使用说明

1. **筛选餐馆**：在首页选择你的偏好（菜系、标签、价格等）
2. **随机选择**：点击"随机选择"按钮，应用会为你随机推荐一家餐馆
3. **获取位置**：点击"获取当前位置"按钮，应用会获取你的位置信息并显示详细地址
4. **添加餐馆**：切换到"添加餐馆"标签页，填写餐馆信息并添加
5. **导航前往**：点击餐馆卡片或"导航前往"按钮，打开高德地图导航

## 位置功能

应用提供了详细的位置服务功能：

- **位置获取**：自动获取用户当前位置，精确到街道级别
- **位置显示**：在弹窗中显示详细的位置信息，包括地址和坐标
- **附近餐馆**：根据用户位置自动推荐 5 公里范围内的餐馆
- **位置导航**：一键导航到选中的餐馆，支持高德地图

## 数据存储

应用使用浏览器的 localStorage 存储以下数据：

- 用户添加的餐馆列表
- 用户的偏好设置
- 用户的位置信息

## 贡献

欢迎提交 Issue 或 Pull Request 来改进这个项目！

## 许可证

MIT

## 作者

Created by Aron

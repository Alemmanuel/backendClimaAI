# 🌦️ Clima AI Backend

Welcome to the **Clima AI Backend**! This project is the powerhouse behind the Clima AI application, providing robust and reliable weather data processing and recommendations. Built with modern web technologies, this backend ensures a seamless and efficient experience for all users.

## 🚀 Features

- **Real-time Weather Data Processing**: Fetch and process weather information for any city.
- **AI-Powered Recommendations**: Get personalized weather recommendations using AI.
- **Robust API**: A well-structured API for easy integration with the frontend.
- **Error Handling**: Comprehensive error handling to ensure smooth operation.
- **Environment Configuration**: Secure and flexible environment configuration using dotenv.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: Promise-based HTTP client for making API requests.
- **dotenv**: Module to load environment variables from a .env file.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **OpenAI**: AI-powered API for generating weather recommendations.
- **Vercel**: Deployment platform for frontend and backend applications.
- **Render**: Cloud platform for deploying web applications and APIs.

## 📂 Project Structure

```
backend/
├── controllers/        # Controllers for handling API requests
├── routes.js           # API routes
├── server.js           # Main server file
├── config.js           # Configuration file
├── aiController.js     # AI controller for fetching weather info
├── weatherController.js# Weather data processing controller
├── .env                # Environment variables file
└── README.md           # This README file
```

## 🌐 Live Demo

Check out the live demo of the Clima AI Backend [here](https://your-live-demo-link.com).

## 📦 Installation

To get started with the Clima AI Backend, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/clima-ai-backend.git
   cd clima-ai-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a .env file**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=10000
   DEEPSEEK_API_KEY=your-deepseek-api-key
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

## 🖥️ Usage

1. **Start the Server**: Run `npm start` to start the server.
2. **API Endpoints**:
   - **POST /api/weather**: Fetch weather data for a specified city.
     - Request Body: `{ "city": "CityName" }`
     - Response: `{ "temperature": "20°C", "feelsLike": "18°C", "recommendation": "Wear a light jacket.", "emoji": "😊" }`
   - **GET /recommendations**: Get general weather recommendations.


## 🌍 Deployment

The Clima AI Backend can be deployed on various platforms, including:

- **Vercel**: Deploy your backend with ease using Vercel's powerful platform. [Learn more](https://vercel.com).
- **Render**: Deploy your backend on Render for a seamless and scalable experience. [Learn more](https://render.com).

## 🛡️ Security

We take security seriously. If you find any security issues, please report them to us immediately.

## 🤝 Contributing

We welcome contributions from the community! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m "Add your commit message"
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a pull request**.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.

## 📧 Contact

If you have any questions or need further assistance, feel free to contact us at [alemmanuel0412@gmail.com](alemmanuel0412@gmail.com).

---

Thank you for using the Clima AI Backend! We hope you enjoy using it as much as we enjoyed building it. 🌟

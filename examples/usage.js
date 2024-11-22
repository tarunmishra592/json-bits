import AxiosRedis from "../src/axios-redis";

const apiClient = new AxiosRedis(
  { baseURL: "https://api.example.com" },
  { redisConfig: { host: "127.0.0.1", port: 6379 }, cacheTTL: 600 }
);

async function fetchData() {
  try {
    const response = await apiClient.get("/data", {}, true);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

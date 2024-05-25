const CircuitBreaker = require("opossum");
const httpProxy = require("http-proxy");

// Hàm thực hiện proxy request
function proxyRequest(req, res) {
  return new Promise((resolve, reject) => {
    const proxy = httpProxy.createProxyServer();
    proxy.web(req, res, { target: process.env.ENROLLMENT_URL }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

// Tạo Circuit Breaker
const options = {
  timeout: 1000, // thời gian chờ 1 giây
  errorThresholdPercentage: 50, // Ngưỡng lỗi 50%
  resetTimeout: 5000, // thời gian reset 5 giây
};

const breaker = new CircuitBreaker(proxyRequest, options);
// Xử lý các sự kiện của Circuit Breaker
breaker.on("halfOpen", () => console.log("Circuit breaker đang mở một phần"));
breaker.on("close", () => console.log("Circuit breaker đã đóng"));
breaker.on("fallback", () => console.log("Sử dụng phương pháp thay thế"));
breaker.on("reject", () => console.log("Yêu cầu bị từ chối"));
breaker.on("timeout", () => console.log("Yêu cầu vượt quá thời gian chờ"));

// Xử lý sự kiện "open" của Circuit Breaker
breaker.on("open", () => {
  console.log("Circuit breaker đã mở");
  console.log("Sử dụng phương pháp dự phòng");
  // Gọi hàm dự phòng ở đây
  yourFallbackFunction();
});
// Xử lý sự kiện "failure" của Circuit Breaker
breaker.on("failure", () => {
  console.log("Yêu cầu thất bại");
  console.log("Sử dụng phương pháp dự phòng");
  // Gọi hàm dự phòng ở đây
  yourFallbackFunction();
});
// Hàm thực hiện chức năng dự phòng
function yourFallbackFunction() {
  console.log("Sử dụng chức năng dự phòng");
}

module.exports = breaker;

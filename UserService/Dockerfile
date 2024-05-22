# Sử dụng Node.js phiên bản LTS mới nhất
FROM node:20-alpine

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép tệp package.json và package-lock.json để cài đặt các phụ thuộc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Cài đặt nodemon global
RUN npm install -g nodemon

# Sao chép mã nguồn ứng dụng vào thư mục làm việc trong container
COPY . .

# Đảm bảo quyền truy cập
RUN chmod -R 755 /usr/src/app

# Mở cổng 3002 của container
EXPOSE 3002

# Khởi chạy ứng dụng bằng nodemon
CMD ["nodemon", "index.js"]

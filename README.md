## Author: Thinh Nguyen

# LTU14-GROUP09 - Đề tài: Hệ thống quản lý lisence cho người dùng

# Đặc điểm của chương trình

- Chương trình phân tán
- Sử dụng ngôn ngữ lập trình javascript
- Sử dụng cơ sở dữ liệu mongodb
- Sử dụng docker
- Sử dụng server nodejs
- Mã hoá key bằng mã hoá bcrypt
- Hệ thống phân quyền API giúp bảo mật chặt chẽ
- Hệ thống có màn hình quản lý quyền, file upload, users và các dữ liệu chứa trong database
- Người dùng khi kích hoạt sản phẩm phải có key của sản phẩm mà hệ thống đưa ra
- Người dùng khi có key điền key vào để kích hoạt sản phẩm và sử dụng ứng dụng

# Chức năng phía Client

- Đăng nhập/ Đăng xuất
- Tạo sản phẩm, quản lý key với vai trò là admin
- Với client khi đã đăng nhập có màn hình danh sách sản phẩm và sản phẩm của tôi
- Có chức năng tính toán trong app khi đã active product
- Buy product và active lisence key

# Chức năng phía server

- Đăng nhập/ Đăng xuất
- Quản lý các API, roles và permissions của người dùng với hệ thống
- Tự động generate ra key, list key và chỉnh sửa key nếu muốn
- Quản lý các người dùng, phân quyền và danh sách dữ liệu trong CSDL

# Hướng dẫn cách chạy project:

- Bước 1: clone project từ github sử dụng lệnh git clone
- Bước 2: Chắc chắn rằng bạn đã cài đặt nodejs, mongodb, strapi và docker
- Bước 3: cd vào folder front-end cài đặt node modules, và cs vào thư mục back-end làm tương tự
- Bước 4: Start project trên docker bằng lệnh docker-compose up (chạy trên cả front-end và back-end)

Kết quả:
Server được chạy trên cổng 1337
Client chạy trên cổng 3000 và 4000

# Development on localhost

Client

1. di chuyển đến folder front-end-lisence-management-app
2. chạy lệnh yarn install | npm install để install node modules
3. để start client chạy yarn serve | npm run serve

Server

1. di chuyển đến folder back-end-lisenece-management-app
2. Cài đặt framework strapi bằng script npm install strapi@beta -g
3. chạy lệnh yarn install | npm install để install node modules
4. để start server chạy yarn start | npm run start

# Express-Mongo-Docker

Chắc chắn bạn đã cài đặt docker cli để chạy docker bằng terminal
Để chạy client trên docker chạy : docker-compose up
Để chạy server trên docker chạy : docker-compose up

# Các lệnh trong docker

- Xem các container đang chạy trên docker : docker ps -a
- Để build thư mục chạy trên docker : docker build .
- Start 1 container chạy : docker run
- Xoá image/container: docker image/container rm <tên image/container >
- Delete all image hiện có: docker image rm \$(docker images –a –q)
- Stop 1 container cụ thể: docker stop <tên container>
- Run container từ image và thay đổi tên container: docker run –name <tên container> <tên image>
- Stop all container: docker stop \$(docker ps –a –q)
- Delete all container hiện có: docker rm \$(docker ps –a –q)
- Show log a container: docker logs <tên container>
- Build một image từ container: docker build -t <tên container> .
- Tạo một container chạy ngầm: docker run -d <tên image>
- Tải một image trên docker hub: docker pull <tên image>
- Start một container: docker start <tên container>

# Docker compose

- Công cụ để chạy multiple container cho docker application
- Giải thích các câu lệnh trong docker compose

# Các câu lệnh trong docker compose

- version: chỉ ra phiên bản docker-compose đã sử dụng.
- services: thiết lập các services(containers) muốn cài đặt và chạy.
- image: chỉ ra image được sử dụng trong lúc tạo ra container.
- build: dùng để tạo container.
- ports: thiết lập ports chạy tại máy host và trong container.
- restart: tự động khởi chạy khi container bị tắt.
- Ngoài ra còn có một số lệnh config khác:
- environment: thiết lập biến môi trường ( thường sử dụng trong lúc config các thông số của db).
- depends_on: chỉ ra sự phụ thuộc. Tức là services nào phải được cài đặt và chạy trước thì service được config tại đó mới được chạy.
- volumes: dùng để mount hai thư mục trên host và container với nhau.

# KẾT QUẢ KHI CHẠY PROJECT

![GitHub Logo](https://imgur.com/hOxIcX9)
Format: ![Alt Text](https://imgur.com/hOxIcX9)

![alt text](https://imgur.com/hOxIcX9)
![alt text](https://imgur.com/cQHP4gl)

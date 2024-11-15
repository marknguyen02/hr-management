# Hệ Thống Quản Lý Nhân Sự - Kiến Trúc MVP

Hệ thống quản lý nhân sự của chúng ta được xây dựng theo mô hình MVP (Model-View-Presenter), một mô hình phân chia các thành phần của ứng dụng để tăng tính dễ bảo trì và mở rộng. Trong mô hình MVP, hệ thống được chia thành ba thành phần chính: **Model**, **View**, và **Presenter**.

## 1. Frontend (ReactJS)

Kiến trúc hệ thống frontend:

``` 
/backend
│
├── /app/
│   ├── /api/                     # Các endpoint API của ứng dụng
│   │   ├── auth.py               # API xác thực (đăng nhập, đăng ký)
│   │   ├── employee.py           # API quản lý nhân viên
│   │   └── payroll.py            # API quản lý bảng lương
│   │
│   ├── /models/                  # Các mô hình dữ liệu ORM
│   │   ├── user.py               # Mô hình người dùng
│   │   ├── employee.py           # Mô hình nhân viên
│   │   └── payroll.py            # Mô hình bảng lương
│   │
│   ├── /presenters/              # Các presenter xử lý nghiệp vụ
│   │   ├── auth_presenter.py     # Logic xác thực người dùng
│   │   └── employee_presenter.py # Logic xử lý thông tin nhân viên
│   │
│   ├── /schemas/                 # Các schema Pydantic để validate dữ liệu
│   │   ├── user.py               # Schema người dùng
│   │   ├── employee.py           # Schema nhân viên
│   │   └── payroll.py            # Schema bảng lương
│   │
│   ├── /services/                # Các dịch vụ xử lý logic nghiệp vụ
│   │   ├── auth_service.py       # Dịch vụ xác thực
│   │   ├── employee_service.py   # Dịch vụ nhân viên
│   │   └── payroll_service.py    # Dịch vụ bảng lương
│   │
│   ├── /db/                      # Thư mục quản lý kết nối cơ sở dữ liệu
│   │   ├── base.py               # Khởi tạo Base cho SQLAlchemy
│   │   ├── session.py            # Tạo session kết nối cơ sở dữ liệu
│   │   └── init_db.py            # Khởi tạo cơ sở dữ liệu
│   │
│   ├── /core/                    # Cấu hình và bảo mật
│   │   ├── config.py             # Cấu hình ứng dụng (URL cơ sở dữ liệu)
│   │   └── security.py           # Các thuật toán bảo mật (JWT, OAuth)
│   │
│   └── main.py                   # Tệp khởi tạo ứng dụng FastAPI
│
└── requirements.txt              # Các thư viện cần thiết
```


Hệ thống Frontend sử dụng ReactJS và tuân theo mô hình MVP. Các thành phần trong frontend bao gồm:

### 1.1 View (Giao diện người dùng)

Các thành phần giao diện người dùng như **LoginView.js**, **EmployeeView.js** sẽ hiển thị giao diện với các biểu mẫu, bảng, danh sách hoặc các yếu tố UI cần thiết. 

- **LoginView.js**: Giao diện đăng nhập, nơi người dùng nhập tên đăng nhập và mật khẩu.
- **EmployeeView.js**: Giao diện quản lý nhân viên, nơi người quản lý có thể xem và chỉnh sửa thông tin nhân viên.

Khi người dùng tương tác với giao diện (ví dụ: nhấn nút đăng nhập, thay đổi thông tin nhân viên), các sự kiện này sẽ được truyền tới các **Presenter** để xử lý.

### 1.2 Presenter (Xử lý logic nghiệp vụ)

Các **Presenter** như **AuthPresenter.js** hoặc **EmployeePresenter.js** sẽ nhận các sự kiện từ **View** và thực hiện các hành động tương ứng.

- **AuthPresenter.js**: Nhận yêu cầu từ **LoginView.js**, gửi yêu cầu API đến **Backend** để xác thực thông tin đăng nhập (tên người dùng và mật khẩu).
- **EmployeePresenter.js**: Nhận yêu cầu từ **EmployeeView.js** để lấy danh sách nhân viên hoặc cập nhật thông tin nhân viên từ **Backend**, sau đó cập nhật giao diện người dùng.

### 1.3 Model (Dữ liệu)

**Model** trong frontend lưu trữ thông tin người dùng hoặc nhân viên dưới dạng các đối tượng JavaScript.

- **UserModel.js**: Mô hình người dùng, lưu trữ thông tin người dùng khi đăng nhập.
- **EmployeeModel.js**: Mô hình nhân viên, lưu trữ thông tin nhân viên, sử dụng trong **EmployeePresenter.js** để cập nhật dữ liệu cho giao diện.

Các **Model** này liên kết với các **Presenter** và được sử dụng để cập nhật giao diện người dùng khi có dữ liệu mới hoặc thay đổi từ **Backend**.

### 1.4 Services (Dịch vụ)

Các **Services** như **authService.js** và **employeeService.js** thực hiện các thao tác liên lạc với **Backend** qua HTTP (RESTful API).

- **authService.js**: Thực hiện gửi yêu cầu POST đến API **/auth/login** để xác thực người dùng.
- **employeeService.js**: Gửi yêu cầu GET để lấy danh sách nhân viên hoặc POST để cập nhật thông tin nhân viên.

## 2. Backend (FastAPI)

Kiến trúc hệ thống backend:

```
/frontend
│
├── /public/                      # Các tệp tĩnh (HTML, ảnh, favicon...)
│   └── index.html                # File HTML chính
│
├── /src/                         
│   ├── /assets/                  # Các tài nguyên tĩnh (hình ảnh, icon...)
│   ├── /components/              # Các component giao diện người dùng
│   │   ├── Header.js             # Header component
│   │   ├── Sidebar.js            # Sidebar component
│   │   └── Footer.js             # Footer component
│   ├── /models/                  # Các mô hình dữ liệu (có thể dùng cho state management)
│   │   ├── UserModel.js          # Mô hình người dùng
│   │   └── EmployeeModel.js      # Mô hình nhân viên
│   ├── /presenters/              # Các presenter (logic nghiệp vụ)
│   │   ├── AuthPresenter.js      # Xử lý logic đăng nhập
│   │   └── EmployeePresenter.js  # Xử lý logic nhân viên
│   ├── /services/                # Các dịch vụ gọi API từ backend
│   │   ├── authService.js        # Dịch vụ xác thực (login/logout)
│   │   └── employeeService.js    # Dịch vụ quản lý nhân viên
│   ├── /views/                   # Các trang giao diện chính
│   │   ├── LoginView.js          # Giao diện đăng nhập
│   │   └── EmployeeView.js       # Giao diện quản lý nhân viên
│   ├── /utils/                   # Các công cụ tiện ích (format, validate...)
│   │   └── validation.js         # Các hàm kiểm tra tính hợp lệ
│   └── index.js                  # Entry point của ứng dụng React
│
└── package.json                  # Các dependency và cấu hình của dự án React ```
```


Backend sử dụng **FastAPI** để xử lý các yêu cầu HTTP từ Frontend và thực hiện các thao tác với cơ sở dữ liệu. Mô hình MVP trong backend bao gồm các thành phần:

### 2.1 View (API Endpoints)

Các API endpoint trong Backend như **auth.py**, **employee.py**, và **payroll.py** sẽ nhận yêu cầu từ Frontend.

- **auth.py**: Xử lý đăng nhập và xác thực người dùng.
- **employee.py**: Cung cấp API để quản lý nhân viên (lấy danh sách, cập nhật thông tin, tạo mới nhân viên).
- **payroll.py**: Cung cấp API để quản lý bảng lương nhân viên.

### 2.2 Presenter (Logic nghiệp vụ)

Các **Presenter** như **auth_presenter.py** hoặc **employee_presenter.py** sẽ xử lý các logic nghiệp vụ.

- **auth_presenter.py**: Nhận thông tin đăng nhập từ Frontend, gọi dịch vụ xác thực, kiểm tra thông tin người dùng từ cơ sở dữ liệu và phản hồi kết quả cho Frontend.
- **employee_presenter.py**: Xử lý các yêu cầu về nhân viên, ví dụ như tạo mới, cập nhật, xóa nhân viên và trả kết quả về cho Frontend.

### 2.3 Model (Dữ liệu)

**Model** trong backend là các mô hình dữ liệu như **user.py**, **employee.py**, và **payroll.py** được tạo thông qua ORM (**SQLAlchemy**).

- **user.py**: Mô hình người dùng, lưu trữ thông tin người dùng trong cơ sở dữ liệu.
- **employee.py**: Mô hình nhân viên, chứa thông tin nhân viên trong cơ sở dữ liệu.
- **payroll.py**: Mô hình bảng lương nhân viên.

### 2.4 Schemas (Schema Pydantic)

**Schemas** như **user.py**, **employee.py**, và **payroll.py** sẽ được sử dụng để **validate dữ liệu đầu vào** (trong yêu cầu từ Frontend) và **dữ liệu đầu ra** (trong phản hồi tới Frontend).

- **user.py (schema)**: Kiểm tra dữ liệu người dùng (để đăng ký, đăng nhập).
- **employee.py (schema)**: Kiểm tra dữ liệu nhân viên khi thêm mới hoặc cập nhật.

### 2.5 Database (Cơ sở dữ liệu)

Backend sử dụng các mô hình **SQLAlchemy** để kết nối và thao tác với cơ sở dữ liệu.

- Các **Presenter** sẽ tương tác với các **Model** để truy xuất hoặc lưu trữ dữ liệu vào cơ sở dữ liệu khi có yêu cầu từ Frontend.
- Ví dụ: Khi yêu cầu GET /employees được gửi tới Backend, **employee_presenter.py** sẽ lấy dữ liệu từ **Model employee.py** và trả về danh sách nhân viên cho Frontend.

## 3. Quy Trình Hoạt Động Của Hệ Thống

### 3.1 Frontend Gửi Yêu Cầu Đến Backend

- Người dùng mở trang đăng nhập, nhập tên người dùng và mật khẩu, nhấn "Đăng nhập".
- Frontend (**LoginView.js**) gửi yêu cầu HTTP POST đến API **/auth/login** (View trong Backend).

### 3.2 Backend Xử Lý Yêu Cầu Và Xác Thực

- **Backend** nhận yêu cầu từ Frontend (API **auth.py**).
- **Presenter (auth_presenter.py)** nhận dữ liệu từ API, gọi dịch vụ xác thực và kiểm tra thông tin người dùng từ cơ sở dữ liệu (Model).
- Nếu thông tin đúng, Backend trả về **token JWT** (nếu đăng nhập thành công) cho Frontend.

### 3.3 Frontend Nhận Dữ Liệu Và Cập Nhật UI

- Frontend nhận token JWT từ Backend và lưu trữ (ví dụ: trong **localStorage**).
- Nếu đăng nhập thành công, Frontend điều hướng người dùng tới trang quản lý nhân viên (**Employee View**).

### 3.4 Frontend Gửi Yêu Cầu Để Lấy Dữ Liệu

- Người dùng muốn xem danh sách nhân viên, Frontend gửi yêu cầu HTTP GET tới API **/employees**.
- **Backend** xử lý yêu cầu, sử dụng **Presenter (employee_presenter.py)** để lấy danh sách nhân viên từ cơ sở dữ liệu và trả về cho Frontend.

### 3.5 Frontend Cập Nhật Giao Diện

- Frontend nhận danh sách nhân viên từ Backend và cập nhật giao diện với dữ liệu nhân viên.

## 4. Tổng Kết

Hệ thống hoạt động theo một quy trình tuần tự giữa **Frontend** và **Backend**, trong đó:

- **Frontend** gửi yêu cầu (API) và nhận phản hồi (dữ liệu hoặc kết quả).
- **Backend** nhận yêu cầu, xử lý qua các **Presenter**, truy xuất **Model** (cơ sở dữ liệu) và trả về kết quả.
  
Mô hình MVP giúp phân tách rõ ràng giữa các thành phần, dễ dàng bảo trì và mở rộng hệ thống.

# 🔐 SecureNote Application
**SecureNote** คือเว็บแอปพลิเคชันจดบันทึกแบบ Full-Stack ที่ออกแบบมาเพื่อศึกษาโครงสร้างสถาปัตยกรรมเว็บสมัยใหม่ การจัดการข้อมูลผ่าน Cloud API และการรักษาความปลอดภัยของข้อมูลผ่าน Environment Variables

---

## 🔗 ลิงก์สำหรับการเข้าใช้งาน (Live Demo)
* **🌐 Frontend:** [https://secure-note-frontend-09pj.onrender.com](https://secure-note-frontend-09pj.onrender.com)
* **⚙️ Backend API:** [https://secure-note-app-2wuy.onrender.com](https://secure-note-app-2wuy.onrender.com)

---

## 🚀 ฟีเจอร์หลัก (Key Features)
* **Full CRUD Operations:** สามารถสร้าง, อ่าน, แก้ไข และลบโน้ตได้จริงผ่านอินเทอร์เฟซที่ใช้งานง่าย
* **Data Persistence:** ระบบจัดเก็บข้อมูลถาวรบน Cloud ด้วย **PocketHost API** ข้อมูลไม่หายเมื่อรีเฟรชหน้าเว็บ
* **Loading State:** มีการแสดงสถานะการโหลด (⏳ Loading...) เพื่อแจ้งให้ผู้ใช้ทราบขณะระบบประมวลผล
* **Cloud Native & Security:** Deploy บนระบบ **Render** พร้อมรองรับโปรโตคอล **HTTPS** เพื่อความปลอดภัย

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (DOM Manipulation)
* **Backend:** Node.js, Express.js
* **Database:** PocketHost (PocketBase Cloud)
* **Environment:** Dotenv (สำหรับการจัดการความปลอดภัย)

---

## 💻 การติดตั้งและรันโปรเจกต์ในเครื่อง (Local Setup)

### 1. ส่วนของ Backend
1. เข้าไปที่โฟลเดอร์ `backend`: `cd backend`
2. ติดตั้ง Dependencies: `npm install`
3. สร้างไฟล์ `.env` และกำหนดค่าดังนี้:
   ```env
   PORT=3000
   SECRET_TOKEN=66010057_token
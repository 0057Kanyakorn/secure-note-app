# 📘 Conceptual Report: SecureNote Application

## 1. JavaScript Engine vs. Runtime Environment
ความเข้าใจในความแตกต่างระหว่าง Engine และ Runtime คือหัวใจสำคัญของการพัฒนา Full-Stack:
* **JavaScript Engine (V8):** ทำหน้าที่ "แปลงและประมวลผล" โค้ด JavaScript ให้กลายเป็นภาษาเครื่อง (Machine Code) เพื่อให้คอมพิวเตอร์เข้าใจได้
* **JavaScript Runtime:** คือ "สภาพแวดล้อม" ที่ Engine ทำงานอยู่ โดยเตรียม APIs ต่างๆ ให้ใช้งาน
  * **Browser Runtime:** เตรียม Web APIs เช่น การจัดการ DOM, การใช้ `fetch()`, หรือ `localStorage`
  * **Node.js Runtime:** เตรียม APIs สำหรับฝั่งเซิร์ฟเวอร์ เช่น การจัดการระบบไฟล์ (`fs`) หรือการสร้างเซิร์ฟเวอร์ ซึ่งเบราว์เซอร์ไม่สามารถทำได้

## 2. DOM Manipulation (การจัดการหน้าจอฝั่ง Frontend)
ในโปรเจกต์นี้ใช้ Vanilla JavaScript ในการจัดการ DOM เพื่ออัปเดตหน้าจอแบบไดนามิก:
* **การอัปเดต UI:** ใช้ฟังก์ชัน `renderNotes()` เพื่อล้างข้อมูลเก่าและสร้าง Element ใหม่ผ่าน `document.createElement()` และ `append` ลงใน Container หลัก เพื่อให้การแสดงผลลื่นไหล
* **Event Listeners:** ใช้ตรวจจับการกระทำของผู้ใช้ เช่น การกด Submit ฟอร์ม โดยใช้ `event.preventDefault()` เพื่อควบคุมการไหลของข้อมูลโดยไม่ให้หน้าเว็บรีเฟรช

## 3. HTTP Request/Response Cycle & ความสำคัญของ HTTPS
* **วงจร HTTP:** เริ่มจาก Client ส่ง Request (GET, POST, DELETE) พร้อมข้อมูล JSON และ Authorization Header ไปยัง Backend เพื่อประมวลผลและส่ง Response กลับมาพร้อม Status Code เช่น `201 Created` หรือ `401 Unauthorized`
* **ความสำคัญของ HTTPS:** การใช้ HTTPS ช่วยเข้ารหัสข้อมูล (Encryption) ระหว่างทาง ป้องกันการถูกดักขโมยข้อมูลสำคัญ เช่น `SECRET_TOKEN` หรือเนื้อหาในโน้ตจากผู้ไม่หวังดี (Man-in-the-Middle Attack)

## 4. ความปลอดภัยและการใช้ Environment Variables (.env)
การเก็บข้อมูลลับ เช่น API Keys จำเป็นต้องเก็บไว้ในไฟล์ `.env` ฝั่ง Backend เท่านั้น:
* **เหตุผล:** หากเก็บไว้ฝั่ง Frontend โค้ดจะถูกดาวน์โหลดไปยังเบราว์เซอร์ของผู้ใช้ ซึ่งใครก็สามารถเปิดดูผ่าน Developer Tools ได้
* **การป้องกัน:** เราเรียกใช้ผ่าน `process.env` ใน Node.js และระบุไฟล์ใน `.gitignore` เพื่อไม่ให้ข้อมูลความลับถูกอัปโหลดขึ้นไปยัง GitHub Public Repository

---

## 🌟 Bonus Challenges Achievement

### 1. Data Persistence (PocketHost API) [+15 Points]
ข้าพเจ้าได้เชื่อมต่อกับฐานข้อมูล Cloud ของ **PocketHost** โดยให้ Backend ทำหน้าที่เป็น Proxy เพื่อความปลอดภัย ข้อมูลจะถูกเก็บถาวรแม้มีการปิดโปรแกรม

### 2. Loading State Implementation [+5 Points]
เพิ่มระบบแจ้งสถานะการทำงาน (⏳ Loading...) ระหว่างรอผลลัพธ์จาก API เพื่อปรับปรุงประสบการณ์ผู้ใช้งาน (UX) ให้ดียิ่งขึ้น

### 3. Cloud Deployment (Render) [+10 Points]
แอปพลิเคชันได้รับการ Deploy บนระบบ Cloud จริงผ่าน **Render** ทั้งส่วน Frontend และ Backend พร้อมรองรับการใช้งานผ่าน **HTTPS** อย่างสมบูรณ์

---
**จัดทำโดย:** กัลยกร เกาะแก้ง | **รหัสนักศึกษา:** 66010057
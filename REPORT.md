# Conceptual Report: SecureNote Application

## 1. JavaScript Engine vs. Runtime
JavaScript Engine และ Runtime ทำหน้าที่ประสานกันแต่มีความแตกต่างกันอย่างชัดเจน:
* **JavaScript Engine:** คือโปรแกรมที่มีหน้าที่ "แปลงและประมวลผล" โค้ด JavaScript ที่เราเขียนให้กลายเป็นภาษาเครื่อง (Machine Code) ที่คอมพิวเตอร์เข้าใจได้ (เช่น V8 Engine)
* **JavaScript Runtime:** คือ "สภาพแวดล้อม" (Environment) ที่มี Engine ทำงานอยู่ข้างใน โดย Runtime จะเป็นตัวเตรียม APIs ต่างๆ ไว้ให้นักพัฒนาเรียกใช้งาน 
  * **Browser Runtime:** เตรียม Web APIs ให้ เช่น การจัดการ DOM (`document`), การใช้ `fetch()`, หรือ `localStorage` ซึ่งเครื่องมือเหล่านี้จะไม่มีให้ใช้ในฝั่งเซิร์ฟเวอร์
  * **Node.js Runtime:** เตรียม APIs สำหรับการทำงานฝั่งเซิร์ฟเวอร์ เช่น การอ่านตัวแปรสภาพแวดล้อม (`process.env`), การจัดการระบบไฟล์ (`fs`), หรือการสร้างเซิร์ฟเวอร์ ซึ่งเบราว์เซอร์ไม่สามารถทำได้

## 2. DOM Manipulation (การจัดการ DOM ของ Frontend)
ในโปรเจกต์นี้ Frontend ถูกพัฒนาด้วย Vanilla JavaScript โดยมีการจัดการ DOM เพื่ออัปเดตหน้าจอแบบไดนามิกดังนี้:
* **การอัปเดต UI:** ใช้ฟังก์ชัน `renderNotes()` เพื่อล้างข้อมูลเก่าบนหน้าจอ (`innerHTML = ''`) จากนั้นใช้ `document.createElement('div')` เพื่อสร้าง Element ใหม่สำหรับโน้ตแต่ละตัว แล้วนำไปต่อท้าย (Append) ใน Container หลัก
* **การดักจับเหตุการณ์ (Event Listeners):** ใช้ `document.addEventListener` เพื่อตรวจจับการกระทำของผู้ใช้ เช่น การกดปุ่ม Submit ฟอร์ม เพื่อป้องกันการรีเฟรชหน้าเว็บด้วย `event.preventDefault()` และเรียกใช้ฟังก์ชันบันทึกข้อมูลต่อไป

## 3. HTTP Request/Response Cycle & ความสำคัญของ HTTPS
* **วงจร HTTP Request/Response:**
  1. **Client:** ส่ง Request ผ่าน Fetch API ไปยัง Backend โดยระบุ Endpoint, Method (GET, POST, DELETE), Headers (เช่น `Authorization`), และ Body (ข้อมูลรูปแบบ JSON)
  2. **Server:** รับ Request ตรวจสอบความถูกต้อง (เช่น เช็ค Token) ทำการอัปเดตฐานข้อมูลจำลอง และส่ง Response กลับมาพร้อมกับ HTTP Status Code (เช่น `201 Created` เมื่อสร้างโน้ตสำเร็จ หรือ `401 Unauthorized` ถ้ารหัสผิด)
* **ความสำคัญของ HTTPS:** การส่งผ่านข้อมูลด้วย HTTP ปกติจะอยู่ในรูปแบบข้อความธรรมดา (Plaintext) ทำให้เสี่ยงต่อการถูกดักจับข้อมูล (Man-in-the-Middle) การใช้ HTTPS จะช่วยเข้ารหัสข้อมูล (Encryption) ระหว่างทาง ทำให้ข้อมูลสำคัญ เช่น `SECRET_TOKEN` หรือเนื้อหาของโน้ต ปลอดภัยจากการถูกขโมย

## 4. ความปลอดภัยและการใช้ Environment Variables (.env)
การเก็บข้อมูลที่เป็นความลับ เช่น `SECRET_TOKEN` หรือ API Keys จำเป็นต้องเก็บไว้ในไฟล์ `.env` ของฝั่ง Backend เท่านั้น
* **เหตุผล:** หากเราฮาร์ดโค้ด (Hardcode) รหัสลับไว้ในฝั่ง Frontend (เช่น ในไฟล์ `app.js`) โค้ดทั้งหมดจะถูกดาวน์โหลดไปยังเบราว์เซอร์ของผู้ใช้ ซึ่งใครก็สามารถเปิดดูรหัสลับนั้นผ่าน Developer Tools ได้ 
* **การป้องกัน:** เราจึงนำค่าความลับไปเก็บในเซิร์ฟเวอร์ (Node.js) และใช้ตัวแปร `process.env.SECRET_TOKEN` แทน นอกจากนี้ยังต้องเพิ่มไฟล์ `.env` ลงใน `.gitignore` เพื่อป้องกันไม่ให้ข้อมูลความลับถูกอัปโหลดขึ้นไปยัง Public Repository อย่าง GitHub โดยเด็ดขาด
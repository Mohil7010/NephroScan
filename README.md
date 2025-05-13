# NephroScan : Automated Kidney Stone Detection using Machine Learning

This is a full-stack web application for detecting kidney stones from uploaded X-ray or ultrasound images using a YOLOv10 deep learning model.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Django REST API
- **Model:** YOLOv10 (`ultralytics`)
- **Language:** Python, JavaScript

---

## How It Works

1. User uploads an image via the React UI.
2. Image is sent to Django backend via a POST request.
3. Backend loads a trained `yolov10l.pt` model using `ultralytics`.
4. The model returns prediction: **Stone detected or not**.
5. The result is shown in the React UI.

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Mohil7010/NephroScan.git
cd kidney-stone-detector

```

### 2. Set Up the Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # For Windows
# source venv/bin/activate  # For macOS/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

### 3. Set Up the Frontend (React)

```bash
cd frontend
npm install
npm start

```

### 4. Test the Application

1. Visit http://localhost:3000

2. Upload an X-ray image

3. The React frontend sends the image to Django

4. Django loads the YOLO model and returns the prediction

5. The result is displayed on the result page

## Contact

Maintainer: Mohil Shastri  
GitHub: [github.com/Mohil7010](https://github.com/Mohil7010)

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import torch
from torchvision import transforms

app = FastAPI()

# CORS to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set specific origin for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model once
model = torch.load("backend/yolov10l.pt", map_location=torch.device('cpu'))
model.eval()

# Define any required transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),       # Adjust to your model input size
    transforms.ToTensor(),               # Convert to tensor
    transforms.Normalize([0.5]*3, [0.5]*3)  # Example normalization
])

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        output = model(input_tensor)
        pred = torch.argmax(output, dim=1).item()

    result = "Positive" if pred == 1 else "Negative"
    desc = "stone(s) is detected." if pred == 1 else "No stone detected."

    return JSONResponse({"result": result, "description": desc})

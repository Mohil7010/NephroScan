from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from ultralytics import YOLO
from PIL import Image
import traceback

# Load model once
model = YOLO("D:/KidneyStone/backend/yolov10l.pt")

@csrf_exempt
def predict_view(request):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            #  Convert Django UploadedFile to PIL image
            uploaded_file = request.FILES['file']
            image = Image.open(uploaded_file).convert("RGB")

            #  Run prediction on the image
            results = model.predict(source=image, stream=False)
            prediction = results[0]
            num_detections = len(prediction.boxes.cls)

            if num_detections > 0:
                return JsonResponse({
                    "result": "Positive",
                    "description": f"{num_detections} stone(s) detected."
                })
            else:
                return JsonResponse({
                    "result": "Negative",
                    "description": "No stone detected."
                })

        except Exception as e:
            print("Prediction error:")
            traceback.print_exc()
            return JsonResponse({
                "result": "Error",
                "description": f"Prediction failed: {str(e)}"
            }, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)

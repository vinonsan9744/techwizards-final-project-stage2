!pip install ultralytics
from ultralytics import YOLO
!yolo task=detect mode=train model=yolov8n.pt data=../content/drive/MyDrive/dataset2/data.yaml epochs=100 imgsz=640
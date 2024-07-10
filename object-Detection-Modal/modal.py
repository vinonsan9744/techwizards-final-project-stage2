import cv2
from ultralytics import YOLO

model_path = 'best7.pt'  
model = YOLO(model_path)


video_path = 'Baby Elephant And Cows - ElephantNews.mp4'  
cap = cv2.VideoCapture(video_path)

ret = True
while ret:
    ret, frame = cap.read()

    if ret:
        
        results = model.track(frame, persist=True)

        
        frame_ = results[0].plot()

     
        cv2.imshow('Frame', frame_)  
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
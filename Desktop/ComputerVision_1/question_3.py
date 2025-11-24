
import cv2
import numpy as np

img = cv2.imread("image/image1.jpg")
if img is None:
    raise ValueError("Image not found")  

height, width = img.shape[:2]
center = (width / 2, height / 2)

def rotate_image(image, angle):
    (h, w) = image.shape[:2]
    center = (w / 2, h / 2)

    M = cv2.getRotationMatrix2D(center, angle, 1.0)

    cos = np.abs(M[0, 0])
    sin = np.abs(M[0, 1])
    new_width = int((h * sin) + (w * cos))
    new_height = int((h * cos) + (w * sin))

    M[0, 2] += (new_width / 2) - center[0]
    M[1, 2] += (new_height / 2) - center[1]
    return cv2.warpAffine(image, M, (new_width, new_height))
rotated_image = rotate_image(img, 45)
rotated_image_90 = rotate_image(img, 90)

window_name = ["Original Image", "Rotated Image 45 Degrees", "Rotated Image 90 Degrees"]

for name in window_name:
    cv2.namedWindow(name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(name, 600, 600)
cv2.imshow(window_name[0], img)
cv2.imshow(window_name[1], rotated_image)
cv2.imshow(window_name[2], rotated_image_90)
cv2.waitKey(0)
cv2.destroyAllWindows()
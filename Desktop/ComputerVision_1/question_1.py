
import cv2
import numpy as np
img = cv2.imread("image/image1.jpg", cv2.IMREAD_GRAYSCALE)
if img is None:
    raise ValueError("Image not found.")
cv2.namedWindow("Original Image", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Original Image", 600, 600)
cv2.imshow("Original Image", img)
max_level = 8
initial_level = 3 

def update_intensity(level):
    if level < 0 or level > max_level:
        raise ValueError(f"Level must be between 0 and {max_level}.")
    
    num_levels = 2 ** level
    step = 256 // num_levels
    
    reduced_image = np.floor(img / step) * step
    reduced_image = reduced_image.astype(np.uint8)
    
    cv2.imshow("Reduced Intensity Image at Level " + str(level) + "", reduced_image)

cv2.createTrackbar("Intensity Level", "Original Image", initial_level, max_level, update_intensity)
update_intensity(initial_level)
cv2.waitKey(0)
cv2.destroyAllWindows()
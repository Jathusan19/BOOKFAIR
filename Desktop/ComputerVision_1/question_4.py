
import cv2
import numpy as np

img = cv2.imread("image/image1.jpg", cv2.IMREAD_COLOR)

if img is None:
    raise ValueError("Image not found or unable to load.")

block_sizes = [3, 5, 7]

def reduce_resolution(image, block_size):
    processed_image = np.copy(image)

    for i in range(0, image.shape[0], block_size):
        for j in range(0, image.shape[1], block_size):
            roi = image[i:i + block_size, j:j + block_size]
            
            if roi.shape[0] != block_size or roi.shape[1] != block_size:
                continue

            avg_color = np.mean(roi, axis=(0, 1), dtype=np.float32)
            
            processed_image[i:i + block_size, j:j + block_size] = avg_color
    return processed_image.astype(np.uint8)

processed_images = [reduce_resolution(img, block_size) for block_size in block_sizes]

cv2.namedWindow("Original Image", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Original Image", 600, 600)
cv2.imshow("Original Image", img)

for i, processed_image in enumerate(processed_images):
    window_name = f"Processed Image (Block Size {block_sizes[i]})"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 600, 600)
    cv2.imshow(window_name, processed_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
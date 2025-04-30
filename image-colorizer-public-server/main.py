from fastapi import FastAPI
from keras.layers import Conv2D, UpSampling2D
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import img_to_array, load_img
from skimage.color import rgb2lab, lab2rgb
from skimage.transform import resize
from skimage.io import imsave
import numpy as np
import tensorflow as tf
from tensorflow import keras
import os
import io, base64
from PIL import Image
from starlette.responses import FileResponse
from starlette.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

model_path='./Image_Colorization_2'
# model_path='./Image_Colorization_3'
model = keras.models.load_model(model_path)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)






@app.get("/")
def read_root():
    return {"Hello": "World"}

class ImgData(BaseModel):
    image: str
    type: str

@app.post('/')
async def img(data: ImgData):
  img = Image.open(io.BytesIO(base64.decodebytes(bytes(data.image, "utf-8"))))
  img.save(f'my-image.{data.type}')
  
  test_path = f'./my-image.{data.type}'

  color_me = []
  img = img_to_array(load_img(test_path))
  img = resize(img ,(256,256))
  color_me.append(img)
  color_me = np.array(color_me, dtype=float)

  color_me = rgb2lab(1.0/255 * color_me)[:,:,:,0]

  color_me = color_me.reshape(color_me.shape+(1,))

  output = model.predict(color_me)
  output = output * 128

  result = np.zeros((256, 256, 3))
  result[:,:,0] = color_me[0][:,:,0]
  result[:,:,1:] = output[0]
  colorOut = lab2rgb(result)
  imsave("result.png", colorOut)

  

  with open("./result.png", 'rb') as f:
    base64image = base64.b64encode(f.read())

  return base64image
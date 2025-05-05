# Image Colorizer CNN

A deep learning-based application that automatically colorizes black and white images using a Convolutional Neural Network (CNN).

## Project Structure

```
image-colorizer/
├── image-colorizer-public-server/    # FastAPI backend server
│   ├── main.py                      # Server implementation
│   ├── requirements.txt             # Python dependencies
│   └── Image_Colorization_2/        # Trained CNN model
│
└── image-colorizer-public-client/    # React TypeScript frontend
    ├── src/                         # Source code
    │   ├── components/             # React components
    │   ├── assets/                # Static assets
    │   └── styles/                # CSS styles
    ├── public/                     # Public assets
    └── package.json               # Node.js dependencies
```

## Features

- Upload black and white images
- Real-time colorization using CNN
- Modern web interface
- Fast and efficient processing
- Cross-platform compatibility

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd image-colorizer-public-server
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd image-colorizer-public-client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:5173`
2. Click the upload button to select a black and white image
3. Wait for the processing to complete
4. View the colorized result

## Technical Details

- The backend uses FastAPI for high-performance API endpoints
- The frontend is built with React and TypeScript
- The colorization model is implemented using TensorFlow/Keras
- The application uses LAB color space for processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

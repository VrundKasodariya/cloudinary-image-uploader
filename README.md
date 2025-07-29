
# Cloudinary Image Uploader

This is a simple Node.js + Express app that allows users to upload images to Cloudinary using a user-friendly interface built with Vanilla HTML, Tailwind CSS, and JavaScript. Uploaded files are temporarily stored locally and deleted after successful upload.

---

## Features

- Upload directly to a specified Cloudinary folder  
- Automatically deletes local files after successful upload  
- Clean UI with Tailwind CSS  
- Simple backend using Express and Multer  

---

## Tech Stack

- Backend: Node.js, Express.js, Multer, Cloudinary SDK  
- Frontend: HTML5, Tailwind CSS, Vanilla JavaScript  
- Utilities: dotenv, detect-port

---

## Project Structure

```
├── index.js                  # Main server file
├── public/
│   ├── index.html            # Frontend page
│   └── script.js             # JS logic
├── utils/
│   └── cloudinary.js         # Cloudinary helper logic
├── uploads/                  # Temporary upload folder (auto-cleaned)
├── .env                      # Environment variables
├── .gitignore
└── README.md
```

---

## .env File Setup

Create a `.env` file in the root folder:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

Note: Never share or commit this file. Make sure it's listed in your `.gitignore`.

---

## Getting Started

1. Clone the Repository

```bash
git clone https://github.com/VrundKasodariya/cloudinary-image-uploader.git
cd cloudinary-image-uploader
```

2. Install Dependencies

```bash
npm install
```

3. Run the Server

```bash
node index.js
```

4. Open in Browser

```
http://localhost:3000
```

---

## Future Improvements

- Drag & drop upload  
- Upload progress indicator  
- Image gallery view of uploads  
- Multiple file upload support  
- Dark mode UI  

---

## Author

Made by [Vrund Kasodariya](https://www.linkedin.com/in/vrund-kasodariya-89235425b/)  
GitHub: [@Vrund-Kasodariya](https://github.com/Vrund-Kasodariya)

---

## License

This project is licensed under the MIT License.

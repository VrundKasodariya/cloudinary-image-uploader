# Cloudinary Image Uploader

This is a full-stack Node.js + Express application that enables event guests (such as at weddings) to upload images directly to Cloudinary. Each guest is uniquely identified using a guest ID stored in their browser, and uploads are tracked in MongoDB to ensure a maximum of 50 uploads per guest.

---

## Features

- Upload multiple images in a single batch
- Uploads go directly to a Cloudinary folder
- Temporary local files are auto-deleted post-upload
- Each guest receives a unique browser-stored guest ID
- Uploads are tracked and capped at 50 per guest
- Clean, responsive interface using Tailwind CSS
- Simple and efficient backend with Express and MongoDB
---

## Tech Stack

**Frontend**  
- HTML5  
- Tailwind CSS  
- Vanilla JavaScript (uses localStorage for guest tracking)

**Backend**  
- Node.js  
- Express.js  
- Multer (file handling)  
- Cloudinary SDK  
- MongoDB (via Mongoose)

**Utilities**  
- `dotenv` for environment variable management  
- `fs` for temporary file operations  

---

## Project Structure

```
├── index.js                   # Main Express server
├── models/
│   └── guest.js               # Mongoose schema for guests
├── public/
│   ├── index.html             # Frontend upload UI
│   └── script.js              # Frontend logic
├── uploads/                   # Temporary local file storage
├── .env                       # Environment variables (not committed)
├── .gitignore
└── README.md
```

---

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Ensure that your `.env` file is excluded in `.gitignore` to avoid exposing credentials.

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/VrundKasodariya/cloudinary-image-uploader.git
cd cloudinary-image-uploader
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**

```bash
node index.js
```

4. **Open in your browser**

```
http://localhost:3000
```

---

## Guest Upload Workflow

- Guests enter their name in the upload form.
- A unique `guestId` is generated (name + 4-digit suffix) and saved in the browser’s `localStorage`.
- All uploads are tagged to this guest ID and tracked in MongoDB.
- Once the guest uploads 50 images, further uploads are blocked.
- Returning users can resume from where they left off, as long as `localStorage` persists.

---

## Future Enhancements

- Drag-and-drop upload capability
- Upload progress bar with retry support
- Guest gallery view and moderation dashboard
- QR code-based guest login or linking
- Admin dashboard to review uploads

---

## Author

Developed by [Vrund Kasodariya](https://www.linkedin.com/in/vrund-kasodariya-89235425b)  
GitHub: [@VrundKasodariya](https://github.com/VrundKasodariya)

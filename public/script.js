document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const spinner = document.getElementById("spinner");
  const previewContainer = document.getElementById("preview");

  spinner.classList.remove("hidden");

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.urls && Array.isArray(data.urls)) {
      previewContainer.innerHTML = ""; 

      data.urls.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Uploaded Image";
        img.className = "w-24 h-24 object-cover rounded border";
        previewContainer.appendChild(img);
      });

      alert(`Uploaded ${data.urls.length} image(s) successfully!`);
      form.reset(); 
      alert("Upload failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Error during upload.");
  } finally {
    spinner.classList.add("hidden");
  }
});

function previewFiles(event) {
  const previewContainer = document.getElementById("preview");
  previewContainer.innerHTML = "";

  const files = event.target.files;

  if (files.length > 50) {
    alert("You can only upload up to 50 images.");
    event.target.value = ""; 
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "w-24 h-24 object-cover rounded border";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

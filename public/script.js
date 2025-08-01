
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const previewContainer = document.getElementById("preview");
  const spinner = document.getElementById("spinner");

  const nameInput = form.querySelector("input[name='name']");
  const fileInput = form.querySelector("input[name='files']");

  fileInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    previewContainer.innerHTML = "";

    if (files.length > 50) {
      alert("You can only preview up to 50 images.");
      fileInput.value = "";
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.className = "w-24 h-24 object-cover rounded border";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const guestName = nameInput.value.trim();
    const guestId = localStorage.getItem("guestId");

    formData.append("name", guestName);
    if (guestId) {
      formData.append("guestId", guestId);
    }

    spinner.classList.remove("hidden");

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      spinner.classList.add("hidden");

      if (response.ok) {
        if (data.guestId) {
          localStorage.setItem("guestId", data.guestId);
        }

        if (data.urls && Array.isArray(data.urls)) {
          previewContainer.innerHTML = "";
          data.urls.forEach(url => {
            const img = document.createElement("img");
            img.src = url;
            img.className = "w-24 h-24 object-cover rounded border";
            previewContainer.appendChild(img);
          });
          alert(`Uploaded ${data.urls.length} image(s) successfully.`);
        }
      } else {
        alert(data.message || "Upload failed.");
        return;
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong during upload.");
      spinner.classList.add("hidden");
    }
  });
});

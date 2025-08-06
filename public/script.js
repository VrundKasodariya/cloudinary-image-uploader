document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const guestIdInput = document.getElementById("guestId");
  const guestNameInput = document.getElementById("guestName");
  const fileInput = form.querySelector("input[name='files']");
  const previewContainer = document.getElementById("preview");
  const spinner = document.getElementById("spinner");
  const remainingText = document.getElementById("remainingCount");


  window.previewFiles = (event) => {
    const files = Array.from(event.target.files);
    previewContainer.innerHTML = "";

    if (files.length > 50) {
      alert("You can only preview up to 50 images.");
      fileInput.value = "";
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "w-24 h-24 object-cover rounded border";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    spinner.classList.remove("hidden");

    const guestName = guestNameInput.value.trim();
    const guestId = localStorage.getItem("guestId") || "";

    guestIdInput.value = guestId;

    const formData = new FormData(form);
    formData.set("name", guestName);
    formData.set("guestId", guestId);

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

        fileInput.value = "";
        previewContainer.innerHTML = "";


        if (data.urls && Array.isArray(data.urls)) {
          data.urls.forEach(url => {
            const img = document.createElement("img");
            img.src = url;
            img.className = "w-24 h-24 object-cover rounded border";
            previewContainer.appendChild(img);
          });

          alert(`Uploaded ${data.urls.length} image(s) successfully.`);
        }

        if (data.remaining !== undefined) {
          remainingText.innerText = `You can upload ${data.remaining} more image(s).`;
        }
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong during upload.");
      spinner.classList.add("hidden");
    }
  });
});

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const spinner = document.getElementById("spinner");

  spinner.classList.remove("hidden");

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.imageUrl) {

      const img = document.createElement("img");
      img.src = data.imageUrl;
      img.alt = "Uploaded Image";
      img.className = "mt-4 max-w-md rounded shadow";

 
      const existing = document.getElementById("preview");
      if (existing) existing.remove();

      img.id = "preview";
      form.insertAdjacentElement("afterend", img);
    } else {
      alert("Upload failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Something went wrong during upload.");
  } finally {
    
    spinner.classList.add("hidden");
  }
});

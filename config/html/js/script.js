function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("http://localhost:8080/upload", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const responseLink = document.getElementById("responseLink");
        responseLink.href = data.url; // Set the href attribute of the anchor
        responseLink.textContent = data.url; // Set the link text
        fileInput.value = "";
        console.log(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }
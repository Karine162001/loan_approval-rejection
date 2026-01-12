    const video = document.getElementById('video');

    // Աջակցություն տեսախցիկին
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.error(err);
        alert("Դեմքի վերլուծությունը ձախողվեց: տեսախցիկը հասանելի չէ");
      });

    function verifyFace() {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      canvas.toBlob(async function (blob) {
        const formData = new FormData();
        formData.append('live', blob, 'live.jpg');

        try {
          const res = await fetch('/verify_face', { method: 'POST', body: formData });
          const data = await res.json();

          if (data.status === 'success') {
            window.location.href = '/final';
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error(err);
          alert("Դեմքի վերլուծությունը ձախողվեց");
        }
      }, 'image/jpeg');
    }
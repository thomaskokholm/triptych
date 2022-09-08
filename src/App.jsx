function App() {
  const renderImgOnCanvasById = (canvasId, imgSrc, idx) => {
    const img = new Image();
    const canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      img.onload = function () {
        let sx = parseInt((this.width / 3) * idx);
        let sy = 0;
        let sWidth = this.width / 3;
        let sHeight = this.height;
        let dx = 0;
        let dy = 0;
        let dWidth = this.width;
        let dHeight = this.height;

        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); // Or at whatever offset you like

        document.getElementById('img_' + idx).src = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
      };

      img.src = imgSrc;
    }
  };
  const onImageInput = (e) => {
    e.preventDefault();

    const imgSrc = URL.createObjectURL(e.target.files[0]);

    let w = e.target;
    renderImgOnCanvasById('canvasA', imgSrc, 0);
    renderImgOnCanvasById('canvasB', imgSrc, 1);
    renderImgOnCanvasById('canvasC', imgSrc, 2);
  };

  return (
    <div>
      <h1>Triptych generator</h1>
      <input type="file" accept="image/*" onChange={onImageInput} />
      <div className="images">
        <img id="img_0" />
        <img id="img_1" />
        <img id="img_2" />
      </div>

      <canvas
        id="canvasA"
        width="5760"
        height="3840"
        className="canvas"
      ></canvas>
      <canvas
        id="canvasB"
        width="5760"
        height="3840"
        className="canvas"
      ></canvas>
      <canvas
        id="canvasC"
        width="5760"
        height="3840"
        className="canvas"
      ></canvas>
    </div>
  );
}

export default App;

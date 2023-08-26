
            var loadFile = function (event) {
                var output = document.getElementById('img1');
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src);
                }
            };

            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            var img2 = document.getElementById('gambartemplate');
            var img1 = document.getElementById('img1');
            var isDraggingImage = false;

            canvas.width = img2.width; // Mengatur lebar canvas sesuai dengan lebar frame
            canvas.height = img2.height; // Mengatur tinggi canvas sesuai dengan tinggi frame

            var imagePositions = {
                x: 0,
                y: 0
            };

            canvas.addEventListener('mousedown', function (e) {
                if (e.target === canvas && img1.src) {
                    isDraggingImage = true;
                    var rect = canvas.getBoundingClientRect();
                    var scaleX = canvas.width / rect.width;
                    var scaleY = canvas.height / rect.height;
                    var x = (e.clientX - rect.left) * scaleX;
                    var y = (e.clientY - rect.top) * scaleY;
                    startDraggingImage(x, y);
                }
            });

            canvas.addEventListener('mousemove', function (e) {
                if (isDraggingImage) {
                    var rect = canvas.getBoundingClientRect();
                    var scaleX = canvas.width / rect.width;
                    var scaleY = canvas.height / rect.height;
                    var x = (e.clientX - rect.left) * scaleX;
                    var y = (e.clientY - rect.top) * scaleY;
                    dragImage(x, y);
                }
            });

            canvas.addEventListener('mouseup', function () {
                stopDraggingImage();
            });

            canvas.addEventListener('mouseleave', function () {
                stopDraggingImage();
            });

            function startDraggingImage(x, y) {
                isDraggingImage = true;
                var imgX = x - imagePositions.x;
                var imgY = y - imagePositions.y;
                imagePositions = {
                    x: imgX,
                    y: imgY
                };
                drawCanvas();
            }

            var currentScale = 1; // Skala awal
            function zoomImage(action) {
                var scaleFactor = 1.1; // Faktor skala untuk zoom
                if (action === 'in') {
                    currentScale *= scaleFactor;
                } else if (action === 'out') {
                    currentScale /= scaleFactor;
                }
                drawCanvas();
            }

            function drawCanvas() {
                context.clearRect(0, 0, canvas.width, canvas.height);

                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height;

                var img1Width = img1.width * currentScale; // Menggunakan skala yang sudah diatur
                var img1Height = img1.height * currentScale;

                var img1X = (canvasWidth - img1Width) / 2 + imagePositions.x;
                var img1Y = (canvasHeight - img1Height) / 2 + imagePositions.y;

                var frameX = 0;
                var frameY = 0;
                var frameWidth = img2.width * currentScale;
                var frameHeight = img2.height * currentScale;

                context.drawImage(img1, img1X, img1Y, img1Width, img1Height);
                context.drawImage(img2, frameX, frameY, frameWidth, frameHeight);
            }

            function dragImage(x, y) {
                if (isDraggingImage) {
                    var imgX = x - imagePositions.x;
                    var imgY = y - imagePositions.y;
                    imagePositions = {
                        x: imgX,
                        y: imgY
                    };
                    drawCanvas();
                }
            }

            function stopDraggingImage() {
                isDraggingImage = false;
            }

            var dwn = document.getElementById('btndownload');
            dwn.onclick = function () {
                downloadImage();
            };

            // Fungsi untuk mengatur pergerakan gambar
            function adjustImage(direction) {
                var step = 10; // Jarak pergerakan
                switch (direction) {
                    case 'up':
                        imagePositions.y -= step;
                        break;
                    case 'down':
                        imagePositions.y += step;
                        break;
                    case 'left':
                        imagePositions.x -= step;
                        break;
                    case 'right':
                        imagePositions.x += step;
                        break;
                }
                drawCanvas();
            }

            function generateImage() {
            drawCanvas();
        }

     

      function downloadImage() {
        var downloadLink = document.createElement('a');
        // Get the canvas data as a base64 encoded URL
        var canvasData = canvas.toDataURL('image/png');
        // Set the download link's href and file name
        downloadLink.href = canvasData;
        downloadLink.download = 'generated_image.png';
        // Trigger a click on the download link
        downloadLink.click();
    }

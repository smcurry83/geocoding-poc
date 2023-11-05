function checkPointInSearchArea() {
  const searchAreaInput = document.getElementById('searchAreaInput').value;
  const pointInput = document.getElementById('pointInput').value;
  const resultElement = document.getElementById('result');

  const polygonVertices = searchAreaInput.split('\n').map(line => {
      const [x, y] = line.split(',').map(coord => parseFloat(coord));
      return [x, y];
  });

  const [x, y] = pointInput.split(',').map(coord => parseFloat(coord));

  const isInside = isPointInsideSearchArea(x, y, polygonVertices);

  if (isInside) {
      resultElement.textContent = 'The point is inside the search area.';
  } else {
      resultElement.textContent = 'The point is outside the search area.';
  }
}

function isPointInsideSearchArea(x, y, polygonVertices) {
  let intersections = 0;
  const numVertices = polygonVertices.length;

  for (let i = 0; i < numVertices; i++) {
      const vertex1 = polygonVertices[i];
      const vertex2 = polygonVertices[(i + 1) % numVertices];

      if ((vertex1[1] > y) !== (vertex2[1] > y) && x < (vertex2[0] - vertex1[0]) * (y - vertex1[1]) / (vertex2[1] - vertex1[1]) + vertex1[0]) {
          intersections++;
      }
  }

  return intersections % 2 === 1;
}

function flipCoordinates() {
    const inputTextArea = document.getElementById("flipInput");
    const flippedOutput = document.getElementById("flippedOutput");
    
    const coordinates = inputTextArea.value.split('\n');
    const flippedCoordinates = [];

    for (const coordinate of coordinates) {
        const parts = coordinate.trim().split(',');
        if (parts.length === 2) {
            const y = parseFloat(parts[0]);
            const x = parseFloat(parts[1]);
            flippedCoordinates.push(`${x}, ${y}`);
        }
    }

    flippedOutput.innerHTML = flippedCoordinates.join('<br>');
}

function checkPointInSearchArea() {
  const searchAreaInput = document.getElementById('searchAreaInput').value;
  const pointInput = document.getElementById('pointInput').value;
  const resultElement = document.getElementById('result');

  // Parse search area and point coordinates
  const polygonVertices = searchAreaInput.split('\n').map(line => {
      const [x, y] = line.split(',').map(coord => parseFloat(coord));
      return [x, y];
  });

  const [x, y] = pointInput.split(',').map(coord => parseFloat(coord));

  // Perform the point-in-search area check
  const isInside = isPointInsideSearchArea(x, y, polygonVertices);

  if (isInside) {
      resultElement.textContent = 'The point is inside the search area.';
  } else {
      resultElement.textContent = 'The point is outside the search area.';
  }
}

function isPointInsideSearchArea(x, y, polygonVertices) {
  // Same point-in-polygon code as previously shown
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

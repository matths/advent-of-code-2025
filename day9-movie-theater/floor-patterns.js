const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const str2vec = (str) => {
  const [x, y] = str.split(",").map(Number);
  return { x, y };
};

const vecArea = (a, b) => (Math.abs(b.x - a.x) + 1) * (Math.abs(b.y - a.y) + 1);

const allAreas = (points) => {
  const area = [];
  for (let a = 0; a < points.length; a++) {
    for (let c = a + 1; c < points.length; c++) {
      area.push({
        a: points[a],
        b: { x: points[c].x, y: points[a].y },
        c: points[c],
        d: { x: points[a].x, y: points[c].y },
        size: vecArea(points[a], points[c]),
      });
    }
  }
  return area;
};

const largestAreaSize = (input) => {
  const points = input.split("\n").map(str2vec);
  return allAreas(points).sort((a, b) => b.size - a.size)[0].size;
};

const polygonEdges = (polygon) =>
  polygon.map((point, i) => {
    const next = polygon[(i + 1) % polygon.length];
    return {
      a: {
        x: Math.min(point.x, next.x),
        y: Math.min(point.y, next.y),
      },
      b: {
        x: Math.max(point.x, next.x),
        y: Math.max(point.y, next.y),
      },
    };
  });

const largestAreaSizeInside = (input) => {
  const points = input.split("\n").map(str2vec);
  const edges = polygonEdges(points);

  const verticalEdges = edges.filter((e) => e.a.x === e.b.x);
  const horizontalEdges = edges.filter((e) => e.a.y === e.b.y);

  const isInside = (p) =>
    horizontalEdges.filter((e) => e.a.y <= p.y && e.a.x <= p.x && e.b.x >= p.x)
      .length %
      2 !==
      0 &&
    horizontalEdges.filter((e) => e.a.y >= p.y && e.a.x <= p.x && e.b.x >= p.x)
      .length %
      2 !==
      0 &&
    verticalEdges.filter((e) => e.a.x <= p.x && e.a.y <= p.y && e.b.y >= p.y)
      .length %
      2 !==
      0 &&
    verticalEdges.filter((e) => e.a.x >= p.x && e.a.y <= p.y && e.b.y >= p.y)
      .length %
      2 !==
      0;

  const areas = allAreas(points).sort((a, b) => b.size - a.size);

  for (const area of areas) {
    const left = Math.min(area.a.x, area.c.x) + 1;
    const right = Math.max(area.a.x, area.c.x) - 1;
    const top = Math.min(area.a.y, area.c.y) + 1;
    const bottom = Math.max(area.a.y, area.c.y) - 1;

    if (
      isInside({ x: left, y: top }) &&
      isInside({ x: left, y: bottom }) &&
      isInside({ x: right, y: top }) &&
      isInside({ x: right, y: bottom }) &&
      !horizontalEdges.some(
        (e) => e.a.x < right && e.b.x > left && e.a.y >= top && e.a.y <= bottom
      ) &&
      !verticalEdges.some(
        (e) => e.a.x >= left && e.a.x <= right && e.a.y < bottom && e.b.y > top
      )
    ) {
      return area.size;
    }
  }

  return 0;
};

largestAreaSize(input);
largestAreaSizeInside(input1);

const input = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const str2vec = (str) => {
  const [x, y, z] = str.split(',').map(Number);
  return {x, y, z};
};

const vecDelta = (a, b) => ({
  x: b.x - a.x,
  y: b.y - a.y,
  z: b.z - a.z,
});

const vecDistance = (a, b) => {
  const delta = vecDelta(a, b);
  return Math.sqrt(delta.x ** 2 + delta.y ** 2 + delta.z ** 2);
};

const allEdgesSortByDistance = (points) => {
  const edges = [];
  for (let a = 0; a < points.length; a++) {
    for (let b = a+1; b < points.length; b++) {
      edges.push({a, b, distance: vecDistance(points[a], points[b])});
    }
  }
  edges.sort((a,b) => a.distance - b.distance);
  return edges;
};

const largestCircuitsSize = (input, numOfShortestConnections, numOfLargestCircuits) => {
  const points = input.split('\n').map(str2vec);
  const edges = allEdgesSortByDistance(points);

  let circuits = Array(points.length).fill().map((_, i) => [i]);

  for (let i = 0; i < numOfShortestConnections; i++) {
    const {a, b} = edges[i];

    let ca = circuits.find(c => c.includes(a));
    let cb = circuits.find(c => c.includes(b));
    if (ca === cb) continue;

    ca.push(...cb);
    circuits = circuits.filter(c => c !== cb);
  }

  const sizes = circuits.map(c => c.length);
  const largest = sizes.sort((a, b) => b - a).slice(0, numOfLargestCircuits);
  return largest.reduce((a, b) => a*b, 1);
}

const lastEdgeWallDistance = (input) => {
  const points = input.split('\n').map(str2vec);
  const edges = allEdgesSortByDistance(points);

  let circuits = Array(points.length).fill().map((_, i) => [i]);

  let lastEdge = null;

  for (const edge of edges) {
    const {a, b} = edge;
    let ca = circuits.find(c => c.includes(a));
    let cb = circuits.find(c => c.includes(b));
    if (ca === cb) continue;

    ca.push(...cb);
    circuits = circuits.filter(c => c !== cb);

    lastEdge = edge;

    if (circuits.length === 1) break;
  }

  return points[lastEdge.a].x * points[lastEdge.b].x;
}

largestCircuitsSize(input, 10, 3); // (largestCircuitsSize(realInput, 1000, 3);)
lastEdgeWallDistance(input);

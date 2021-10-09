let col, row, cell, sttack, celllength, stack;
let cellqueue = new CellPriorityQueue();

let start;
let runAButton;
let visualizationButton, visualization;
let newGridButton;
let maze, mazeButton;

function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("canvas");
  visualization = false;
  maze = false;
  celllength = 20;
  col = width / celllength;
  row = height / celllength;
  cell = [];

  //button
  runAButton = select("#runA");
  visualizationButton = select("#Visualization");
  newGridButton = select("#newGrid");
  mazeButton = select("#maze");

  visualizationButton.mousePressed(function () {
    NewVisualization();
    visualization = true;
  });

  runAButton.mousePressed(function () {
    visualization = false;
    AsearchSetup();
    Asearch(cell[0][0], cell[round(col) - 1][round(row) - 1]);
  });

  newGridButton.mousePressed(function () {
    visualization = false;
    maze = false;
    NewGrid();
  });

  mazeButton.mousePressed(function () {
    visualization = false;
    maze = true;
    NewMaze(20);
  })

  NewGrid();
}

function draw() {
  background(255);

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].show();
      if (maze) {
        cell[i][j].update();
      }
    }
  }

  if (start !== "done" && start !== null && visualization) {
    start = Asearchvis(start, cell[col - 1][row - 1]);
  }
}

function NewGrid() {
  cell = [];
  for (let i = 0; i < col; i++) {
    cell[i] = [];
    for (let j = 0; j < row; j++) {
      cell[i][j] = new Cell(i * width / col, j * height / row);
      //assign on or off
      if (random(1) < 0.20 && i < col - 1 && j < row - 1) {
        cell[i][j].on = false;
      }

      cell[i][j].update();
    }
  }

  start = cell[0][0];
  start.c = color(255, 0, 0);
  cell[col - 1][row - 1].c = color(0, 255, 0);
}

function NewVisualization() {
  cellqueue = new CellPriorityQueue();
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].visited = false;
      cell[i][j].update();

      if (maze) {
        cell[i][j].c = color(200);
      }
    }
  }

  start = cell[0][0];
  start.c = color(255, 0, 0);
  cell[col - 1][row - 1].c = color(0, 255, 0);
}

function AsearchSetup() {
  visualization = false;

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].visited = false;
      cell[i][j].update();
    }
  }

  start = cell[0][0];
  start.c = color(255, 0, 0);
  cell[col - 1][row - 1].c = color(0, 255, 0);
}

function Asearch(startt, target) {
  let cellqueue = new CellPriorityQueue();
  let current = startt;
  cellqueue.add(current);

  while (cellqueue.list().length > 0 && current != target) {
    current = cellqueue.poll();
    current.visited = true;
    let neighbors = current.getNeighborList();
    for (let i = 0; i < neighbors.length; i++) {
      neighbors[i].g = current.g + 1;
      neighbors[i].calcHx(target);
      neighbors[i].cost = neighbors[i].g + neighbors[i].hx;
      neighbors[i].PreviousCell = current;
      neighbors[i].c = color(0, 0, 255);
      cellqueue.add(neighbors[i]);
    }
  }

  if (current == target) {
    while (current !== start) {
      current.c = color(255, 0, 255);
      current = current.PreviousCell;
    }

    let cellqueList = cellqueue.list();
    for (let i = 0; i < cellqueList.length; i++) {
      cellqueList[i].c = color(0, 255, 255);
    }

    start.c = color(255, 0, 0);
    target.c = color(0, 255, 0);
  }


  if (cellqueue.list().length == 0) {
    console.log("noo")
    return;
  }
}

function Asearchvis(current, target) {
  //base case
  if (!current) {
    console.log("nooo")
    return null;
  }

  if (current !== target) {
    current.visited = true;
    current.c = color(0, 0, 255); //explored

    let neighbors = current.getNeighborList();
    for (let i = 0; i < neighbors.length; i++) {
      neighbors[i].g = current.g + 1;
      neighbors[i].calcHx(target);
      neighbors[i].c = color(0, 255, 255); //frontier
      neighbors[i].PreviousCell = current;
      neighbors[i].cost = neighbors[i].g + neighbors[i].hx;
      cellqueue.add(neighbors[i]);
    }

    target.c = color(0, 255, 0);
    cell[0][0].c = color(255, 0, 0);

    return cellqueue.poll();
  }

  if (current == target) {
    while (current !== cell[0][0]) {
      current.c = color(255, 0, 255); //path
      current = current.PreviousCell;
    }

    let cellqueList = cellqueue.list();
    for (let i = 0; i < cellqueList.length; i++) {
      cellqueList[i].c = color(0, 255, 255); //ffrontier
    }

    start.c = color(255, 0, 0);
    target.c = color(0, 255, 0);
    return "done"
  }
}

function NewMaze(cellwidth) {
  celllength = cellwidth;
  col = width / celllength;
  row = height / celllength;
  cell = [];
  stack = [];
  for (let i = 0; i < col; i++) {
    cell[i] = [];
    for (let j = 0; j < row; j++) {
      cell[i][j] = new MazeCell(i * width / col, j * height / row);
    }
  }
  dfs(cell[0][0]);

  start = cell[0][0];
  start.c = color(255, 0, 0);
  cell[col - 1][row - 1].c = color(0, 255, 0);
}

function dfs(current) {
  current.visited = true;
  while (current.unvisitedneighbors) {
    stack.push(current);
    next = current.getNeighbors();
    if (next != null) {
      dfs(next);
    } else if (stack.length > 0) {
      stack.splice(stack.length - 1, 1);
      dfs(stack[stack.length - 1]);
    }
    current.checkNeighbors();
  }
}
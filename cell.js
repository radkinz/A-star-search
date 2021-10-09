class Cell {
  constructor(xx, yy) {
    this.x = xx;
    this.y = yy;
    this.cellcol = this.x / celllength;
    this.cellrow = this.y / celllength;
    this.visited = false;
    this.c = color(255);
    this.on = true;
    this.highlight = false;
    this.cost = 0;
    this.g = 0;
    this.hx = 0;
  }

  getNeighborList() {
    let neighbors = [];
    //check north path
    if (this.cellrow > 0) {
      if (!cell[this.cellcol][this.cellrow - 1].visited && cell[this.cellcol][this.cellrow - 1].on) {
        neighbors.push(cell[this.cellcol][this.cellrow - 1]);
        cell[this.cellcol][this.cellrow - 1].visited = true;
      }
    }
    //check south path
    if (this.cellrow < row - 1) {
      if (!cell[this.cellcol][this.cellrow + 1].visited && cell[this.cellcol][this.cellrow + 1].on) {
        neighbors.push(cell[this.cellcol][this.cellrow + 1]);
        //   println(!cell[this.cellcol][this.cellrow+1].northwall);
        cell[this.cellcol][this.cellrow + 1].visited = true;
      }
    }
    //check east path
    if (this.cellcol < col - 1) {
      if (!cell[this.cellcol + 1][this.cellrow].visited && cell[this.cellcol + 1][this.cellrow].on) {
        neighbors.push(cell[this.cellcol + 1][this.cellrow]);
        cell[this.cellcol + 1][this.cellrow].visited = true;
        //  println(!cell[this.cellcol+1][this.cellrow].westwall);
      }
    }
    //check west path
    if (this.cellcol > 0) {
      if (!cell[this.cellcol - 1][this.cellrow].visited && cell[this.cellcol - 1][this.cellrow].on) {
        neighbors.push(cell[this.cellcol - 1][this.cellrow]);
        cell[this.cellcol - 1][this.cellrow].visited = true;
        //  println(!cell[this.cellcol-1][this.cellrow].eastwall);
      }
    }

    return neighbors;
  }

  calcHx(target) {
    let dx = abs(target.x - this.x);
    let dy = abs(target.y - this.y);
    this.hx = dx + dy;
  }

  update() {
    if (this.on && !this.highlight) {
      this.c = 255;
    } else {
      this.c = 0;
    }
  }

  show() {
    stroke(200);
    strokeWeight(1);
    fill(this.c);
    rect(this.x, this.y, celllength, celllength);
  }
}
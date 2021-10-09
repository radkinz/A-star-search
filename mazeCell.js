class MazeCell {
    constructor(xx, yy) {
        this.x = xx;
        this.y = yy;
        this.cellcol = this.x / celllength;
        this.cellrow = this.y / celllength;
        this.northwall = true;
        this.southwall = true;
        this.westwall = true;
        this.eastwall = true;
        this.visited = false;
        this.unvisitedneighbors = true;
        this.dice = [];
        this.highlight = false;
        this.c = color(200);
        this.cost = 0;
        this.g = 0;
        this.hx = 0;
    }

    getNeighborList() {
        let neighbors = [];
        //check north path
        if (!this.northwall && this.cellrow > 0) {
            if (!cell[this.cellcol][this.cellrow - 1].visited) {
                neighbors.push(cell[this.cellcol][this.cellrow - 1]);
                cell[this.cellcol][this.cellrow - 1].visited = true;
            }
        }
        //check south path
        if (!this.southwall && this.cellrow < row - 1) {
            if (!cell[this.cellcol][this.cellrow + 1].visited) {
                neighbors.push(cell[this.cellcol][this.cellrow + 1]);
                //   println(!cell[this.cellcol][this.cellrow+1].northwall);
                cell[this.cellcol][this.cellrow + 1].visited = true;
            }
        }
        //check east path
        if (!this.eastwall && this.cellcol < col - 1) {
            if (!cell[this.cellcol + 1][this.cellrow].visited) {
                neighbors.push(cell[this.cellcol + 1][this.cellrow]);
                cell[this.cellcol + 1][this.cellrow].visited = true;
                //  println(!cell[this.cellcol+1][this.cellrow].westwall);
            }
        }
        //check west path
        if (!this.westwall && this.cellcol > 0) {
            if (!cell[this.cellcol - 1][this.cellrow].visited) {
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
        noStroke();
        fill(this.c);
        rect(this.x, this.y, celllength, celllength);
    }

    show() {
        stroke(255);
        strokeWeight(4);
        if (this.northwall == true) {
            line(this.x, this.y, this.x + celllength, this.y);
        }
        if (this.eastwall == true) {
            line(this.x + celllength, this.y, this.x + celllength, this.y + celllength);
        }
        if (this.southwall == true) {
            line(this.x, this.y + celllength, this.x + celllength, this.y + celllength);
        }
        if (this.westwall == true) {
            line(this.x, this.y, this.x, this.y + celllength);
        }
    }

    getNeighbors() {
        this.dice = [];
        //check not next to north boundary
        if (dist(this.x, this.y, this.x, 0) > 0) {
            //check north cell to see if visited
            if (cell[this.cellcol][this.cellrow - 1].visited == false) {
                this.dice.push("North");
            }
        }

        //check not next to east boundary
        if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
            //check east neighbor
            if (cell[this.cellcol + 1][this.cellrow].visited == false) {
                this.dice.push("East");
            }
        }

        //check not next to west boundary
        if (dist(this.x, this.y, 0, this.y) > 0) {
            //check west neighbor
            if (cell[this.cellcol - 1][this.cellrow].visited == false) {
                this.dice.push("West");
            }
        }

        //check not next to south boundary
        if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
            //check south neighbor
            if (cell[this.cellcol][this.cellrow + 1].visited == false) {
                this.dice.push("South");
            }
        }

        this.checkNeighbors();

        if (this.unvisitedneighbors) {
            let randomindex = floor(random(0, this.dice.length));
            if (this.dice[randomindex] == "North") {
                return this.removeNorthWall();
            } else if (this.dice[randomindex] == "East") {
                return this.removeEastWall();
            } else if (this.dice[randomindex] == "West") {
                return this.removeWestWall();
            } else if (this.dice[randomindex] == "South") {
                return this.removeSouthWall();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    removeNorthWall() {
        this.northwall = false;
        cell[this.cellcol][this.cellrow - 1].southwall = false;
        return cell[this.cellcol][this.cellrow - 1];
    }

    removeEastWall() {
        this.eastwall = false;
        cell[this.cellcol + 1][this.cellrow].westwall = false;
        return cell[this.cellcol + 1][this.cellrow];
    }

    removeWestWall() {
        this.westwall = false;
        cell[this.cellcol - 1][this.cellrow].eastwall = false;
        return cell[this.cellcol - 1][this.cellrow];
    }

    removeSouthWall() {
        this.southwall = false;
        cell[this.cellcol][this.cellrow + 1].northwall = false;
        return cell[this.cellcol][this.cellrow + 1];
    }

    checkNeighbors() {
        if (dist(this.x, this.y, this.x, 0) > 0) {
            //check north cell to see if visited
            if (cell[this.cellcol][this.cellrow - 1].visited == false) {
                this.unvisitedneighbors = true;
                return;
            } else {
                this.unvisitedneighbors = false;
            }
        }

        //check not next to east boundary
        if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
            //check east neighbor
            if (cell[this.cellcol + 1][this.cellrow].visited == false) {
                this.unvisitedneighbors = true;
                return;
            } else {
                this.unvisitedneighbors = false;
            }
        }

        //check not next to west boundary
        if (dist(this.x, this.y, 0, this.y) > 0) {
            //check west neighbor
            if (cell[this.cellcol - 1][this.cellrow].visited == false) {
                this.unvisitedneighbors = true;
                return;
            } else {
                this.unvisitedneighbors = false;
            }
        }

        if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
            //check south neighbor
            if (cell[this.cellcol][this.cellrow + 1].visited == false) {
                this.unvisitedneighbors = true;
                return;
            } else {
                this.unvisitedneighbors = false;
            }
        }
    }
}
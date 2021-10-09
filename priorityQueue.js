class CellPriorityQueue {
    constructor() {
        this.queue = [];
    }

    swap(a, b) {
        let temp = this.queue[a];
        this.queue[a] = this.queue[b];
        this.queue[b] = temp;
    }

    add(cell) {
        //add new cell
        this.queue.push(cell);

        let index = this.queue.length - 1;

        //finds approriate index so the queue stays sorted
        while (index !== 0) {
            if (this.queue[index].cost > this.queue[index - 1].cost) {
                this.swap(index, index - 1);
            }
            index = index - 1;
        }
    }

    poll() {
        let result = this.queue.splice(this.queue.length - 1, 1);
        return result[0];
    }

    list() {
        return this.queue;
    }
}
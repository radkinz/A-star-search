# A* Search
A website made using p5.js that runs and visualizes [A* search](https://en.wikipedia.org/wiki/A*_search_algorithm). A* is a heuristic pathfinding algorithm that uses the function `f(n) = g(n) + h(n)` to determine the cost of each node, where `g(n)` is the current cost and `h(n)` is the estimated cost left to reach the goal. 
`h(n)` is the heuristic part of the function that is calculated using [Manhattan distance](https://cdn-images-1.medium.com/max/800/1*-xXnL0liqSl-flWgCTFbiw.png). These calculations are recursively repeated to find the next best node to travel to until the most optimal path is found.

## Functionality

### Grid
The A* search can run on a grid, where a random amount of cells are generated to act as walls.

![UI A star image](/images/grid.png)

### Maze
The program can also run in a maze, which will generate if the user presses the maze button.

![UI A star image](/images/maze.png)

### Visualizer
The program can also vizualize the pathfinding algorithm for both the maze and grid.

https://user-images.githubusercontent.com/81705278/136673290-82baabc0-39a4-42ad-b7fe-666b17528c49.mp4


function presentOnRow(grid, digit, rowIndex) {
    var present = false;
    let row = grid[rowIndex];
    for (let element of row) {
        if (element == digit) {
            var present = true;
            break;
        };
    };
    return present;
}

function presentOnColumn(grid, digit, colIndex) {
    var present = false;
    for (let i = 0; i < 9; i++) {
        if (grid[i][colIndex] == digit) {
            var present = true;
            break;
        };
    };
    return present;
}

function presentOnBlock(grid, digit, blockIndex) {
    var present = false;
    let row = Math.trunc(blockIndex/3) * 3; //le numéro de ligne le plus en haut du bloc
    let col = blockIndex * 3; //le numéro de colonne le plus à gauche du bloc
    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            if (grid[i][j] == digit) {
                var present = true;
            };
        };
    };
    return present;
}

export {presentOnRow, presentOnColumn, presentOnBlock};
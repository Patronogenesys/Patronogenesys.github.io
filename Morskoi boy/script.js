var ERR_COUNT = 0;
var d4ships = [];
var d3ships = [];
var d2ships = [];
var d1ships = [];
var field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //  |
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // \|/ Х
];
//  ------------------------>Y
//значения 
//0-пустая клетка
//1-корабль
//2-рядом с кораблем(для генерации)
//-1 промах
//-2 попадание
var fakeField = [];

function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//Генерация корабля с N палубами
function getShip(decks) {
    //Генерация напрвления
    var shipDirection = ['toRight', 'toLeft', 'toUp', 'toDown'];
    let sDirection;
    sDirection = shipDirection[Math.floor(Math.random() * 4)];
    //Генерация положения на доске
    let X;
    let Y;
    if (sDirection == 'toRight') {
        X = Math.floor(Math.random() * 7);
        Y = Math.floor(Math.random() * 10);
    };
    if (sDirection == 'toLeft') {
        X = getRndInt(3, 10);
        Y = Math.floor(Math.random() * 10);
    };
    if (sDirection == 'toUp') {
        X = Math.floor(Math.random() * 10);
        Y = getRndInt(3, 10);
    };
    if (sDirection == 'toDown') {
        X = Math.floor(Math.random() * 10);
        Y = Math.floor(Math.random() * 7);
    };
    return {
        direction: sDirection,
        posX: X,
        posY: Y,
    }
}
function setShipList(array) {

}
function fieldFilling(deck4, deck3, deck2, deck1) {
    //ЗАПОЛНЕНИЕ ПОЛЯ 4Х ПАЛУБНИКАМИ
    for (let i = 0; i < deck4; i++) {
        let tempShip = getShip(4);
        let X = tempShip.posX;
        let Y = tempShip.posY;
        if (tempShip.direction == 'toRight' && field[X][Y] == 0 && field[X + 1][Y] == 0 && field[X + 2][Y] == 0 && field[X + 3][Y] == 0) {
            for (let n = -1; n <= 4; n++) {
                try {
                    field[X + n][Y] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 4; n++) {
                // d4ships[i][n].push(X+n,Y);
                field[X + n][Y] = 1
            }
        } else if (tempShip.direction == 'toLeft' && field[X][Y] == 0 && field[X - 1][Y] == 0 && field[X - 2][Y] == 0 && field[X - 3][Y] == 0) {
            for (let n = -1; n <= 4; n++) {
                try {
                    field[X - n][Y] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 4; n++) {
                // d4ships[i][n].push(X-n,Y);
                field[X - n][Y] = 1
            }
        } else if (tempShip.direction == 'toUp' && field[X][Y] == 0 && field[X][Y - 1] == 0 && field[X][Y - 2] == 0 && field[X][Y - 3] == 0) {
            for (let n = -1; n <= 4; n++) {
                try {
                    field[X + 1][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y - n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 4; n++) {
                // d4ships[i][n].push(X,Y-n);
                field[X][Y - n] = 1
            }
        } else if (tempShip.direction == 'toDown' && field[X][Y] == 0 && field[X][Y + 1] == 0 && field[X][Y + 2] == 0 && field[X][Y + 3] == 0) {
            for (let n = -1; n <= 4; n++) {
                try {
                    field[X + 1][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y + n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 4; n++) {
                // d4ships[i][n].push(X,Y+n);
                field[X][Y + n] = 1
            }
        } else {
            if (ERR_COUNT >= 200) {
                alert("Ошибка заполнения поля");
                break
            } else {
                ERR_COUNT++;
                i--;
                continue;
            };
        };
        //ЗАПОМИНАЕМ КОРАБЛИ
        d4ships.push([]);
        d4ships[i].push([]);
        d4ships[i][0].push(X, Y)
    };
    //ЗАПОЛНЕНИЕ ПОЛЯ 3Х ПАЛУБНИКАМИ
    for (let i = 0; i < deck3; i++) {
        let tempShip = getShip(3);
        let X = tempShip.posX;
        let Y = tempShip.posY;
        if (tempShip.direction == 'toRight' && field[X][Y] == 0 && field[X + 1][Y] == 0 && field[X + 2][Y] == 0) {
            for (let n = -1; n <= 3; n++) {
                try {
                    field[X + n][Y] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 3; n++) {
                // d3ships[i][n].push(X+n,Y);
                field[X + n][Y] = 1
            }
        } else if (tempShip.direction == 'toLeft' && field[X][Y] == 0 && field[X - 1][Y] == 0 && field[X - 2][Y] == 0) {
            for (let n = -1; n <= 3; n++) {
                try {
                    field[X - n][Y] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 3; n++) {
                // d3ships[i][n].push(X-n,Y);
                field[X - n][Y] = 1
            }
        } else if (tempShip.direction == 'toUp' && field[X][Y] == 0 && field[X][Y - 1] == 0 && field[X][Y - 2] == 0) {
            for (let n = -1; n <= 3; n++) {
                try {
                    field[X + 1][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y - n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 3; n++) {
                // d3ships[i][n].push(X,Y-n);
                field[X][Y - n] = 1
            }
        } else if (tempShip.direction == 'toDown' && field[X][Y] == 0 && field[X][Y + 1] == 0 && field[X][Y + 2] == 0) {
            for (let n = -1; n <= 3; n++) {
                try {
                    field[X + 1][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y + n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 3; n++) {
                // d3ships[i][n].push(X,Y+n);
                field[X][Y + n] = 1
            }
        } else {
            if (ERR_COUNT >= 200) {
                alert("Ошибка заполнения поля");
                break
            } else {
                ERR_COUNT++;
                i--;
                continue;
            }
        }
        //ЗАПОМИНАЕМ КОРАБЛИ
        d3ships.push([]);
        d3ships[i].push([]);
        d3ships[i][0].push(X, Y)
    };
    //ЗАПОЛНЕНИЕ ПОЛЯ 2Х ПАЛУБНИКАМИ
    for (let i = 0; i < deck2; i++) {
        let tempShip = getShip(2);
        let X = tempShip.posX;
        let Y = tempShip.posY;
        if (tempShip.direction == 'toRight' && field[X][Y] == 0 && field[X + 1][Y] == 0) {
            for (let n = -1; n <= 2; n++) {
                try {
                    field[X + n][Y] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 2; n++) {
                // d2ships[i][n].push(X+n,Y);
                field[X + n][Y] = 1
            }
        } else if (tempShip.direction == 'toLeft' && field[X][Y] == 0 && field[X - 1][Y] == 0) {
            for (let n = -1; n <= 2; n++) {
                try {
                    field[X - n][Y] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X - n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 2; n++) {
                // d2ships[i][n].push(X-n,Y);
                field[X - n][Y] = 1
            }
        } else if (tempShip.direction == 'toUp' && field[X][Y] == 0 && field[X][Y - 1] == 0) {
            for (let n = -1; n <= 2; n++) {
                try {
                    field[X + 1][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X][Y - n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y - n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 2; n++) {
                // d2ships[i][n].push(X,Y-n);
                field[X][Y - n] = 1
            }
        } else if (tempShip.direction == 'toDown' && field[X][Y] == 0 && field[X][Y + 1] == 0) {
            for (let n = -1; n <= 2; n++) {
                try {
                    field[X + 1][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X][Y + n] = 2;
                } catch (err) { };
                try {
                    field[X - 1][Y + n] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 2; n++) {
                // d2ships[i][n].push(X,Y+n);
                field[X][Y + n] = 1
            }
        } else {
            if (ERR_COUNT >= 200) {
                alert("Ошибка заполнения поля");
                break
            } else {
                ERR_COUNT++;
                i--;
                continue;
            }
        }
        //ЗАПОМИНАЕМ КОРАБЛИ
        d2ships.push([]);
        d2ships[i].push([]);
        d2ships[i][0].push(X, Y)
    };
    //ЗАПОЛНЕНИЕ ПОЛЯ 1 ПАЛУБНИКАМИ
    for (let i = 0; i < deck1; i++) {
        let tempShip = getShip(2);
        let X = tempShip.posX;
        let Y = tempShip.posY;
        if (field[X][Y] == 0) {
            for (let n = -1; n <= 1; n++) {
                try {
                    field[X + n][Y] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y + 1] = 2;
                } catch (err) { };
                try {
                    field[X + n][Y - 1] = 2;
                } catch (err) { }
            }
            for (let n = 0; n < 1; n++) {
                // d1ships[i][n].push(X+n,Y);
                field[X + n][Y] = 1
            }
        } else {
            if (ERR_COUNT >= 200) {
                alert("Ошибка заполнения поля");
                break
            } else {
                ERR_COUNT++;
                i--;
                continue;
            }
        }
        //ЗАПОМИНАЕМ КОРАБЛИ
        d1ships.push([]);
        d1ships[i].push(X, Y)
    };
};

function getShipInfo() {
    for (let i = 0; i < field.length; i++) {
        const element = field[i];
    }
}
function formatField() {
    try {
        field.splice(10, 1);;
        field[0].splice(10, 1);
        field[1].splice(10, 1);
        field[2].splice(10, 1);
        field[3].splice(10, 1);
        field[4].splice(10, 1);
        field[5].splice(10, 1);
        field[6].splice(10, 1);
        field[7].splice(10, 1);
        field[8].splice(10, 1);
        field[9].splice(10, 1);
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] == 2) field[i][j] = 0
            }
        }
    } catch { };
}
function fieldCheck() {
    //Проверка
    for (let i = 0; i < 10; i++) {
        document.writeln(field[i] + '<br>')
    };
    document.writeln(ERR_COUNT + '<br>');
    document.writeln(fakeField.length);
}
function fieldTransform() {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            let l = 0;
            fakeField.push(field[i][j]);
            l++;
        }
    }
}
function siteField() {
    for (let i = 0; i < 100; i++) {
        tempInfo = document.body.children[0].children[i].appendChild(document.createElement('div'));
        tempInfo.classList.add("field__info");
        tempCover = document.body.children[0].children[i].appendChild(document.createElement('div'));
        tempCover.classList.add("field__cover");
        if (fakeField[i] == 0) {
            tempInfo.classList.add("Clear");
        } else if (fakeField[i] == 1) {
            tempInfo.classList.add("Ship");
        }
    }
}

fieldFilling(1, 2, 3, 4);
formatField();
fieldTransform();
siteField();
alert(document.body.children[0].children[0].children[0].classList /* + " " + document.body.children[0].children[0].id */)

fieldCheck();
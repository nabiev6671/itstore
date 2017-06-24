////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// В файле main_header_logo.js написана программа для отрисовки треугольников на канвасе.
// - Прототип треугольков берется из объекта trianglePrototype
// - Индивидуальные характеристики каждого треугольника берем в массиве triangleArray
// - Отрисовка одного треугольника происходит с помощью функции triangleDraw, в эту
//   функцию передается прототип треугольника - trianglePrototype и значения для отрисовки
//   фигуры относительо осей X и Y.
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////




var mainHeaderLogo = (function () {
	// Инициализация
	var init = function () {
			_setUpListners();
			_controller();
		};

	// _setUpListners - прослушка
	var _setUpListners = function (){

		};

		// _controller рисует треугольники перебирая массив треугольников triangleArray с характеристиками треугольников
	var _controller = function () {
		$.each(triangleArray, function (index, value) { // перебираем массив
			trianglePrototype.color = value.color; // указываем цвет треугольника, цвет берется из массива треугодников
			trianglePrototype.rotate = value.rotate; // указывает угол повора треуголника, угол берется из массива треугольников
			triangleDraw(trianglePrototype, value.posX, value.posY );

		});
		logoTxt();
	};

  ///////////////////// Объявление переменных//////////////////
	var
			doc = document,
			canvas = doc.getElementById("mainHeaderLogoCanvas"),
			ctx = canvas.getContext("2d"),
			triangleHeight = 26, 				// высота треугольника
			triangleWidth = 53, 				// ширина треугольника
			// triangleCenter необходим для того, чтобы передовать функции рисования центр трейгольника
			triangleCenter = {
				x : Math.floor(triangleWidth / 2), 		//позиционирование по Х
				y : Math.floor(triangleHeight / 2)};  // позиционирование по Y

	///////////////////////////////////////////////////////////////

	// Функция inRad преобразует радианы в градусы. Результат этой функции выдается при поворотах треугольников
	var inRad = function (num) {
		return num * Math.PI / 180;
	};


	// Массив triangleArray содержит в себе параметры треуголиков:
	// -цвет
	// -позицию
	// -поворот в градусах
	var triangleArray = [
		// Нулевой треугольник
		{ posX   : 103,
			posY   : 50,
			color  : "#3c4452",
			rotate : inRad(180)
		},
		// Первый трейгольник
		{ posX   : 50,
			posY   : 50,
			color  : "#5b6081",
			rotate : inRad(0)
		},
		// Второй треугольник
		{ posX   : 129.5,
			posY   : 24,
			color  : "#5b6081",
			rotate : inRad(90)
		},
		// Третий треугольник
		{ posX   : 129.5,
			posY   : 76,
			color  : "#ffcc66",
			rotate : inRad(270)
		},
		// Четвертый треугольник
		{ posX   : 129.5,
			posY   : 24,
			color  : "#edefe6",
			rotate : inRad(0)
		},
		// Пятый трейгольник
		{ posX   : 209,
			posY   : 50,
			color  : "#798d8d",
			rotate : inRad(180)
		},
		// Шестой треугольник
		{ posX   : 158,
			posY   : 50,
			color  : "#edefe6",
			rotate : inRad(0)
		},
		// Седьмой треугольник
		{ posX   : 209.5,
			posY   : 50,
			color  : "#ffcc66",
			rotate : inRad(90)
		},
		//Восьмой треугольник
		{ posX   : 209.5,
			posY   : 102,
			color  : "#798d8d",
			rotate : inRad(270)
		},
		// Девятый треугольник
		{ posX   : 209.5,
			posY   : 50,
			color  : "#5b6081",
			rotate : inRad(0)
		},
		// Десятый треугольник
		{ posX   : 262,
			posY   : 101,
			color  : "#3c4452",
			rotate : inRad(180)
		},
		// Одинадцатый треугольник
		{ posX   : 209,
			posY   : 101,
			color  : "#ffcc66",
			rotate : inRad(0)
		},
		// Двенадцатый треугольник
		{ posX   : 235.5,
			posY   : 127,
			color  : "#798d8d",
			rotate : inRad(180)
		},
		// Тринадцатый треугольник
		{ posX   : 157,
			posY   : 101,
			color  : "#edefe6",
			rotate : inRad(0)
		},
		// Четырнадцатый треугольник
		{ posX   : 184.5,
			posY   : 127,
			color  : "#080806",
			rotate : inRad(180)
		},
		// Пятнадцатый треугольник
		{ posX   : 133,
			posY   : 127,
			color  : "#ffcc66",
			rotate : inRad(180)
		}
	];

	// trianglePrototype будет хранить в себе прототип треугольника
	var trianglePrototype = {
		height 		: triangleCenter.y, //высота треугольника отнасительно центра
		width  		: triangleCenter.x, // ширина трейгольника относительно цента
		color  		: "", 				// цвет трейгольника
		rotate    : 0,
		aX 				: triangleCenter.x - triangleCenter.x,
		aY				: triangleCenter.y - triangleCenter.y,
		bX				: triangleCenter.x,
		bY				: triangleCenter.y + triangleCenter.y,
		cX				: triangleCenter.x + triangleCenter.x,
		cY				: triangleCenter.y - triangleCenter.y
	};

	// draw - функция рисования треугольников
	var triangleDraw = function (drawObj, posX, posY) {
		ctx.save();
		ctx.translate(posX, posY);
		ctx.fillStyle = drawObj.color	;
		ctx.rotate(drawObj.rotate);
		ctx.beginPath();
		ctx.moveTo(drawObj.aX, drawObj.aY);
		ctx.lineTo(drawObj.bX, drawObj.bY);
		ctx.lineTo(drawObj.cX, drawObj.cY);
		ctx.fill();
		ctx.restore();
	};

	// logoTxt - функция, которая рисует текст логотипа на холсте конваса
	var logoTxt = function () {
		ctx.save();
		ctx.font = "18px Tahoma";
		ctx.fillStyle = "#080806";
		ctx.fillText("RSK-group", 35, 95);
		ctx.restore();

	};

return {
			init: init
		};

})();

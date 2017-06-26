////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////




var mainSlider = (function () {
	// Инициализация
	var init = function () {
			_setUpListners();
		};

	// _setUpListners - прослушка
	var _setUpListners = function (){
		doc.find("#buttonHeader").click( function () {
			_controller.newPosIn(calcObj);
		});
		doc.find("#mainSlider").click( function () {
			_controller.disNewIn();
		});
		};

	var
			doc = $(document),
			slider = doc.find('#mainSlider'),
			sliderDisplay = slider.find('#mainSliderView'), // видемая часть слайдера
			imgBox = slider.find('#mainSliderImgBox'), // контейнер со слайдами
			slid = imgBox.find('.main-slider_img-list'), // набор слайдов
			img = slid.find('.main-slider_img'), // картинка внутри слайда

			docW = doc.width(), // ширина окна браузера
			sliderDisplayW = sliderDisplay.width(), // ширина видемой части слайдера
			imgBoxW = imgBox.width(), // ширина контейнера со слайдами
			slidW = slid.width(), // ширина одного слайда
			imgW = img.width(), // ширина картинки

			imgWSum = slidW * slid.length, // сумма всех ширин слайдов
			imgBoxPos = imgBox.position().left; //позиция контейнера со слайдами относительно левого края

		var
			// calcObj - для передачи данных в функцию calcFunc
			calcObj = {
				name 	 : 'calcObj', // имя объекта
				dis    : 'left', // направление движения
				newPos : imgBoxPos, // сюда записывается новое позиционирование контейнера со слайдами
				step   : slidW // шаг на который будет произведен сдвиг слайдера
			};

		var	_controller = (function () {

			// функция disNewFunc переключает направление движения слайдера
			var disNewFunc = function () {
				if (calcObj.dis === 'left') {
					calcObj.dis = 'right'
					console.log(calcObj);
				} else {
					calcObj.dis = 'left'
					console.log(calcObj);
				}
			};

			// функция newPosFunc расчитывает новое расположение контейнера со слайдами
			// относительно левого края.
			var newPosFunc = function (obj) {
				if (obj.dis === 'left') {
					obj.newPos = obj.newPos - obj.step;
					console.log('step Left');
				} else if (obj.dis === 'right') {
					obj.newPos = obj.newPos + obj.step;
					console.log('step right');
				}
			};

			return {
				disNewIn : disNewFunc,
				newPosIn : newPosFunc
			}

		})();


return {
			init: init
		};

})();

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Данный файл  содержит в себе модуль mainSlider. Функция запускается из файла main.js, перед тем как
// зпустить этот фрагмент кода main.js проверяет DOM дерево на наличие необходимость элементов
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
var mainSlider = (function () {
	// Инициализация
	var init = function () {
			_setUpListners();
			_controller.sliderStart('start');  // раскоментрий для автоматического старта слайдера
		};

	// _setUpListners - прослушка
	var _setUpListners = function (){																							// Прослушка событий _setUpListners. Данная функция содержит в себе проуслушку
			doc.find('#sliderControllLeft').click(function () {												// кнопок для переключения слайдера влево или вправо. Попутно
				if (calcObj.newPos > -lastSliderPos ) {																	// в функции проверяется возможность передвижения слайдера в
					_controller.step('left');																							// в нужную сторону в зависимости от моложения контейнера для слайдов
				}
			});
			doc.find('#sliderControllRight').click(function () {
				console.log(calcObj.newPos);
				if (calcObj.newPos < firstSliderPos) {
					_controller.step('right');
				}
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
			imgBoxPos = imgBox.position().left, //позиция контейнера со слайдами относительно левого края
			sliderTimer, //переменная для сохранения Setinterval для слайдера
			firstSliderPos = slid.first().position().left, // сохраняем положение первого слайда относительно левого края
			lastSliderPos = slid.last().position().left; // сохраняем положение последнего слайда относительно левого края


		var
			// calcObj - хранит в себе настоящее состояние слайдера
			calcObj = {
				name 	 : 'calcObj', // имя объекта
				dis    : 'left', // направление движения
				newPos : imgBoxPos, // сюда записывается новое позиционирование контейнера со слайдами
				step   : slidW // шаг на который будет произведен сдвиг слайдера
			};

		// Функция _view отвечает за внешиний вид слайдера и за выполнение анимации
		var _view = function (pos) {
			imgBox.animate({
				left : pos
			})
		};


		var	_controller = (function () {																						// Функция _controller является основной функцией для слайдера

			var step = function (dir) {																								// функция step срабатывает когда пользователь нажимает
				sliderStart('stop'); 																										// на кнопки влево или вправо в слайдере. Функция останавливает
				if (dir === 'left') {																										// фвтоматическую прокурутку слайдера, меняет направление прокрутки слайдера
					calcObj.dis = 'left';																									// в зависисмости от нажатой кнопки.
				} else if (dir === 'right') {
					calcObj.dis = 'right';
				}
				newPosFunc(calcObj);
				_view(calcObj.newPos);
			};

			var sliderStart = function (action) {																			// sliderStart - функция для автоматического старта прокурутки слайдера
				if (action === 'start') {																								// в зависисмости от значений 'action' функция запускает таймер для прокурутки
					 sliderTimer = setInterval (function () {															// или останавливает
						newPosFunc(calcObj);
						_view(calcObj.newPos);
						checkFollowingSlide();
					}, 5000);
				} else if (action === 'stop') {
					clearInterval(sliderTimer);
				}
			}

			var checkFollowingSlide = function (requesterName) {											// checkFollowingSlide - функция проверки. Она проверет есть ли еще слайды
					if (calcObj.newPos <= -lastSliderPos ) {															// для того чтобы перелистныть слайдер вправо или влево
						disNewFunc();
					} else if (calcObj.newPos >= firstSliderPos) {
						disNewFunc();
					}
			}


			// функция newPosFunc рассчитывает новое расположение контейнера со слайдами
			// относительно левого края.
			var newPosFunc = function (obj) {
				if (obj.dis === 'left') {
					obj.newPos = obj.newPos - obj.step;
				} else if (obj.dis === 'right') {
					obj.newPos = obj.newPos + obj.step;
				}
			};

			// функция disNewFunc переключает направление движения слайдера
			var disNewFunc = function () {
				if (calcObj.dis === 'left') {
					calcObj.dis = 'right'
				} else {
					calcObj.dis = 'left'
				}
			};

			return {
				disNewIn : disNewFunc,
				newPosIn : newPosFunc,
				step : step,
				sliderStart : sliderStart,
				checkFollowingSlide : checkFollowingSlide
			}

		})();



return {
			init: init
		};

})();

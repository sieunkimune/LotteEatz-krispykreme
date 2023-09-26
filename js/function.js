const $indicator = $('.slides-pagination a');
const $container = $('.slides-container');

let nowIdx = 0;

const moveFn = function () {
	//컨테이너 이동
	$container.animate({ left: -100 * nowIdx + '%' });

	//활성화 표시
	$indicator.eq(nowIdx).parent().addClass('on');
	$indicator.eq(nowIdx).parent().siblings().removeClass('on');
};

$indicator.on('click', function (evt) {
	evt.preventDefault();

	nowIdx = $indicator.index(this);

	moveFn();
});

//다음버튼에 대한 클릭이벤트 구문
$('.slides-next').on('click', function (evt) {
	evt.preventDefault();

	if (nowIdx < $indicator.length - 1) {
		nowIdx++;
	} else {
		nowIdx = 0;
	}

	moveFn();
});

//이전버튼에 대한 클릭이벤트 구문
$('.slides-prev').on('click', function (evt) {
	evt.preventDefault();

	if (nowIdx > 0) {
		nowIdx--;
	} else {
		nowIdx = $indicator.length - 1;
	}

	moveFn();
});

//라이트박스 주문하기 창
const $resumeBtn = $('.order');
const $clse = $('.clse');
const $lightbox = $('.lightbox');

const $shadow = $lightbox.parent();

$resumeBtn.on('click', function (evt) {
	evt.preventDefault();

	const imgSrc = $(this).attr('href');
	const imgAlt = $(this).children('img').attr('alt');

	$lightbox.children('img').attr({
		src: imgSrc,
		alt: imgAlt,
	});

	$shadow.show();
});

$clse.add($shadow).on('click', function () {
	$shadow.hide();
});

$lightbox.on('click', function (evt) {
	evt.stopPropagation();
});

//ESC키를 눌렀을 때 닫힘
$(document).on('keyup', function (evt) {
	if (evt.which === 27) {
		$shadow.hide();
	}
});

const $nav = $('.kkcontainer');
const navH = $nav.height();
const $aside = $('aside');

$(window).on('scroll', function () {
	let scrollTop = $(this).scrollTop();
	const $article = $nav.nextAll('#choose');

	//헤더 고정
	if (scrollTop > 1130) {
		$nav.addClass('fixed');
		$article.css({ marginTop: navH });
	} else {
		$nav.removeClass('fixed');
		$article.css({ marginTop: 0 });
	}

	//탑버튼
	if (scrollTop > 150) {
		$aside.fadeIn();
	} else {
		$aside.fadeOut();
	}

	$aside.on('click', function (evt) {
		evt.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0,
		});
	});
});

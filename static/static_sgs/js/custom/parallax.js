(function ($) {
	// Init ScrollMagic
    var controller = new ScrollMagic.Controller();
    var slides = ['[data-js="parallax1"]', '[data-js="parallax2"]', '[data-js="parallax3"]'];
    var mobResolution = Modernizr.mq('(max-width: 800px)');
	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
    if (!Modernizr.touch && !mobResolution) {

		slides.forEach(function (slide) {
		    var $bcg = $(slide).find('[data-js="parallax-image"]');
		    var $textContent = $(slide).find('[data-js="parallax-text"]');

			var slideParallaxBcg = new ScrollMagic.Scene({
		        triggerElement: slide, 
		        triggerHook: 1,
		        duration: "90%"
		    })
		    .setTween(TweenMax.from($bcg, 1, {y: '-50%', autoAlpha: 0.15, ease:Power0.easeNone}))
		    .addTo(controller);

			var slideParallaxImg = new ScrollMagic.Scene({
			    triggerElement: slide,
			    triggerHook: 0.1,
			    duration: "80%"
			})
		    .setTween(TweenMax.fromTo($textContent, 1, { y: '0', ease: Power0.easeNone }, { y: '-70%', ease: Power0.easeNone }))
		    .addTo(controller);

	    });

	}

}(jQuery));
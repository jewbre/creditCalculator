var webJS = {
    common: {}
};

webJS.common = (function (window, document) {
    function mainSlider() {
        $('[data-js="main-slider"]').slick({
            dots: true,
            infinite: true,
            speed: 550,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5500,
            cssEase: 'linear',
            nextArrow: '<div class="slick-prev"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>',
            prevArrow: '<div class="slick-next"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>'
        });
    }

    function bankingSlider() {
        var $current = $('[data-js="current-slide"]');
        var $number = $('[data-js="slide-total-number"]');
        var $slickElement = $('[data-js="banking-slider"]');

        $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $current.text('0' + i);
            $number.text('/' + ' ' + '0' + slick.slideCount);
        });

        $slickElement.slick({
            dots: true,
            autoplay: false,
            infinite: true,
            speed: 550,
            fade: true,
            cssEase: 'linear',
            nextArrow: '<div class="slick-prev"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>',
            prevArrow: '<div class="slick-next"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>'
        });

    }

    function slider() {
        $('[data-js="slider"]').slick({
            dots: true,
            infinite: true,
            speed: 550,
            fade: true,
            cssEase: 'linear',
            nextArrow: '<div class="slick-prev"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>',
            prevArrow: '<div class="slick-next"><svg class="icon icon-arow_one"><use xlink:href="static/icomoon/symbol-defs.svg#icon-arow_one"></use></svg></div>'
        });
    }

    function chosen() {
        $(".chosen-select").chosen({
            disable_search_threshold: 10,
            width: '100%'
        }).on('change', function () {
            $('[data-js="dropdown-content"]').addClass('is-active');
        });

    }

    function searchTrigger() {
        $('[data-js="search"]').on("click", function (e) {
            e.preventDefault();

            closeInform();
            var searchCta = $(this),
                dataStatus = searchCta.attr("data-status"),
                dataTarget = searchCta.attr("data-target");
            "off" == dataStatus ? (searchCta.attr("data-status", "on"),
                $(searchCta).addClass("is-active"),
                $(dataTarget).addClass("is-active"),

                setTimeout(function () {
                    $(dataTarget).find('input[type="search"]').focus()
                }, 300)) : (searchCta.attr("data-status", "off"),
                $(searchCta).removeClass("is-active"),
                $(dataTarget).removeClass("is-active"))
        }),

            $(".header-search__close").on("click", function (e) {
                e.preventDefault(),
                    $('[data-js="search"]').attr("data-status", "off"),
                    $($('[data-js="search"]').attr("data-target")).removeClass("is-active"),
                    $('[data-js="search"]').removeClass("is-active")
            })
    }

    function backToTop(onScreen) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200 && !$(onScreen).isOnScreen(0.01, 0.01)) {
                $('[data-js="back-to-top"]').addClass('is--active');
            } else {
                $('[data-js="back-to-top"]').removeClass('is--active');
            }
        });

        $('[data-js="back-to-top"]').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    function contentTrigger(trigger, content, closeCta) {
        $(trigger).on("click", function (e) {
            e.preventDefault();
            var triggerCta = $(this),
                dataStatus = triggerCta.attr("data-status"),
                dataTarget = triggerCta.attr("data-target"),
                parent = $('[data-js="hidden-container"]');

            "off" == dataStatus ? (triggerCta.attr("data-status", "on"),
                // $(triggerCta).addClass("is-active"), $(triggerCta).closest(parent).find(closeCta).show(), $(triggerCta).parent().next(content).show()) : (triggerCta.attr("data-status", "off"),
                // $(triggerCta).removeClass("is-active"), $(closeCta).hide(), $(triggerCta).parent().next(content).hide())
                $(triggerCta).addClass("is-active"), $(triggerCta).closest(parent).find(closeCta).show(), $(triggerCta).parent().next(content).slideDown()) : (triggerCta.attr("data-status", "off"),
                $(triggerCta).removeClass("is-active"), $(closeCta).hide(), $(triggerCta).parent().next(content).slideUp())
        });

        $(closeCta).on("click", function (e) {
            e.preventDefault(),
                $(trigger).attr("data-status", "off"),
                // $(this).parent().find(content).hide(),
                $(this).parent().find(content).slideUp(),
                $(this).hide(),
                $(trigger).removeClass("is-active");
        })
    }

    function interactionTrigger(trigger, closeCta) {
        $(trigger).on("click", function (e) {
            e.preventDefault();
            var triggerCta = $(this),
                dataStatus = triggerCta.attr("data-status"),
                dataTarget = triggerCta.attr("data-target");

            "off" == dataStatus ? (triggerCta.attr("data-status", "on"),
                $(triggerCta).closest('[data-js="interaction"]').find(dataTarget).slideDown()) : (triggerCta.attr("data-status", "off"),
                $(triggerCta).closest('[data-js="interaction"]').find(dataTarget).slideUp())
        });

        $(closeCta).on("click", function (e) {
            e.preventDefault(),
                $(trigger).attr("data-status", "off"),
                $(this).closest('[data-js="interaction-form"]').slideUp();
        })
    }

    function stickyHeader() {
        var header = new Headroom(document.querySelector('[data-js="header"]'), {
            tolerance: 5,
            offset: 50,
            classes: {
                initial: "header--animated",
                pinned: "header--slideDown",
                unpinned: "header--slideUp",
                notTop: "header--not-top",
                top: "header--top"
            }
        });

        var headerSearch = new Headroom(document.querySelector('[data-js="header-search"]'), {
            tolerance: 5,
            offset: 100,
            classes: {
                initial: "header--animated",
                pinned: "header--slideDown",
                unpinned: "header--slideUp"
            }
        });

        header.init();
        headerSearch.init();
    }

    function inputFocus() {
        [].slice.call(document.querySelectorAll('[data-js="input-filed"]')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                $(inputEl).closest().addClass('is-active');
            }
            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);

        });

        function onInputFocus(ev) {
            $(ev.target).closest('.form__input-field, .map__search').addClass('is-active');
        }

        function onInputBlur(ev) {
            if (ev.target.value.trim() === '') {
                $(ev.target.parentNode).closest('.form__input-field, .map__search').removeClass('is-active');
            }
        }
    }

    // function scrollEffects() {
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() > 100) {
    //             closeInform();
    //             $('[data-js="scroll-down"]').addClass('is-hidden');
    //             $('[data-js="logo"]').attr("src", "static/img/logo-black.svg");
    //             $('[data-js="menu-dropdown-trigger"]').attr("data-status", "off").removeClass('is-active');
    //             $('[data-js="menu-dropdown"]').removeClass('is-active');
    //         } else {
    //             $('[data-js="scroll-down"]').removeClass('is-hidden');
    //             $('[data-js="logo"]').attr("src", "static/img/logo-white.svg");
    //         }
    //     });
    // }

    function scrollEffects() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                closeInform();

                $('[data-js="scroll-down"]').addClass('is-hidden');
                $('[data-js="logo"]').attr("src", $('[data-js="logo"]').data('logo-black'));
                $('[data-js="menu-dropdown-trigger"]').attr("data-status", "off").removeClass('is-active');
                $('[data-js="menu-dropdown"]').removeClass('is-active');
            } else {
                $('[data-js="scroll-down"]').removeClass('is-hidden');
                $('[data-js="logo"]').attr("src", $('[data-js="logo"]').data('logo-white'));
            }
        });
    }

    function menu() {
        var menuTrigger = $('[data-js="mobile-menu-trigger"]');
        var menuClose = $('[data-js="mobile-menu-close"]');

        menuTrigger.on("click", function (e) {
            e.preventDefault();
            var dataTarget = $(menuTrigger.attr("data-target"));
            $(dataTarget).addClass("is-active");
            $('body').addClass("body-lock");
        })

        menuClose.on("click", function (e) {
            e.preventDefault();
            var dataTarget = $(menuClose.attr("data-target"));
            $(dataTarget).removeClass("is-active");
            $('body').removeClass("body-lock");
        })
    }

    function dropdownMenu() {
        $('[data-js="menu-dropdown-trigger"]').on("click", function (e) {
            e.preventDefault();
            var dropdownTrigger = $(this),
                dataStatus = dropdownTrigger.attr("data-status");

            $('[data-js="menu-dropdown"]').removeClass('is-active'),
                $('[data-js="menu-dropdown-trigger"]').attr("data-status", "off").removeClass('is-active');

            "off" == dataStatus ? (dropdownTrigger.attr("data-status", "on"),
                $(dropdownTrigger).addClass("is-active"),
                $(dropdownTrigger).next('[data-js="menu-dropdown"]').addClass('is-active')) : (dropdownTrigger.attr("data-status", "off"),
                $(dropdownTrigger).next('[data-js="menu-dropdown"]').removeClass('is-active'),
                $(dropdownTrigger).removeClass("is-active"))
        });


        $('body').on("click", function (e) {
            if (!$('[data-js="menu-dropdown-trigger"], [data-js="menu-dropdown"]').is(e.target) && $('[data-js="menu-dropdown-trigger"], [data-js="menu-dropdown"]').has(e.target).length === 0) {
                var k = $('[data-js="menu-dropdown-trigger"], [data-js="menu-dropdown"]').attr("data-status", "off").removeClass('is-active');
            }
        })

    }

    function subMenu() {
        var dropdownTrigger = $('[data-js="dropdown-title-trigger"]'),
            dropdownBack = $('[data-js="dropdown-back"]'),
            dropdownColumn = $('[data-js="dropdown-col"]');

        $(dropdownTrigger).on("click", function (e) {
            e.preventDefault();

            var trigger = $(this),
                dataStatus = trigger.attr("data-status");

            $(dropdownTrigger).attr("data-status", "off");
            $(dropdownTrigger).removeClass('is-active').next().removeClass('is-active');

            "off" == dataStatus ? (trigger.attr("data-status", "on"), $(trigger).addClass("is-active"),
                $(trigger).next().addClass("is-active")) : (trigger.attr("data-status", "off"), $(trigger).removeClass("is-active"), $(trigger).next().removeClass("is-active"));
        }),

            $(dropdownBack).on("click", function (e) {
                e.preventDefault(),
                    $(this).closest(dropdownColumn).find(dropdownTrigger).attr("data-status", "off").removeClass("is-active"),
                    $(this).closest('ul').removeClass("is-active");
            })
    }

    function dropdownTrigger(ddl) {
        $(ddl).on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("is-active");
        });
        $('body').on("click", function (e) {
            if (!$(ddl).is(e.target) && $(ddl).has(e.target).length === 0) {
                var k = $(ddl).removeClass("is-active");
            }
        })
    }

    function locationsTrigger() {
        $('[data-js="locations"]').on("click", function (e) {
            e.preventDefault();
            var trigger = $(this),
                dataStatus = trigger.attr("data-status");

            "off" == dataStatus ? (trigger.attr("data-status", "on"), $('.locations').addClass('is-active'), $('[data-js="icon-list"]').removeClass('is-active'), $('[data-js="map-list"]').addClass('is-active')) :
                (trigger.attr("data-status", "off"), $('.locations').removeClass('is-active'), $('[data-js="icon-list"]').addClass('is-active'), $('[data-js="map-list"]').removeClass('is-active'));

            $('body,html').animate({
                scrollTop: 0
            }, 600);

        })
    }

    function fusnote() {
        $('[data-js="fusnote"]').on("click", function (e) {
            e.preventDefault();
            var fusnoteCta = $(this),
                dataStatus = fusnoteCta.attr("data-status"),
                dataTarget = fusnoteCta.attr("data-target");

            $('[data-js="fusnote"]').attr("data-status", "off");

            "off" == dataStatus ? (fusnoteCta.attr("data-status", "on"),
                $(dataTarget).addClass("is-active")) : (fusnoteCta.attr("data-status", "off"))
        });

        $('[data-js="fusnote-close"]').on("click", function (e) {
            e.preventDefault(),
                $('[data-js="fusnote"]').attr("data-status", "off"),
                $($('[data-js="fusnote"]').attr("data-target")).removeClass("is-active");
        });
    }

    function imagesView() {
        $("[data-fancybox]").fancybox();
    }

    function sliderCalculator() {
        $('[data-js="range-slider"]').ionRangeSlider({
            type: "single",
            onFinish: function (data) {
                from = data.from;
            }
        });

        $('[data-js="btn-minus"]').on("click", function () {
            var range = $(this).parent().find('[data-js="range-slider"]'),
                range_instance = range.data("ionRangeSlider"),
                from = range.data("from"),
                min = range.data("min"),
                max = range.data("max"),
                step = range.data("step");

            from += step * (-1);
            if (from < min) {
                from = min;
            } else if (from > max) {
                from = max;
            }
            range_instance.update({
                from: from
            });
        });

        $('[data-js="btn-plus"]').on("click", function () {
            var range = $(this).parent().find('[data-js="range-slider"]'),
                range_instance = range.data("ionRangeSlider"),
                from = range.data("from"),
                min = range.data("min"),
                max = range.data("max"),
                step = range.data("step");

            from += step * (1);
            if (from < min) {
                from = min;
            } else if (from > max) {
                from = max;
            }
            range_instance.update({
                from: from
            });
        });
    }

    function mobileCalculator() {
        //set input value and text
        $('[data-js="calculator-field"]').each(function () {
            var field = $(this),
                min = field.data("min"),
                max = field.data("max"),
                text = field.attr('data-text');
            field.val(min + ' ' + text);
        });

        //set text - FROM
        $('[data-js="calculator-field-from"]').each(function () {
            var from = $(this),
                min = from.closest('[data-js="calculator-field-parent"]').find('[data-js="calculator-field"]').data("min"),
                text = from.closest('[data-js="calculator-field-parent"]').find('[data-js="calculator-field"]').data("text");

            from.text(min + ' ' + text);
        });

        //set text - TO
        $('[data-js="calculator-field-to"]').each(function () {
            var from = $(this),
                min = from.closest('[data-js="calculator-field-parent"]').find('[data-js="calculator-field"]').data("max"),
                text = from.closest('[data-js="calculator-field-parent"]').find('[data-js="calculator-field"]').data("text");

            from.text(min + ' ' + text);
        });

        //increase value
        $('[data-js="field-plus"]').on("click", function () {
            var field = $(this).parent().find('[data-js="calculator-field"]'),
                currentVal = parseInt(field.val()),
                step = field.data("step"),
                max = field.data("max"),
                text = field.attr('data-text');

            if (!isNaN(currentVal) && currentVal < max) {
                field.val(currentVal + step + ' ' + text);
            }
        });

        //decrease value
        $('[data-js="field-minus"]').on("click", function () {
            var field = $(this).parent().find('[data-js="calculator-field"]'),
                currentVal = parseInt(field.val()),
                step = field.data("step"),
                min = field.data("min"),
                text = field.attr('data-text');

            if (!isNaN(currentVal) && currentVal > min) {
                field.val(currentVal - step + ' ' + text);
            }
        });

        // Show/hide results
        $('[data-js="mobile-calculator-trigger"]').on("click", function () {
            $('[data-js="mobile-calculator"]').hide(),
                $('[data-js="mobile-calculator-results"]').fadeIn(600);
        });
        $('[data-js="mobile-calculator-back"]').on("click", function () {
            $('[data-js="mobile-calculator"]').fadeIn(600),
                $('[data-js="mobile-calculator-results"]').hide();
        });
    }

    function customCheck() {
        $('[data-js="custom-check"]').on("click", function () {
            var trigger = $(this),
                label = $(this).parent().find('label'),
                check = $(this).parent().find('[data-js="check"]'),
                dataStatus = trigger.attr("data-status");

            "off" == dataStatus ? (trigger.attr("data-status", "on"), $(label).addClass('is-active'), $(check).prop('checked', true)) :
                (trigger.attr("data-status", "off"), $(label).removeClass('is-active'), $(check).prop('checked', false));
        })
    }

    function inform() {
        if ($('[data-js="inform"]').length) {
            var inform = $('[data-js="inform"]'),
                height = $(inform).outerHeight(),
                close = $('[data-js="close-inform"]');

            $(inform).addClass('is-active');
            $('[data-js="header"], [data-js="main-wrapper"]').css({
                '-webkit-transform': 'translateY(' + height + 'px)'
                , '-moz-transform': 'translateY(' + height + 'px)'
                , 'transform': 'translateY(' + height + 'px)'
            });

            $(close).on("click", function (e) {
                e.preventDefault();
                closeInform();
            });
        }

    }

    function closeInform() {
        if ($('[data-js="inform"]').length) {
            $('[data-js="inform"]').removeClass('is-active');
            // $('[data-js="header"], [data-js="main-wrapper"]').css({
            //     '-webkit-transform': 'translateY(' + 0 + 'px)'
            //  , '-moz-transform': 'translateY(' + 0 + 'px)'
            //  , 'transform': 'translateY(' + 0 + 'px)'
            // });
            $('[data-js="header"], [data-js="main-wrapper"]').removeAttr('style');
        }
    }

    function initInform() {
        $(window).on('load', function () {
            inform();
        });
        $(window).on('resize', function () {
            closeInform();
        });
    }


    function brochureTabsButtons() {
        var active = $('[data-js="tabs"]').tabs("option", "active");
        if (active == 0) {
            $('[data-js="prev-tab"]').hide();
        } else {
            $('[data-js="prev-tab"]').show();
        }
        if (active == 6) {
            $('[data-js="next-tab"]').hide();
        } else {
            $('[data-js="next-tab"]').show();
        }
    }

    function brochureTabs() {
        $('[data-js="tabs"]').tabs({
            activate: brochureTabsButtons,
            create: brochureTabsButtons
        });

        $('[data-js="next-tab"]').click(function () {
            var selected = $('[data-js="tabs"]').tabs("option", "active");
            $('[data-js="tabs"]').tabs("option", "active", selected + 1);
            $('[data-js="bottom-nav-dots"] li').removeClass('is-active');
            $('[data-js="bottom-nav-dots"] li').eq(selected + 1).addClass('is-active');
        });
        $('[data-js="prev-tab"]').click(function () {
            var selected = $('[data-js="tabs"]').tabs("option", "active");
            $('[data-js="tabs"]').tabs("option", "active", selected - 1);
            $('[data-js="bottom-nav-dots"] li').removeClass('is-active');
            $('[data-js="bottom-nav-dots"] li').eq(selected - 1).addClass('is-active');
        });
        $('[data-js="tabs"] ul li').click(function () {
            var index = $(this).index();
            $('[data-js="bottom-nav-dots"] li').removeClass('is-active');
            $('[data-js="bottom-nav-dots"] li').eq(index).addClass('is-active');
        });
    }


    return {
        mainSlider: mainSlider,
        bankingSlider: bankingSlider,
        slider: slider,
        chosen: chosen,
        searchTrigger: searchTrigger,
        backToTop: backToTop,
        contentTrigger: contentTrigger,
        interactionTrigger: interactionTrigger,
        inputFocus: inputFocus,
        stickyHeader: stickyHeader,
        scrollEffects: scrollEffects,
        menu: menu,
        dropdownMenu: dropdownMenu,
        subMenu: subMenu,
        // locationsAutocomplete:locationsAutocomplete,
        dropdownTrigger: dropdownTrigger,
        locationsTrigger: locationsTrigger,
        fusnote: fusnote,
        imagesView: imagesView,
        sliderCalculator: sliderCalculator,
        mobileCalculator: mobileCalculator,
        customCheck: customCheck,
        //Ne koriste se za sada
        // remodal: remodal,
        // smoothScroll: smoothScroll
        initInform: initInform,
        brochureTabs: brochureTabs
    };

})(window, document);

$(function () {
    webJS.common.mainSlider();
    webJS.common.bankingSlider();
    webJS.common.slider();
    webJS.common.chosen();
    webJS.common.searchTrigger();
    webJS.common.backToTop('[data-js="footer"]');
    webJS.common.contentTrigger('[data-js="trigger-content"]', '[data-js="hide-content"]', '[data-js="close-content"]');
    webJS.common.contentTrigger('[data-js="trigger-additional-content"]', '[data-js="additional-content"]');
    webJS.common.interactionTrigger('[data-js="interaction-trigger"]', '[data-js="interaction-close"]');
    webJS.common.inputFocus();
    webJS.common.scrollEffects();
    webJS.common.menu();
    webJS.common.dropdownMenu();
    webJS.common.subMenu();
    // webJS.common.locationsAutocomplete();
    webJS.common.dropdownTrigger('[data-js="dropdown"]');
    webJS.common.locationsTrigger();
    webJS.common.fusnote();
    webJS.common.imagesView();
    webJS.common.sliderCalculator();
    webJS.common.mobileCalculator();
    webJS.common.customCheck();
    webJS.common.initInform();
    webJS.common.brochureTabs();
    webJS.common.stickyHeader();

    //Ne koriste se za sada
    // webJS.common.remodal();
    // webJS.common.smoothScroll();
});


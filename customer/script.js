$(document).ready(function () {
    // Drawer Menu Toggle
    $('#menu-toggle').on('click', function () {
        $('#drawer-menu').addClass('active');
        $('#drawer-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('#close-menu, #drawer-overlay').on('click', function () {
        $('#drawer-menu').removeClass('active');
        $('#drawer-overlay').removeClass('active');
        $('body').css('overflow', '');
    });

    // Close drawer when clicking on links
    $('#drawer-menu a').on('click', function () {
        $('#drawer-menu').removeClass('active');
        $('#drawer-overlay').removeClass('active');
        $('body').css('overflow', '');
    });

    // Smooth Scrolling
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 600);
        }
    });

    // FAQ Accordion
    $('.faq-question').on('click', function () {
        var $item = $(this).closest('.faq-item');
        var $answer = $item.find('.faq-answer');
        var $icon = $(this).find('svg');
        var hasVideo = $(this).data("video-card") === true;
        var isActive = $item.hasClass("active-faq");

        // Close all other items
        $('.faq-item').not($item).find('.faq-answer').slideUp(300);
        $('.faq-item').not($item).find('svg').removeClass('rotate-180');
        $('.faq-item').not($item).removeClass('active-faq');


        // Toggle current item
        if ($answer.is(':visible')) {
            $answer.slideUp(300);
            $icon.removeClass('rotate-180');
            $item.removeClass('active-faq')
        } else {
            $answer.slideDown(300);
            $item.addClass('active-faq')
            $icon.addClass('rotate-180');
        }
        // Show/hide video based on which card is active
        if (!isActive && hasVideo) {
            $(".video-container").addClass("active");
        } else {
            $(".video-container").removeClass("active");
        }
    });
    // Initialize video visibility on page load
    if ($(".faq-question").data("video-card") === true) {
        $(".video-container").addClass("active");
    } else {
        $(".video-container").removeClass("active");
    }
    // Animate on scroll
    function animateOnScroll() {
        $('.faq-item, .bg-white.rounded-xl').each(function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('opacity-100 translate-y-0');
            }
        });
    }

    // Add initial classes for animation
    $('.faq-item, .bg-white.rounded-xl').addClass('opacity-0 translate-y-4 transition-all duration-700');

    $(window).on('scroll', animateOnScroll);
    animateOnScroll();



});


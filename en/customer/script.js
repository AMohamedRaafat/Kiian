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
    });

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
    
    // Language switcher injection
    (function insertLangSwitcher() {
        try {
            const path = window.location.pathname;
            let targetPath = null;
            if (path.indexOf('/en/') !== -1) {
                targetPath = path.replace('/en/', '/ar/');
            } else if (path.indexOf('/ar/') !== -1) {
                targetPath = path.replace('/ar/', '/en/');
            } else {
                if (path.startsWith('/en')) targetPath = path.replace('/en', '/ar');
                else if (path.startsWith('/ar')) targetPath = path.replace('/ar', '/en');
            }
            if (!targetPath) return;
            targetPath += window.location.search + window.location.hash;
            const $btn = $(
                '<a id="lang-switcher" class="ml-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-white hover:bg-white/10 transition" href="' +
                    targetPath +
                    '"><i class="fas fa-globe"></i><span class="ml-2">Arabic</span></a>'
            );
            const $navRight = $('nav .container .flex.items-center.justify-between');
            if ($navRight.length) {
                function updateNavLangButton() {
                    const isDesktop = window.innerWidth >= 768;
                    $navRight.find('#lang-switcher').remove();
                    if (isDesktop) {
                        $navRight.append($btn);
                    }
                }
                updateNavLangButton();
                $(window).on('resize.langSwitcher', updateNavLangButton);
            }
            const $drawer = $('#drawer-menu .px-6');
            if ($drawer.length) {
                $drawer.find('a[data-lang-link="true"]').remove();
                const $link = $(
                    '<a data-lang-link="true" href="' +
                        targetPath +
                        '" class="block text-black text-[16px] font-semibold py-2 flex items-center gap-2"><i class="fas fa-globe"></i><span>Arabic</span></a>'
                );
                const $ul = $drawer.find('ul.space-y-6');
                if ($ul.length) {
                    $ul.append($('<li>').append($link));
                } else {
                    $drawer.append($link);
                }
            }
        } catch (err) {
            console.warn('lang switcher injection failed', err);
        }
    })();
});


$(document).ready(function () {
    console.log('FAQ Video System Initialized');
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
        console.log('FAQ item clicked');
        var $item = $(this).closest('.faq-item');
        var $answer = $item.find('.faq-answer');
        var $icon = $(this).find('svg');
        var hasVideo = $(this).data("video-card") === true;
        var isActive = $item.hasClass("active-faq");
        console.log('Has video:', hasVideo, 'Is active:', isActive);

        // Close all other items
        $('.faq-item').not($item).find('.faq-answer').slideUp(300);
        $('.faq-item').not($item).find('svg').removeClass('rotate-180');
        $('.faq-item').not($item).removeClass('active-faq');
        
        // Hide all mobile videos with exit animation (only on mobile)
        if (window.innerWidth < 768) {
            var $activeMobileVideo = $('.video-container:not(.desktop-video).active');
            if ($activeMobileVideo.length) {
                // Add exiting class for animation
                $activeMobileVideo.addClass('exiting');
                
                // After animation completes, hide and clean up
                setTimeout(function() {
                    $activeMobileVideo.hide().removeClass('active exiting');
                }, 400);
            } else {
                // No active video, just hide any remaining ones
                $('.video-container:not(.desktop-video)').hide().removeClass('active exiting');
            }
        }

        // Toggle current item
        if ($answer.is(':visible')) {
            $answer.slideUp(300);
            $icon.removeClass('rotate-180');
            $item.removeClass('active-faq')
        } else {
            $answer.slideDown(300);
            $item.addClass('active-faq')
            $icon.addClass('rotate-180');
            
            // Show mobile video with animation if it has video (only on mobile)
            if (hasVideo && window.innerWidth < 768) {
                var $mobileVideo = $item.nextAll('.video-container').first();
                $mobileVideo.slideDown(300).addClass('active');
            }
        }
        
        // Handle desktop video switching (only on desktop)
        if (window.innerWidth >= 768) {
            if (!isActive && hasVideo) {
                // Get the video source from the mobile video container next to this item
                var $mobileVideo = $item.nextAll('.video-container').first();
                var videoSrc = $mobileVideo.find('video').attr('src');
                
                console.log('Switching to desktop video:', videoSrc);
                
                var $desktopContainer = $('#main-video-container');
                
                // If there's currently an active video, animate it out first
                if ($desktopContainer.hasClass('active')) {
                    $desktopContainer.addClass('exiting');
                    
                    // After exit animation, switch to new video
                    setTimeout(function() {
                        $desktopContainer.removeClass('exiting active');
                        
                        // Update desktop video source
                        $('#main-video-container video').attr('src', videoSrc);
                        
                        // Add loading state and animate new video in
                        $desktopContainer.addClass('loading');
                        setTimeout(function() {
                            $desktopContainer.removeClass('loading').addClass('active');
                            console.log('Desktop video activated with exit animation');
                        }, 100);
                    }, 500);
                } else {
                    // No current video, just animate in the new one
                    $desktopContainer.addClass('loading');
                    $('#main-video-container video').attr('src', videoSrc);
                    
                    setTimeout(function() {
                        $desktopContainer.removeClass('loading').addClass('active');
                        console.log('Desktop video activated');
                    }, 300);
                }
                
            } else if (isActive) {
                // If clicking the active item, hide the desktop video with exit animation
                var $desktopContainer = $('#main-video-container');
                $desktopContainer.addClass('exiting');
                
                setTimeout(function() {
                    $desktopContainer.removeClass('exiting active');
                    console.log('Desktop video deactivated with exit animation');
                }, 500);
            }
        }
    });
    // Initialize video visibility on page load
    // Hide desktop video by default
    $('#main-video-container').removeClass('active');
    
    // Hide all mobile videos initially
    $('.video-container:not(.desktop-video)').hide().removeClass('active');
    
    // Show video only if there's an active FAQ item with video
    var $activeFaq = $('.faq-item.active-faq');
    if ($activeFaq.length && $activeFaq.find('.faq-question').data('video-card') === true) {
        var $mobileVideo = $activeFaq.nextAll('.video-container').first();
        var videoSrc = $mobileVideo.find('video').attr('src');
        
        // Show mobile video for active item (only on mobile)
        if (window.innerWidth < 768) {
            $mobileVideo.show().addClass('active');
        }
        
        // Set desktop video source and show (only on desktop)
        if (window.innerWidth >= 768) {
            $('#main-video-container video').attr('src', videoSrc);
            $('#main-video-container').addClass('active');
        }
    }
    // Handle responsive behavior on window resize
    function handleResponsiveVideos() {
        console.log('Handling responsive videos, window width:', window.innerWidth);
        
        if (window.innerWidth >= 768) {
            // On desktop: hide mobile videos, show desktop logic
            console.log('Desktop mode: hiding mobile videos');
            $('.video-container:not(.desktop-video)').hide().removeClass('active');
            
            // Show desktop video if there's an active FAQ
            var $activeFaq = $('.faq-item.active-faq');
            if ($activeFaq.length && $activeFaq.find('.faq-question').data('video-card') === true) {
                var $mobileVideo = $activeFaq.nextAll('.video-container').first();
                var videoSrc = $mobileVideo.find('video').attr('src');
                $('#main-video-container video').attr('src', videoSrc);
                $('#main-video-container').addClass('active');
                console.log('Desktop video activated');
            }
        } else {
            // On mobile: hide desktop video, show mobile logic
            console.log('Mobile mode: hiding desktop video');
            $('#main-video-container').removeClass('active');
            
            // Show mobile video if there's an active FAQ
            var $activeFaq = $('.faq-item.active-faq');
            if ($activeFaq.length && $activeFaq.find('.faq-question').data('video-card') === true) {
                var $mobileVideo = $activeFaq.nextAll('.video-container').first();
                $mobileVideo.show().addClass('active');
                console.log('Mobile video activated');
            }
        }
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
    $(window).on('resize', handleResponsiveVideos); // Add resize handler
    
    // Initial calls
    animateOnScroll();
    handleResponsiveVideos(); // Set initial responsive state



});

// Language switcher injection for Arabic pages
(function insertLangSwitcherAr() {
    try {
        const path = window.location.pathname;
        let targetPath = null;
        if (path.indexOf('/ar/') !== -1) {
            targetPath = path.replace('/ar/', '/en/');
        } else if (path.indexOf('/en/') !== -1) {
            targetPath = path.replace('/en/', '/ar/');
        } else {
            if (path.startsWith('/ar')) targetPath = path.replace('/ar', '/en');
            else if (path.startsWith('/en')) targetPath = path.replace('/en', '/ar');
        }
        if (!targetPath) return;
        targetPath += window.location.search + window.location.hash;
        const $btn = $(
            '<a id="lang-switcher" class="ml-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-white hover:bg-white/10 transition" href="' +
                targetPath +
                '"><i class="fas fa-globe"></i><span class="ml-2">English</span></a>'
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
                    '" class="block text-black text-[16px] font-semibold py-2 flex items-center gap-2"><i class="fas fa-globe"></i><span>English</span></a>'
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


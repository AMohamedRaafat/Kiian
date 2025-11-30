$(document).ready(function () {
    // Drawer Menu Toggle - Only on mobile
    $("#menu-toggle").on("click", function () {
        // Only show drawer on mobile
        if ($(window).width() < 768) {
            $("#drawer-menu").addClass("active");
            $("#drawer-overlay").addClass("active");
            $("body").css("overflow", "hidden");
        }
    });

    $("#close-menu, #drawer-overlay").on("click", function () {
        $("#drawer-menu").removeClass("active");
        $("#drawer-overlay").removeClass("active");
        $("body").css("overflow", "");
    });

    // Close drawer when clicking on links
    $("#drawer-menu a").on("click", function () {
        $("#drawer-menu").removeClass("active");
        $("#drawer-overlay").removeClass("active");
        $("body").css("overflow", "");
    });

    // Close drawer on window resize if desktop
    $(window).on("resize", function () {
        if ($(window).width() >= 768) {
            $("#drawer-menu").removeClass("active");
            $("#drawer-overlay").removeClass("active");
            $("body").css("overflow", "");
        }
    });

    // Smooth Scrolling
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var target = $(this.getAttribute("href"));
        if (target.length) {
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                600
            );
        }
    });

    // Animate on scroll
    function animateOnScroll() {
        $(".bg-white.rounded-xl").each(function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass("opacity-100 translate-y-0");
            }
        });
    }

    // Add initial classes for animation
    $(".bg-white.rounded-xl").addClass(
        "opacity-0 translate-y-4 transition-all duration-700"
    );

    $(window).on("scroll", animateOnScroll);
    animateOnScroll();

});


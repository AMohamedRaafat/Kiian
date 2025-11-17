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

    // Registration Modal Functionality
    const signupBtn = $("#signup-btn");
    const registrationOverlay = $("#registration-overlay");
    const registrationModal = $("#registration-modal");
    const closeRegistration = $("#close-registration");
    const registrationForm = $("#registration-form");
    const phoneInput = $("#phone-number");
    const phoneError = $("#phone-error");
    const citySelect = $("#city");
    const cityError = $("#city-error");

    const successOverlay = $("#success-overlay");
    const successModal = $("#success-modal");
    const closeSuccess = $("#close-success");

    // Open registration modal
    signupBtn.on("click", function () {
        registrationOverlay.addClass("active");
        $("body").css("overflow", "hidden");
    });

    // Close registration modal
    closeRegistration.on("click", function () {
        registrationOverlay.removeClass("active");
        $("body").css("overflow", "auto");
        registrationForm[0].reset();
        phoneError.text("");
        cityError.text("");
    });

    // Close registration modal when clicking overlay
    registrationOverlay.on("click", function (e) {
        if ($(e.target).is(registrationOverlay)) {
            registrationOverlay.removeClass("active");
            $("body").css("overflow", "auto");
            registrationForm[0].reset();
            phoneError.text("");
            cityError.text("");
        }
    });

    // Close success modal
    closeSuccess.on("click", function () {
        successOverlay.removeClass("active");
        $("body").css("overflow", "auto");
    });

    // Close success modal when clicking overlay
    successOverlay.on("click", function (e) {
        if ($(e.target).is(successOverlay)) {
            successOverlay.removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    // Phone number validation - only allow numbers, no formatting, with real-time validation
    phoneInput.on("input", function () {
        let value = $(this).val();
        // Remove any non-digit characters
        value = value.replace(/\D/g, "");

        // Limit to 9 digits
        if (value.length > 9) {
            value = value.substring(0, 9);
        }
        // Set value without any formatting/spaces - plain text
        $(this).val(value);

        // Real-time validation
        if (value.length === 0) {
            phoneError.text("");
        } else if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        }
    });

    // Phone number validation on blur (additional check)
    phoneInput.on("blur", function () {
        let value = $(this).val().replace(/\s/g, "");
        if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        } else if (value.length === 9 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        }
    });

    // Form submission
    registrationForm.on("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        let phoneValue = phoneInput.val().replace(/\s/g, "");
        let cityValue = citySelect.val();

        // Validate phone number
        if (phoneValue.length === 0) {
            phoneError.text("يرجى إدخال رقم الهاتف");
            isValid = false;
        } else if (phoneValue[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        } else if (phoneValue.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
            isValid = false;
        } else if (phoneValue.length === 9 && phoneValue[0] === "5") {
            phoneError.text("");
        } else {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        }

        // City is optional, no validation needed

        if (isValid) {
            // Close registration modal
            registrationOverlay.removeClass("active");

            // Small delay for smooth transition
            setTimeout(function () {
                // Open success modal
                successOverlay.addClass("active");
            }, 300);
        }
    });
});


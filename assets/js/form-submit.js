$(document).ready(function () {
    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    }, "Invalid Value");

    $(".leadform").each(function () {
        $(this).validate({
            rules: {
                name: {
                    required: true,
                    lettersonly: true
                },
                email: {
                    email: true,
                    required: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                },
                service: {
                    required: true
                },
                budget: {
                    required: true
                },
                file: {
                    required: true
                }
            },
            submitHandler: function (form) {
                // Build the optional data object
                var optionalData = {};
                var dataElements = $(form).find("[data-name]");
                if (dataElements.length !== 0) {
                    for (var i = 0; i < dataElements.length; i++) {
                        optionalData[$(dataElements[i]).attr("data-name")] = $(dataElements[i]).val();
                    }
                }

                console.log(form);
                $(form).find(".loader").show();

                // Gather form field values
                var a = $(form).find('[name="name"]').val(),
                    o = $(form).find('[name="email"]').val(),
                    l = $(form).find('[name="phone"]').val(),
                    r = $(form).find('[name="message"]').val(),
                    ser = $(form).find('[name="service"]').val(),
                    bud = $(form).find('[name="budget"]').val(),
                    fil = $(form).find('[name="file"]').val(),
                    s = $(form).find('[name="url"]').val(),
                    c = $(form).find('[name="domain"]').val(),
                    u = $(form).find('[name="subject"]').val(),
                    so = $(form).find('[name="source"]').val(); // Consider declaring with "var" here

                console.log(optionalData);

                // AJAX request
                $.ajax({
                    type: "POST",
                    url: "/Query.php",
                    dataType: "json",
                    data: {
                        name: a,
                        email: o,
                        phone: l,
                        message: r,
                        service: ser,
                        budget: bud,
                        url: s,
                        domain: c,
                        subject: u,
                        source: so,
                        optional: optionalData,
                        file: fil
                    },
                    success: function (response) {
                        console.log(response);
                        if (response.response) {
                            // Optionally reset the form and show success message
                            $(form).trigger("reset");
                            $(form).find('[type="submit"]').hide();
                            $(form).find(".success").html("<p>Thank you for filling out your information!</p>").show();
                            // Redirect to thank-you page
                            window.location = response.redirect;
                        } else {
                            $(form).find(".error").html(response.message);
                        }
                        $(form).find(".loader").hide();
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        $(form).find(".error").html("Error Occurred: " + error);
                        $(form).find(".loader").hide();
                    }
                });

            }
        });
    });
});

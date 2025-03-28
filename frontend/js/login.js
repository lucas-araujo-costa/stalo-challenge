$(document).ready(function () {
    $("#login-form").on("submit", function (e) {
        e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        $.ajax({
            url: "http://localhost:8000/api/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function (response) {
                localStorage.setItem("token", response.token);
                window.location.href = "index.html"; // Alterado para index.html
            },
            error: function (xhr) {
                const errorMessage =
                    xhr.responseJSON?.error || "Erro ao fazer login.";
                $("#error-message").text(errorMessage).show();
            },
        });
    });
});

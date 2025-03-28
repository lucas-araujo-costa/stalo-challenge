$(document).ready(function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; // Alterado de index.html para login.html
    }

    // Máscara de CPF
    $("#cpf").on("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    $("#transaction-form").on("submit", function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("amount", $("#amount").val());
        formData.append("cpf", $("#cpf").val());
        formData.append("status", $("#status").val());
        if ($("#document")[0].files[0]) {
            formData.append("document", $("#document")[0].files[0]);
        }

        $.ajax({
            url: "http://localhost:8000/api/transactions",
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                window.location.href = "index.html"; // Alterado de transactions.html para index.html
            },
            error: function (xhr) {
                const errorMessage =
                    xhr.responseJSON?.message || "Erro ao cadastrar transação.";
                if (xhr.responseJSON?.errors?.cpf) {
                    $("#cpf-error").text(xhr.responseJSON.errors.cpf[0]).show();
                } else {
                    alert(errorMessage);
                }
            },
        });
    });

    $("#logout").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "login.html"; // Alterado de index.html para login.html
    });
});

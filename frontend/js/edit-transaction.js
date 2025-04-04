$(document).ready(function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("id");
    $("#transaction-id").val(transactionId);

    $("#cpf").on("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    $.ajax({
        url: `http://localhost:8000/api/transactions/${transactionId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        success: function (transaction) {
            $("#title").text(`Editar Transação #${transaction.id}`);
            $("#amount").val(transaction.amount);
            const cpfFormatted = transaction.cpf.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                "$1.$2.$3-$4"
            );
            $("#cpf").val(cpfFormatted);
            $("#status").val(transaction.status);
        },
        error: function () {
            alert("Erro ao carregar transação.");
            window.location.href = "index.html";
        },
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
            url: `http://localhost:8000/api/transactions/${transactionId}`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                window.location.href = "index.html";
            },
            error: function (xhr) {
                const errorMessage =
                    xhr.responseJSON?.message || "Erro ao atualizar transação.";
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
        window.location.href = "login.html";
    });
});

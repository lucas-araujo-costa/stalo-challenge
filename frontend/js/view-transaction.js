$(document).ready(function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("id");

    $.ajax({
        url: `http://localhost:8000/api/transactions/${transactionId}`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        success: function (transaction) {
            $("#title").text(`Detalhes da Transação #${transaction.id}`);
            $("#created_at").text(
                new Date(transaction.created_at).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            $("#amount").text(
                parseFloat(transaction.amount).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                })
            );
            $("#cpf").text(
                transaction.cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                )
            );
            $("#status").text(transaction.status);
            if (transaction.document) {
                $("#document").attr(
                    "href",
                    `http://localhost:8000/storage/${transaction.document}`
                );
            } else {
                $("#document-link").hide();
            }
        },
        error: function () {
            alert("Erro ao carregar transação.");
            window.location.href = "index.html";
        },
    });

    $("#logout").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});

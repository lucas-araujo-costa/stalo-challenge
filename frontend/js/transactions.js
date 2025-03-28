$(document).ready(function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }

    let currentTransactionId = null;

    window.onload = function () {
        $("#deleteModal").hide();
    };

    function loadTransactions() {
        $.ajax({
            url: "http://localhost:8000/api/transactions",
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
            success: function (transactions) {
                let html = "";
                transactions.forEach((transaction) => {
                    const amount = parseFloat(
                        transaction.amount
                    ).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
                    const createdAt = new Date(
                        transaction.created_at
                    ).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    html += `
                        <div class="transaction-item">
                            <span>R$ ${amount}</span>
                            <span>${transaction.status}</span>
                            <span>${createdAt}</span>
                            <div class="dropdown">
                                <span style="padding: 0 15px;">⋮</span>
                                <div class="dropdown-content">
                                    <a href="#" class="view-transaction" data-id="${transaction.id}">Ver</a>
                                    <a href="edit-transaction.html?id=${transaction.id}">Editar</a>
                                    <a href="#" class="delete-transaction" data-id="${transaction.id}">Excluir</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                $("#transaction-list").html(html);
            },
            error: function () {
                alert("Erro ao carregar transações.");
            },
        });
    }

    loadTransactions();

    $(document).on("mouseenter", ".dropdown", function () {
        $(this).find(".dropdown-content").show();
    });
    $(document).on("mouseleave", ".dropdown", function () {
        $(this).find(".dropdown-content").hide();
    });

    $(document).on("click", ".view-transaction", function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        window.location.href = `view-transaction.html?id=${id}`;
    });

    const deleteModal = $("#deleteModal");
    const confirmDelete = $("#confirmDelete");
    const cancelDelete = $("#cancelDelete");

    $(document).on("click", ".delete-transaction", function (e) {
        e.preventDefault();
        currentTransactionId = $(this).data("id");
        deleteModal.show();
    });

    cancelDelete.on("click", function () {
        deleteModal.hide();
    });

    confirmDelete.on("click", function () {
        $.ajax({
            url: `http://localhost:8000/api/transactions/${currentTransactionId}`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
            success: function () {
                deleteModal.hide();
                loadTransactions();
            },
            error: function () {
                alert("Erro ao excluir transação.");
                deleteModal.hide();
            },
        });
    });

    deleteModal.on("click", function (e) {
        if (e.target === deleteModal[0]) {
            deleteModal.hide();
        }
    });

    $("#logout").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});

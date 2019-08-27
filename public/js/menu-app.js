$(function () {

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newItem = {
            item_name: $("#item-name").val().trim(),
            price: parseInt($("#item-price").val().trim())
        };
        console.log(newItem);

        $.ajax("/api/menu", {
            type: "POST",
            data: newItem
        }).then(
            function () {
                console.log("Created a new item");
                location.reload();
            }
        )
    })

    var orderTotal = 0;
    var orderSum = [];

    $(".change-eaten").on("click", function (event) {



        itemData = ($(this).data("id"))
        itemName = ($(this).data("name"))
        itemPrice = ($(this).data("price"))

        orderTotal += itemPrice;
        orderSum.push(itemName);
        // console.log(orderArray);

        var newDiv = $("<div>")
        $(newDiv).text(`Item #${itemData}: ${itemName} = ${itemPrice}`);

        $(".order-col").append(newDiv);

        $.ajax("api/menu/order/" + itemData, {
            type: "GET"
        }).then(function (data) {
            console.log(data);
            console.log("current sales: " + data.sales);
            calculateNewSales(data.sales);
        })

        function calculateNewSales(currentSales) {
            var newSales = currentSales + itemPrice;

            var productSales = {
                sales: newSales
            }

            $.ajax("/api/menu/order/" + itemData, {
                type: "PUT",
                data: productSales
            }).then(
                function () {
                    console.log("Successfully updates sales");
                    // location.reload();
                }
            )
        }
    });

    $("#cash-out").on("click", function (event) {
        event.preventDefault();
        console.log("You've cashed out!")
        console.log("Your customer ordered: " + JSON.stringify(orderSum))
        console.log("The order total is: " + orderTotal);
        var orderSummaryString = JSON.stringify(orderSum);

        setTimeout(function () {
            console.log("logging order...")

            var newOrder = {
                orderSummary: orderSummaryString,
                sales: orderTotal
            };

            $.ajax("/api/order", {
                type: "POST",
                data: newOrder
            }).then(
                function () {
                    console.log("Logged this order");
                    location.reload();
                }
            )
        }, 1000)

        // orderArray = [];
        $(".order-col").text("");
        orderTotal = 0;
    })

});
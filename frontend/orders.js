const orderItems = document.getElementById('order-items');
window.addEventListener('DOMContentLoaded', getOrderDetails);

async function getOrderDetails(){
    try {
        let result = await axios.get('http://localhost:3000/orders');
        if(result.data.length<=0) {
            orderItems.innerHTML = 'No Orders until now!';
        } else {
            result.data.reverse().map(order => {
                displayOrders(order);
            });
        };
    } catch (error) {
        console.log(error);
    };
};

function displayOrders(order) {
    let newOrderDetails = `<div id="${order.id}" class="order-style"><h2>Order Id - ${order.id}</h2></div>`;
    orderItems.innerHTML+=newOrderDetails;
    orderedProducts(order);
};

function orderedProducts(order) {
    let orderList = document.getElementById(`${order.id}`);

    order.products.map(product => {
        let items = `<ul><li><img src="${product.imageUrl}"> ${product.title} - ${product.orderItem.quantity}</li></ul>`;
        orderList.innerHTML+=items;
    });
};
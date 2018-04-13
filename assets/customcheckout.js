function orderContains() {
    var cart = $.ajax({type: "GET", url: "/cart.js", async: false}).responseText;
    console.log(cart)
    if (!(cart.indexOf('3161957') == -1) || !(cart.indexOf('82496') == -1) || !(cart.indexOf('182490') == -1))  {
        $('[data-shipping-method="shopify-Same%20Day%20Shipping%20(Delivered%20in%202%20-%205%20Business%20Days)-7.90"]').parent().hide();
        $('[data-shipping-method="shopify-Expedited%20Shipping%20(Guaranteed%20Delivery%20in%203%20Business%20Days)-14.90').parent().hide();
    }
}

$(document).ready(function() {
    orderContains(); 
}); 
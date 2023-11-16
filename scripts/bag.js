
let bagItemObjects;

onLoad();
function onLoad(){
  loadBagItemsObject();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemsObject(){
  bagItemObjects = bagItems.map(itemId =>{
    for(let i = 0; i < items.length ; i++) {
      if(itemId == items[i].id){
        return items[i]; 
      }
    }

  })
}

function displayBagItems(){

  let containerElement = document.querySelector('.bag-items-container');
  let cartHtml = '' ;
  bagItemObjects.forEach( bagItems => {
    cartHtml = cartHtml + generateItemHtml(bagItems);
  });

  containerElement.innerHTML = cartHtml;
}

function removeFromCart(itemId){
  bagItems = bagItems.filter(bagItemsId => bagItemsId != itemId);
  localStorage.setItem('cartItems', JSON.stringify(bagItems));
  loadBagItemsObject();
  displayBagItems();
  bagItemCounter();
  displayBagSummary();
}

function generateItemHtml(item){
  return `
  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="./${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromCart(${item.id});">X</div>
</div>
  `
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary') ;
  let totalItems = bagItems.length ;
  let totalMRP = 0 ;
  let totalDiscount = 0;
  const convenienceFee = 99 ;
  let totalPaymentAmount = 0 ;

  bagItemObjects.forEach(cartItems => {
    totalMRP += cartItems.original_price ;
    totalDiscount += cartItems.original_price -cartItems.current_price 
  })
  
  totalPaymentAmount = totalMRP - totalDiscount + convenienceFee ;

  bagSummaryElement.innerHTML =`
  
  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹ ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ ${convenienceFee}</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${totalPaymentAmount}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>
  `
}
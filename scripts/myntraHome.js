let bagItems;

onLoad();

function onLoad (){
  let bagItemCount = localStorage.getItem('cartItems');
  bagItems = bagItemCount ? JSON.parse(bagItemCount) : [] ;
  displayItems();
  bagItemCounter();
}


function addToBag (id){
  bagItems.push(id) ;
  localStorage.setItem('cartItems', JSON.stringify(bagItems));
  bagItemCounter();
}



function bagItemCounter(){
  let countUpdate = document.querySelector('.bagCounter') ;
  
  if (bagItems.length > 0){
    countUpdate.innerText = bagItems.length ;
    countUpdate.style.visibility = 'visible';
  } else {
    countUpdate.style.visibility = 'hidden' ;
  }
}

function displayItems(){
  let mainContainerElement = document.querySelector('.mainContainer') ;
  if(mainContainerElement == null){
    return;
  };
  let newHTML = '' ;
  
  items.forEach(item => {
    newHTML = newHTML + `
    <div class="itemContainer">
      <img class="productImage" src="${item.image}" alt="item1">
      <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count} </div>
      <div class="brandName">${item.company}</div>
      <div class="productName">${item.item_name}</div>
      <div class="price">
        <span class="currentPrice">Rs. ${item.current_price}</span>
        <span class="originalPrice">Rs. ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}%)</span>
      </div>
    <button class="addBag" onclick="addToBag(${item.id})">Add to Bag</button>
  </div>
    `
  })
  
  mainContainerElement.innerHTML = newHTML;
}


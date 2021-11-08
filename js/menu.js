const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu');
    const cardArray = localStorage.getItem('card') ? 
    JSON.parse(localStorage.getItem('card')) : 
    [];

   const changeTitle = (restaurant) => {
   console.log(restaurant);
   const restaurantTitle = document.querySelector('.restaurant-title')
   restaurantTitle.textContent = restaurant.name
   const rating = document.querySelector('.rating')
   rating.textContent = restaurant.stars
   const price = document.querySelector('.price')
   price.textContent = restaurant.price
   const category = document.querySelector('.category')
   category.textContent = restaurant.kitchen
}

  const addToCard = (cardItem) => {
   if (cardArray.some((item) => item.id === cardItem.id)) {
      cardArray.map((item) => {
          if(item.id === cardItem.id) {
              item.count++
          }

          return item
      })
   }else {
    cardArray.push(cardItem);
   }
    

    localStorage.setItem('card', JSON.stringify(cardArray));
  }

const renderItems = (data) => {
    data.forEach(({description, id, image, name, price}) => {
        const card = document.createElement('div')

        card.classList.add('card')

        card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
           
            <div class="card-info">
                <div class="ingredients">
                ${description}
                </div>
            </div>
            
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">${price} ₽</strong>
            </div>
        </div>
        `
        card.querySelector('.button-card-text').addEventListener('click', () => {
            const cardItem = {
                name,
                price,
                count: 1,
                id
            }
            addToCard(cardItem)
        });

    cardsMenu.append(card)

    })
};

if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'))

    changeTitle(restaurant);

    fetch(`./db/${restaurant.products}`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data)
    })
    .catch((error) => {
        console.log(error);
    })
}else {
    window.location.href = '/'
}
}
    menu();
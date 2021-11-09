
const cart = () => {
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');
    const body = modalCart.querySelector('.modal-body');
    const buttonSend = modalCart.querySelector('.button-primary');

    const  resetCart = () =>  {
        body.innerHTML = ''
        localStorage.removeItem('card')
        modalCart.classList.remove('is-open')
    }
    const incrementCount = (id) => { 
        const cardArray = JSON.parse(localStorage.getItem('card'))
       
        cardArray.map((item) => {
            if (item.id === id) {
                item.count++
            }
            return item
        });

        localStorage.setItem('card', JSON.stringify(cardArray))
        renderItems(cardArray);
    }

    const decrimentCount = (id) => { 
        const cardArray = JSON.parse(localStorage.getItem('card'))
       
        cardArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0;
            }
            return item
        });

        localStorage.setItem('card', JSON.stringify(cardArray))
        renderItems(cardArray);
    }

   

    const renderItems = (data) => {
        body.innerHTML = ''

        data.forEach(({name, price, id, count}) => {
            const cardElem = document.createElement('div')
            cardElem.classList.add('food-row')

            cardElem.innerHTML = `
                    <span class="food-name">${name}</span>
					<strong class="food-price">${price}</strong>
					<div class="food-counter">
						<button class="counter-button btn-dec" data-index="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button btn-inc" data-index="${id}">+</button>
					</div>
                `

                body.append(cardElem);
            });
        }

        //https://jsonplaceholder.typicode.com/posts

    body.addEventListener('click', (e) => {
        e.preventDefault();
       
        if (e.target.classList.contains('btn-inc')) {
            incrementCount(e.target.dataset.index);
        }else if (e.target.classList.contains('btn-dec')) {
            decrimentCount(e.target.dataset.index);
        }

    });

    buttonSend.addEventListener('click', () => {
        const cardArray = localStorage.getItem('card')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cardArray
        })
        .then(response => {
            if (response.ok) {
                resetCart();
            }
        })
        .catch(e => {
            console.error(e);
        })
    });
  
    buttonCart.addEventListener('click', () => {
      
        if (localStorage.getItem('card')) {
            renderItems(JSON.parse(localStorage.getItem('card')));
        }

        modalCart.classList.add('is-open')
    });

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    });
}
cart();
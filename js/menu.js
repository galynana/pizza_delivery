const restaurant = 'food-band';
const renderItems = (data) => {
    console.log(data);
};

fetch(`./db/${restaurant}.json`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data)
    });
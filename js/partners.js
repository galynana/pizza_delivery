const renderItems = (data) => {

};

fetch('https://test-eb28e-default-rtdb.firebaseio.com/db/partners.json')
    .then((response) => response.json())
    .then((data) => {
        renderItems(data)
    })
    .catch((error) => {

    })
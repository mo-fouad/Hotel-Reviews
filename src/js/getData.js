class getData {

    // Getting Data for hotels

    static fetchHotels(callback) {

        const hotelsURL = "http://my-json-server.typicode.com/fly365com/code-challenge/hotels";

        fetch(hotelsURL)
            .then(response =>  {return response.json()} )
            .then(hotels => {
                callback(null, hotels)
            })
            .catch(err => {
                callback(err, null);
            });
    }

    static fetchHotelInfo(id, callback) {
        const hotelInfoURL = "http://my-json-server.typicode.com/fly365com/code-challenge/hotelDetails/"
        fetch(hotelInfoURL + `/${id}`)
            .then(response => {
                return response.json();
            })
            .then(hotelInfo => {
                callback(null, hotelInfo)
            })
            .catch(err => {
                callback(err,null)
            })
    }
}

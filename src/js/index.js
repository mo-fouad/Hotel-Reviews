// Hello

class Hotel {
    constructor(id, name, totalReviews, totalScore, pricePerNight, photo) {
        this.id = id;
        this.name = name;
        this.totalReviews = totalReviews;
        this.totalScore = totalScore;
        this.pricePerNight = pricePerNight;
        this.photo = photo;
    }
}


class myUI {

    // Passing json for Hotels and builing the UI for it
    static CheckIfData() {
        getData.fetchHotels((error, hotels) => {
            if (error) {
                console.log(error);
            } else {
                this.buildHotels(hotels);
            }
        })
    }

    static buildHotels(hotels) {

        const hotelContainer = document.getElementById('hotels');

        hotels.forEach(hotel => {
            const hoteltag = document.createElement('div');
            hoteltag.classList.add('hotels-card');
            hoteltag.classList.add('col');

            hoteltag.innerHTML = `
                <h1 class="hotels-card-name">${hotel.name}</h1>
                <p class="hotels-card-review">${hotel.totalReviews}</p>
                <p class="hotels-card-score">${hotel.totalScore}</p>
                <p class="hotels-card-price">${hotel.pricePerNight}</p>
                <span class="hotels-card-more" data-id="${hotel.id}" class="viewHotel" onclick="myUI.getHotelID(event)">View Details</span>
                <img class="hotels-card-img" src="${hotel.photo}" alt="${hotel.name}">
            `;
            hotelContainer.append(hoteltag);
        });
    }

    static getHotelID(e) {
        e.preventDefault();

        let linkEl = e.target;
        let id = linkEl.dataset.id;

        ((callback) => {
            getData.fetchHotelInfo(id, (error,HotelInfo) => {
                if (!HotelInfo) {
                    console.log(error);
                    return
                } else {
                    this.bulidHotelInfo(HotelInfo);
                    this.buildHotelReview(HotelInfo);
                }
            })
        })();
    }

    static clickHotelInfo(id) {
       const myHotlInfo =  getData.fetchHotelInfo(id);
        console.log(myHotlInfo)
    }

    static bulidHotelInfo(HotelInfo) {
        document.getElementById('imgGallery').innerHTML="";
        imgGallery.createImgGallery(HotelInfo.pictures);
    }

    static buildHotelReview (HotelInfo) {
        document.getElementById('reviews').innerHTML="";
        reviews.createReviews(HotelInfo.reviews);
    }

}


// ** start building the Application

document.addEventListener('DOMContentLoaded', (event) => {
    myUI.CheckIfData();
});

const hotelLinks = document.querySelectorAll('.viewHotel');



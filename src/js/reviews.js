class reviews {
    static createReviews(reviews) {
        let ReviewsCont = document.getElementById('reviews');

        console.log(reviews);

        reviews.forEach(review => {
            const reviewEle = document.createElement('div');
            reviewEle.className= "reviews-item";
            reviewEle.innerHTML = `
             <span>${review.score}</span>
             <p>${review.review}</p>
            `;
            ReviewsCont.append(reviewEle);
        });
    }

    // todo : create animation when loading the review ele;
    // todo : create paging;
}

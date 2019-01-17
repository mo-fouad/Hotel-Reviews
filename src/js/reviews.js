class Reviews {


    static createReviews(reviews) {
        const ReviewsCont = document.getElementById('reviews');
        const reviewsEleCont = document.createElement('div');

        reviewsEleCont.id = 'reviewsEleCont';

        if (reviews.length < 5) {
            this.drawItem(reviews, ReviewsCont, reviewsEleCont );
        } else {
            this.drawPaging(reviews, ReviewsCont, reviewsEleCont)
        }
    }

    // creating the UI of the review Item

    static drawItem(reviews, ReviewsCont , reviewsEleCont) {
        reviews.forEach(review => {
            const reviewEle = document.createElement('div');
            reviewEle.className = "reviews-item";
            reviewEle.innerHTML = `
             <span>${review.score}</span>
             <p>${review.review}</p>
            `;
            reviewsEleCont.appendChild(reviewEle);
        });

        ReviewsCont.prepend(reviewsEleCont);
    }

    //creating functionalty for the paging
    static drawPaging(reviews, ReviewsCont, reviewsEleCont) {
        let reviewsCount = reviews.length;
        let numPerPage = 5;
        let pages = Math.ceil(reviewsCount / numPerPage);

        this.drawItem ((reviews.slice(1,5)), ReviewsCont,reviewsEleCont );

        let pagingCont = document.createElement('div');
        pagingCont.className = "paging-container";

        for (let i = 1; i <= pages; i++) {
            let pageBtn = document.createElement('span');
            pageBtn.className = "paging-btn";
            pageBtn.innerHTML = i;
            pagingCont.appendChild(pageBtn);


            pageBtn.addEventListener('click', () => {
                reviewsEleCont.innerHTML="";
                let end = i * 5;
                let start = end - 5;
                let newArr = reviews.slice(start, end);
                this.drawItem(newArr, ReviewsCont, reviewsEleCont);
            })
        }

        ReviewsCont.appendChild(pagingCont);

    }


    // todo : create animation when loading the review ele
}

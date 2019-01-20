"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getData =
/*#__PURE__*/
function () {
  function getData() {
    _classCallCheck(this, getData);
  }

  _createClass(getData, null, [{
    key: "fetchHotels",
    // Getting Data for hotels
    value: function fetchHotels(callback) {
      var hotelsURL = "http://my-json-server.typicode.com/fly365com/code-challenge/hotels";
      fetch(hotelsURL).then(function (response) {
        return response.json();
      }).then(function (hotels) {
        callback(null, hotels);
      }).catch(function (err) {
        callback(err, null);
      });
    }
  }, {
    key: "fetchHotelInfo",
    value: function fetchHotelInfo(id, callback) {
      var hotelInfoURL = "http://my-json-server.typicode.com/fly365com/code-challenge/hotelDetails/";
      fetch(hotelInfoURL + "/".concat(id)).then(function (response) {
        return response.json();
      }).then(function (hotelInfo) {
        callback(null, hotelInfo);
      }).catch(function (err) {
        callback(err, null);
      });
    }
  }]);

  return getData;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImgGallery =
/*#__PURE__*/
function () {
  function ImgGallery() {
    _classCallCheck(this, ImgGallery);
  }

  _createClass(ImgGallery, null, [{
    key: "createImgGallery",
    value: function createImgGallery(pictures) {
      var _this = this;

      var imgCont = document.getElementById('imgGallery'); // Create Big img

      var bigImgCont = document.createElement('div');
      bigImgCont.classList.add('gallery-img');
      var bigImg = document.createElement('img');
      bigImg.id = 'bigImg';
      bigImg.src = pictures[0].photo;
      bigImgCont.appendChild(bigImg);
      imgCont.appendChild(bigImgCont); // create images for thumbs

      var thumbsBar = document.createElement('div');
      thumbsBar.id = 'thumbsBar';
      thumbsBar.className = 'gallery-bar';
      var thumbsLongBar = document.createElement('div');
      thumbsLongBar.id = 'thumbsLongBar';
      thumbsLongBar.className = 'gallery-bar-long';

      for (var thumb = 0; thumb < pictures.length; thumb++) {
        var Img = document.createElement('img');
        Img.src = pictures[thumb].thumbnail;
        Img.setAttribute("style", "margin-right:17px");
        thumbsLongBar.appendChild(Img);
        Img.addEventListener('click', function () {
          _this.changeImg(event, pictures);
        });
      }

      thumbsBar.appendChild(thumbsLongBar);
      imgCont.appendChild(thumbsBar);

      if (pictures.length > 8) {
        thumbsLongBar.setAttribute("style", "width:" + 120 * pictures.length + "px");
        this.createBarcontroles(pictures);
      }
    }
  }, {
    key: "changeImg",
    value: function changeImg(e, pictures) {
      var thumSrc = e.target.src;
      var imgSrc = pictures.find(function (el) {
        return el.thumbnail === thumSrc;
      }).photo;
      bigImg.src = "";
      bigImg.src = imgSrc;
    }
  }, {
    key: "createBarcontroles",
    value: function createBarcontroles(pictures) {
      var thumsBar = document.getElementById('thumbsBar');
      var thumbsLongBar = document.getElementById('thumbsLongBar');
      thumbsLongBar.style.left = 0;
      var goLeft = document.createElement('div');
      var goRight = document.createElement('div');
      var moveLift = 0;
      var thumbsWidth;
      thumbsWidth = pictures.length * 120;
      var variance = thumbsWidth - 1110;
      console.log(thumbsLongBar.style.left);
      goLeft.id = "goLeft";
      goLeft.className = "left";
      goLeft.classList.add('fas');
      goRight.id = "goRight";
      goRight.className = "right";
      goRight.classList.add('fas');

      if (pictures.length > 8) {
        thumsBar.appendChild(goLeft);
        thumsBar.appendChild(goRight); // What happen when you click the lift click

        goLeft.addEventListener('click', function () {
          var total = parseInt(thumbsLongBar.style.left) + variance;

          if (total >= 0) {
            moveLift = moveLift - 117;
            thumbsLongBar.style.left = moveLift + "px";
          }
        });
        goRight.addEventListener('click', function () {
          var total = parseInt(thumbsLongBar.style.left);

          if (total < 0) {
            moveLift = moveLift + 117;
            thumbsLongBar.style.left = moveLift + "px";
          }
        });
      }
    }
  }]);

  return ImgGallery;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  rendering all UI functions to the APP
var appUI =
/*#__PURE__*/
function () {
  function appUI() {
    _classCallCheck(this, appUI);
  }

  _createClass(appUI, null, [{
    key: "CheckIfData",
    // Passing json for Hotels and builing the UI for it
    value: function CheckIfData() {
      var _this = this;

      getData.fetchHotels(function (error, hotels) {
        if (error) {
          console.log(error);
        } else {
          _this.buildHotels(hotels);
        }
      });
    }
  }, {
    key: "buildHotels",
    value: function buildHotels(hotels) {
      var hotelContainer = document.getElementById('hotels');
      hotels.forEach(function (hotel) {
        var hotelTag = document.createElement('div');
        hotelTag.classList.add('hotels-card');
        hotelTag.classList.add('col');
        hotelTag.innerHTML = "\n                <h1 class=\"hotels-card-name\">".concat(hotel.name, "</h1>\n                <p class=\"hotels-card-review\">").concat(hotel.totalReviews, "</p>\n                <p class=\"hotels-card-score\">").concat(hotel.totalScore, "<sup>/10</sup></p>\n                <p class=\"hotels-card-price\">").concat(hotel.pricePerNight, "<sup>/$$</sup></p>\n                <span class=\"hotels-card-more\" data-id=\"").concat(hotel.id, "\" class=\"viewHotel\" onclick=\"appUI.getHotelID(event)\">View Details</span>\n                <img class=\"hotels-card-img\" src=\"").concat(hotel.photo, "\" alt=\"").concat(hotel.name, "\">\n            ");
        hotelContainer.append(hotelTag);
      });
    }
  }, {
    key: "getHotelID",
    value: function getHotelID(e) {
      var _this2 = this;

      e.preventDefault();
      var linkEl = e.target;
      var id = linkEl.dataset.id;

      (function (callback) {
        getData.fetchHotelInfo(id, function (error, HotelInfo) {
          if (!HotelInfo) {
            console.log(error);
            return;
          } else {
            _this2.bulidHotelInfo(HotelInfo);

            _this2.buildHotelReview(HotelInfo);
          }
        });
      })();
    }
  }, {
    key: "clickHotelInfo",
    value: function clickHotelInfo(id) {
      var myHotlInfo = getData.fetchHotelInfo(id);
      console.log(myHotlInfo);
    }
  }, {
    key: "bulidHotelInfo",
    value: function bulidHotelInfo(HotelInfo) {
      document.getElementById('imgGallery').innerHTML = "";
      ImgGallery.createImgGallery(HotelInfo.pictures);
    }
  }, {
    key: "buildHotelReview",
    value: function buildHotelReview(HotelInfo) {
      document.getElementById('reviews').innerHTML = "";
      Reviews.createReviews(HotelInfo.reviews);
    } //todo : Make prices / night :D

  }]);

  return appUI;
}(); // ** start building the Application


document.addEventListener('DOMContentLoaded', function (event) {
  appUI.CheckIfData();
});
var hotelLinks = document.querySelectorAll('.viewHotel');
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Reviews =
/*#__PURE__*/
function () {
  function Reviews() {
    _classCallCheck(this, Reviews);
  }

  _createClass(Reviews, null, [{
    key: "createReviews",
    value: function createReviews(reviews) {
      var ReviewsCont = document.getElementById('reviews');
      var reviewsEleCont = document.createElement('div');
      reviewsEleCont.id = 'reviewsEleCont';

      if (reviews.length < 5) {
        this.drawItem(reviews, ReviewsCont, reviewsEleCont);
      } else {
        this.drawPaging(reviews, ReviewsCont, reviewsEleCont);
      }
    } // creating the UI of the review Item

  }, {
    key: "drawItem",
    value: function drawItem(reviews, ReviewsCont, reviewsEleCont) {
      reviews.forEach(function (review) {
        var reviewEle = document.createElement('div');
        reviewEle.className = "reviews-item";
        reviewEle.innerHTML = "\n             <span>".concat(review.score, "</span>\n             <p>").concat(review.review, "</p>\n            ");
        reviewsEleCont.appendChild(reviewEle);
      });
      ReviewsCont.prepend(reviewsEleCont);
    } //creating functionalty for the paging

  }, {
    key: "drawPaging",
    value: function drawPaging(reviews, ReviewsCont, reviewsEleCont) {
      var _this = this;

      var reviewsCount = reviews.length;
      var numPerPage = 5;
      var pages = Math.ceil(reviewsCount / numPerPage);
      this.drawItem(reviews.slice(1, 5), ReviewsCont, reviewsEleCont);
      var pagingCont = document.createElement('div');
      pagingCont.className = "paging-container";

      var _loop = function _loop(i) {
        var pageBtn = document.createElement('span');
        pageBtn.className = "paging-btn";
        pageBtn.innerHTML = i;
        pagingCont.appendChild(pageBtn);
        pageBtn.addEventListener('click', function () {
          reviewsEleCont.innerHTML = "";
          var end = i * 5;
          var start = end - 5;
          var newArr = reviews.slice(start, end);

          _this.drawItem(newArr, ReviewsCont, reviewsEleCont);
        });
      };

      for (var i = 1; i <= pages; i++) {
        _loop(i);
      }

      ReviewsCont.appendChild(pagingCont);
    } // todo : create animation when loading the review ele

  }]);

  return Reviews;
}();
//# sourceMappingURL=app.js.map

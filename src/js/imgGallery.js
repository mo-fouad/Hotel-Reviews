class ImgGallery {

    static createImgGallery(pictures) {

        let imgCont = document.getElementById('imgGallery');

        // Create Big img
        let bigImgCont = document.createElement('div');
        bigImgCont.classList.add('gallery-img');

        let bigImg = document.createElement('img');
        bigImg.id = 'bigImg';
        bigImg.src = pictures[0].photo;
        bigImgCont.appendChild(bigImg);
        imgCont.appendChild(bigImgCont);


        // create images for thumbs
        let thumbsBar = document.createElement('div');
        thumbsBar.id = 'thumbsBar';
        thumbsBar.className = 'gallery-bar';

        let thumbsLongBar = document.createElement('div');
        thumbsLongBar.id = 'thumbsLongBar';
        thumbsLongBar.className = 'gallery-bar-long';

        for (let thumb = 0; thumb < pictures.length; thumb++) {
            let Img = document.createElement('img');
            Img.src = pictures[thumb].thumbnail;

            Img.setAttribute("style", "margin-right:17px");

            thumbsLongBar.appendChild(Img);

            Img.addEventListener('click', () => {
                this.changeImg(event, pictures);
            })
        }

        thumbsBar.appendChild(thumbsLongBar);
        imgCont.appendChild(thumbsBar);

        if (pictures.length > 8) {
            thumbsLongBar.setAttribute("style","width:" + 120 * pictures.length +"px");
            this.createBarcontroles(pictures);
        }
    }


    static changeImg(e, pictures) {
        let thumSrc = e.target.src;

        let imgSrc = pictures.find(el => {
            return el.thumbnail === thumSrc
        }).photo;

        bigImg.src = "";
        bigImg.src = imgSrc;
    }


    static createBarcontroles(pictures) {

        let thumsBar = document.getElementById('thumbsBar');
        let thumbsLongBar = document.getElementById('thumbsLongBar');
        thumbsLongBar.style.left = 0;

        let goLeft = document.createElement('div');
        let goRight = document.createElement('div');

        let moveLift = 0;
        let thumbsWidth;
        thumbsWidth = pictures.length * 120;

        let variance = thumbsWidth - 1110;

        console.log(thumbsLongBar.style.left);

        goLeft.id = "goLeft";
        goLeft.className = "left";
        goLeft.classList.add('fas');
        goRight.id = "goRight";
        goRight.className= "right";
        goRight.classList.add('fas');

        if (pictures.length > 8) {
            thumsBar.appendChild(goLeft);
            thumsBar.appendChild(goRight);


            // What happen when you click the lift click
            goLeft.addEventListener('click', () => {

                let total = parseInt( thumbsLongBar.style.left ) + variance;
                if (  total >= 0) {
                    moveLift = moveLift - 117;
                    thumbsLongBar.style.left = moveLift + "px";
                }
            });

            goRight.addEventListener('click', () => {
                let total = parseInt( thumbsLongBar.style.left );

                if (  total < 0) {
                    moveLift = moveLift +117;
                    thumbsLongBar.style.left = moveLift + "px";
                }
            });

        }

    };

    // todo : Make animation fadding image in & out;
    // todo : Adjust the bar for thumbs
}

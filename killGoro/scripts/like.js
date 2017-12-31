checkMaterial();

function checkMaterial() {
    console.log("KillGoro : checking if material youtube or not");
    var MATERIAL = !document.body.id;
    if (MATERIAL) {
        console.log("KillGoro : Material youtube");
        document.addEventListener("yt-page-data-updated", likeMaterialVideo);
    } else {
        likeClassicVideo();
        console.log("KillGoro : Classic youtube");
        window.addEventListener('spfdone', likeClassicVideo);
    }
}

function getChannelName() {

}


function likeClassicVideo() {
    console.log("KillGoro : Classic video like function");
    waitForClassicButtons(() => {
        console.log("KillGoro : The material like button has loaded");
    });
}

/**************************************Functions for material Youtube***************************************************************/
materialIconSvgData = {
    like: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z',
    dislike: 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z'
};

function waitForMaterialButtons(callback) {
    var likeButton = materialIconSvgData.like;
    var dislikeButton = materialIconSvgData.dislike;
    let iconLike = document.querySelector('#menu.ytd-video-primary-info-renderer g path[d="document.getElement(likeButton)"]');
    let iconDislike = document.querySelector('#menu.ytd-video-primary-info-renderer g path[d="${dislikeButton}"]');
    console.log("KillGoro : The status of like and dislike is " + iconLike + " " + iconDislike);
    if (iconLike && iconDislike) {
        this.btns.like = iconLike.closest('button');
        this.btns.dislike = iconDislike.closest('button');
        callback();
    } else {
        setTimeout(() => waitForMaterialButtons(callback), 1000);
    }
}

function reset() {
    console.log("KillGoro : Resetting buttons");
    btns = {};
}

function likeMaterialVideo() {
    reset();
    console.log("KillGoro : Material video like function");
    waitForMaterialButtons(() => {
        console.log("The material like button has loaded");
    });
}
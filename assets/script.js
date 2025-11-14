function aBB() {
    // Get the current URL.
    var bAA = window.location.href;

    // Check if the URL starts with https://aslanovic.xyz/.
    if (!bAA.includes("aslanovic.xyz")) {
        if (bAA.includes("localhost")) return
      // Delete all elements from the DOM.
    //   document.body.innerHTML = "";
    //   window.location.href = "https://aslanovic.xyz/";
    }
}

(function (window, document, undefined) {
    window.onload = init;

    function init() {
        // the code to be called when the dom has fully loaded!
        aBB();
        let lBB = document.getElementById("loader");
        let tLBB = document.getElementById("loadingtext");
        let pcBBA = document.getElementById("pagecontent");
        let cAAb = document.getElementById("card");
        let aPpA = document.getElementById("audio");

        // When user clicks on the first visible div!
        document.getElementById("loader").addEventListener("click", function () {
            tLBB.classList.add("animate__fadeOutUp")
        });


        // Executed when loadingtext (Click Anywhere) fade out animation is done!
        tLBB.addEventListener("animationend", function () {
            lBB.style.display = "none";
            pcBBA.style.display = "flex";
            cAAb.classList.add("animate__fadeInUp");
            aPpA.play()
        });

    }

})(window, document, undefined);

document.addEventListener('DOMContentLoaded', function () {
    const volumeButton = document.getElementById('volume-button');
    const audio = document.getElementById('audio');
    const volumeOnIcon = volumeButton.children[0];  // First SVG (volume on)
    const volumeOffIcon = volumeButton.children[1]; // Second SVG (volume off)
    let isPlaying = true;
    let fadeInterval = null;

    // Initially set audio to play and show volume on icon
    audio.volume = 1; // Set initial volume to maximum (1.0)
    audio.play();
    volumeOnIcon.style.display = 'block';
    volumeOffIcon.style.display = 'none';

    // Function to fade volume out
    function fadeOut() {
        clearInterval(fadeInterval); // Clear any existing interval
        fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume = Math.max(0, audio.volume - 0.05); // Decrease volume by 0.05
            } else {
                audio.volume = 0;
                audio.muted = true;
                clearInterval(fadeInterval);
                volumeOnIcon.style.display = 'none';
                volumeOffIcon.style.display = 'block';
            }
        }, 100);
    }

    // Function to fade volume in
    function fadeIn() {
        clearInterval(fadeInterval); // Clear any existing interval
        audio.muted = false;
        fadeInterval = setInterval(() => {
            if (audio.volume < 0.95) {
                audio.volume = Math.min(1, audio.volume + 0.05); // Increase volume by 0.05
            } else {
                audio.volume = 1;
                clearInterval(fadeInterval);
                volumeOnIcon.style.display = 'block';
                volumeOffIcon.style.display = 'none';
            }
        }, 120);
    }

    volumeButton.addEventListener('click', function () {
        if (isPlaying) {
            fadeOut();
        } else {
            fadeIn();
        }
        isPlaying = !isPlaying;
    });
});
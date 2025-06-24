function aBB() {
    // Get the current URL.
    var bAA = window.location.href;
  
    // Check if the URL starts with https://aslanovic.xyz/.
    if (!bAA.startsWith("https://aslanovic.xyz/")) {
      // Delete all elements from the DOM.
      document.body.innerHTML = "";
      window.location.href = "https://aslanovic.xyz/";
    }
  }
(function (window, document, undefined) {
    window.onload = init;
    function init() {
        // the code to be called when the dom has fully loaded!
      //  aBB();
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
        tLBB.addEventListener("animationend", function() {
            lBB.style.display = "none";
            pcBBA.style.display = "flex";
            cAAb.classList.add("animate__fadeInUp");
            aPpA.play()
        });

    }

})(window, document, undefined);
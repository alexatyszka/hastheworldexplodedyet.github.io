var clicks = 0;
document.querySelector(".globe").addEventListener("click", function () {
  if (++clicks < 3) return;
  var boom = this.querySelector(".explosion");
  boom.src = "/Explosion1.gif?" + Date.now();
  boom.hidden = false;
});

// Pull to refresh
var ptr = document.querySelector(".ptr");
var threshold = 80;

// Spin for a random 1-4 seconds before reloading
function refresh() {
  ptr.style.transform = "translateY(" + threshold + "px)";
  ptr.style.opacity = 1;
  ptr.classList.add("loading");
  setTimeout(function () {
    location.reload();
  }, 1000 + Math.random() * 3000);
}

document.querySelector(".refresh").addEventListener("click", refresh);

var startY = null;
var pull = 0;

document.addEventListener("touchstart", function (e) {
  if (ptr.classList.contains("loading")) return;
  startY = window.scrollY === 0 ? e.touches[0].clientY : null;
}, { passive: true });

document.addEventListener("touchmove", function (e) {
  if (startY === null) return;
  pull = Math.max(0, e.touches[0].clientY - startY) / 2;
  ptr.style.transition = "none";
  ptr.style.transform = "translateY(" + Math.min(pull, threshold) + "px)";
  ptr.style.opacity = Math.min(pull / threshold, 1);
  ptr.firstElementChild.style.transform = "rotate(" + pull * 4 + "deg)";
}, { passive: true });

document.addEventListener("touchend", function () {
  if (startY === null) return;
  startY = null;
  ptr.style.transition = "";
  if (pull >= threshold) {
    refresh();
  } else {
    ptr.style.transform = "";
    ptr.style.opacity = "";
  }
  pull = 0;
});

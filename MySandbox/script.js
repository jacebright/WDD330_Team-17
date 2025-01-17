
const hambutton = document.querySelector('.🍔');
const mainnav = document.querySelector('.navigation');

let flag = false;

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('responsive')}, false);


// To solve the mid resizing issue with responsive class [window.onresize]
window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      if (mainnav.classList.contains('responsive')) {
        mainnav.classList.remove('responsive');
        // Show the alert only once
        if (!alertShown) {
          window.alert('The responsive class has been removed.');
          alertShown = true; // Set the flag to true after showing the alert
        }
      }
    } else {
      alertShown = false; // Reset the flag when resizing below the threshold
    }
  });


  let content = document.querySelector("#countdown");
  let button = document.querySelector("#startButton");
  let startTime = 10;
  content.textContent = startTime;

button.addEventListener("click", () => {
  let timer = setInterval(() => {
    if (startTime >= 1){
      startTime--;
      content.textContent = startTime;
    } else {
      setTimeout(() => {
        clearInterval(timer);
        content.textContent = "Time is up!";}, startTime*1000 -1);
    }
  }, 1000);
  
  
});


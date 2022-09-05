// =============== Side menu ================
let myOpenMenu = document.querySelector(".side-menu");
let myCloseMenu = document.querySelector(".close-button");
let myMenu = document.querySelector(".side-menu-content");

myOpenMenu.onclick = function () {
  myMenu.classList.remove("close-menu");
  myMenu.classList.add("open-menu");
};

myCloseMenu.onclick = function () {
  myMenu.classList.remove("open-menu");
  myMenu.classList.add("close-menu");
};

let myNavElements = document.querySelectorAll("#nav li");
myNavElements.forEach((e) => {
  e.onclick = function () {
    myMenu.classList.remove("open-menu");
    myMenu.classList.add("close-menu");
  };
});
// End Side Menu

// Start Scroll to top Button
let myScrollTopBtn = document.querySelector(".scroll-top");
window.onscroll = function () {
  if (window.scrollY >= 500) {
    myScrollTopBtn.classList.add("active");
  } else {
    myScrollTopBtn.classList.remove("active");
  }
};

myScrollTopBtn.onclick = function () {
  window.scrollTo(0, 0);
};
// End Scroll to top Button

// =============== Slider ================
// images Array
let images = Array.from(document.querySelectorAll(".image"));
let myCurrentIndex = 0;
let leftButton = document.querySelector(".left-arrow");
let rightButton = document.querySelector(".right-arrow");
let sliderContainer = document.querySelector(".slider");

// Call Creating Indecators
createIndecators();
// Createing Indecators
function createIndecators() {
  let myUl = document.createElement("ul");
  myUl.className = "indicators";
  for (let i = 0; i < images.length; i++) {
    let myLi = document.createElement("li");
    myLi.setAttribute("data-index", i);
    myUl.appendChild(myLi);
  }
  sliderContainer.appendChild(myUl);
}

// Get Indeicators array
let IndecatorArr = Array.from(document.querySelectorAll(".indicators li"));

currentImage();

// Scrooling With Timer
setInterval(() => {
  if (myCurrentIndex < images.length - 1) {
    myCurrentIndex++;
    currentImage();
  } else {
    myCurrentIndex = 0;
    currentImage();
  }
}, 4000);

// Scrolling With Indecators
// When you Click on the indecators you will Change The Index on it
for (let i = 0; i < IndecatorArr.length; i++) {
  IndecatorArr[i].onclick = function () {
    myCurrentIndex = this.getAttribute("data-index");
    currentImage();
  };
}
// Scrolling Buttons
leftButton.onclick = back;
rightButton.onclick = next;

function next() {
  if (myCurrentIndex < images.length - 1) {
    myCurrentIndex++;
    currentImage();
    console.log("hi from next");
  }
}
function back() {
  if (myCurrentIndex > 0) {
    myCurrentIndex--;
    currentImage();
  }
}

function currentImage() {
  removeActive();
  // Add Active Class To The Current Image
  images[myCurrentIndex].classList.add("active");
  // Add Active Class To The Current Indecator
  IndecatorArr[myCurrentIndex].classList.add("active");
}

function removeActive() {
  // Remove active class from all Images
  images.forEach((e) => {
    e.classList.remove("active");
  });
  // Remove Active Class from All lis
  IndecatorArr.forEach((e) => {
    e.classList.remove("active");
  });
}

// End Of Slider

// Starting Swiper
const swiper = new Swiper(".slide-content", {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  loop: false,
  centerSlide: "true",
  grabCursor: "true",
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clikable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive slider
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

// getting The Data
let swiperContent = document.querySelector(".swiper-wrapper");

function addFilterResultToPage(val) {
  swiperContent.innerHTML = "";
  fetch("https://github.com/mustafa200kh/Real-Estate/blob/main/JS/houses.json")
    .then((reslut) => {
      let myData = reslut.json();
      // loop on fetched Data
      return myData;
    })
    .then((data) => {
      for (let j = 0; j < data.length; j++) {
        if (val === "all") {
          // creating The Card
          let card = document.createElement("div");
          card.className = "card";
          card.classList.add("swiper-slide");
          // Creating The Image
          let myImage = document.createElement("img");
          myImage.src = data[j].image;
          card.appendChild(myImage);
          // Creating Deatails Div
          let houseDetails = document.createElement("div");
          houseDetails.className = "details";
          // Create the Price
          let prSpan = document.createElement("span");
          prSpan.innerHTML = data[j].price;
          houseDetails.appendChild(prSpan);
          // Creating Rooms Div
          let rooms = document.createElement("div");
          rooms.className = "rooms";
          // Creating Rooms Content

          // Bed
          let bedSpan = document.createElement("span");
          bedSpan.className = "bed";
          let iBed = document.createElement("i");
          iBed.className = "fa-solid fa-bed";
          bedSpan.appendChild(iBed);
          bedSpan.appendChild(document.createTextNode(data[j].bed));

          // Bath
          let bathSpan = document.createElement("span");
          bathSpan.className = "bath";
          let iBath = document.createElement("i");
          iBath.className = "fa-solid fa-bath";
          bathSpan.appendChild(iBath);
          bathSpan.appendChild(document.createTextNode(data[j].bath));

          // Space
          let spaceSpan = document.createElement("span");
          spaceSpan.className = "space";
          let iSpace = document.createElement("i");
          iSpace.className = "fa-light fa-square";
          spaceSpan.appendChild(iSpace);
          spaceSpan.appendChild(document.createTextNode(data[j].space));
          // adding Rooms Content
          rooms.appendChild(bedSpan);
          rooms.appendChild(bathSpan);
          rooms.appendChild(spaceSpan);
          houseDetails.appendChild(rooms);

          // Creating Location Div
          let loc = document.createElement("div");
          loc.className = "location";
          let iLoc = document.createElement("i");
          iLoc.className = "fa-solid fa-location-dot";
          loc.appendChild(iLoc);
          // location span
          let locSpan = document.createElement("span");
          locSpan.innerHTML = data[j].location;
          loc.appendChild(locSpan);
          houseDetails.appendChild(loc);
          // Adding House Deatails TO The Card
          card.appendChild(houseDetails);
          swiperContent.appendChild(card);
        } else if (data[j].type === val) {
          // creating The Card
          let card = document.createElement("div");
          card.className = "card";
          card.classList.add("swiper-slide");
          // Creating The Image
          let myImage = document.createElement("img");
          myImage.src = data[j].image;
          card.appendChild(myImage);
          // Creating Deatails Div
          let houseDetails = document.createElement("div");
          houseDetails.className = "details";
          // Create the Price
          let prSpan = document.createElement("span");
          prSpan.innerHTML = data[j].price;
          houseDetails.appendChild(prSpan);
          // Creating Rooms Div
          let rooms = document.createElement("div");
          rooms.className = "rooms";
          // Creating Rooms Content

          // Bed
          let bedSpan = document.createElement("span");
          bedSpan.className = "bed";
          let iBed = document.createElement("i");
          iBed.className = "fa-solid fa-bed";
          bedSpan.appendChild(iBed);
          bedSpan.appendChild(document.createTextNode(data[j].bed));

          // Bath
          let bathSpan = document.createElement("span");
          bathSpan.className = "bath";
          let iBath = document.createElement("i");
          iBath.className = "fa-solid fa-bath";
          bathSpan.appendChild(iBath);
          bathSpan.appendChild(document.createTextNode(data[j].bath));

          // Space
          let spaceSpan = document.createElement("span");
          spaceSpan.className = "space";
          let iSpace = document.createElement("i");
          iSpace.className = "fa-light fa-square";
          spaceSpan.appendChild(iSpace);
          spaceSpan.appendChild(document.createTextNode(data[j].space));
          // adding Rooms Content
          rooms.appendChild(bedSpan);
          rooms.appendChild(bathSpan);
          rooms.appendChild(spaceSpan);
          houseDetails.appendChild(rooms);

          // Creating Location Div
          let loc = document.createElement("div");
          loc.className = "location";
          let iLoc = document.createElement("i");
          iLoc.className = "fa-solid fa-location-dot";
          loc.appendChild(iLoc);
          // location span
          let locSpan = document.createElement("span");
          locSpan.innerHTML = data[j].location;
          loc.appendChild(locSpan);
          houseDetails.appendChild(loc);
          // Adding House Deatails TO The Card
          card.appendChild(houseDetails);
          swiperContent.appendChild(card);
        }
      }
    });
}
// Fileteration By Nav Bar
let filnav = document.querySelectorAll(".filter-nav li");
filnav.forEach((e) => {
  e.onclick = function () {
    filnav.forEach((eOne) => {
      eOne.classList.remove("active");
    });
    addFilterResultToPage(e.getAttribute("data-type"));
    e.classList.add("active");
  };
});
window.onload = function () {
  addFilterResultToPage("all");
};
// End Swiper

// Subscribe Section
// let subs = document.querySelector(".subs");

// subs.onclick = function () {
//   let filed = document.querySelector("#email-s");
//   document.addEventListener("click");
// };

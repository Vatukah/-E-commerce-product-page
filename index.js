let Main = document.getElementById("main");
let cart = document.getElementById("cart");
let orders = document.getElementById("orders");
let yourOrder = document.getElementById("yourOrder");
let empty = document.getElementById("empty");
let addToCart = document.getElementById("addToCart");
let quantity = document.getElementById("quantity");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let rebateCost = document.getElementById("rebateCost").children[0].innerText;
let checkout = document.getElementById("checkout");
let indicator = document.getElementById("indicator");
let preview = document.getElementById("preview");
let lightPreview = document.getElementById("lightPreview");
let thumbnails = document.querySelectorAll(".thumbnail");
let lightB_close = document.getElementById("close");
let lightBox = document.getElementById("lightBox");
let lightThumbnail = document.querySelectorAll(".l_thumbnail");
let arrowLeft = document.getElementById("arrowLeft");
let arrowRight = document.getElementById("arrowRight");
let navClose=document.getElementById("navClose");
let nav=document.querySelectorAll("nav");
let burger=document.getElementById("burger");
let noOfProductInCart = 0;
//default check
thumbnails[0].style.border = "2px solid hsl(26, 100%, 55%)";
thumbnails[0].children[0].style.opacity = "0.4";
// show orders  on clicking cart
let click = true;
cart.onclick = () => {
  if (click) {
    orders.style.display = "block";
    click = false;
  } else {
    orders.style.display = "none";
    click = true;
  }
};

// add to cart functionallity
addToCart.onclick = function () {
  if (quantity.innerText != 0) {
    indicator.style.display = "flex";
    empty.style.display = "none";
    yourOrder.style.display = "block";
    checkout.style.display = "flex";

    var price = convertToInt(rebateCost);
    var total = parseInt(quantity.innerText) * price;
    //increment in no.of product
    noOfProductInCart += parseInt(quantity.innerText);
    indicator.innerText = noOfProductInCart;

    var html = `<div class="order" data-quantity=${quantity.innerText}>
                <img src="images/image-product-1-thumbnail.jpg" alt="thumbnail" />
                <div>
                <p> Fall Limited Edition Sneakers</p>
                <p>$${price.toFixed(2)} x ${
      quantity.innerText
    } <span class="total">$${total.toFixed(2)}</p>
                </div>
                <img src="images/icon-delete.svg" alt="delete" class="delete" />

       </div>`;
    yourOrder.insertAdjacentHTML("beforeend", html);
    //addding event and functionality to js create img element(delete icon)
    let Delet = document.querySelectorAll(".delete");
    Delet.forEach((element, item) => {
      Delet[item].onclick = () => {
        removeProduct(element);
        if (noOfProductInCart === 0) {
          indicator.style.display = "none";
          checkout.style.display = "none";
          empty.style.display = "flex";
          yourOrder.style.display = "none";
        }
      };
    });
  } else {
  }
};

//extracting and convert number from rebateCost string (price of product)
function convertToInt(str) {
  let temp;
  var reg = /\d+\.\d+$/;
  str = reg.exec(str);
  temp = parseFloat(str[0]);
  return temp;
}
//increament and decreament in quantity

plus.onclick = () => {
  var val = parseInt(quantity.innerText);
  val++;
  quantity.innerText = val;
};
minus.onclick = () => {
  var val = parseInt(quantity.innerText);
  if (val === 0) val = 0;
  else val--;

  quantity.innerText = val;
};
//remove product from the cart functionality

function removeProduct(element) {
  var tempVar = parseInt(element.parentElement.getAttribute("data-quantity"));
  noOfProductInCart = noOfProductInCart - tempVar;
  indicator.innerText = noOfProductInCart;
  yourOrder.removeChild(element.parentElement);
}

//thumbnail's event
let thumbArr = Array.from(thumbnails);
let srcArr = [
  {
    src: "images/image-product-1.jpg",
    alt: "pic1",
  },
  {
    src: "images/image-product-2.jpg",
    alt: "pic2",
  },
  {
    src: "images/image-product-3.jpg",
    alt: "pic3",
  },
  {
    src: "images/image-product-4.jpg",
    alt: "pic4",
  },
];
thumbnails.forEach((element, item) => {
  thumbnails[item].addEventListener("click", (e) => {
    e.preventDefault();
    //carousal indicator
    for (const iterator of thumbArr) {
      if (element === iterator) {
        iterator.style.border = "2px solid hsl(26, 100%, 55%)";
        iterator.children[0].style.opacity = "0.4";
        preview.children[0].src = srcArr[item].src;
        preview.children[0].setAttribute("alt", srcArr[item].alt);
      } else {
        iterator.style.border = "none";
        iterator.children[0].style.opacity = "1";
      }
    }
  });
});

//displaying and disapearing of lightbox element

lightB_close.onclick = () => {
  lightBox.style.display = "none";
};
preview.addEventListener("click", (e) => {
  lightBox.style.display = "flex";
  lightPreview.children[0].src = e.target.src;
  lightPreview.children[0].setAttribute(
    "alt",
    preview.children[0].getAttribute("alt")
  );
  //carousal indicator
  for (const iterator of l_thumbArr) {
    if (
      preview.children[0].getAttribute("alt") ===
      iterator.children[0].getAttribute("alt")
    ) {
      iterator.style.border = "2px solid hsl(26, 100%, 55%)";
      iterator.children[0].style.opacity = "0.4";
    } else {
      iterator.style.border = "none";
      iterator.children[0].style.opacity = "1";
    }
  }
});

let l_thumbArr = Array.from(lightThumbnail);
lightThumbnail.forEach((element, item) => {
  lightThumbnail[item].addEventListener("click", (e) => {
    e.preventDefault();
    //carousal indicator
    for (const iterator of l_thumbArr) {
      if (element === iterator) {
        iterator.style.border = "2px solid hsl(26, 100%, 55%)";
        iterator.children[0].style.opacity = "0.4";
        lightPreview.children[0].src = srcArr[item].src;
        lightPreview.children[0].setAttribute("alt", srcArr[item].alt);
      } else {
        iterator.style.border = "none";
        iterator.children[0].style.opacity = "1";
      }
    }
  });
});
//carousal of lightbox
var index;
arrowRight.onclick = () => {
  index = srcArr.findIndex(find);

  lightPreview.children[0].src = srcArr[index + 1 ].src;
  lightPreview.children[0].setAttribute("alt", srcArr[index + 1 ].alt);
  //carousal indicator
  for (const iterator of l_thumbArr) {
    if (
      lightPreview.children[0].getAttribute("alt") ===
      iterator.children[0].getAttribute("alt")
    ) {
      iterator.style.border = "2px solid hsl(26, 100%, 55%)";
      iterator.children[0].style.opacity = "0.4";
    } else {
      iterator.style.border = "none";
      iterator.children[0].style.opacity = "1";
    }
  }
};
arrowLeft.onclick = () => {
  index = srcArr.findIndex(find);

  lightPreview.children[0].src = srcArr[index - 1].src;
  lightPreview.children[0].setAttribute("alt", srcArr[index - 1].alt);
  //carousal indicator
  for (const iterator of l_thumbArr) {
    if (
      lightPreview.children[0].getAttribute("alt") ===
      iterator.children[0].getAttribute("alt")
    ) {
      iterator.style.border = "2px solid hsl(26, 100%, 55%)";
      iterator.children[0].style.opacity = "0.4";
    } else {
      iterator.style.border = "none";
      iterator.children[0].style.opacity = "1";
    }
  }
};
function find(obj) {
  var string = lightPreview.children[0].getAttribute("alt");
  if (obj.alt === string) return obj;
}

//nav close functionality (for mobile viewPort)

navClose.onclick=()=>{
   nav[0].style.left="-999px";
}

//burrger button

burger.onclick=()=>{
  nav[0].style.left="0px";
}
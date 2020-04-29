// TYPEWRITER EFFECT SCRIPTS.

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; border-color:  #4a90e2;}";
    document.body.appendChild(css);
    
};

// SHOPPING CART SCRIPTS

console.log("running");

let addToCart = document.querySelectorAll('#addToCart');
let courses = [
    {
        name    : 'Become a Full Stack Web Developer ',
        tag     : 'webdeveloper',
        price   : 26000,
        inCart  : 0
    },
    {
        name    : 'Become a Front End Web Developer ',
        tag     : 'frontend-dev',
        price   : 9000,
        inCart  : 0
    },
    {
        name    : 'Become a Java Spring Boot Developer',
        tag     : 'spring-boot-dev',
        price   : 16000,
        inCart  : 0
    },
];


   // looping through the array of nodeList since querySelector all returns an array of all the instances where that selector is found.
for ( let i =0; i < addToCart.length; i++){
    addToCart[i].addEventListener('click', ($event)=>{
        $event.preventDefault();
        console.log('Button clicked')
        cartNumbers(courses[i]);
        totalCost(courses[i]);
    })
}

// Created A function that will look at the local storage numbers and set the number on the basket icon to be exactly as the number in the local storage- in order to keep the number from disappearing when the page is refreshed.
function cartNumberOnLoad(){
    let courseNumbers = localStorage.getItem('cartNumbers');//we are accessing the local storage and grabbing the contents.
    if(courseNumbers){
        document.querySelector('.basket span').textContent = courseNumbers;
    }
}

//Writing a function that will set localStorage numbers to the total number of times the buttons with eventListener are clicked.
function cartNumbers(course){
    let courseNumbers = localStorage.getItem('cartNumbers');//we are accessing the local storage and grabbing the contents.
    courseNumbers = parseInt(courseNumbers); //Numbers from the localStorage come as strings so we have to convert them to integers hence the parseInt;  
    if(!courseNumbers){
     localStorage.setItem('cartNumbers', 1);
     document.querySelector('.basket span').textContent =1;
    } else{
     localStorage.setItem('cartNumbers', courseNumbers+ 1);
     document.querySelector('.basket span').textContent = courseNumbers+ 1;
    }
    setItems(course);
}



function setItems (course){
    let cartItems = localStorage.getItem('coursesInCart');
    cartItems = JSON.parse(cartItems);
     
    if (cartItems != null){ 
        if(cartItems[course.tag] == undefined){
            cartItems = {
                ...cartItems,
                [course.tag]: course
            }
        }
        cartItems[course.tag].inCart += 1; 
    }else{
        course.inCart =1;
        cartItems ={
            [course.tag]: course
        }
    } 
    localStorage.setItem("coursesInCart", JSON.stringify(cartItems));
    console.log('my cart items are', cartItems);
};

 // creating a function that will calc the total cost of the products/ courses inside the cart

 function totalCost(course){
    // console.log("The course price is ", course.price);
    let cartCost = localStorage.getItem("totalCost");
    
    console.log("my cartCost is", cartCost );
    console.log(typeof cartCost);
    
    if(cartCost != null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + course.price);
    }else {
        localStorage.setItem("totalCost", course.price );
    }
}

// This function will look at our local storage, grab the coursesInCart and then dynamically create a div in the cart.html, inside the course-plug-in section, where it will populate the space with the contents of the coursesInCart var.  

function displayCart (){
    let cartItems = localStorage.getItem('coursesInCart');
    cartItems = JSON.parse(cartItems);
    console.log("the display cart items are",cartItems);
    let courseContainer = document.querySelector('.course-plug-in');
    let cartCost = localStorage.getItem("totalCost");

    if(cartItems && courseContainer ){
        console.log('running');
        courseContainer.innerHTML = "";// we're making this container empty if there was anything in there when we load the page the first time.
        Object.values(cartItems).map( item =>{ //we'll use back-ticks to inject variables inside the strings.
            courseContainer.innerHTML += `
            </div class = "product ">
                <div class="cart-layouts">
                    <div class="tag-name">
                        <span><a href="#" id=""><img src="./img/icons8-delete.svg" alt="" class="delete-icon"></a></span>
                        <span><img src="./img/${item.tag}.png" class="dynamic-img"></span>
                        <span class="name-span"> ${item.name}</span>
                    </div>
                    <div class="price">
                        <span > R ${item.price}</span>
                    </div>
                    <div class="quantity">
                        <span><a href="#" id=""><img class="arrow-low" src="https://img.icons8.com/flat_round/64/000000/arrow-left.png"/></a></span>
                        <span class="">${item.inCart}</span>
                        <span ><a href="#" id=""><img class="arrow-up" src="https://img.icons8.com/flat_round/64/000000/arrow-right.png"/></a></span>
                    </div>
                    <div class="total"> R ${item.inCart * item.price},00 </div>
                </div>
            </div>
            `
        });

        courseContainer.innerHTML += `
        <div class="basketTotalContainer justify-content-end  ">
            <h4 class="basketTotalTitle"> Cart Total </h4>
            <span class="basketTotal"> R ${cartCost}</span>
        </div>
        `
        
    }
};

// // this function is not called above sp we call it here at the bottom, otherwise nothing will be executed when the page is refreshed on loaded.
cartNumberOnLoad();
displayCart();
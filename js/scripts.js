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

const addToInquiry = document.querySelectorAll("#add-to-inquiry");

let courses = [
    {
        name    : 'Become a Full Stack Web Developer ',
        tag     : 'Full Stack Web Development',
        price   : '26000',
        inCart  : 0
    },
    {
        name    : 'Become a Front End Web Developer ',
        tag     : 'Front End Web Development',
        price   : '9000',
        inCart  : 0
    },
    {
        name    : 'Become a Java Spring Boot Developer',
        tag     : 'Java Spring Boot Development',
        price   : '16000',
        inCart  : 0
    },
];

// adding a click event listener to all the add-to-inquiry buttons.

for (let i =0; i<addToInquiry.length; i++){
    addToInquiry[i].addEventListener('click', ($event)=>{
        $event.preventDefault();
        cartNumbers(courses[i]);
        // totalCost(courses[i]);
    })
};
// A function that will look at the local storage numbers and sat the number on the basket icon to be exactly as the number in the local storage- in order to keep the number from disappearing when the page is refreshed
function onloadCartNumbers (){
    let courseNumbers = localStorage.getItem('cartNumbers');
    
    if(courseNumbers){
        document.querySelector('.basket-value').textContent = courseNumbers;
    }
};

// A FUNCTION that will count the number of products added to the cart and update the number on the basket icon.

function cartNumbers (course){
    let courseNumbers = localStorage.getItem('cartNumbers');
    courseNumbers = parseInt(courseNumbers);
    if (courseNumbers) {
        localStorage.setItem('cartNumbers', courseNumbers + 1);
        document.querySelector('.basket-value').textContent = courseNumbers+ 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.basket-value').textContent = 1;
    }
    setItems(course);
};


function setItems (course){
    let cartItems = localStorage.getItem('coursesInCart');
    cartItems = JSON.parse(cartItems);
    console.log('my cart items are', cartItems);
    if (cartItems != null){
        
        if(cartItems[course.tag] == undefined){
            cartItems = {
                ...cartItems,
                [course.tag]: course
            }
        }
        cartItems[course.tag].inCart += 1; 
    }else {
        course.inCart =1;
        cartItems ={
            [course.tag]: course
        }
    } 
    localStorage.setItem("coursesInCart", JSON.stringify(cartItems));
};

// calling the onload function so that it runs.
onloadCartNumbers ();
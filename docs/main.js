// ? GETS THE CSS
let stylesheet = document.styleSheets[0];
// ? GETS A LIST OF ALL THE ELEMENTS THAT NEED PARALLAX ADDED TO THEM
let elements = document.querySelectorAll('.parallax');

// ! CHANGE HOW BIG THE PARALLAX GETS (BIGGER = MORE SUBTLE)
let coeficient = 3;

// ? SETTING UP BASIC CSS STYLING FOR THE PARALLAX CONTAINER
stylesheet.insertRule('.parallax {position: relative;overflow: hidden;}', 0);
// ? SETTING UP BASIC CSS STYLING FOR FITTING IMAGES TO CONTAINER SIZE
stylesheet.insertRule('.parallax img {object-fit: cover;width: 100%;position: absolute;top: 50%;transform: translateY(-50%);}', 0);
// ? CREATING A PSEUDO ELEMENT WITH UNIQUE STYLING FOR EVERY ELEMENT THAT NEED PARALLAX ADDED TO IT 
for (i=0;i<elements.length;i++) {
    elements[i].id = `id${i}`;
    stylesheet.insertRule(`.parallax#id${i}::before {content:'';width:100%;height:10px;background-color:black;position:absolute;z-index:9;}`, 0);
    stylesheet.insertRule(`.parallax#id${i}::after {content:'';width:100%;height:10px;background-color:black;position:absolute;bottom:0;left:0;z-index:9;}`, 0);
}

// ! MAIN BRAIN OF THE OPERATION
// ? 
// ? For every html element that needs parallax I am first finding it's appropriate CSS RULE
// ? and updating the height of its pseudo elements depending on where the element is located on the screen
// ? 
// ? Interesting properties are element.getBoundingClientRect(), element.offsetHeight and window.innerHeight
let updateParallax = () => {
    let currentBeforeRule;
    let currentAfterRule;
    for (i=0;i<elements.length;i++) {
        for (rule of stylesheet.cssRules) {
            if (rule.selectorText == `.parallax#id${i}::before`) currentBeforeRule = rule;
            if (rule.selectorText == `.parallax#id${i}::after`) currentAfterRule = rule;
        }
        let distanceFromTop = elements[i].getBoundingClientRect().y;
        let windowHeight = window.innerHeight;
        let distanceFromBottom = windowHeight - (distanceFromTop + elements[i].offsetHeight);
        if (distanceFromTop>0 && distanceFromTop<windowHeight) currentBeforeRule.style.height = `${distanceFromTop / coeficient}px`;
        if (distanceFromBottom>0 && distanceFromBottom<windowHeight) currentAfterRule.style.height = `${distanceFromBottom / coeficient}px`;
    }
}

// ? UPDATING ALL THE POSITIONS WHEN THE USER SCROLLS
window.addEventListener('scroll', () => {
    updateParallax();
});

// ? CALLING THE FUNCTION ONCE AT START
updateParallax();
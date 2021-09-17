let stylesheet = document.styleSheets[0];
let paraCSS;
let paraBeforeCSS;
let paraAfterCSS;

for (item of stylesheet.rules) {
    if (item.selectorText == '.para') paraCSS = item;
    if (item.selectorText == '.para::before') paraBeforeCSS = item;
}

console.log(document.querySelector('.para').getBoundingClientRect().y);
console.log(window.innerHeight);
console.log(document.querySelector('.para').offsetHeight);
console.log(window.innerHeight + document.querySelector('.para').getBoundingClientRect().y);

window.addEventListener('scroll', () => {
    paraBeforeCSS.style.height = `${(document.querySelector('.para').offsetHeight - document.querySelector('.para').getBoundingClientRect().y) / 2}px`;
});
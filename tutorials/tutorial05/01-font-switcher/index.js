let currentsize = 1.4
const setFont =() => {
   document.querySelector("div.content").style.fontSize = `${currentsize}em`;
   document.querySelector("h1").style.fontSize = `${currentsize+0.4}em`;

}

const makeBigger = () => {
   //alert('make bigger!');
   currentsize += 0.2
   setFont();
};

const makeSmaller = () => {
   //alert('make smaller!');
   currentsize -= 0.2
   setFont();
};


document.querySelector('#a1').addEventListener('click', makeBigger);
document.querySelector('#a2').addEventListener('click', makeSmaller);


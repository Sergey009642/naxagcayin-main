let sliderImg = document.getElementById("sliderImg")
let btns = document.querySelectorAll('.btn')

let sliderImges = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg",
    "img/img6.jpg",
]

let sliderNumber = 3
sliderImg.src = sliderImges[sliderNumber]

btns[0].addEventListener('click',()=>{
    if (sliderNumber>0) {
        sliderNumber--
    }else{
        sliderNumber=sliderImges.length-1
    }
    sliderImg.src=sliderImges[sliderNumber]
})
btns[1].addEventListener('click',()=>{
    if (sliderNumber<3) {
        sliderNumber++
    }else{
        sliderNumber=sliderImges.length-4
    }
    sliderImg.src=sliderImges[sliderNumber]

})
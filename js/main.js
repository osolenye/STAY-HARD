// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
   slides[i].style.opacity = 1
   slides[i].classList.add('active_slide')
  setBGImage(slides[i]);
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > slides.length - 1) {
            i = 0
        }
        hideSlide()
        showSlide(i)
    }, 10000)
}

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

autoSlider(index)


function setBGImage(slide) {
  let sliderForImage = document.querySelector('.slider');
  var slideName = slide.querySelector('#slideName');
  var name = slideName.textContent;
  if (name === "Ronnie Coleman") {
//    sliderForImage.style.backgroundImage = 'url("https://img.mensxp.com/media/content/2018/Dec/the-king-ronnie-colemans-2018-documentary-is-quite-painful-to-watch-amp-yet-its-inspiring-740x500-1-1545125574.jpg")';
    sliderForImage.style.backgroundImage = 'url("https://www.bodybuilding.com/images/2016/october/ronnie-coleman-fitness-360-return-of-ronnie-header-960x540.jpg")';
  } else if (name === "David Goggins") {
//    sliderForImage.style.backgroundImage = 'url("https://i.redd.it/egenc13n74lb1.jpg")';
    sliderForImage.style.backgroundImage = 'url("https://os.me/wp-content/uploads/2023/01/6278141-scaled.jpg.optimal.jpg")';
  } else if (name === "Mike Mentzer") {
//    sliderForImage.style.backgroundImage = 'url("https://www.ironmanmagazine.com/wp-content/uploads/Mike-Mentzers-Heavy-Duty-Workout-and-Diet-Plan.png")';
    sliderForImage.style.backgroundImage = 'url("https://www.muscleandfitness.com/wp-content/uploads/2015/04/mike-mentzer-dumbbell-chest-press0.jpg?quality=86&strip=all")';
  } else if (name === "Lex Fridman") {
//    sliderForImage.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDx2PSKXWtAVA047IUWsfcywZK6iJOHMA7zg&usqp=CAU")';
    sliderForImage.style.backgroundImage = 'url("https://viemagazine.com/wp-content/uploads/2023/09/vie-magazine-le-monde-lex-fridman-hero-min.jpg")';
  }
}

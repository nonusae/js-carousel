// Initialize
const track = document.querySelector('.jsTrack')
const slides = Array.from(track.children)
const slideWidth = slides[0].getBoundingClientRect().width
const dotContainer = document.querySelector('.jsDotContainer')
const nextButton = document.querySelector('.jsNext');
const previousButton = document.querySelector('.jsPrevious');


slides.forEach((slide,index) => {
  slide.style.left = (slideWidth * index) + 'px'
})

// next button

nextButton.addEventListener('click', e => {
  previousButton.classList.remove('is-hidden');

  let currentSlide

  for(slide of slides) {
    if (slide.classList.contains('is-selected')){
      currentSlide = slide
    }
  }
  const nextSlide = currentSlide.nextElementSibling
  const amountToMove = nextSlide.style.left;
  track.style.left = '-' + amountToMove
  currentSlide.classList.remove('is-selected')
  nextSlide.classList.add('is-selected')

  const isFinalSlide = !nextSlide.nextElementSibling;
  if (isFinalSlide){
    nextButton.classList.add('is-hidden')
  }

  const currentDot = dotContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling

  currentDot.classList.remove('is-selected')
  nextDot.classList.add('is-selected')

})


// previous button
previousButton.addEventListener('click', e => {
  nextButton.classList.remove('is-hidden')

  let currentSlide

  for(let slide of slides ) {
    if (slide.classList.contains('is-selected')){
      currentSlide = slide
    }
  }

  const previousSlide = currentSlide.previousElementSibling
  const amountToMove = previousSlide.style.left
  track.style.left = '-' + amountToMove

  currentSlide.classList.remove('is-selected')
  previousSlide.classList.add('is-selected')

  const currentDot = dotContainer.querySelector('.is-selected');
  const previousDot = currentDot.previousElementSibling;

  currentDot.classList.remove('is-selected');
  previousDot.classList.add('is-selected');

  const isFirstSlide = !previousSlide.previousElementSibling

  if (isFirstSlide) {
    previousButton.classList.add('is-hidden')
  }

  })


// Dots
dotContainer.addEventListener('click', e => {
  if (!e.target.matches('button')) return

  let currentSlide

  for(let slide of slides ) {
    if (slide.classList.contains('is-selected')){
      currentSlide = slide
    }
  }
// Find index of clicked dot
  const clickedDot = e.target
  dots = dotContainer.children
  let targetIndex

  for(let index=0; index < dots.length; index ++ ){
    if (dots[index] === clickedDot){
      targetIndex = index
    }
  }

// Update slide to targetIndex
  const targetSlide = slides[targetIndex]
  const amountToMove = targetSlide.style.left;
  currentSlide.classList.remove('is-selected')
  targetSlide.classList.add('is-selected')
  track.style.left = '-' + amountToMove

// Update Dot
  const currentDot = dotContainer.querySelector('.is-selected');
  currentDot.classList.remove('is-selected');
  clickedDot.classList.add('is-selected');

// Update arrow
  const isFinalDotClicked = ( targetIndex === slides.length - 1 )
  const isFirstDotClicked = ( targetIndex === 0 )

  if (isFinalDotClicked) {
    nextButton.classList.add('is-hidden')
    previousButton.classList.remove('is-hidden')
  }else if (isFirstDotClicked){
    previousButton.classList.add('is-hidden')
    nextButton.classList.remove('is-hidden')
  }else{
    nextButton.classList.remove('is-hidden')
    previousButton.classList.remove('is-hidden')
  }
})
// Initialize
const track = document.querySelector('.jsTrack')
const slides = [...track.children]
const slideWidth = slides[0].getBoundingClientRect().width
const dotContainer = document.querySelector('.jsDotContainer')
const dots = [...dotContainer.children]
const nextButton = document.querySelector('.jsNext');
const previousButton = document.querySelector('.jsPrevious');

slides.forEach((slide,index) => {
  slide.style.left = (slideWidth * index) + 'px'
})

const updateSlides = (track,currentIndex,targetIndex) => {
  const currentSlide = slides[currentIndex]
  const targetSlide = slides[targetIndex]
  // track.style.left = '-' + targetSlide.style.left;
  const amountToMove = targetSlide.style.left;
  track.style.transform = `translateX(-${amountToMove})`;
  currentSlide.classList.remove('is-selected')
  targetSlide.classList.add('is-selected')
}

const updateDots = (currentIndex,targetIndex) => {
  dots[currentIndex].classList.remove('is-selected');
  dots[targetIndex].classList.add('is-selected');
}

const updateArrows = targetIndex => {
  if (targetIndex === slides.length - 1) {
    nextButton.classList.add('is-hidden');
    previousButton.classList.remove('is-hidden');
  } else if ( targetIndex === 0 ) {
    previousButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else {
    nextButton.classList.remove('is-hidden');
    previousButton.classList.remove('is-hidden');
  }
}

const getCurrentIndex = slides => {
  for(let index = 0 ; index < dots.length ; index++ ) {
    const slide = slides[index]
    if (slide.classList.contains('is-selected')){
      return index
    }
  }
}

// Call back for button
nextSlide = e => {
  const currentIndex = getCurrentIndex(slides);
  const nextIndex = currentIndex + 1;

  updateSlides(track, currentIndex, nextIndex);
  updateArrows(nextIndex);
  updateDots(currentIndex, nextIndex);
}

previousSlide = e => {
  const currentIndex = getCurrentIndex(slides);
  const previousIndex = currentIndex - 1;

  updateSlides(track, currentIndex, previousIndex);
  updateArrows(previousIndex);
  updateDots(currentIndex, previousIndex);
}

setSlide = e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentIndex = getCurrentIndex(slides);
  const clickedDot = e.target;
  let targetIndex;

  targetIndex = dots.findIndex(dot => dot === targetDot )

  updateDots(currentIndex, targetIndex);
  updateSlides(track, currentIndex, targetIndex);
  updateArrows(targetIndex);
}

// EventListener
nextButton.addEventListener('click',nextSlide)
previousButton.addEventListener('click', previousSlide )
dotContainer.addEventListener('click', setSlide )
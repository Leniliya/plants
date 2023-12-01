console.log(`Баллы 85/85
1. Вёрстка соответствует макету. Ширина экрана 768px +24
- блок <header> +2
- секция welcome +3
- секция about +4
- секция service +4
- секция prices +4
- секция contacts +4
- блок <footer> + 3
2. Вёрстка соответствует макету. Ширина экрана 380px +24
- блок <header> +2
- секция welcome +3
- секция about +4
- секция service +4
- секция prices +4
- секция contacts +4
- блок <footer> + 3
3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
- нет полосы прокрутки при ширине страницы от 1440рх до 380px +7
- нет полосы прокрутки при ширине страницы от 380px до 320рх +8
4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22
- при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2
- при нажатии на бургер-иконку плавно появляется адаптивное меню +4
- адаптивное меню соответствует цветовой схеме макета +4
- при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4
- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4`)

const burgerOpenButton = document.querySelector('.burger-icon');
const burgerCloseButton = document.querySelector('.burger-menu__cross');
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuContent = document.querySelector('.burger-menu__content');
const body = document.querySelector('body');

function toggleBurgerMenu() {
  burgerMenu.classList.toggle('hidden')
  burgerMenuContent.classList.toggle('shifted')
  body.classList.toggle('lock')
}

burgerOpenButton.addEventListener('click', () => {
  toggleBurgerMenu()
})

burgerCloseButton.addEventListener('click', () => {
  toggleBurgerMenu()
})

burgerMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('burger-menu') || event.target.classList.contains('navigation__link')) {
    toggleBurgerMenu()
  }
})



// Service
const buttonsContainer = document.querySelector('.service__buttons-container');
const serviceButton = document.querySelectorAll('.service__buttons-container .button');
const serviceCards = document.querySelectorAll('.service-card');

addButtonsClickHandler()

function blockThirdButton() {
  for (let button of serviceButton) {
    if (!button.classList.contains('button-active')) {
      button.classList.add('button-blocked')
    }
  }
}

function unblockThirdButton() {
  for (let button of serviceButton) {
    if (button.classList.contains('button-blocked')) {
      button.classList.remove('button-blocked')
    }
  }
}

function addButtonsClickHandler() {
  buttonsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
      switch (numberOfActiveButtons()) {
        case 0:
          e.target.classList.add('button-active');
          blurAllService();
          showTargetService(e.target);
          break;
        case 1:
          if (e.target.classList.contains('button-active')) {
            e.target.classList.remove('button-active');
            showAllService(e.target);
          } else {
            e.target.classList.add('button-active');
            blockThirdButton();
            showTargetService(e.target);
          }
          break;
        case 2:
          if (e.target.classList.contains('button-active')) {
            e.target.classList.remove('button-active');
            unblockThirdButton();
            blurTargetService(e.target);
          }
          break;
        default:
          console.log('Error');
          return
      }
    }
  })
}

function numberOfActiveButtons() {
  let number = 0;
  for (let button of serviceButton) {
    if (button.classList.contains('button-active')) {
      number++
    }
  }
  return number;
}

function blurAllService() {
  for (let card of serviceCards) {
    card.classList.add('blured')
  }
}

function showAllService() {
  for (let card of serviceCards) {
    card.classList.remove('blured')
  }
}

function showTargetService(target) {
  let tag = target.textContent.toLowerCase();
  for (let card of serviceCards) {
    if (card.classList.contains(`${tag}`)) {
      card.classList.remove('blured')
    }
  }
}

function blurTargetService(target) {
  let tag = target.textContent.toLowerCase();
  for (let card of serviceCards) {
    if (card.classList.contains(`${tag}`)) {
      card.classList.add('blured')
    }
  }
}


//accordion

const accordionContainer = document.querySelector('.accordion-wrapper');
const accordions = document.querySelectorAll('.accordion');

accordionClickHandler();

function accordionClickHandler() {
  accordionContainer.addEventListener('click', (e) => {
    if (e.target.closest('.accordion__header')) {
      closeOtherAccordion(e.target.closest('.accordion__header'));
      toggleAccordion(e.target.closest('.accordion__header'))
    }
  })
}

function toggleAccordion(accHeader) {
  accHeader.parentNode.classList.toggle('open-accordion');
  accHeader.nextElementSibling.classList.toggle('open-accordion');
}

function closeOtherAccordion(accHeader) {
  for (let acc of accordions) {
    if (acc.classList.contains('open-accordion') && accHeader.parentNode !== acc) {
      acc.classList.remove('open-accordion');
      acc.childNodes[3].classList.remove('open-accordion');
    }
  }
}


//select

const select = document.querySelector('.select-wrapper');

selectClickHandler()

function selectClickHandler() {
  select.addEventListener('click', (e) => {
    if (e.target.closest('.select')) {
      e.target.closest('.select').parentNode.classList.toggle('open-select');
      e.target.closest('.select').nextElementSibling.classList.toggle('open-select');
    }
  })
}

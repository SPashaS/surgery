// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuClose, bodyUnlock } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

const header = document.querySelector('.header');

header.addEventListener('click', function (e) {
  let target = e.target;

  let menuItem = target.classList.contains('menu-item__item-title');
  let menuItemOpen = target.closest('.submenu-open');
  if (menuItem && !menuItemOpen) {
    closeOpenSubMenu();
    target.closest('.menu-item').classList.add('submenu-open');
  } else if (menuItem && menuItemOpen) {
    target.closest('.menu-item').classList.remove('submenu-open');
  }
});
export function closeOpenSubMenu() {
  let submenuOpen = document.querySelector('.submenu-open');
  if (submenuOpen) {
    submenuOpen.classList.remove('submenu-open');
  }
}

const kindsBody = document.querySelector('.kinds__body');
const btnKindsMore = document.querySelector('#kinds-more');
if (btnKindsMore) {
  let kindsList = document.querySelector('.kinds__list');
  btnKindsMore.addEventListener('click', (e) => {
    kindsBody.classList.toggle('_show');
    kindsList.classList.toggle('_hidden');
  });
}

const wrapper = document.querySelector('.wrapper');
let preload = document.createElement('div');
preload.className =  'preload';
preload.innerHTML = `<div class="preload__inner">
                        <span class="preload__image"></span>
                        <span class="preload__title preload__title_1">Okonskaya</span>
                        <span class="preload__title preload__title_2">Yuliya</span>
                        <span class="preload__title preload__title_3">Igorevna</span>
                      </div>`;


document.addEventListener('DOMContentLoaded', () => {
  wrapper.after(preload);
  setTimeout(() => {
    preload.remove();
  }, 6000);

});

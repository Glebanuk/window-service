const tabs = (headerSelector, tabSelector, contentSelector, activeClass) =>  { // при вызове функции нужно понять нужно ли стаивть точку перед классом или нет
   const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        contents = document.querySelectorAll(contentSelector);

        function hideTabContent() {
          contents.forEach(item =>  {
            item.style.display  = 'none';
          });

          tabs.forEach(item =>  {
            item.classList.remove(activeClass);
          })
        }

        function showTabContent(i = 0) { // 0 нужен чтоб по умолчанию отобразить первый таб  с контентом
          contents[i].style.display = 'block';
          tabs[i].classList.add(activeClass);
        }

        hideTabContent();// сразу вызываем функции во избежания неполадок в css (так надежнее)
        showTabContent();

        // ДЕЛЕГИРОВАНИЕ СОБЫТИЙ--------------
        header.addEventListener('click', (e)  =>  {
            const target = e.target;
            if (target && // target нужен для того чтоб убедится что элемент кликабелен 
              (target.classList.contains(tabSelector.replace(/\./, '')) ||   // reg exp нужно чтоб убрать точку класса, так как classList  с ней работать не будет
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) { //эта строчка на случай если клик произошел на дочерний (вложеный) элемент *ВАЖНЫЙ МОМЕНТ*
                tabs.forEach((item, i) =>  {
                  if  ( target === item || target.parentNode === item) {
                    hideTabContent(); // скрываем класс активности у предыдущего
                    showTabContent(i);// отображаем кликнутый таб
                  }
                }); 
              }
          });
};

          
          

export default tabs;
import checkNumInputs from "./checkNumInputs";

 
 const changeModalState = (state)  =>  {
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox'),
        form = document.querySelector('[data-calc = "end"]');
 
 

        checkNumInputs('#width');
        checkNumInputs('#height');
 
        function bindActionToElems(event, elem, prop)   {
          elem.forEach((item, i) =>  { // индекс нужен для выявления в какую картинку окна нажал пользователь
            item.addEventListener(event,  ()  =>  {
                switch(item.nodeName) {
                  case 'SPAN' : // нужно использовать верхний регистр для команды nodeName
                    state[prop] = i;
                  break;
                  case  'INPUT' :
                    if (item.getAttribute('type') === 'checkbox') {
                      i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое'; // так как всего два чекбокса на странице проверяем какой выбран с помощью тернарника
                      elem.forEach((box, j) =>  { // используем j так как i уже занято
                          box.checked = false;
                          if  (i == j)  {
                            box.checked = true;
                          }
                      });

                    } else{
                      state[prop] = item.value;
                    }
                    break;
                    case 'SELECT'  :
                      state[prop] = item.value;
                      break;
                    }
                    console.log(state);
              });
            });
          }

          function clearStateAndCloseWindow() { //
            for (let key in state)  {
              delete state[key];
            };
            console.log('Modal state cleared:');

            setTimeout(() =>  {
              document.querySelector('.popup_calc_end').style.display = 'none';
              document.querySelector('body').style.overflow = '';

            }, 3000);
          };
          form.addEventListener('submit', clearStateAndCloseWindow);


          bindActionToElems('click', windowForm, 'form ');
          bindActionToElems('input', windowWidth, 'width ');
          bindActionToElems('input', windowHeight, 'height');
          bindActionToElems('change', windowType, 'type');
          bindActionToElems('change', windowProfile, 'profile');

          
 };

 export default changeModalState;
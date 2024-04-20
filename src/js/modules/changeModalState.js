import checkNumInputs from "./checkNumInputs";

 
 const changeModalState = (state)  =>  {
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

        checkNumInputs('#width');
        checkNumInputs('#height');

         function bindActionToElems(event, elem, prop)   {
            elem.forEach((item, i) =>  { // индекс нужен для выявления в какую картинку окна нажал пользователь
              item.addEventListener(event,  ()  =>  {
                if (elem.length > 1)  {
                  state[prop] = i; // при клике, в обьекте "modalState" создается поле которое передано в prop как аргумент с значением индекса (тоесть с номером картинки по которой кликнули)
                } else  {
                  state[prop] = item.value;
                }
                console.log(state);
              });
            });
          }

          bindActionToElems('click', windowForm, 'form ');
          bindActionToElems('input', windowWidth, 'width ');
          bindActionToElems('input', windowHeight, 'height');
 };

 export default changeModalState;
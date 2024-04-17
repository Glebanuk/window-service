const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeCLickOverlay = true)  { // 'closeCLickOverlay' для контроля закрытия мод окна на подложку(какое будет а какое нет)
      const trigger = document.querySelectorAll(triggerSelector), // можно повесить на несколько селекторов одни и те же функции 
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'); // получаем все модальные окна чтоб они не наслаивались друг на друга как в modal_calc

      trigger.forEach(item => {
        item.addEventListener('click', (e) =>  {
          if (e.target) {
              e.preventDefault();
          }

          windows.forEach(item  =>  { // этот код закрывает все ненужные открытые окна
            item.style.display = 'none';
          });

          modal.style.display = 'block';
          document.body.style.overflow  = 'hidden';
          // document.body.classList.add('modal-open');

        });
      });

      close.addEventListener('click', ()  =>  {
        modal.style.display = 'none';
        document.body.style.overflow  = '';
        // document.body.classList.remove('modal-open');
      });


      modal.addEventListener('click', (e)  =>  {
        if (e.target === modal && closeCLickOverlay)  {

          windows.forEach(item  =>  {
            item.style.display = 'none';
          });

          modal.style.display = 'none';
          document.body.style.overflow  = '';
          // document.body.classList.remove('modal-open');
        }
      })
    }

    function  showModalByTime(selector, time) {
      setTimeout(() => {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow  = 'hidden';
      }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer' , '.popup_engineer .popup_close'); // вместо переменных передаем сразу селекторы. И функция становится универсальной для открытия окон при клике на другие тригеры.
    bindModal('.phone_link', '.popup' , '.popup .popup_close'); 
    bindModal('.popup_calc_btn', '.popup_calc' , '.popup_calc_close'); 
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); 
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false); 
    // showModalByTime('.popup', 6000);

};

export default modals;
const modals = () => {
      const popup = document.querySelector('.popup_engineer'),
            popup_btn = document.querySelector('.popup_engineer_btn'),
            popup_close = document.querySelector('.popup_engineer .popup_close');

    function bindModal(trigger, modal, close)  {
      trigger.addEventListener('click', (e) =>  {
        if (e.target) {
            e.preventDefault();
        }

        modal.style.display = 'block';
        // document.body.style.overflow  = 'hidden';
        document.body.classList.add('modal-open');
      });

      close.addEventListener('click', ()  =>  {
        modal.style.display = 'none';
        // document.body.style.overflow  = '';
        document.body.classList.remove('modal-open');
      });
      

      modal.addEventListener('click', (e)  =>  {
        if(e.target === modal)  {
          modal.style.display = 'none';
          // document.body.style.overflow  = '';
          document.body.classList.remove('modal-open');
        }
      })
    }

    bindModal(popup_btn, popup, popup_close);

  
};

export default modals;
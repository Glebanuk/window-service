import checkNumInputs from "./checkNumInputs";

const forms = (state)  =>  { // для state будет аргументом обеъкт modalState который меняется в модуле changeModalState 
  const form = document.querySelectorAll('form'),
       inputs = document.querySelectorAll('input'),
       phoneInputs = document.querySelectorAll('input[name="user_phone"]');// эта переменная для функционала в котором полтзователь может вводитТОЛЬКО цифры

       checkNumInputs(phoneInputs);

       const message  = {
        loading:  'Загрузка...',
        success: 'Спасибо с вами свяжутся!',
        failure: 'Что-то пошло не так...'
       };

       const postData = async (url, data) =>  { // async/await добавляются чтоб JS подождал ответ от сервера , т.к. fetch является ассинхронной операцией. Иначе переменная result будет undefind
          document.querySelector('.status').textContent = message.loading;
          
          let result = await fetch(url, {
            method:'POST',
            body: data 
          });

          return await result.text(); // эта строка тоже выполняется асинхронно пожтому нужен await
        }

        const clearInputs = ()  =>  {
          inputs.forEach(item =>  {
            item.value = '';
          });
        };

       form.forEach(item  =>  {
          item.addEventListener('submit', (e) => { //событие submit есть только если в разметке используется тэг form
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status'); // добавляем класс который создан в css
            item.appendChild(statusMessage);

            const formData  = new FormData(item); // этот объект найдет все данные полей ввода и соборет их в специальную структуру (объект)
            
            if (item.getAttribute('data-calc') === 'end') { // этот блок кода нужен для отправки данных на сервер которые приходят из modalState (см. параметры функции forms)
              for (let key in state)  {
                formData.append(key, state[key]);
              }
            }

            postData('assets/server.php', formData)
              .then(res =>  {
                console.log(res);
                statusMessage.textContent = message.success;
              })
              .catch(() => statusMessage.textContent = message.failure)
              .finally(() =>  {
                clearInputs();
                setTimeout(() =>  {
                  statusMessage.remove();
                }, 7000);
              })

          });
       });
};

export default forms;
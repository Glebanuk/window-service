const forms = ()  =>  {
  const form = document.querySelectorAll('form'),
       inputs = document.querySelectorAll('input'),
       phoneInputs = document.querySelectorAll('input[name="user_phone"]');// эта переменная для функционала в котором полтзователь может вводитТОЛЬКО цифры

       phoneInputs.forEach(item =>  { // этот код нужен для проверки и замены данных в поле "номер телефона" на числа
        item.addEventListener('input',  ()  =>  {
          item.value = item.value.replace(/\D/, '');// если пользователь ввел НЕ число то это reg exp заменяет содержимое на пустое место
        });
       });

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
          item.addEventListener('submit', (e) => { //событие submit есть только еслив разметке используется тэг form
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status'); // добавляем класс который создан в css
            item.appendChild(statusMessage);

            const formData  = new FormData(item); // этот объект найдет все данные полей ввода и соборет их в специальную структуру (объект)
            
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
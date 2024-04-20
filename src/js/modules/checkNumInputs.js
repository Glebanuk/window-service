const checkNumInputs = (selector) =>  {
  const numIniputs = document.querySelectorAll('selector');

  numIniputs.forEach(item =>  { // этот код нужен для проверки и замены данных в поле "номер телефона" на числа
    item.addEventListener('input',  ()  =>  {
      item.value = item.value.replace(/\D/, '');// если пользователь ввел НЕ число то это reg exp заменяет содержимое на пустое место
    });
   });
   
  
};

export default checkNumInputs;
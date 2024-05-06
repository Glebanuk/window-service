

const timer  = (id, deadline) =>  {

  const addZero = (num)  =>  {
    if (num <= 9 )  {
      return '0' + num;
    } else{
      return num;
    }
  }; 

  const getTimeRemaining  = (endtime)  =>  {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000 * 60 * 60)) % 24),
          days = Math.floor((t/(1000 * 60 * 60 * 24)));

          return{
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
          };
  };

   const setClock = (selector, endtime) =>  {
    const timer = document.querySelector(selector),
          days  = timer.querySelector("#days"),
          hours  = timer.querySelector("#hours"),
          minutes  = timer.querySelector("#minutes"),
          seconds  = timer.querySelector("#seconds"),
          timeInterval  = setInterval(updateClock, 1000);

          updateClock(); // тут вызываем функцию чтоб небыло дергания таймера при перезагрузке страницы 

      function  updateClock() {
        const t = getTimeRemaining(endtime);

        days.textContent  = addZero(t.days);
        hours.textContent  = addZero(t.hours);
        minutes.textContent  = addZero(t.minutes);
        seconds.textContent  = addZero(t.seconds);

        if  (t.total <= 0)  {
          days.textComtent  = "00";
          hours.textComtent  = "00";
          minutes.textComtent  = "00";
          seconds.textComtent  = "00"; 

          clearInterval(timeInterval);
        }
      };
  };

  setClock(id, deadline);
};

export default timer;
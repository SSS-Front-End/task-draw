const tasks = {
  "hr": [
      "Провести собеседование с плюшевой игрушкой и записать его в чат",
      "Запустить голосование «Самый загадочный сотрудник» (без объяснения, что это значит)",
      "Отправить письмо коллегам с заголовком «ВАЖНО!» и внутри только GIF с танцующим котом",
      "Написать в общий чат: «Сегодня пятница» и не комментировать"
  ],
  "bank": [
      "Говорить, что курс доллара на 1 апреля 1000 и наблюдать реакцию",
      "В ответ на любой запрос говорить: «Вам одобрено, но есть нюанс…»",
      "На каждом звонке с клиентом повторять «А вы уверены в этом решении?»",
      "Сделать таблицу «Кредит на смех» с колонками «Шутка», «Ставка юмора» и «Одобрено/Не одобрено»"
  ],
  "marketing": [
      "Запустить в чат слух о новом бренде, которого не существует",
      "Говорить, что все акции сегодня –50%, но только для тех, кто скажет кодовое слово «ананас»",
      "Каждый раз перед ответом говорить: «Надо протестировать на фокус-группе»",
      "Запустить «новый стиль бренда» – розовый Comic Sans во всех документах"
  ],
  "it": [
      "В чат техподдержки написать: «Я забыл пароль, а он у меня на стикере. Где стикер – не знаю»",
      "Сообщить, что сегодня интернет работает только в режиме 1 Мбит/с",
      "Включить «хакерский» экран (чёрный фон с зелёным текстом) и говорить, что вас взломали",
      "На вопрос «Почему не работает?» отвечать: «Фаза луны не та»"
  ],
  "aup": [
      "Говорить, что все документы теперь подписываются только в формате PDF на розовой бумаге",
      "Отправить важный документ, но в нем на последней странице вставить мем",
      "Написать в чат: «Срочно все в переговорку!» и ждать реакции"
  ],
  "accounting": [
      "В письме про зарплату вставить 3 случайные цифры и ждать паники",
      "На вопрос «Когда аванс?» отвечать «В 2099 году»",
      "Говорить, что теперь принимаются счета только в биткоинах",
      "Выслать отчет, но все суммы заменить смайликами 💸🤣"
  ],
  "installments": [
      "Говорить, что теперь рассрочка возможна на 100 лет",
      "Сообщить в чат: «Сегодня рассрочка бесплатная, но только для тех, кто угадал число от 1 до 100»",
      "Заменить слово «рассрочка» в своих ответах на «вечная радость»",
      "Говорить клиентам, что теперь можно оформить рассрочку на рассрочку"
  ],
  "callcenter": [
      "Каждому клиенту в начале звонка говорить: «Добро пожаловать в лучший день вашей жизни!»",
      "На каждое «спасибо» отвечать «А вам бонус – +1 к карме!»",
      "На любой вопрос про рассрочку отвечать: «Да, но это секретная информация!»",
      "Представляться разными именами (но не своими)"
  ],
  "partners": [
      "Говорить партнёрам, что теперь все договоры подписываются невидимыми чернилами",
      "Устроить игру «угадай партнёра» – отправлять загадки, описывающие их",
      "В ответ на любой запрос писать: «Давайте обсудим это через 5 минут» (и так весь день)",
      "Написать в чат партнёрам: «Сегодня у нас день тишины» и не отвечать 10 минут"
  ],
  "legal": [
      "На каждый вопрос коллег отвечать: «Сначала подпишите NDA»",
      "Добавлять в письма формулировки «По закону 1 апреля 2024 года…»",
      "На вопросы в чате отвечать юридическим языком: «Ваш запрос рассмотрен в соответствии с п.3.2»",
      "Сообщить, что теперь все документы оформляются в стихах"
  ]
};

let hasSubmitted = localStorage.getItem('hasSubmitted');  

document.getElementById("taskForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  
  if (hasSubmitted) {
    alert("Вы уже отправили задание!");  
    return; 
  }

  const name = document.getElementById("name").value.trim();
  const departmentSelect = document.getElementById("department");
  const departmentText = departmentSelect.options[departmentSelect.selectedIndex].text; 
  const departmentValue = departmentSelect.value;  
  const taskList = tasks[departmentValue];
  const modal = document.getElementById("modal");
  const taskText = document.getElementById("taskText");
  const userName = document.getElementById("userName");

  if (!name) {
      alert("Введите имя!");
      return;  
  }

  if (taskList && taskList.length > 0) {
      const randomIndex = Math.floor(Math.random() * taskList.length);
      const selectedTask = taskList[randomIndex];

      userName.innerText = name;
      taskText.innerText = selectedTask;

      modal.classList.add("show");

      const scriptURL = "https://script.google.com/macros/s/AKfycbylwq5jCHx8BHLMRWiugCc2k1RFiMqLgECzFMJ3o80H4pfJDm21UW7toNYodIC514g-0Q/exec"; 
      fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify({ name, department: departmentText, task: selectedTask }), 
          headers: { "Content-Type": "application/json" },
          mode: "no-cors"
      });

      localStorage.setItem('hasSubmitted', 'true');

      document.querySelector("button[type='submit']").disabled = true;
  } else {
      alert("Ошибка: задания не найдены!");
  }
});

document.getElementById("closeModal").addEventListener("click", function() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");  
});

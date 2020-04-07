const listPlaces = document.querySelector('.places-list');
const api = new API('cdf51db9-783b-4d27-aa55-42701dc041cc', 'cohort7');
let initialCards = null;
const card = new Card();
const cardList = new CardList(listPlaces, card, api);
cardList.render();
const user = new UserInfo(api);
user.updateUserInfo();
const photoPopup = new PopupImage();
const validation = new FormValidator();
const profilePopup = new PopupProfile(user, validation);
const cardPopup = new PopupCard(cardList, validation);



document.querySelector('.user-info__edit-button').addEventListener('click', function (event) {
    profilePopup.open('popup-profile');
    profilePopup.setEventListeners();
})
document.querySelector('.popup-profile__close').addEventListener('click', function (event) {
    profilePopup.close();
})
document.querySelector('.user-info__button').addEventListener('click', function (event) {
    cardPopup.open('popup-place');
    cardPopup.setEventListeners();
})
document.querySelector('.popup-place__close').addEventListener('click', function (event) {
    cardPopup.close();
})
listPlaces.addEventListener('click', function (event) {
    if (event.target.classList.contains('place-card__image')) {
        /* Можно лучше: удалите else а внутри условия добавьте return
         например было: 
         if(условие){  
             // ваш код 
         } else if(условие2){ 
             // ваш код 
         } 
         стало : 
         if(условие){  
                 // ваш код 
            return; 
        } 
     
         if(условие2){ 
            // ваш код 
            return; 
        } 
     
    */
        photoPopup.add();
        photoPopup.open('popup-image');
    } else if (event.target.classList.contains('place-card__like-icon')) {
        card.like(event);
    } else if (event.target.classList.contains('place-card__delete-icon')) {
        card.remove(cardList, event);
    }
})
document.querySelector('.popup-image__close').addEventListener('click', function (event) {
    photoPopup.delete();
    photoPopup.close();
})

 /**
 * Здравствуйте. Крутая и красивая рабоота.
 * --------------------------------------------------------------------
 * Весь функционал работает корректно 
 * Код чистый и хорошо читается 
 * Вы используете логические группировки операций 
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование
 * -------------------------------------------------------------------- 
    
  * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
  * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
  * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 * 
 *
 *  *
     * Класс Api это отдельный класс который ничего не знает о других классах и методах
     * Вы можете только получать данные из этого класса и использовать эти данные.
     * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
     * скажу что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
     * Который только возвращает данные, а вы можите получить только обращась к этим методам.
     * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратитьсяк методам.
     * Отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
     * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
     *
 * 
 */
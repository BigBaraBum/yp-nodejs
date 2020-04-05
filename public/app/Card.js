class Card {
    constructor() {}
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
    remove(cardList, event) {
        event.stopPropagation();
        listPlaces.removeChild(event.target.closest('.place-card'));
    }
    create(name, link) {

        return `
       <div class="place-card">
           <div class="place-card__image" style="background-image: url(${link});">
               <button class="place-card__delete-icon"></button>
           </div>
           <div class="place-card__description">
               <h3 class="place-card__name">${name}</h3>
               <button class="place-card__like-icon"></button>
           </div>
       </div>
       `.trim();
    }
}
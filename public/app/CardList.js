class CardList {
    constructor(container, card, api) {
        this.container = container;
        this.card = card;
        this.api = api;
    }
    addCard(name, link) {
        this.container.insertAdjacentHTML('beforeend', this.card.create(name, link));
    }
    render() {
        this.api.getInitialCards()
            .then(cards => {
                cards.forEach(cardItem => {
                    this.addCard(cardItem.name, cardItem.link)
                })
            })
    }
}
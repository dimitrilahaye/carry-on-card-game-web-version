class Deck {
  _cards = [];
  _playerId;
  _template;

  /**
   *
   * @return {Array<Card>}
   */
  get cards() {
    return this._cards;
  }

  set cards(value) {
    this._cards = value;
  }

  /**
   *
   * @return {jQuery}
   */
  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  /**
   *
   * @return {number}
   */
  get playerId() {
    return this._playerId;
  }

  set playerId(value) {
    this._playerId = value;
  }

  constructor(playerId) {
    this.playerId = playerId;
  }

  /**
   * Get a card from the the deck pile, according to its index inside
   */
  getCardByIndex(index) {
    return this.cards[index];
  }

  /**
   * Get one of the deck cards according of its id and type
   */
  getCard(id, type) {
    return this.cards.find((c) => c.type === type && c.id === id);
  }

  /**
   * Add new cards in the deck pile.
   * @param {Card} cards
   */
  addCards(...cards) {
    this.cards.push(...cards);
    for (let i in cards) {
      const card = cards[i];
      const classname = ["HAZMAT-MASK", "HAZMAT-SHOES", "HAZMAT-SUIT"].indexOf(card.type) > -1 ? '_shadow' : '';
      const template = card.drawCard(classname);
      this.template.append(template);
      card.onSelectCardFromDeck();
    }
    this.addNumericPadTip();
  }

  /**
   * Add the numeric pad key for play each card
   */
  addNumericPadTip() {
    this.template.find('._card').each((i, card) => {
      if (["HAZMAT-MASK", "HAZMAT-SHOES", "HAZMAT-SUIT"].indexOf($(card).data('type')) === -1) {
        $(card).append('<span class="badge badge-light numeric">' + ++i + '</span>');
      }
    });
  }

  /**
   * Inject the deck pile into the DOM
   */
  drawDeck() {
    const $playerEl = $('#player_' + this.playerId);
    $playerEl.find('.deck').html('');
    $playerEl.append('<div class="deck"></div>');
    this.template = $('div#player_' + this.playerId + ' div.deck');
  }

  /**
   * Remove a given card from the deck pile
   */
  removeCard(card) {
    this.template.find('._card').remove();
    this.cards = this.cards.filter((c) => c !== card);
    for (let card of this.cards) {
      const $template = card.drawCard();
      this.template.append($template);
      card.onSelectCardFromDeck();
    }
    this.addNumericPadTip();
  }

  /**
   * Return the card which has been selected by the player
   */
  getSelectedCard() {
    return this.cards.find((c) => c.isSelected());
  }

  /**
   * Return all the cards from the deck filtered with the given {category}
   */
  getCardsByCategory(category) {
    if (!category) {
      return this.cards;
    }
    return this.cards.filter((c) => c.category === category);
  }
}

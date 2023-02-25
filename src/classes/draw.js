class Draw {
  _cards = [];
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

  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  /**
   * Get one of the draw cards according of its id and type
   */
  getCard(id, type) {
    return this.cards.find((c) => c.type === type && c.id === id);
  }

  /**
   * Add new cards in the draw pile.
   */
  addCards(..._cards) {
    const cards = _cards.filter((c) => this.cards.indexOf(c) === -1);
    this.cards.push(...cards);
    for (let i in cards) {
      const card = cards[i];
      this.template.append(card.drawCard());
    }
    this.updateDrawTitle();
  }

  /**
   * Return a number of random drawn cards
   * Return false if the drawn pile is empty
   * @param number
   * @param drawnCards
   * @return {* | Array | Array}
   */
  drawCards(number, drawnCards = []) {
    if (!this.cards.length || number > this.cards.length) {
      return false;
    }
    for (let i = 0; i < number; i++) {
      const index = Math.round(Math.random() * (this.cards.length - 1));
      if (drawnCards.indexOf(this.cards[index]) === -1) {
        drawnCards.push(this.cards[index]);
      } else {
        return this.drawCards(number - i, drawnCards);
      }
    }
    return drawnCards;
  }

  /**
   * Remove a card from the draw pile.
   */
  pickCard(card) {
    this.template.find('._card').remove();
    this.cards = this.cards.filter((_card) => _card !== card);
    this.reDrawCards();
    return card;
  }

  /**
   * Re-draw cards in the dom
   */
  reDrawCards() {
    this.template.find('._card').remove();
    for (let card of this.cards) {
      this.template.append(card.drawCard());
    }
    this.updateDrawTitle();
  }

  /**
   * Inject the draw pile into the DOM
   */
  drawDraw() {
    $('#game').append('<div id="draw" class="shadow-card"><span class="badge badge-light">' + this.cards.length + '</span></div>');
    this.template = $('div#draw');
  }

  /**
   * Update the number of cards in the draw pile
   */
  updateDrawTitle() {
    this.template.find('span.badge').remove();
    this.template.prepend('<span class="badge badge-light">' + this.cards.length + '</span>');
  }
}

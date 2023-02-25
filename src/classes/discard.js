class Discard {
  _cards = [];
  _template;

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
   * Get one of the discard cards according of its id and type
   */
  getCard(id, type) {
    return this.cards.find((c) => c.type === type && c.id === id);
  }

  /**
   * Add new cards in the discard pile.
   */
  addCards(...cards) {
    this.cards.push(...cards);
    for (let i in cards) {
      const card = cards[i];
      this.template.append(card.drawCard());
    }
    this.updateDiscardTitle();
  }

  /**
   * Remove a card from the discard pile.
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
    this.updateDiscardTitle();
  }

  /**
   * Inject the discard pile into the DOM
   */
  drawDiscard() {
    $('#game').append('<div id="discard" class="shadow-card"><span class="badge badge-light size">' + this.cards.length + '</span><span class="badge badge-light option"><i id="showDiscardPile" class="fas fa-eye" data-toggle="tooltip" data-placement="right" title="Regarder la défausse"></i></span><i class="discard-skull fas fa-skull-crossbones"></i></div>');
    this.template = $('div#discard');
    setTimeout(() => {
      this.template.find('[data-toggle="tooltip"]').tooltip('enable');
      this.template.find('#showDiscardPile').off('click').click(() => {
        $.event.trigger({
          type: "SHOW_MODAL",
          modal: ShowDiscardPileModal
        });
      });
    }, 500);
  }

  /**
   * Update the number of cards in the discard pile
   */
  updateDiscardTitle() {
    this.template.find('span.badge.size').remove();
    this.template.prepend('<span class="badge badge-light size">' + this.cards.length + '</span>');
  }
}

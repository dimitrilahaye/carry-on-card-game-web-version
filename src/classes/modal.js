/**
 * This class describes a modal. All the modals of the app extend this one.
 *
 * @class      Modal
 */
class Modal {
  _alphaKeys = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h"];
  _$modal = $('#modal');
  _game;
  _template;
  _hasFooter;
  _showEvent;
  _hideEvent;
  _keyPressEnterEvent;
  _keyPressEscapeEvent;
  _confirmEvent;
  _cancelEvent;

  get $modal() {
    return this._$modal;
  }

  set $modal(value) {
    this._$modal = value;
  }

  /**
   *
   * @return {Game}
   */
  get game() {
    return this._game;
  }

  set game(value) {
    this._game = value;
  }

  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  get hasFooter() {
    return this._hasFooter;
  }

  set hasFooter(value) {
    this._hasFooter = value;
  }

  get ux() {
    return this._ux;
  }

  set ux(value) {
    this._ux = value;
  }

  get keyPressEnterEvent() {
    return this._keyPressEnterEvent;
  }

  set keyPressEnterEvent(value) {
    this._keyPressEnterEvent = value;
  }

  get keyPressEscapeEvent() {
    return this._keyPressEscapeEvent;
  }

  set keyPressEscapeEvent(value) {
    this._keyPressEscapeEvent = value;
  }

  get confirmEvent() {
    return this._confirmEvent;
  }

  set confirmEvent(value) {
    this._confirmEvent = value;
  }

  get cancelEvent() {
    return this._cancelEvent;
  }

  set cancelEvent(value) {
    this._cancelEvent = value;
  }

  get showEvent() {
    return this._showEvent;
  }

  set showEvent(value) {
    this._showEvent = value;
  }

  get hideEvent() {
    return this._hideEvent;
  }

  set hideEvent(value) {
    this._hideEvent = value;
  }

  /**
   * Constructs a new instance.
   *
   * @param      {Game}  game    The game instance
   * @param      {Object}  ux      The list of events needed for Modal child.
   */
  constructor(game, ux) {
    const {
      showEvent,
      hideEvent,
      keyPressEnterEvent,
      keyPressEscapeEvent,
      confirmEvent,
      cancelEvent
    } = ux;
    this.keyPressEnterEvent = keyPressEnterEvent;
    this.keyPressEscapeEvent = keyPressEscapeEvent;
    this.confirmEvent = confirmEvent;
    this.cancelEvent = cancelEvent;
    this.showEvent = showEvent;
    this.hideEvent = hideEvent;
    this.ux = ux;
    this.game = game;
  }

  /**
   * Begin to build the modal html
   *
   * @return     {Object}  the Modal instance
   */
  build(dialogClassNames, contentClassNames) {
    const _dialogClassNames = dialogClassNames ? dialogClassNames.join(' ') : "";
    const _contentClassNames = contentClassNames ? contentClassNames.join(' ') : "";
    this.template = '<div class="modal-dialog modal-dialog-centered ' + _dialogClassNames + '" role="document"><div class="modal-content ' + _contentClassNames + '">';
    return this;
  }

  /**
   * Builds the header.
   *
   * @param      {string}  title   The title
   * @param      {string}  tip     The tip
   * @return     {Object}  the Modal instance
   */
  buildHeader(title, tip) {
    this.template += `<div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <i class="fas fa-keyboard" data-toggle="tooltip" data-placement="top" title="${tip}"></i>
                </div>`;
    return this;
  }

  /**
   * Builds a body.
   *
   * @param      {string}            body        the body html content
   * @param      {...string}  classNames  The class names
   * @return     {Object}            the Modal instance
   */
  buildBody(body, ...classNames) {
    const _classNames = classNames.join(' ');
    this.template += `<div class="modal-body scrollbar scrollbar-success ${_classNames}">${body}</div>`;
    return this;
  }

  /**
   * Builds a footer.
   *
   * @return     {Object}  the Modal instance
   */
  buildFooter() {
    this.hasFooter = true;
    this.template += '<div class="modal-footer">';
    return this;
  }

  /**
   * Builds a confirm button.
   *
   * @param      {string}  text    The text
   * @return     {Object}  the Modal instance
   */
  buildConfirmButton(text) {
    this.template += `<button type="button" class="btn btn-primary confirm">${text}</button>`;
    return this;
  }

  /**
   * Builds a cancel button.
   *
   * @param      {string}  text    The text
   * @return     {Object}  the Modal instance
   */
  buildCancelButton(text) {
    this.template += `<button type="button" class="btn btn-secondary cancel">${text}</button>`;
    return this;
  }

  /**
   * Gets the template.
   *
   * @return     {string}  The template of the modal.
   */
  getTemplate() {
    if (this.hasFooter) {
      this.template += '</div>';
      this.hasFooter = false;
    }
    this.template += '</div></div>';
    return this.template;
  }

  /**
   * Sets the modal events.
   */
  setModalEvents() {
    this.$modal.unbind();
    this.setKeypressHandler(this.keypressEvents.bind(this));
    this.$modal.on('shown.bs.modal', (e) => {
      this.$modal.find('[data-toggle="tooltip"]').tooltip('enable');
      if (!!this.confirmEvent) {
        this.$modal.find('.confirm').off('click').click(this.confirmEvent.bind(this));
      }
      if (!!this.cancelEvent) {
        this.$modal.find('.cancel').off('click').click(this.cancelEvent.bind(this));
      }
      if (!!this.showEvent) {
        this.showEvent.call(this, e);
      }
    });
    this.$modal.on('hidden.bs.modal', (e) => {
      const selectedCard = this.getCurrentPlayerSelectedCard();
      if (!!selectedCard) {
        this.game.getActivatedPlayer().deck.getSelectedCard().unSelect();
      }
      $('.player.activated').find('.deck').find('._card').removeClass('unselected');
      if (!!this.hideEvent) {
        this.hideEvent.call(this, e);
      }
      this.game.getActivatedPlayer().initKeyEvents();
    });
    this.$modal.modal({
      keyboard: false,
      backdrop: 'static'
    });
  }

  /**
   * Show the modal
   */
  show() {
    this.$modal.html(this.getTemplate());
    setTimeout(() => this.setModalEvents(), 500);
  }

  /**
   * Hide the modal
   */
  hide() {
    this.$modal.modal('hide');
  }

  /**
   * Sets the keypress handler.
   *
   * @param      {Function}  handler  The handler
   */
  setKeypressHandler(handler) {
    $('body').off('keypress');
    this.$modal.off('keypress').keypress(handler);
  }

  /**
   * Initialize the keypress events
   *
   * @param      {jQuery.Event}  e       the handler of the keypress event
   */
  keypressEvents(e) {
    const $target = $(e.target);
    // enter and space keypress
    if (!!this.keyPressEnterEvent && e.key === 'Enter' && !this.$modal.find('.confirm').is(":disabled")) {
      this.keyPressEnterEvent.call(this);
    } else if (!!this.keyPressEscapeEvent && e.key === ' ' && !this.$modal.find('.cancel').is(":disabled")) {
      this.keyPressEscapeEvent.call(this);
      this.hide();
      this.game.getActivatedPlayer().initKeyEvents();
    }
    const cardsInModal = $target.find('._card');
    // numeric keypress
    if (!this.$modal.find(".modal-body").hasClass("pile") && !!this.$modal.find("._card").length) {
      if (!!Number(e.key) && Number(e.key) <= cardsInModal.length) {
        $(cardsInModal[Number(e.key) - 1]).trigger('click');
      }
    }
    // alpha keypress
    if (this.$modal.find(".modal-content").hasClass("compass") || this.$modal.find(".modal-content").hasClass("shovel")) {
      const index = this._alphaKeys.indexOf(e.key.toString().toLowerCase());
      if (index > -1 && index <= cardsInModal.length - 1) {
        $(cardsInModal[index]).trigger('click');
      }
    }
    e.stopPropagation();
  }

  /**
   * Adds click event on modal cards.
   *
   * @param      {Function}  handler  The handler of the click event
   */
  addClickEventOnModalCards(handler) {
    this.$modal.find('._card').off('click').click(handler.bind(this));
  }

  /**
   * Draw a set of {cards} in the body of the modal
   *
   * @param      {Array<Card>}  cards   The cards to draw into the modal body
   * @param selectorChild
   */
  drawCardsInModalBody(cards, selectorChild) {
    const _selectorChild = selectorChild || "";
    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      this.$modal.find('.modal-body ' + _selectorChild).append(card.drawCard());
    }
  }

  /**
   * Add the numeric pad key in order to pick a card
   */
  addNumericPadTip() {
    this.$modal.find('._card').each((i, card) => {
      $(card).append('<span class="badge badge-light numeric">' + ++i + '</span>');
    });
  }

  /**
   * Add the alpha pad key in order to pick a card
   */
  addAlphaPadTip() {
    this.$modal.find('._card').each((i, card) => {
      $(card).append('<span class="badge badge-light alpha">' + this._alphaKeys[i] + '</span>');
    });
  }

  /**
   * Draw a set of {cards} in the body of the modal
   * It will put only one div._card for each type of card (gun, knife, and so on)
   * And it will add a badge with the number of the type in the pile.
   * @param      {Array<Card>}  cards   The cards to draw into the modal body
   * @param selectorChild
   */
  drawSimpleCardsInModalBody(cards, selectorChild) {
    const _selectorChild = selectorChild || "";
    const $body = this.$modal.find('.modal-body ' + _selectorChild);
    const config = cards.reduce((conf, card) => {
      const configType = conf.find((c) => c.type === card.type);
      if (!configType) {
        conf.push({
          card: card.constructor,
          type: card.type,
          number: 1
        });
      } else {
        configType.number++;
      }
      return conf;
    }, []);
    for (let j = 0; j < config.length; j++) {
      const c = config[j];
      const card = new c.card(cards.find((_c) => _c.type === c.type).id);
      $body.append(card.drawCard());
    }
    const $cards = $body.find('._card');
    for (const card of $cards) {
      const number = config.find((c) => c.type === $(card).data('type')).number;
      $(card).append('<span class="badge badge-light size">' + number + '</span>');
    }
  }

  /**
   * Return the selected card of the current player
   *
   * @return     {Card}  The current player selected card.
   */
  getCurrentPlayerSelectedCard() {
    return this.game.getActivatedPlayer().deck.getSelectedCard();
  }

  /**
   * Return the selected card of the given {player}
   *
   * @param      {Player}  player  The player for which we want the selected current card
   * @return     {Card}  The player selected card.
   */
  getPlayerSelectedCard(player) {
    return player.deck.getSelectedCard();
  }

  /**
   * Add the given {cards} to the given {player}'s deck
   *
   * @param      {Player}  player  The player for who we want to give the cards
   * @param      {Card}   cards   The cards to give to the player
   */
  giveCardsToPlayer(player, ...cards) {
    player.deck.addCards(...cards);
  }

  /**
   * Remove the given {cards} from the given {player}'s deck
   *
   * @param      {Player}  player  The player for who we want to remove a card
   * @param      {Array}   cards   The cards we want to remove
   */
  removeCardsFromPlayerDeck(player, ...cards) {
    for (const card of cards) {
      player.deck.removeCard(card);
    }
  }

  /**
   * Remove the given {cards} from the draw pile
   *
   * @param      {Card|Array<Card>}  cards   The cards we want to remove from the draw pile
   */
  pickCardsFromDraw(...cards) {
    for (const card of cards) {
      this.game.draw.pickCard(card);
    }
  }

  /**
   * Remove the given {cards} from the discard pile
   *
   * @param      {Array}  cards   The cards we want to remove from the discard pile
   */
  pickCardsFromDiscard(...cards) {
    for (const card of cards) {
      this.game.discard.pickCard(card);
    }
  }

  /**
   * Draw {number} of cards from draw pile And add it to the given {player}
   * deck
   *
   * @param      {Player}  player  The player for who we want to give cards from draw pile
   * @param      {number}  number  The number of cards we want to give him
   * @return     {Card}  The drawed cards
   */
  pickCardsFromDrawForPlayer(player, number) {
    if (!this.game.draw.cards.length) {
      this.game.resetDrawPileAndRedraw();
    }
    let randomCards = this.drawCardInDrawPile(number);
    this.pickCardsFromDraw(...randomCards);
    this.giveCardsToPlayer(player, ...randomCards);
    return randomCards;
  }

  /**
   * Manage the drawing of the cards.
   * If draw pile is empty, we reset if with the discard pile.
   * Then we draw again.
   * @param number
   * @return {*|Array}
   */
  drawCardInDrawPile(number) {
    let randomCards = this.game.draw.drawCards(number);
    if (!randomCards) {
      randomCards = this.game.resetDrawPileAndRedraw(number);
    }
    return randomCards;
  }
}

/**
 * This class describes a player.
 *
 * @class      Player
 */
class Player {
  _number;
  _deck;
  _template;
  _drawnCards = [];

  /**
   * Constructs a new instance.
   *
   * @param      {integer}  number  The number of this player
   */
  constructor(number) {
    this.number = number;
    this.deck = new Deck(number);
  }

  get number() {
    return this._number;
  }

  set number(value) {
    this._number = value;
  }

  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  /**
   *
   * @return {Deck}
   */
  get deck() {
    return this._deck;
  }

  set deck(value) {
    this._deck = value;
  }

  /**
   * Set the cards drawn by the player, but not used yet. It is a kind of temporary hand.
   *
   */
  set drawnCards(cards) {
    this._drawnCards = cards;
  }

  /**
   * Set the cards drawn by the player, but not used yet. It is a kind of temporary hand.
   *
   * @return {Array<Card>}
   */
  get drawnCards() {
    return this._drawnCards;
  }

  /**
   * Draw the player container in the DOM
   */
  drawPlayer() {
    const className = this.number === 1 ? "left" : "right";
    $('#game').append('<div class="player '+ className + '" id="player_' + this.number + '"><h2> Joueur' + this.number + '</h2></div>');
    this.template = $('#player_' + this.number);
    this.deck.drawDeck();
  }

  /**
   * Activate the player (eg. used when it is his turn to play)
   */
  activatePlayer() {
    $('.player').removeClass('activated');
    this.template.addClass('activated');
    this.template.removeClass('unactivated');
    this.template.find('[data-toggle="tooltip"]').tooltip('enable');
    this.initKeyEvents();
  }

  /**
   * Unactivate the player (eg. used when it is not anymore his turn to play)
   */
  unactivatePlayer() {
    this.template.addClass('unactivated');
    this.template.removeClass('activated');
    this.template.find('[data-toggle="tooltip"]').tooltip('disable');
  }

  /**
   * Initialize the keypress event to allow the player to select one of his
   * cards by pushing a numeric touch on his board
   */
  initKeyEvents() {
    $('body').off('keypress').keypress((e) => {
      if (!!Number(e.key) && Number(e.key) < 5) {
        this.deck.getCardByIndex(Number(e.key) - 1).getCardJqueryElement().trigger('click');
      }
    });
  }

  /**
   * Check if this player is the winner.
   *
   * @return     {boolean}  True if winner, False otherwise.
   */
  isWinner() {
    const nonSpecialCards = this.deck.cards.filter((card) => ["HAZMAT-MASK", "HAZMAT-SHOES", "HAZMAT-SUIT"].indexOf(card.type) === -1);
    return nonSpecialCards.length === 1;
  }

  /**
   * Evaluate if the current player is activated or not
   *
   * @return     {boolean}  True if activated, False otherwise.
   */
  isActivated() {
    return this.template.hasClass('activated');
  }
}

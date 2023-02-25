/**
 * This class describes a card.
 *
 * @class      Card
 */
class Card {
  _template;
  _id;
  _modal;
  get modal() {
    return this._modal;
  }

  set modal(value) {
    this._modal = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get category() {
    return this._category;
  }

  set category(value) {
    this._category = value;
  }

  /**
   * Constructs a new instance.
   *
   * @param      {string}  title     The title
   * @param      {string}  type      The type
   * @param      {string}  category  The category
   * @param id
   * @param modal Modal
   */
  constructor(modal, id, title, type, category) {
    this.title = title;
    this.type = type;
    this.category = category;
    this.id = id;
    this.modal = modal;
  }

  /**
   * Inject the card into the DOM
   *
   * @return     {*}  the html element string for the cards
   * @param classname
   */
  drawCard(...classname) {
    const classnames = (!!classname) ? classname : [];
    if (["HAZMAT-MASK", "HAZMAT-SHOES", "HAZMAT-SUIT"].indexOf(this.type) > -1) {
      classnames.push('_shadow');
    }
    this.template = `<div class="_card shadow-card ${classnames.join(' ')} ${this.id} ${this.type}" data-type="${this.type}" data-id="${this.id}" data-toggle="tooltip" data-placement="top" title="${this.title}">
								<img src="src/img/${this.type}.png" data-type="${this.type}" data-id="${this.id}" />
							</div>`;
    return this.template;
  }

  /**
   * Return the jQuery element corresponding to this card
   *
   * @return     {$}  The card jquery element.
   */
  getCardJqueryElement() {
    return this.getDeck().find('._card.' + this.type + '.' + this.id);
  }

  /**
   * Event triggered when you play this card from your deck.
   */
  onSelectCardFromDeck() {
    this.getDeck().find('._card.' + this.type + '.' + this.id).not('._shadow').off('click').click((e) => {
      const $target = $(e.target).closest('._card');
      const $player = $target.closest('.player');
      const $deck = $target.closest('.deck');
      if ($player.hasClass('activated')) {
        if ($target.hasClass('selected')) {
          $deck.find('._card').removeClass('unselected');
          $target.removeClass('selected');
        } else {
          $target.addClass('selected');
          $target.removeClass('unselected');
          $deck.find('._card').not('._shadow, .' + this.type + '.' + this.id).addClass('unselected');
          $deck.find('._card').not('._shadow, .' + this.type + '.' + this.id).removeClass('selected');
        }
        $.event.trigger({
          type: "SHOW_MODAL",
          modal: this.modal
        });
      }
    });
  }

  /**
   * Return this card's deck jQuery element
   *
   * @return     {HTMLElement}  The deck.
   */
  getDeck() {
    return $('body').find('._card.' + this.type + '.' + this.id).closest('.deck');
  }

  /**
   * Return this card's player jQuery element
   *
   * @return     {HTMLElement}  The player.
   */
  getPlayer() {
    return $('body').find('._card.' + this.type + '.' + this.id).closest('.player');
  }

  /**
   * Evaluate if this card has been selected by the player
   *
   * @return     {boolean}  True if selected, False otherwise.
   */
  isSelected() {
    return this.getDeck().find('._card.' + this.type + '.' + this.id).hasClass('selected');
  }

  /**
   * Unselect this card
   */
  unSelect() {
    this.getDeck().find('._card.' + this.type + '.' + this.id).removeClass('selected');
  }
}

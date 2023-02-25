/**
 * This class describes a game of Carry On.
 *
 * @class      Game
 */
class Game {
  /**
   *
   * @type {Array<Player>}
   * @private
   */
  _players = [];
  _draw = new Draw();
  _discard = new Discard();
  _template;

  /**
   *
   * @return {Draw}
   */
  get draw() {
    return this._draw;
  }

  set draw(value) {
    this._draw = value;
  }

  /**
   *
   * @return {Discard}
   */
  get discard() {
    return this._discard;
  }

  set discard(value) {
    this._discard = value;
  }

  get template() {
    return this._template;
  }

  set template(value) {
    this._template = value;
  }

  /**
   *
   * @return {Array<Player>}
   */
  get players() {
    return this._players;
  }

  set players(value) {
    this._players = value;
  }

  /**
   * Constructs a new instance.
   *
   * @param      {Array<Player>}  players  The players
   */
  constructor(...players) {
    this.players.push(...players);
  }

  /**
   * Return a player according to its number
   *
   * @param      {number}  number  The number of the player
   * @return     {Player}  The player by its number
   */
  getPlayer(number) {
    return this.players.find((player) => player.number === number);
  }

  /**
   * Return the next player in the game order
   *
   * @return     {Player}  The following player.
   */
  getFollowingPlayer() {
    const totalOfPlayers = this.players.length;
    let currentPlayerNumber = this.getActivatedPlayer().number;
    const number = (totalOfPlayers === currentPlayerNumber) ? 1 : ++currentPlayerNumber;
    return this.getPlayer(number);
  }

  /**
   * Activated the next player in the game order. It will also evaluate if the
   * current player has won the game.
   */
  changeThePlayer() {
    const currentPlayer = this.getActivatedPlayer();
    if (currentPlayer.isWinner()) {
      $.event.trigger({
        type: "SHOW_MODAL",
        modal: WinModal
      });
    } else {
      const followingPlayer = this.getFollowingPlayer();
      this.activatePlayer(followingPlayer.number);
    }
  }

  /**
   * Inject the game DOM element
   */
  loadGame() {
    $('.container').append('<div id="game"></div>');
    this.template = $('#game');
    for (let player of this.players) {
      player.drawPlayer();
    }
    this.draw.drawDraw();
    this.discard.drawDiscard();
    this.prepareCards();
    this.distributeCardsForPlayers();
    this.activatePlayer(1);
  }

  /**
   * Activate a player according to his number
   *
   * @param      {number}  number  The number of the player we want to activate
   */
  activatePlayer(number) {
    this.getPlayer(number).activatePlayer();
    const otherPlayers = this.players.filter((p) => p.number !== number);
    for (let player of otherPlayers) {
      player.unactivatePlayer();
    }
  }

  /**
   * Return the activated player
   *
   * @return     {Player}  The activated player.
   */
  getActivatedPlayer() {
    return this.players.find(function (p) {
      return p.isActivated();
    });
  }

  /**
   * Distribute the initial deck for each player (at the beginning of the
   * game)
   */
  distributeCardsForPlayers() {
    for (let player of this.players) {
      player.deck.addCards(new EnergyBar(this.generateUid()), new Ration(this.generateUid()), new Water(this.generateUid()), new Cans(this.generateUid()));
    }
  }

  /**
   * When the draw pile is empty, we reset it with the discard pile.
   * Then draw again
   * @param number
   * @return {* | Array}
   */
  resetDrawPileAndRedraw(number) {
    this.draw.cards = [].concat(this.discard.cards);
    this.discard.cards.length = 0;
    this.draw.reDrawCards();
    this.discard.reDrawCards();
    return this.draw.drawCards(number);
  }

  /**
   * Generate uniq id for dom elements
   * @return {string}
   */
  generateUid() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }

  /**
   * Factory method to initialize each needed card for the draw pile (at the
   * beginning of the game)
   */
  prepareCards() {
    const conf = [{
      type: Gun,
      number: 8
    }, {
      type: Knife,
      number: 8
    }, {
      type: Anarchist,
      number: 4
    }, {
      type: Shovel,
      number: 5
    }, {
      type: Compass,
      number: 5
    }, {
      type: EnergyBar,
      number: 4
    }, {
      type: Minimalist,
      number: 6
    }, {
      type: Ration,
      number: 4
    }, {
      type: HazmatShoes,
      number: 1
    }, {
      type: HazmatSuit,
      number: 1
    }, {
      type: HazmatMask,
      number: 1
    }, {
      type: Water,
      number: 4
    }, {
      type: Pacifist,
      number: 5
    }, {
      type: Cans,
      number: 4
    }, {
      type: Generalist,
      number: 3
    }];
    const cards = [];
    for (const c of conf) {
      for (let j = 0; j < c.number; j++) {
        cards.push(new c.type(this.generateUid()));
      }
    }
    this.draw.addCards(...cards);
  }
}

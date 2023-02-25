class GunModal extends Modal {
  constructor(game) {
    function GunModalClickOnCards(e) {
      this.hide();
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const player = this.game.getActivatedPlayer();
      const gun = this.getCurrentPlayerSelectedCard();
      const opponent = this.game.getFollowingPlayer();
      const choosenSurvivor = opponent.deck.getCard(id, type);
      player.deck.addCards(choosenSurvivor);
      opponent.deck.removeCard(choosenSurvivor);
      player.deck.removeCard(gun);
      this.game.discard.addCards(gun);
      opponent.drawnCards.push(...this.pickCardsFromDrawForPlayer(opponent, 1));
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    function GunModalShowEvent(e) {
      $(e.target).find('.modal-body').html('');
      const opponentSurvivorsCards = this.game.getFollowingPlayer().deck.getCardsByCategory("SURVIVOR");
      const player = this.game.getActivatedPlayer();
      const gun = this.getCurrentPlayerSelectedCard();
      if (opponentSurvivorsCards.length === 1) {
        this.hide();
        const opponent = this.game.getFollowingPlayer();
        const choosenSurvivor = opponentSurvivorsCards[0];
        player.deck.addCards(choosenSurvivor);
        opponent.deck.removeCard(choosenSurvivor);
        player.deck.removeCard(gun);
        this.game.discard.addCards(gun);
        opponent.drawnCards.push(...this.pickCardsFromDrawForPlayer(opponent, 1));
        const modal = new ResultDrawCardsModal(this.game);
        modal.show();
      } else if (!opponentSurvivorsCards.length) {
        this.hide();
        player.deck.removeCard(gun);
        this.game.discard.addCards(gun);
        player.drawnCards.push(...this.pickCardsFromDrawForPlayer(player, 1));
        const modal = new ResultDrawCardsModal(this.game);
        modal.show();
      } else {
        this.drawCardsInModalBody(opponentSurvivorsCards);
        this.addNumericPadTip();
        this.addClickEventOnModalCards(GunModalClickOnCards);
      }
    }

    super(game, {
      showEvent: GunModalShowEvent,
      keyPressEscapeEvent: (e) => this.hide(),
      cancelEvent: (e) => this.hide()
    });
    const player = this.game.getActivatedPlayer();
    const modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    this.build(["one-player"], ['gun', modalContentClassname])
      .buildHeader("[FLINGUE]  <br/>  Défaussez le Pistolet. Choisissez un survivant chez votre adversaire.", "[PAVÉ NUMERIQUE] : sélectionner une carte à piocher")
      .buildBody("")
      .buildFooter()
      .buildCancelButton("Annuler");
  }
}

// TODO: numéro touche clavier sur les cartes dans modals

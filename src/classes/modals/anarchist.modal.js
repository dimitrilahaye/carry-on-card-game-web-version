class AnarchistModal extends Modal {
  constructor(game) {
    function AnarchistModalClickOnCards(e) {
      this.hide();
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const player = this.game.getActivatedPlayer();
      const anarchist = this.getCurrentPlayerSelectedCard();
      const opponent = this.game.getFollowingPlayer();
      const choosenItem = opponent.deck.getCard(id, type);
      player.deck.addCards(choosenItem);
      opponent.deck.removeCard(choosenItem);
      player.deck.removeCard(anarchist);
      this.game.discard.addCards(anarchist);
      opponent.drawnCards.push(...this.pickCardsFromDrawForPlayer(opponent, 1));
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    function AnarchistModalShowEvent(e) {
      $(e.target).find('.modal-body').html('');
      const opponentItemsCards = this.game.getFollowingPlayer().deck.getCardsByCategory("ITEM");
      const player = this.game.getActivatedPlayer();
      const anarchist = this.getCurrentPlayerSelectedCard();
      if (opponentItemsCards.length === 1) {
        this.hide();
        const opponent = this.game.getFollowingPlayer();
        const choosenItem = opponentItemsCards[0];
        player.deck.addCards(choosenItem);
        opponent.deck.removeCard(choosenItem);
        player.deck.removeCard(anarchist);
        this.game.discard.addCards(anarchist);
        opponent.drawnCards.push(...this.pickCardsFromDrawForPlayer(opponent, 1));
        const modal = new ResultDrawCardsModal(this.game);
        modal.show();
      } else if (!opponentItemsCards.length) {
        this.hide();
        player.deck.removeCard(anarchist);
        this.game.discard.addCards(anarchist);
        player.drawnCards.push(...this.pickCardsFromDrawForPlayer(player, 1));
        const modal = new ResultDrawCardsModal(this.game);
        modal.show();
      } else {
        this.drawCardsInModalBody(opponentItemsCards);
        this.addNumericPadTip();
        this.addClickEventOnModalCards(AnarchistModalClickOnCards);
      }
    }

    super(game, {
      showEvent: AnarchistModalShowEvent,
      keyPressEscapeEvent: (e) => this.hide(),
      cancelEvent: (e) => this.hide()
    });
    const player = this.game.getActivatedPlayer();
    const modalContentClassname = player.number === 1 ? 'player-two' : 'player-one';
    this.build(["one-player"], ["anarchist", modalContentClassname])
      .buildHeader("[ANARCHISTE] <br/> Défaussez l'Anarchiste. Choisissez un objet chez votre adversaire", "[PAVÉ NUMERIQUE] : sélectionner une carte à piocher")
      .buildBody("")
      .buildFooter()
      .buildCancelButton("Annuler");
  }
}

// TODO: numéro touche clavier sur les cartes dans modals

class MinimalistModal extends Modal {
  constructor(game) {
    function MinimalistModalClickOnCards(e) {
      this.hide();
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const player = this.game.getActivatedPlayer();
      const card = player.deck.getCard(id, type);
      // get the cans or ration's player's card
      const minimalist = this.getCurrentPlayerSelectedCard();
      player.drawnCards = this.pickCardsFromDrawForPlayer(player, 2);
      // remove the selected cans/ration for the player's deck
      this.removeCardsFromPlayerDeck(player, card, minimalist);
      // discard it
      this.game.discard.addCards(minimalist, card);
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    function MinimalistModalShow(e) {
      $(e.target).find('.modal-body').html('');
      const player = this.game.getActivatedPlayer();
      const playedMinimalist = this.getCurrentPlayerSelectedCard();
      const discardableCards = player.deck.cards.filter((c) => c !== playedMinimalist);
      this.drawCardsInModalBody(discardableCards);
      this.addNumericPadTip();
      this.addClickEventOnModalCards(MinimalistModalClickOnCards);
    }

    super(game, {
      showEvent: MinimalistModalShow,
      cancelEvent: (e) => this.hide(),
      keyPressEscapeEvent: (e) => this.hide()
    });
    const player = this.game.getActivatedPlayer();
    const modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    this.build(["one-player"], ["minimalist", modalContentClassname])
      .buildHeader("[MINIMALISTE] <br/> Défaussez la Minimaliste et une autre de vos cartes. Piochez deux cartes.", "[PAVÉ NUMERIQUE] : sélectionner une carte à défausser avec la Minimaliste")
      .buildBody("")
      .buildFooter()
      .buildCancelButton("Annuler");
  }
}

// TODO: numéro touche clavier sur les cartes dans modals

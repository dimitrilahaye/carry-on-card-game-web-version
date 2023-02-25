class PacifistModal extends Modal {
  constructor(game) {
    function PacifistModalConfirmEvent() {
      this.hide();
      const player = this.game.getActivatedPlayer();
      const opponent = this.game.getFollowingPlayer();
      const opponentWeaponsCards = opponent.deck.getCardsByCategory("WEAPON");
      const pacifist = this.getCurrentPlayerSelectedCard();
      player.drawnCards.push(...this.drawCardInDrawPile(1));
      if (!!opponentWeaponsCards.length) {
        opponent.drawnCards.push(...this.drawCardInDrawPile(opponentWeaponsCards.length));
      }
      // remove the cards from their respective deck
      this.removeCardsFromPlayerDeck(player, pacifist);
      for (let c of opponentWeaponsCards) {
        this.removeCardsFromPlayerDeck(opponent, c);
      }
      this.pickCardsFromDraw(...player.drawnCards, ...opponent.drawnCards);
      // add them to their respective deck
      this.giveCardsToPlayer(player, ...player.drawnCards);
      this.giveCardsToPlayer(opponent, ...opponent.drawnCards);
      // discard them
      this.game.discard.addCards(...opponentWeaponsCards, pacifist);
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    super(game, {
      keyPressEnterEvent: PacifistModalConfirmEvent,
      confirmEvent: PacifistModalConfirmEvent,
      keyPressEscapeEvent: (e) => this.hide(),
      cancelEvent: (e) => this.hide()
    });
    const player = this.game.getActivatedPlayer();
    const modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    this.build(["one-player"], ["pacifist", modalContentClassname])
      .buildHeader("[PACIFISTE] <br/> Défaussez le Pacifiste. Votre adversaire défausse toutes ses armes", "[ENTER] : valider, [SPACE] : annuler")
      .buildFooter()
      .buildConfirmButton("Validez votre choix")
      .buildCancelButton("Annuler");
  }
}

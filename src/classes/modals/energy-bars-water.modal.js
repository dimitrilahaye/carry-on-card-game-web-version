class EnergyBarWaterModal extends Modal {
  constructor(game) {
    function EnergyBarWaterModalConfirm() {
      const player = this.game.getActivatedPlayer();
      // get the selected card
      const energybarsWater = this.getCurrentPlayerSelectedCard();
      // remove it from its deck
      this.removeCardsFromPlayerDeck(player, energybarsWater);
      // discard it
      this.game.discard.addCards(energybarsWater);
      // draw a card from the draw pile
      player.drawnCards = this.pickCardsFromDrawForPlayer(player, 1);
      this.hide();
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    super(game, {
      keyPressEnterEvent: EnergyBarWaterModalConfirm,
      confirmEvent: EnergyBarWaterModalConfirm,
      cancelEvent: (e) => this.hide(),
      keyPressEscapeEvent: (e) => this.hide()
    });
    const player = this.game.getActivatedPlayer();
    const type = player.deck.getSelectedCard().type === 'WATER' ? "BOUTEILLE D'EAU" : "BARRES ÉNERGETIQUES";
    const modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    this.build(["one-player"], ["energybars", modalContentClassname])
      .buildHeader("[" + type + "] <br/>" +
        "Défaussez votre carte contre une de la pioche.", "[ENTER] : valider, [SPACE] : annuler")
      .buildFooter()
      .buildConfirmButton("Validez votre choix")
      .buildCancelButton("Annuler");
  }
}

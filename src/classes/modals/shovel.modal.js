class ShovelModal extends Modal {
  constructor(game) {
    function ShovelModalClickOnCards(e) {
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const card = this.game.discard.getCard(id, type);
      const player = this.game.getActivatedPlayer();
      // get the cans or ration's player's card
      const shovel = this.getCurrentPlayerSelectedCard();
      // pick the choosen card from the discard pile
      this.pickCardsFromDiscard(card);
      // add it to the player's deck
      this.giveCardsToPlayer(player, card);
      // remove the selected compass from the player's deck
      this.removeCardsFromPlayerDeck(player, shovel);
      // discard it
      this.game.discard.addCards(shovel);
      // change the player then hide the modal
      this.game.changeThePlayer();
      this.hide();
    }

    function ShovelModalShow(e) {
      $(e.target).find('.modal-body .cards').html('');
      const cardsInDiscardPile = this.game.discard.cards;
      this.drawSimpleCardsInModalBody(cardsInDiscardPile, ".cards");
      this.addAlphaPadTip();
      this.addClickEventOnModalCards(ShovelModalClickOnCards);
    }

    super(game, {
      showEvent: ShovelModalShow,
      cancelEvent: (e) => this.hide(),
      keyPressEscapeEvent: (e) => this.hide()
    });
    this.build(["modal-large"], ["shovel"])
      .buildHeader("[PELLE]  <br/>  Choisissez la carte de votre choix dans la défausse.", "[LETTRES] : sélectionnez une carte, [SPACE] : annuler")
      .buildBody("<div class=\"cards\"></div>", "overflow", "pile")
      .buildFooter()
      .buildCancelButton("Annuler");
  }
}

class CompassModal extends Modal {
  constructor(game) {
    function CompassModalClickOnCards(e) {
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const card = this.game.draw.getCard(id, type);
      const player = this.game.getActivatedPlayer();
      // get the cans or ration's player's card
      const compass = this.getCurrentPlayerSelectedCard();
      // pick the choosen card from the draw pile
      this.pickCardsFromDraw(card);
      // add it to the player's deck
      this.giveCardsToPlayer(player, card);
      // remove the selected compass from the player's deck
      this.removeCardsFromPlayerDeck(player, compass);
      // discard it
      this.game.discard.addCards(compass);
      // change the player then hide the modal
      this.game.changeThePlayer();
      this.hide();
    }

    function CompassModalShow(e) {
      $(e.target).find('.modal-body .cards').html('');
      const cardsInDrawPile = this.game.draw.cards;
      this.drawSimpleCardsInModalBody(cardsInDrawPile, ".cards");
      this.addAlphaPadTip();
      this.addClickEventOnModalCards(CompassModalClickOnCards);
    }

    super(game, {
      showEvent: CompassModalShow,
      keyPressEscapeEvent: (e) => this.hide(),
      cancelEvent: (e) => this.hide()
    });
    this.build(["modal-large"], ["compass"])
      .buildHeader("[BOUSSOLE] <br/> Choisissez la carte de votre choix dans la pioche.", "[LETTRES] : sélectionnez une carte, [SPACE] : annuler")
      .buildBody("<div class=\"cards\"></div>", "overflow", "pile")
      .buildFooter()
      .buildCancelButton("Annuler");
  }
}

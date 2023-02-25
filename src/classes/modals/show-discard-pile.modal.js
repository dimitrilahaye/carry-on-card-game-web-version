class ShowDiscardPileModal extends Modal {
  constructor(game) {
    function ShowDiscardPileModalShow(e) {
      $(e.target).find('.modal-body h6').html('');
      $(e.target).find('.modal-body .cards').html('');
      const cardsInDrawPile = this.game.discard.cards;
      if (!cardsInDrawPile.length) {
        $(e.target).find('.modal-body').append('<h6>La défausse est vide</h6>');
      } else {
        this.drawSimpleCardsInModalBody(cardsInDrawPile, ".cards");
      }
    }

    function ShowDiscardPileModalHide(e) {
      this.hide();
      this.game.getActivatedPlayer().initKeyEvents();
    }

    super(game, {
      showEvent: ShowDiscardPileModalShow,
      hideEvent: ShowDiscardPileModalHide,
      cancelEvent: ShowDiscardPileModalHide,
      keyPressEscapeEvent: ShowDiscardPileModalHide
    });
    this.build(["modal-large"], ["show-discard"])
      .buildHeader("Défausse", "[SPACE] : retour")
      .buildBody("<div class='cards'></div>", "overflow", "pile")
      .buildFooter()
      .buildCancelButton("Retour");
  }
}

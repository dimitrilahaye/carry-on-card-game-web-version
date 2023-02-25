class RationsCansModal extends Modal {
  constructor(game) {
    function RationsCansModalClickOnCards(e) {
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const player = this.game.getActivatedPlayer();
      const choosenCard = this.game.draw.getCard(id, type);
      // get the cans or ration's player's card
      const rationsCansCard = this.getCurrentPlayerSelectedCard();
      // pick the choosen cards from the draw pile
      this.pickCardsFromDraw(...player.drawnCards);
      // add it to the player's deck
      this.giveCardsToPlayer(player, choosenCard);
      // remove the selected cans/ration for the player's deck
      this.removeCardsFromPlayerDeck(player, rationsCansCard);
      // discard the unchoosen card from the draw pile
      player.drawnCards = player.drawnCards.filter((c) => c !== choosenCard);
      this.game.discard.addCards(...player.drawnCards, rationsCansCard);
      for (let i = 0; i < player.drawnCards.length; i++) {
        player.drawnCards.splice(i, 1);
      }
      // change the player then hide the modal
      this.game.changeThePlayer();
      this.hide();
    }

    function RationsCansModalShow(e) {
      this.$modal.find('.modal-body').html('');
      const player = this.game.getActivatedPlayer();
      // if not any card has been drawn, we draw 2 of them
      player.drawnCards.push(...this.drawCardInDrawPile(2));
      // else, we will continue to use the previous drawn cards.
      this.drawCardsInModalBody(player.drawnCards);
      this.addNumericPadTip();
      // click event (remove card from draw pile, add it to player's deck then discard his selected ration or cans)
      this.addClickEventOnModalCards(RationsCansModalClickOnCards);
    }

    super(game, {
      showEvent: RationsCansModalShow
    });
    const player = this.game.getActivatedPlayer();
    const type = player.deck.getSelectedCard().type === 'CANS' ? "BOITES DE CONSERVES" : "RATIONS DE SURVIE";
    const modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    this.build(["one-player"], ["rations", modalContentClassname])
      .buildHeader("[" + type + "] <br/>" +
        "Choisissez une carte. L'autre carte sera défaussée.", "[PAVÉ NUMERIQUE] : sélectionner une carte à piocher")
      .buildBody("");
  }
}

// TODO: numéro touche clavier sur les cartes dans modals

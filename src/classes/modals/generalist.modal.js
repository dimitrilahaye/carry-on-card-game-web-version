class GeneralistModal extends Modal {
  constructor(game) {
    function GeneralistModalClickOnCards(e) {
      const type = $(e.target).data('type');
      const id = $(e.target).data('id');
      const player = this.game.getActivatedPlayer();
      const opponent = this.game.getFollowingPlayer();
      const cardFromPlayer = player.deck.getCard(id, type);
      const cardFromOpponent = opponent.deck.getCard(id, type);
      const playerClassname = player.number === 1 ? 'player-deck' : 'opponent-deck';
      const opponentClassname = opponent.number === 1 ? 'player-deck' : 'opponent-deck';
      if (!!cardFromPlayer) {
        if (!player.drawnCards.length || player.drawnCards[0] !== cardFromPlayer[0]) {
          this.$modal.find('.modal-body .' + playerClassname).find('._card').removeClass('_shadow-red');
          player.drawnCards.length = 0;
          player.drawnCards.push(cardFromPlayer);
          $(e.target).closest('._card').addClass('_shadow-red');
        } else {
          player.drawnCards = player.drawnCards.filter((c) => c !== cardFromPlayer);
          $(e.target).closest('._card').removeClass('_shadow-red');
          this.$modal.find('.confirm').addClass('disabled');
          this.$modal.find('.confirm').prop('disabled', true);
        }
      } else if (!!cardFromOpponent) {
        if (!opponent.drawnCards.length || opponent.drawnCards[0] !== cardFromOpponent[0]) {
          this.$modal.find('.modal-body .' + opponentClassname).find('._card').removeClass('_shadow-red');
          opponent.drawnCards.length = 0;
          opponent.drawnCards.push(cardFromOpponent);
          $(e.target).closest('._card').addClass('_shadow-red');
        } else {
          opponent.drawnCards = opponent.drawnCards.filter((c) => c !== cardFromOpponent);
          $(e.target).closest('._card').removeClass('_shadow-red');
          this.$modal.find('.confirm').addClass('disabled');
          this.$modal.find('.confirm').prop('disabled', true);
        }
      }
      if (!!player.drawnCards.length && !!opponent.drawnCards.length) {
        this.$modal.find('.confirm').removeClass('disabled');
        this.$modal.find('.confirm').prop('disabled', false);
      }
    }

    function GeneralistModalConfirmEvent(e) {
      const player = this.game.getActivatedPlayer();
      const generalist = this.getCurrentPlayerSelectedCard();
      const opponent = this.game.getFollowingPlayer();
      const opponentCardForPlayer = opponent.drawnCards;
      const playerCardForOpponent = player.drawnCards;
      player.deck.addCards(...opponentCardForPlayer);
      opponent.deck.removeCard(...opponentCardForPlayer);
      opponent.deck.addCards(...playerCardForOpponent);
      player.deck.removeCard(...playerCardForOpponent);
      player.deck.removeCard(generalist);
      this.game.discard.addCards(generalist);
      player.drawnCards.length = 0;
      opponent.drawnCards.length = 0;
      player.drawnCards.push(...this.pickCardsFromDrawForPlayer(player, 1));
      this.hide();
      const modal = new ResultDrawCardsModal(this.game);
      modal.show();
    }

    function GeneralistModalShowEvent(e) {
      $(e.target).find('.modal-body div').html('');
      this.$modal.find('.confirm').addClass('disabled');
      this.$modal.find('.confirm').prop('disabled', true);
      const player = this.game.getActivatedPlayer();
      const opponent = this.game.getFollowingPlayer();
      const playerClassname = player.number === 1 ? 'player-deck' : 'opponent-deck';
      const opponentClassname = opponent.number === 1 ? 'player-deck' : 'opponent-deck';
      const titlePlayerAlign = player.number === 1 ? 'left' : 'right';
      const titleOpponentAlign = opponent.number === 1 ? 'left' : 'right';
      const generalist = this.getCurrentPlayerSelectedCard();
      const playerCards = player.deck.cards.filter((c) => c !== generalist);
      const opponentCards = this.game.getFollowingPlayer().deck.cards;
      $(e.target).find('.modal-body .' + playerClassname).append("<h6 style='text-align: " + titlePlayerAlign + ";'>Cartes du joueur " + this.game.getActivatedPlayer().number + "</h6>");
      for (let card of playerCards) {
        $(e.target).find('.modal-body .' + playerClassname).append(card.drawCard());
      }
      $(e.target).find('.modal-body .' + opponentClassname).append("<h6 style='text-align: " + titleOpponentAlign + ";'>Cartes du joueur " + this.game.getFollowingPlayer().number + "</h6>");
      for (let card of opponentCards) {
        $(e.target).find('.modal-body .' + opponentClassname).append(card.drawCard());
      }
      this.addNumericPadTip();
      this.addClickEventOnModalCards(GeneralistModalClickOnCards);
    }

    super(game, {
      keyPressEnterEvent: GeneralistModalConfirmEvent,
      confirmEvent: GeneralistModalConfirmEvent,
      showEvent: GeneralistModalShowEvent,
      keyPressEscapeEvent: (e) => {
        this.game.getActivatedPlayer().drawnCards.length = 0;
        this.game.getFollowingPlayer().drawnCards.length = 0;
        this.hide();
      },
      cancelEvent: (e) => {
        this.game.getActivatedPlayer().drawnCards.length = 0;
        this.game.getFollowingPlayer().drawnCards.length = 0;
        this.hide();
      }
    });
    this.build(["modal-large"], ["generalist"])
      .buildHeader("[GENERALISTE] <br/> Défaussez la Généraliste. Echangez une de vos cartes avec une des cartes de votre adversaire", "[PAVÉ NUMERIQUE] : sélectionnez les cartes de votre choix, [ENTER] : validez")
      .buildBody('<div class="player-deck"></div><div class="opponent-deck"></div>', 'overflow')
      .buildFooter()
      .buildConfirmButton("Validez votre choix")
      .buildCancelButton("Annuler");
  }
}

// TODO: numéro touche clavier sur les cartes dans modals

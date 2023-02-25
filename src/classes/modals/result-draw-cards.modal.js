class ResultDrawCardsModal extends Modal {
  constructor(game) {
    function ResultDrawCardsModalConfirm() {
      this.hide();
      this.game.changeThePlayer();
    }

    function ResultDrawCardsModalShow(e) {
      const player = this.game.getActivatedPlayer();
      const opponent = this.game.getFollowingPlayer();
      if (!!opponent.drawnCards.length && !!player.drawnCards.length) {
        this.$modal.find('.modal-dialog').addClass('modal-large');
      }
      const playerClassname = player.number === 1 ? 'left' : 'right';
      const opponentClassname = opponent.number === 1 ? 'left' : 'right';
      $(e.target).find('.modal-body .drawnCard').html('');
      $(e.target).find('.modal-body .drawnCard.' + playerClassname).append(!!player.drawnCards.length ? '<h6 style="text-align: ' + playerClassname + '">Le joueur ' + player.number + ' a pioché :</h6>' : '');
      for (let card of player.drawnCards) {
        $(e.target).find('.modal-body .drawnCard.' + playerClassname).append(card.drawCard());
      }
      $(e.target).find('.modal-body .drawnCard.' + opponentClassname).append(!!opponent.drawnCards.length ? '<h6 style="text-align: ' + opponentClassname + '">Le joueur ' + opponent.number + ' a pioché :</h6>' : '');
      for (let card of opponent.drawnCards) {
        $(e.target).find('.modal-body .drawnCard.' + opponentClassname).append(card.drawCard());
      }
      $(e.target).find('span').html(opponent.number);
    }

    function ResultDrawCardsModalHide(e) {
      this.game.getActivatedPlayer().drawnCards.length = 0;
      this.game.getFollowingPlayer().drawnCards.length = 0;
    }

    super(game, {
      showEvent: ResultDrawCardsModalShow,
      keyPressEnterEvent: ResultDrawCardsModalConfirm,
      confirmEvent: ResultDrawCardsModalConfirm,
      hideEvent: ResultDrawCardsModalHide
    });
    const player = this.game.getActivatedPlayer();
    const opponent = this.game.getFollowingPlayer();
    const modalDialogClassName = !opponent.drawnCards.length || !player.drawnCards.length ? "one-player" : "";
    let modalContentClassname = "";
    if (!!player.drawnCards.length && !opponent.drawnCards.length) {
      modalContentClassname = player.number === 1 ? 'player-one' : 'player-two';
    } else if (!!opponent.drawnCards.length && !player.drawnCards.length) {
      modalContentClassname = opponent.number === 1 ? 'player-one' : 'player-two';
    }
    this.build([modalDialogClassName], ["result-draw", modalContentClassname])
      .buildHeader("Résultat de la pioche", "[ENTER] : valider")
      .buildBody("<div class=\"drawnCard left\"></div><div class=\"drawnCard right\"></div>", "overflow")
      .buildFooter()
      .buildConfirmButton("Au tour du joueur<span></span>");
  }
}

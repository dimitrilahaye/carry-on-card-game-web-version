class PlayerChangedModal extends Modal {
  constructor(game) {
    function PlayerChangedModalShow(e) {
      $(e.target).find('.modal-body span').html(this.game.getActivatedPlayer().number);
    }

    function PlayerChangedModalHide(e) {
      this.game.getActivatedPlayer().drawnCards.length = 0;
      this.game.getFollowingPlayer().drawnCards.length = 0;
    }

    super(game, {
      showEvent: PlayerChangedModalShow,
      hideEvent: PlayerChangedModalHide,
      confirmEvent: (e) => this.hide(),
      keyPressEnterEvent: (e) => this.hide()
    });
    this.build()
      .buildHeader("Changemet de tour", "[ENTER] : valider")
      .buildBody("Au tour du joueur<span></span> !")
      .buildFooter()
      .buildConfirmButton("Ok");
  }
}

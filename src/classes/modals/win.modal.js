/**
 * This class describes a win modal. It is the modal when the game is over.
 *
 * @class      WinModal
 */
class WinModal extends Modal {
  /**
   * Constructs a new instance.
   *
   * @param      {Game}  game    The game
   */
  constructor(game) {
    /**
     * The confirm event, when we click on the confirm button
     */
    function WinModalConfirm() {
      location.reload();
    }

    /**
     * The show event, when the modal appears
     *
     * @param      {jQuery.Event}  e       the modal event
     */
    function WinModalShow(e) {
      $(e.target).find('.modal-body span').html(this.game.getActivatedPlayer().number);
    }

    super(game, {
      showEvent: WinModalShow,
      keyPressEnterEvent: WinModalConfirm,
      confirmEvent: WinModalConfirm
    });
    this.build(["modal-large"], ["win-modal"])
      .buildHeader("Fin du game, batard!", "[ENTER] : valider")
      .buildBody("<h6>Joueur<span></span> a gagné la partie!</h6>")
      .buildFooter()
      .buildConfirmButton("Nouvelle partie ?");
  }
}

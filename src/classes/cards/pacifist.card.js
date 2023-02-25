/**
 * Discard this card
 * The opponent's weapons are discarded.
 */
class Pacifist extends Card {
  constructor(id) {
    super(PacifistModal, id, "Défaussez la carte. Votre adversaire défausse toutes ses armes", "PACIFIST", "SURVIVOR");
  }
}

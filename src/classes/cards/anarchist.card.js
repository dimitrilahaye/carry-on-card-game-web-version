/**
 * Discard this card
 * Choose any item in the opponent deck
 */
class Anarchist extends Card {
  constructor(id) {
    super(AnarchistModal, id, "Défaussez la carte. Choisissez un objet dans le deck de votre adversaire.", "ANARCHIST", "SURVIVOR");
  }
}

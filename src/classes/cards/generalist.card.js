/**
 * Discard this card
 * Swipe one of your card with any of the opponent's cards in his deck.
 */
class Generalist extends Card {
  constructor(id) {
    super(GeneralistModal, id, "Défaussez la carte. Echangez une de vos cartes contre une des cartes de votre adversaire", "GENERALIST", "SURVIVOR");
  }
}

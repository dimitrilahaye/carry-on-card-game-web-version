/**
 * Discard this card
 * Pick two cards in the draw pile.
 * Add one in your deck.
 * Discard the other.
 */
class Cans extends Card {
  constructor(id) {
    super(RationsCansModal, id, "Défaussez la carte. Piochez deux cartes dans la pioche. Choisissez-en une et défaussez l'autre.", "CANS", "ITEM");
  }
}

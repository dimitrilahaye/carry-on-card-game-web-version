/**
 * Discard this card plus another of your card
 * Pick two cards in the draw pile
 */
class Minimalist extends Card {
  constructor(id) {
    super(MinimalistModal, id, "Défaussez la carte ainsi qu'une autre de vos cartes. Piochez deux cartes dans la pioche.", "MINIMALIST", "SURVIVOR");
  }
}

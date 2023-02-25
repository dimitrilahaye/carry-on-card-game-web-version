/**
 * Discard this card
 * Choose any card in the draw pile
 */
class Compass extends Card {
  constructor(id) {
    super(CompassModal, id, "Défaussez la carte. Choisissez une carte dans la pioche.", "COMPASS", "ITEM");
  }
}

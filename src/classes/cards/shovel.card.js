/**
 * Discard this card
 * Choose any card in the discard pile
 */
class Shovel extends Card {
  constructor(id) {
    super(ShovelModal, id, "Défaussez la carte. Choisissez une carte dans la défausse.", "SHOVEL", "ITEM");
  }
}

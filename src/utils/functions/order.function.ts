import { IOrder } from '../interfaces/order.interface';

export function insertItem<T extends IOrder>(items: T[], newItem: T, position: number): T[] {
  const updatedItems = [...items];

  updatedItems.forEach((item) => {
    if (item.order >= position) {
      item.order++;
    }
  });

  newItem.order = position;
  updatedItems.push(newItem);

  return updatedItems.sort((a, b) => a.order - b.order);
}

export function moveItem<T extends IOrder>(
  items: T[],
  currentPosition: number,
  newPosition: number,
): T[] {
  if (currentPosition === newPosition) return [...items];

  const updatedItems = [...items];
  const itemIndex = updatedItems.findIndex((item) => item.order === currentPosition);

  if (itemIndex === -1) return updatedItems;

  const itemToMove = { ...updatedItems[itemIndex] };

  updatedItems.splice(itemIndex, 1);

  if (currentPosition < newPosition) {
    updatedItems.forEach((item) => {
      if (
        parseInt(item.order.toString()) > parseInt(currentPosition.toString()) &&
        parseInt(item.order.toString()) <= newPosition
      ) {
        item.order--;
      }
    });
  } else {
    updatedItems.forEach((item) => {
      if (
        parseInt(item.order.toString()) >= newPosition &&
        parseInt(item.order.toString()) < parseInt(currentPosition.toString())
      ) {
        item.order++;
      }
    });
  }

  itemToMove.order = newPosition;
  updatedItems.push(itemToMove);

  return updatedItems.sort((a, b) => a.order - b.order);
}

export function removeItem<T extends IOrder>(items: T[], position: number): T[] {
  const updatedItems = items.filter((item) => item.order !== position);

  updatedItems.forEach((item) => {
    if (item.order > position) {
      item.order--;
    }
  });

  return updatedItems.sort((a, b) => a.order - b.order);
}

export const deliverOptions = [{
  deliverId: '1',
  deliverDays: 7, 
  deliverCost: 0, 
},
{
  deliverId: '2',
  deliverDays: 3, 
  deliverCost: 499, 
},
{
  deliverId: '3',
  deliverDays: 1, 
  deliverCost: 999, 
}]

export function getDeliveryCost (deliverOptionsId) {
  let deliverCost = 0;

  deliverOptions.forEach(option => {
    if (deliverOptionsId === option.deliverId)
    deliverCost = option.deliverCost;
  })
  return deliverCost;
}
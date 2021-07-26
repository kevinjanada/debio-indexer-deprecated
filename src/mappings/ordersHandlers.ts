import {SubstrateEvent} from "@subql/types"
import {Order} from '../types'

const OrderCreated = 'OrderCreated'
const OrderPaid = 'OrderPaid'
const OrderSuccess = 'OrderSuccess'
const OrderRefunded = 'OrderRefunded'
const OrderCancelled = 'OrderCancelled'
const OrderNotFound = 'OrderNotFound' // Does not need to be inserted to DB
const OrderFailed = 'OrderFailed'

export async function handleOrderEvents(event: SubstrateEvent): Promise<void> {
  const {event: {data: [order]}} = event
  const eventMethod = event.event.method
  logger.info(`Orders Event -> ${eventMethod}`)

  const orderData = order.toJSON()

  switch(eventMethod) {
    case OrderCreated:
      await onOrderCreated(orderData)
      break
    case OrderPaid:
      await onOrderPaid(orderData)
      break
    case OrderSuccess:
      await onOrderSuccess(orderData)
      break
    case OrderRefunded:
      await onOrderRefunded(orderData)
      break
    case OrderCancelled:
      await onOrderCancelled(orderData)
      break
    case OrderFailed:
      await onOrderFailed(orderData)
      break
  }
}

function extractOrderData(order: Order, orderData: any): Order {
  order.service_id = orderData['service_id']
  order.customer_id = orderData['customer_id']
  order.customer_box_public_key = orderData['customer_box_public_key']
  order.seller_id = orderData['seller_id']
  order.dna_sample_tracking_id = orderData['dna_sample_tracking_id']
  order.currency = orderData['currency']
  order.prices = orderData['prices']
  order.additional_prices = orderData['additional_prices']
  order.status = orderData['status']
  order.created_at = orderData['created_at']
  order.updated_at = orderData['updated_at']
  
  return order
}

async function onOrderCreated(orderData: any): Promise<void> {
  let order = new Order(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

async function onOrderPaid(orderData: any): Promise<void> {
  let order = await Order.get(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

async function onOrderSuccess(orderData: any): Promise<void> {
  let order = await Order.get(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

async function onOrderRefunded(orderData: any): Promise<void> {
  let order = await Order.get(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

async function onOrderCancelled(orderData: any): Promise<void> {
  let order = await Order.get(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

async function onOrderFailed(orderData: any): Promise<void> {
  let order = await Order.get(orderData['id'])
  order = extractOrderData(order, orderData)
  await order.save()
}

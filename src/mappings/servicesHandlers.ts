import {SubstrateEvent} from "@subql/types"
import {Service} from "../types"

// Events
const ServiceCreated = "ServiceCreated"
const ServiceUpdated = "ServiceUpdated"
const ServiceDeleted = "ServiceDeleted"

export async function handleServicesEvents(event: SubstrateEvent): Promise<void> {
  const {event: {data: [service, accountId]}} = event
  const eventMethod = event.event.method
  logger.info(`Services Event -> ${eventMethod}`)

  const serviceData = service.toJSON()

  switch(eventMethod) {
    case ServiceCreated:
      await onServiceCreated(serviceData, accountId.toString())
      break
    case ServiceUpdated:
      await onServiceUpdated(serviceData, accountId.toString())
      break
    case ServiceDeleted:
      await onServiceDeleted(serviceData, accountId.toString())
      break
  }
}

async function onServiceCreated(serviceData: any, accountId: string): Promise<void> {
  logger.info(`serviceData -> ${serviceData}`)
  const record = new Service(serviceData["id"])
  record.owner_id = serviceData["owner_id"]
  record.name = serviceData["info"]["name"]
  record.prices_by_currency = serviceData["info"]["prices_by_currency"]
  record.category = serviceData["info"]["category"]
  record.description = serviceData["info"]["description"]
  record.long_description = serviceData["info"]["long_description"]
  record.image = serviceData["info"]["image"]
  await record.save()
}

async function onServiceUpdated(serviceData: any, accountId: string): Promise<void> {
  logger.info(`serviceData -> ${serviceData}`)
  const record = await Service.get(serviceData["id"])
  record.owner_id = serviceData["owner_id"]
  record.name = serviceData["info"]["name"]
  record.prices_by_currency = serviceData["info"]["prices_by_currency"]
  record.category = serviceData["info"]["category"]
  record.description = serviceData["info"]["description"]
  record.long_description = serviceData["info"]["long_description"]
  record.image = serviceData["info"]["image"]
  await record.save()
}

async function onServiceDeleted(serviceData: any, accountId: string): Promise<void> {
  logger.info(`serviceData -> ${serviceData}`)
  await Service.remove(serviceData["id"])
}

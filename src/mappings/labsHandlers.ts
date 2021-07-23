import {SubstrateEvent} from "@subql/types";
import {Lab} from "../types";

const LabRegistered = "LabRegistered"
const LabUpdated = "LabUpdated"
const LabDeregistered = "LabDeregistered"

export async function handleLabsEvents(event: SubstrateEvent): Promise<void> {
  const {event: {data: [lab]}} = event
  const eventMethod = event.event.method

  logger.info(`Labs Event -> ${eventMethod}`)

  const labData = lab.toJSON()

  switch(eventMethod) {
    case LabRegistered:
      await onLabRegistered(labData)
      break
    case LabUpdated:
      await onLabUpdated(labData)
      break
    case LabDeregistered:
      await onLabDeregistered(labData)
      break
  }
}

/**
 * Helper to extract lab's info in its nested info object
 * */
function extractLabInfo(lab: Lab, labData: any): Lab {
  lab.box_public_key = labData["info"]["box_public_key"]
  lab.name = labData["info"]["name"]
  lab.email = labData["info"]["email"]
  lab.country = labData["info"]["country"]
  lab.region = labData["info"]["region"]
  lab.city = labData["info"]["city"]
  lab.address = labData["info"]["address"]
  lab.latitude = labData["info"]["latitude"]
  lab.longitude = labData["info"]["longitude"]
  lab.profile_image = labData["info"]["profile_image"]

  return lab
}

async function onLabRegistered(labData: any): Promise<void> {
  let labRecord = new Lab(labData["account_id"])
  labRecord.account_id = labData["account_id"]
  labRecord = extractLabInfo(labRecord, labData)
  await labRecord.save()
}

export async function onLabUpdated(labData: any): Promise<void> {
  let labRecord = await Lab.get(labData["account_id"])
  labRecord.box_public_key = labData["info"]["box_public_key"]
  labRecord.name = labData["info"]["name"]
  labRecord.email = labData["info"]["email"]
  labRecord.country = labData["info"]["country"]
  labRecord.region = labData["info"]["region"]
  labRecord.city = labData["info"]["city"]
  labRecord.address = labData["info"]["address"]
  labRecord.latitude = labData["info"]["latitude"]
  labRecord.longitude = labData["info"]["longitude"]
  labRecord.profile_image = labData["info"]["profile_image"]
  await labRecord.save()
}

export async function onLabDeregistered(labData: any): Promise<void> {
  await Lab.remove(labData["account_id"])
}

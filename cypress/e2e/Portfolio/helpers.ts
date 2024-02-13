import { createHash } from "crypto"

export function buildQuery(companies: string[]) {
  return companies.reduce(
    (accumulator, company) => accumulator + company + " ",
    ""
  )
}

export function sanitizeAndStringifySchema(schema: (string | number)[][]) {
  return (
    JSON.stringify(schema)
      // remove stars
      .replace(/\*/g, "")
      // remove spaces and non breaking spaces
      .replace(/[\s\u00A0]+/g, "")
      .toLocaleLowerCase()
  )
}

export function generateChecksum(sanitizedSchema: string): string {
  return createHash("sha256").update(sanitizedSchema).digest("hex")
}

export function printSchemaToConsole(messageIndicator, orderedSchema) {
  console.log(messageIndicator)
  console.log(JSON.stringify(orderedSchema))
}

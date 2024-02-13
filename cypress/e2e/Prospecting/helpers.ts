export function formatCompaniesAmount(companiesAmount: string): Number {
  return Number(companiesAmount.trim().replace(",", ""));
}

const messages = {
  completedAssignment: (name) =>
    `New assignments to 2 companies for the ${name} campaign completed.`,
  deletedAssignment: (name) =>
    `Assignment removed to 1 company for the ${name} campaign.`,
  createCampaign: (name) =>
    `The Campaign ${name} with 125 companies has been created.`,
  AreaManagerCampaignAssigment: (name, salesUserName, username) =>
    `${username} has assigned 1 company to ${salesUserName} for the campaign ${name}.`,
  SalesCampaignAssigment: (name, username) =>
    `${username} has assigned 1 company for the campaign ${name}.`,
  campaignRenewed: (name) =>
    `The Campaign ${name} with 125 companies has been created`,
  portfolioCompaniesMove: (from, to) =>
    `Moving 2 companies from portfolio ${from} to portfolio ${to} successfully executed.`,
  portfolioCompaniesdelete: (name) =>
    `Deletion of 2 companies in the portfolio ${name} executed correctly`,
  portfolioSharing: () => `Updating sharing executed correctly`,
  portfolioLocalUnits: (NoLocalUnits: number) =>
    `Adding Local Units. The portfolio has been updated with ${NoLocalUnits} Local Units.`,
  portfolioUpload: (portfolioName: string) =>
    `Upload of portfolio ${portfolioName} completed!`,
  operationsSaveList: (name, number) =>
    `Creation of portfolio ${name} and insert of ${number} enriched companies executed correctly`,
  operationsDownloadExcel: (name) =>
    `Your enriched portfolio ${name} has been correctly created.`,
  operationsSaveCompany: (name) =>
    `Creation of portfolio ${name} and insert of 1 enriched company executed correctly`,
  operationsDownload1CompanyExcel: (name) =>
    `Your enriched portfolio ${name} has been correctly created.`,
  downloadCompanyReport: (companyName) =>
    `The file for company ${companyName} has been created and it's ready to download.`,
};
export default messages;

import generateEmailBody from "./generateEmailBody";

const AdmZip = require("adm-zip");
const FormData = require("form-data");
const { createReadStream, existsSync, unlinkSync } = require("fs");

const axios = require("axios");
const moment = require("moment");
const { join } = require("path");

/**
 * Generates a summary of the report based on the merged report and report configuration.
 * @param {Object} mergedReport - The merged report data.
 * @param {Object} reportConfig - Configuration for the report.
 * @returns {Object} An object containing summarized report data.
 */
function generateReportSummary(mergedReport, reportConfig) {
  const { stats } = mergedReport;
  const uploadTimestamp = Date.now();
  const API_REPORTS_DIR = "data/reports/";
  const country = reportConfig.configCountry;
  const environment = reportConfig.configEnviroment;
  const reportId = `${environment}-${country}-${uploadTimestamp}`;
  const duration = moment.duration(stats.duration);

  const data = {
    reportId: reportId,
    country: country,
    environment: environment,
    dirLink: join(API_REPORTS_DIR, reportId),
    date: moment(uploadTimestamp).format("MMM.DD.YYYY"),
    time: moment(uploadTimestamp).format("HH:mm:ss"),
    duration: `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`,
    passRate: Math.floor(
      (stats.passes / (stats.tests - stats.skipped - stats.pending)) * 100
    ),
    suites: stats.suites,
    tests: stats.tests,
    passed: stats.passes,
    failed: stats.failures,
    skipped: stats.skipped,
  };
  return data;
}

/**
 * Creates form data for report submission.
 * @param {Object} reportSummary - The report summary data.
 * @returns {FormData} A FormData object containing the report data.
 */
function createFormData(reportSummary) {
  const form = new FormData();
  form.append(
    "margo-report",
    createReadStream(`${reportSummary.reportId}.zip`)
  );
  form.append("report-summary", JSON.stringify(reportSummary));
  return form;
}

/**
 * Creates a ZIP archive of the report.
 * @param {string} reportId - The identifier for the report.
 */
function createZipReport(reportId) {
  try {
    const zip = new AdmZip();
    zip.addLocalFolder("margo-report");
    zip.writeZip(`${reportId}.zip`);
  } catch (error) {
    console.error(`Error creating zip report for ${reportId}:`, error);
  }
}

/**
 * Posts the form data to the server.
 * @param {FormData} formData - The form data to be posted.
 * @returns {Promise} A promise representing the post operation.
 */
async function postData(formData, reportServerUrl: string) {
  try {
    const api = axios.create({
      baseURL: `${reportServerUrl}/api`,
    });
    const response = await api.post("/upload-report", formData, {
      headers: formData.getHeaders(),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Deletes the ZIP file of the report.
 * @param reportId - The identifier for the report to delete.
 */
function deleteZippedReport(reportId: string) {
  try {
    const filePath = `${reportId}.zip`;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting zipped report ${reportId}:`, error);
  }
}

/**
 * Main function to publish the report.
 * It orchestrates generating the report summary, creating form data,
 * zipping the report, generating an email body, posting the data, and
 * cleaning up the zipped report.
 */
export default async function publishReport(reporterOptions) {
  try {
    const mergedReport = require(`../${reporterOptions.partialReportResults}/merged-report.json`);
    const reportConfig = require(`../${reporterOptions.partialReportResults}/report-config.json`);

    const reportSummary = generateReportSummary(mergedReport, reportConfig);
    console.log("Generated report summary");

    const reportId = reportSummary.reportId;
    const form = createFormData(reportSummary);
    console.log("Created form data");

    createZipReport(reportId);
    console.log("Created zip report");

    generateEmailBody(reportSummary, reporterOptions);
    console.log("Generated email body");

    await postData(form, reporterOptions.reportServer);
    console.log("Posted data");

    deleteZippedReport(reportId);
    console.log("Report handling completed successfully");
  } catch (error) {
    console.error("Error handling report:", error);
  }
}

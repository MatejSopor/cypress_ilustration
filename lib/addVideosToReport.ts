const { readFileSync, writeFileSync } = require("fs");

/**
 * @returns parsed details for each spec file
 */
function getParsedSpecDetails(partialReportResults: string) {
  try {
    let specDetails = readFileSync(`${partialReportResults}/data.json`, {
      encoding: "utf-8",
    });
    return JSON.parse(specDetails);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(
        `Error: spec details file <${partialReportResults}/data.json> does not exist.`
      );
      return;
    }
    throw err;
  }
}

/**
 * Update merged reports. For each failed report add a reference to his
 * video recording file.
 * @returns
 */
export default function updateMergedReport(partialReportResults: string) {
  const MERGED_REPORT_FILE = `./${partialReportResults}/merged-report.json`;

  try {
    const specDetails = getParsedSpecDetails(partialReportResults);
    let mergedReport = readFileSync(MERGED_REPORT_FILE, { encoding: "utf-8" });

    specDetails.forEach((info) => {
      // replace a report file path with a reference to video file
      mergedReport = mergedReport.replace(
        new RegExp(`VideoPath: ${info.filePath}`, "g"),
        info.videoPath
      );
    });
    // update merged report
    writeFileSync(MERGED_REPORT_FILE, mergedReport);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(
        `Error: merged report <${MERGED_REPORT_FILE}> does not exist.`
      );
    }
    throw err;
  }
}

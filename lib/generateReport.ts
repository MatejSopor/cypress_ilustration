import marge from "mochawesome-report-generator";
import { merge } from "mochawesome-merge";
import { globSync } from "glob";
import publishReport from "./publishReport";
import updateMergedReport from "./addVideosToReport";
import fs from "fs";
import { FileInfo } from "@/cypress.config";

export default async function generateReport(
  config: Cypress.PluginConfigOptions,
  fileInfoList: FileInfo[]
) {
  try {
    const partialReportResults = config.reporterOptions.partialReportResults;
    // Write file and video paths to data.json
    fs.writeFileSync(
      `${partialReportResults}/data.json`,
      JSON.stringify(fileInfoList)
    );

    // Merge & Generate HTML Report
    const output = `${partialReportResults}/merged-report.json`;
    const reportFilesPattern = globSync(
      `${partialReportResults}/partial-results/*.json`
    );

    const report = await merge({ files: reportFilesPattern });
    fs.writeFileSync(output, JSON.stringify(report));

    updateMergedReport(partialReportResults);

    const jsonData = fs.readFileSync(output, "utf-8");

    await marge.create(
      JSON.parse(jsonData),
      config.reporterOptions.htmlReportOptions
    );
    console.log(
      "Report generated in:",
      config.reporterOptions.htmlReportOptions.reportDir
    );

    if (config.env.publishReport) {
      await publishReport(config.reporterOptions);
    }
  } catch (error) {
    console.error("Error in generating report:", error);
  }
}

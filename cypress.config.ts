import { defineConfig } from "cypress";
import tasks from "./cypress/support/cypress-tasks";
import { unlinkSync } from "fs";
import resolveConfigFile from "./lib/resolveConfiguration";
import generateReport from "./lib/generateReport";
import htmlReportOptions from "./htmlReportOptions";

export interface FileInfo {
  filePath: string;
  videoPath: string;
}

export const fileInfoList: FileInfo[] = [];

export const sharedConfig: Cypress.ConfigOptions<any> = {
  video: true,
  retries: 1,
  watchForFileChanges: false,
  defaultCommandTimeout: 40000,
  videosFolder: `./${htmlReportOptions.reportDir}/assets/videos`,
  screenshotsFolder: `./${htmlReportOptions.reportDir}/assets/screenshots`,
  videoCompression: 0,

  // Reporter Settings
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
    htmlReportOptions: htmlReportOptions,
    partialReportResults: ".report-results",
    reportServer: "IP_or_DNS",
  },
  env: {
    autoLogin: true,
    publishReport: false,
  },
  e2e: {
    /*
      baseUrl will be overwriten with coutry specific configuration
      in cypress/config/
    */
    baseUrl: "http://check-enviroment-config",
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      on("task", tasks);

      on("after:spec", (spec, results) => {
        if (config.video) {
          if (results.stats.failures || results.stats.skipped) {
            console.log("keeping the video %s", results.video);
          } else {
            console.log("deleting video for passing spec");
            unlinkSync(results.video);
          }
        }

        let videoPath = results.video.replace(/\\/g, "/");
        videoPath = videoPath.split(`${htmlReportOptions.reportDir}/`)[1];
        const fileInfo: FileInfo = {
          filePath: results.spec.absolute.replace(/\\/g, "/"),
          videoPath: videoPath,
        };
        fileInfoList.push(fileInfo);
      });

      on("after:run", async (results) => {
        await generateReport(config, fileInfoList);
      });

      // Resolve country and enviroment
      resolveConfigFile(on, config);
      return config;
    },
  },
};
export default defineConfig(sharedConfig);

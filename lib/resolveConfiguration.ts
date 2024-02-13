import { writeFileSync, existsSync, mkdirSync } from "fs";
import commonenv from "@/common-env";

export default function resolveConfigFile(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  const configFile = config.env.configFile;
  // verify if config options were set
  if (configFile === undefined || configFile.length === 0) {
    throw new Error(
      "--> No configuration enviroment specified. Provide configuration setting for country and enviroment.\nFor example instance:environment"
    );
  }

  const [configCountry, configEnviroment] = configFile.split(":", 2);

  // verify if config country was set
  if (configCountry === undefined || configCountry.length === 0) {
    throw new Error(
      "--> Error: Config country not set. \nProvide configuration settings for  country and enviroment.\nExample instance:environment"
    );
    // verify if config enviroment was set
  } else if (configEnviroment === undefined || configEnviroment.length === 0) {
    throw new Error(
      "--> Error: Config enviroment not set. \nProvide configuration settings for country and enviroment.\nExample instance:environment"
    );
  }

  // load enviroment configuration
  console.log(`\n\n--> Configuration:`);
  console.log(
    `\t- country: ${configCountry}\n\t- enviroment: ${configEnviroment}\n\n`
  );

  // used for post.js script
  saveConfigDataToFile(
    configCountry,
    configEnviroment,
    config.reporterOptions.partialReportResults
  );

  const {
    envirmentConfig,
  } = require(`../cypress/config/${configCountry}/${configEnviroment}.config.ts`);

  const countryCode = { configCountry: configCountry };

  /* Overwride config variables */
  config.env = {
    // initial config
    ...config.env,
    // common env. variables used by all projects
    ...commonenv,
    // variables specific to country and it's enviroment config
    ...envirmentConfig.env,
    ...countryCode,
  };
  config.baseUrl = envirmentConfig.e2e.baseUrl;
}
/**
 * @description function for extracting country and environment information for publishReport script
 */
function saveConfigDataToFile(
  configCountry: string,
  configEnviroment: string,
  partialReportResults: string
) {
  const data = {
    configCountry: configCountry,
    configEnviroment: configEnviroment,
  };

  if (!existsSync(partialReportResults)) {
    mkdirSync(partialReportResults);
  }
  writeFileSync(
    `${partialReportResults}/report-config.json`,
    JSON.stringify(data)
  );
}

const fs = require("fs");

/**
 * Generates an email body with inlined CSS based on the report summary data.
 * @param {Object} data - The report summary data.
 * @param {Object} reporterOptions - Reporter options from global cypress config
 * @returns {string} The HTML string with inlined CSS for the email body.
 */
export default function generateEmailBody(data, reporterOptions) {
  try {
    let emailResult = "";
    if (data.failed > 0) {
      emailResult = `<html> <head> <style> h1 { font-size: 20px; } h2 { font-size: 17px; } body { font-family: Arial, sans-serif; color: #333; font-size: 16px; } .passed { color: #27ae60; } .failed { color: #c0392b; } .link { color: #3498db; text-decoration: none; } .item { padding: 2px; } .link-wrapper { padding-top: 10px; } </style> </head> <body> <h1> Cypress Tests - ${data.country.toUpperCase()} ${data.environment.toUpperCase()} </h1> <h2>Statistics: </h2> <p> <div class="item"> <strong>No. tests:</strong> <span>${
        data.passed + data.failed
      }</span> </div> <div class="item"> <strong>Pass rate:</strong> <span class="passed">${
        data.passRate
      }%</span> </div> <div class="item"> <strong>Test passed:</strong> <span class="passed">${
        data.passed
      }</span> <br /> </div> <div class="item"> <strong>Failed:</strong> <span class="failed">${
        data.failed
      }</span> </div> <div class="link-wrapper"> <strong>View complete results in</strong> <a href="${
        reporterOptions.reportServer
      }/${
        data.dirLink
      }/margo-report.html" class="link" >here</a> </div> </p> </body></html>`;
    } else {
      console.log("Tests have passed! No email will be generated.");
      return;
    }
    const emailPath = `${reporterOptions.partialReportResults}/email`;

    if (!fs.existsSync(emailPath)) {
      fs.mkdirSync(emailPath);
    }
    console.log("Generating an email body.");
    fs.writeFileSync(`${emailPath}/email.html`, emailResult, {
      flag: "w",
    });
  } catch (error) {
    console.error("Error generating email body:", error.message);
  }
}

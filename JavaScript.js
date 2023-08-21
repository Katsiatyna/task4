const readline = require('readline');
const jStat = require('jStat');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(promptMessage) {
  return new Promise((resolve) => {
    rl.question(promptMessage, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Enter your mean: ");
  const mean = parseFloat(await getUserInput("Mean: "));

  console.log("Enter your standard deviation (keep in mind that standard deviation is a root of the variance variance):");
  const sd = parseFloat(await getUserInput("Standard deviation: "));

  console.log("Enter your sample size:");
  const sampleSize = Math.round(parseFloat(await getUserInput("Sample size: ")));

  console.log("Enter your value for which you want to find the probability (X <= your value):");
  const valueForProbability = parseFloat(await getUserInput("Value for probability: "));

  // Normalize the distribution
  const normalSd = sd / Math.sqrt(sampleSize);
  console.log(`Distribution after being normalized: N(${mean}, ${normalSd}).`);

  // Standardize the distribution
  const zScore = (valueForProbability - mean) / normalSd;
  console.log(`Interval for probability after being standardized: Z <= ${zScore}.`);

  // Calculate the probability using accurate CDF from jStat
  const probability = jStat.normal.cdf(zScore, 0, 1);
  const probabilityPercentage = probability * 100;

  console.log(`The probability for mean ${mean}, standard deviation ${sd}, sample size ${sampleSize},
   for x <= ${valueForProbability}: ${probabilityPercentage.toFixed(15)}%`);

  rl.close();
}

main();
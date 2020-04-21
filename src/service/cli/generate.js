"use strict";

const {writeFile} = require(`fs`).promises;
const chalk = require(`chalk`);

const {getRandomInt, shuffle} = require(`../../utils`);
const {TITLES, SENTENCES, CATEGORIES} = require(`../../data`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => {
  const title = TITLES[getRandomInt(0, TITLES.length - 1)];
  const createdDate = new Date();
  const announce = shuffle(SENTENCES).slice(0, getRandomInt(1, 4));
  const fullText = shuffle(SENTENCES)
    .slice(0, getRandomInt(0, SENTENCES.length - 1))
    .join(` `);
  const category = shuffle(CATEGORIES).slice(0, getRandomInt(1, 4));

  return Array(count)
    .fill({})
    .map(() => ({
      title,
      createdDate,
      announce,
      fullText,
      category,
    }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    try {
      await writeFile(FILE_NAME, content);

      console.log(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};

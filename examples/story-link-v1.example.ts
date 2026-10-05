import 'dotenv/config';
import { IgApiClient } from '../src';
import { readFile } from 'fs';

const ig = new IgApiClient();

async function main() {
  const username = process.env.IG_USERNAME;
  const password = process.env.IG_PASSWORD;
  const proxy = process.env.IG_PROXY;
  const storyLink = process.env.STORY_LINK || 'https://example.com';

  if (!username || !password) {
    throw new Error('IG_USERNAME and IG_PASSWORD are required');
  }

  ig.state.generateDevice(username);
  if (proxy) ig.state.proxyUrl = proxy;

  await ig.account.login(username, password);

  const file = readFile('./story.jpg');

  const result = await ig.publish.story({
    file,
    link: storyLink,
  });

  console.log('Story publish result:', result);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const isDirectory = (source: string) => lstatSync(source).isDirectory();

const ls = (source:string): string[] => readdirSync(source)
  .map((name) => join(source, name))
  .filter(isDirectory);

export default ls;

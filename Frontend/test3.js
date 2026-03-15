import { bundledThemes } from 'shiki';
import fs from 'fs';
fs.writeFileSync('themes.txt', Object.keys(bundledThemes).join('\\n'));

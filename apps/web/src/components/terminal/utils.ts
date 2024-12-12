export function simulateCommand(input: string): string[] {
  if (input.startsWith('git status')) {
    return [
      'On branch main',
      'Your branch is up to date with \'origin/main\'',
      '',
      'Changes not staged for commit:',
      '  (use "git add <file>..." to update what will be committed)',
      '  (use "git restore <file>..." to discard changes in working directory)',
      '        modified:   src/components/Terminal.tsx',
      '',
      'no changes added to commit (use "git add" and/or "git commit -a")'
    ];
  }
  
  if (input.startsWith('git branch')) {
    return [
      '* main',
      '  feature/terminal',
      '  feature/file-explorer'
    ];
  }

  if (input.startsWith('npm install')) {
    return [
      'added 1247 packages in 2m',
      '',
      '150 packages are looking for funding',
      '  run `npm fund` for details'
    ];
  }

  if (input.startsWith('npm run build')) {
    return [
      '> neuroforge@0.1.0 build',
      '> next build',
      '',
      '   ▲ Next.js 13.4.19',
      '',
      ' ✓ Creating an optimized production build',
      ' ✓ Compiled successfully',
      ' ✓ Linting and checking validity of types',
      ' ✓ Collecting page data',
      ' ✓ Generating static pages',
      ' ✓ Collecting build traces',
      '',
      'Route (app)                              Size     First Load JS',
      '┌ ○ /                                    5.13 kB        88.9 kB',
      '└ ○ /favicon.ico                         0 B                0 B',
      '+ First Load JS shared by all            83.8 kB',
      '  ├ chunks/main-app.js                   83.8 kB',
      '  └ chunks/webpack.js                    816 B',
      '',
      '✓ Done in 12.34s'
    ];
  }

  return [`Command not found: ${input}`];
}

export function filterSuggestions(input: string, suggestions: string[]): string[] {
  if (!input) return [];
  return suggestions.filter(cmd => 
    cmd.toLowerCase().startsWith(input.toLowerCase())
  );
}

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative, sep } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const srcRoot = join(root, 'src');
const componentDirs = [
  join(srcRoot, 'app'),
  join(srcRoot, 'features'),
  join(srcRoot, 'shared', 'components'),
  join(srcRoot, 'shared', 'ui'),
];
const componentExtensions = new Set(['.tsx']);
const ignoredComponentFiles = new Set([
  join(srcRoot, 'main.tsx'),
  join(srcRoot, 'app', 'routes', 'index.tsx'),
  join(srcRoot, 'app', 'routes', 'routeUtils.tsx'),
]);
const testExtensions = new Set(['.ts', '.tsx']);

function walk(dir, predicate) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return walk(fullPath, predicate);
    }

    return predicate(fullPath) ? [fullPath] : [];
  });
}

function toImportPath(filePath) {
  return relative(srcRoot, filePath).split(sep).join('/').replace(/\.[^.]+$/, '');
}

function toPascalCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function hasImportSourceReference(testContent, importPath, componentName) {
  const escapedImportPath = importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedComponentName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`from\\s+['"]${escapedImportPath}['"]`),
    new RegExp(`from\\s+['"][^'"]*/${escapedComponentName}['"]`),
    new RegExp(`from\\s+['"]\\./${escapedComponentName}['"]`),
  ];

  return patterns.some(pattern => pattern.test(testContent));
}

function hasComponentNameReference(testContent, componentNames) {
  const patterns = [
    componentName => new RegExp(`import\\s+${componentName}\\b`),
    componentName => new RegExp(`import\\s*\\{[^}]*\\b${componentName}\\b[^}]*\\}`),
    componentName => new RegExp(`<${componentName}(\\s|/|>)`),
    componentName => new RegExp(`render\\([^)]*\\b${componentName}\\b`),
  ];

  return componentNames.some((componentName) => {
    const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return patterns.some(createPattern => createPattern(escapedName).test(testContent));
  });
}

const components = componentDirs.flatMap((dir) => {
  return walk(dir, filePath =>
    componentExtensions.has(extname(filePath))
    && !filePath.endsWith('.test.tsx')
    && !ignoredComponentFiles.has(filePath));
});

const tests = walk(srcRoot, filePath =>
  filePath.includes('.test.')
  && testExtensions.has(extname(filePath))).map(filePath => readFileSync(filePath, 'utf8')).join('\n');

const missing = components.filter((componentPath) => {
  const componentName = basename(componentPath, extname(componentPath));
  const componentNames = [...new Set([componentName, toPascalCase(componentName)])];
  const importPath = toImportPath(componentPath);
  const relativePath = relative(srcRoot, componentPath).split(sep).join('/');

  return !tests.includes(importPath)
    && !tests.includes(relativePath)
    && !hasImportSourceReference(tests, importPath, componentName)
    && !hasComponentNameReference(tests, componentNames);
});

if (missing.length > 0) {
  console.error('Missing component test coverage for:');
  missing.forEach(filePath => console.error(`- ${relative(root, filePath)}`));
  process.exit(1);
}

console.info(`Component test coverage check passed for ${components.length} components.`);

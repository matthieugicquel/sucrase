import {createCheckers} from "ts-interface-checker";

import OptionsGenTypes from "./Options-gen-types";

const {Options: OptionsChecker} = createCheckers(OptionsGenTypes);

export type Transform = "jsx" | "typescript" | "flow" | "imports" | "react-hot-loader" | "jest";

export interface SourceMapOptions {
  /**
   * The name to use in the "file" field of the source map. This should be the name of the compiled
   * file.
   */
  compiledFilename: string;
}

export interface Options {
  transforms: Array<Transform>;
  /**
   * If specified, function name to use in place of React.createClass when compiling JSX.
   */
  jsxPragma?: string;
  /**
   * If specified, function name to use in place of React.Fragment when compiling JSX.
   */
  jsxFragmentPragma?: string;
  /**
   * If true, replicate the import behavior of TypeScript's esModuleInterop: false.
   */
  enableLegacyTypeScriptModuleInterop?: boolean;
  /**
   * If true, replicate the import behavior Babel 5 and babel-plugin-add-module-exports.
   */
  enableLegacyBabel5ModuleInterop?: boolean;
  /**
   * If specified, we also return a RawSourceMap object alongside the code. Currently, source maps
   * simply map each line to the original line without any mappings within lines, since Sucrase
   * preserves line numbers. filePath must be specified if this option is enabled.
   */
  sourceMapOptions?: SourceMapOptions;
  /**
   * File path to use in error messages, React display names, and source maps.
   */
  filePath?: string;
  /**
   * If specified, omit any development-specific code in the output.
   */
  production?: boolean;
  /**
   * Opts out ES syntax transformations, like optional chaining, nullish coalescing, numeric
   * separators, etc.
   */
  disableESTransforms?: boolean;
  /**
   * If specified, the imports transform does not attempt to change dynamic import()
   * expressions into require() calls.
   */
  preserveDynamicImport?: boolean;
  /**
   * Only relevant when targeting ESM (i.e. when the imports transform is *not*
   * specified). This flag changes the behavior of TS require imports:
   *
   * import Foo = require("foo");
   *
   * to import createRequire, create a require function, and use that function.
   * This is the TS behavior with module: nodenext and makes it easier for the
   * same code to target ESM and CJS.
   */
  injectCreateRequireForImportRequire?: boolean;
}

export function validateOptions(options: Options): void {
  OptionsChecker.strictCheck(options);
}

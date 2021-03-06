import { Configuration, Stats } from 'webpack';
import { TransformOptions } from '@babel/core';
import { typeScriptDefaults } from './config/defaults';

/**
 * ⚠️ This file contains internal WIP types they MUST NOT be exported outside this package for now!
 */
export interface ManagerWebpackOptions {
  configDir: any;
  configType?: string;
  docsMode?: boolean;
  entries: string[];
  refs: Record<string, Ref>;
  uiDll: boolean;
  dll: boolean;
  outputDir?: string;
  cache: boolean;
  previewUrl?: string;
  versionCheck: VersionCheck;
  releaseNotesData: ReleaseNotesData;
  presets: any;
}

export interface Presets {
  apply(
    extension: 'typescript',
    config: typeof typeScriptDefaults,
    args: StorybookConfigOptions & { presets: Presets }
  ): Promise<TransformOptions>;
  apply(extension: 'babel', config: {}, args: any): Promise<TransformOptions>;
  apply(extension: 'entries', config: [], args: any): Promise<unknown>;
  apply(extension: 'stories', config: [], args: any): Promise<unknown>;
  apply(
    extension: 'webpack',
    config: {},
    args: { babelOptions?: TransformOptions } & any
  ): Promise<Configuration>;
  apply(extension: 'managerEntries', config: [], args: any): Promise<string[]>;
  apply(extension: 'refs', config: [], args: any): Promise<unknown>;
  apply(
    extension: 'managerWebpack',
    config: {},
    args: { babelOptions?: TransformOptions } & ManagerWebpackOptions
  ): Promise<Configuration>;
  apply(extension: string, config: unknown, args: unknown): Promise<unknown>;
}

export interface LoadedPreset {
  name: string;
  preset: any;
  options: any;
}

export interface StorybookConfigOptions {
  configType: 'DEVELOPMENT' | 'PRODUCTION';
  outputDir?: string;
  configDir: string;
  cache?: any;
  framework: string;
}

export interface PresetsOptions {
  corePresets: string[];
  overridePresets: string[];
  frameworkPresets: string[];
}

export type PresetConfig =
  | string
  | {
      name: string;
      options?: unknown;
    };

export interface Ref {
  id: string;
  url: string;
  title: string;
  version: string;
  type?: string;
}

export interface VersionCheck {
  success: boolean;
  data?: any;
  error?: any;
  time: number;
}

export interface ReleaseNotesData {
  success: boolean;
  currentVersion: string;
  showOnFirstLaunch: boolean;
}

export interface PreviewResult {
  previewStats: Stats;
  previewTotalTime: [number, number];
}

export interface ManagerResult {
  managerStats: Stats;
  managerTotalTime: [number, number];
}

// TODO: this is a generic interface that we can share across multiple SB packages (like @storybook/cli)
export interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

// TODO: This could be exported to the outside world and used in `options.ts` file of each `@storybook/APP`
// like it's described in docs/api/new-frameworks.md
export interface LoadOptions {
  packageJson: PackageJson;
  framework: string;
  frameworkPresets: string[];
}

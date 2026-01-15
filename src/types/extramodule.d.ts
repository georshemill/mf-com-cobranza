declare module '@test/mf-utils-modules' {
  export const themeOptions: { name: string; value: boolean }[];
  export const menuModes: { label: string; value: string }[];
  export const surfaceOptions: { name: string; palette: any }[];
  export const menuThemes: { name: string; color: string }[];
  export const topbarThemes: { name: string; color: string }[];
  export const surfaces: {
    name: string;
    palette: Record<number | string, string>;
  }[];
  export const defaultLayoutConfig: any;
  export const layoutOptionFlags: {
    enablePrimaryColor: boolean;
    enableTopbarTheme: boolean;
    enableMenuTheme: boolean;
    enableColorScheme: boolean;
    enableMenuMode: boolean;
    enableSurface: boolean;
  };

  export function isSidebarMenuItemsVisible(roles: string[]): boolean;
  export function getLayoutConfig(): any;
  export function updateLayoutConfig(patch: Partial<any>): void;
  export function updateLayoutState(patch: Partial<any>): void;
  export function toggleDarkTheme(): void;
  export function toggleMobileMenu(show: boolean): void;
  export function getLayoutState(): any;
  export function applySurfacePalette(key: string): any;

  export namespace AuthAPI {
    function login(data: { username: string; password: string }): Promise<any>;
  }
  export namespace OptionsAPI {
    function getUserOptions(userId: string, idSistema: string, token: string): Promise<any>;
  }
  export namespace JwtUtils {
    function decodeJWT(token: string): any;
    function encryptJWT(token: string): string | null;
    function decryptJWT(encryptedToken: string): string | null;
  }
  export namespace Local {
    function set(key: string, value: any): void;
    function get(key: string): any;
    function remove(key: string): void;
    function clear(): void;
  }
  export namespace Session {
    function set(key: string, value: any): void;
    function get(key: string): any;
    function remove(key: string): void;
    function clear(): void;
  }

  export namespace StorageConstants {
    const ACCESS_TOKEN: any;
    const MODULE_KEYS: any;
  }

  export function showGlobalLoader(): void;
  export function hideGlobalLoader(): void;
}

declare module '@prisma/mf-shared-ui' {
  import { Type } from '@angular/core';
  export const SharedButtonComponent: Type<any>;
}
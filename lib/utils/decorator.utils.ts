export const DecoratorUtils = {
  createVersionedPath: (prefix: string, version?: number): string => {
    return !!version ? `${prefix}/v${version}` : prefix;
  },
};

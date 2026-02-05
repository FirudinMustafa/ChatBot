import clsx from 'clsx';

export function birlesik(...girdiler: (string | boolean | undefined | null | Record<string, boolean | undefined>)[]) {
  return clsx(...girdiler);
}

import { twMerge } from 'tailwind-merge'


export function mergeCss(old, override) {
   return twMerge(old, override)
}


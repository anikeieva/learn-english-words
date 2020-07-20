
export const textStartedWithNumberRegExp: RegExp = /^([0-9]+)$/;

export const parseSubtitleTimeRegExp: RegExp = new RegExp(/^(?:([0-9]+):)?([0-5][0-9]):([0-5][0-9](?:[.,][0-9]{0,3})?)/);

export const subtitleTimeCodeRexExp: RegExp = /^([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)$/;

export const subtitleSplittersRexExp: RegExp = new RegExp(/(,|\.|:|;|!|\?)/g);

export const lineFeedRegExp: RegExp = new RegExp(/\r?\n/);

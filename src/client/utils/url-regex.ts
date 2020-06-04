export const urlRegex = (title: string) => {
    let puncRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let dbSpeceRegex = / +/g;

    return title
    .replace(puncRegex, '')
    .replace(dbSpeceRegex, ' ')
    .replace(/ /g, '-')
    .toLowerCase();
}


function parseBibTeX(input) {
    const entries = [];
    const regex = /@(\w+){(.*?),(.*?)\}/gs;

    let match;
    while ((match = regex.exec(input)) !== null) {
        const type = match[1];
        const citationKey = match[2].trim();
        const content = match[3].trim();

        const fields = {};
        const fieldRegex = /(\w+)\s*=\s*{(.*?)(?<!\\)}/g;
        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(content)) !== null) {
            const fieldName = fieldMatch[1];
            const fieldValue = fieldMatch[2];
            fields[fieldName] = fieldValue;
        }

        entries.push({
            type: type,
            citationKey: citationKey,
            fields: fields,
        });
    }

    return entries;
}

export default parseBibTeX;
// ===== LIBRARIES ===== //
const fsPromises = require('fs').promises;
const speechScorer = require("word-error-rate");

async function readfile(pathfile) {
    const data = await fsPromises.readFile(pathfile, "utf-8").catch((err) => console.error('Failed to read file', err));
    return data;
}

function removeBreakLines(str) {
    str = str.replace(/(\r\n|\r|\n)/g, " ");
    str = str.replace(/\s+/g, " ");
    return str;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

// Main function
async function main() {

    // Input parameters
    let humanPathfile = process.argv[2];    // eg: human_transcript
    let aiPathfile = process.argv[3];       // eg: ai_transcript

    // Read files
    let humanTranscript = await fsPromises.readFile(humanPathfile, "utf-8").catch((err) => console.error('Failed to read file', err));
    let aiTranscript = await fsPromises.readFile(aiPathfile, "utf-8").catch((err) => console.error('Failed to read file', err));
    
    // Remove break lines
    humanTranscript = removeBreakLines(humanTranscript);
    aiTranscript = removeBreakLines(aiTranscript);
    
    // Test
    //await fsPromises.writeFile("new_human.txt", humanTranscript).catch((err) => console.error('Failed to write file', err));
    //await fsPromises.writeFile("new_ai.txt", aiTranscript).catch((err) => console.error('Failed to write file', err));
    
    // Calculate and print the wer
    let wer = speechScorer.wordErrorRate(humanTranscript, aiTranscript) * 100;
    wer = roundToTwo(wer);
    console.log(`The WER is ${wer}%`);
}

main().catch(console.error);
import fs from 'fs';
import yaml from 'js-yaml';
import { argv } from 'process';

// Read and parse the YAML file
const yamlContent = fs.readFileSync(argv[2], 'utf8');
const modelsData = yaml.load(yamlContent);

// Function to parse command line arguments into key-value pairs
function parseCmdArgs(cmd)
{
    const args = [];
    const lines = cmd.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('--')) {
            // Handle long form arguments like --flash-attn auto
            const arg = line.substring(2); // Remove '--'
            const parts = arg.split(' ', 2);
            //console.log(parts);
            const key = parts[0];
            const value = parts[1] || 'true'; // Default to 'true' for flags without values
            args.push({ key, value });
        } else if (line.startsWith('-')) {
            // Handle short form arguments like -m /path/to/model
            const arg = line.substring(1); // Remove '-'
            const parts = arg.split(' ', 2);
            const key = parts[0];
            const value = parts[1];
            args.push({ key, value });
        }
    }

    return args;
}

// Function to convert model data to INI format
function convertToIni(models)
{
    let iniContent = '';

    for (const [modelName, modelData] of Object.entries(models)) {
        console.log(modelName);
        iniContent += `[${modelName}]\n`;

        // Parse command arguments
        const args = parseCmdArgs(modelData.cmd);

        // Convert arguments to INI format
        for (const arg of args) {
            // Map some special cases
            let key = arg.key;
            let value = arg.value;

            // Handle special cases for INI format
            if (key == "port") { continue }
            iniContent += `${key} = ${value}\n`;
        }

        iniContent += '\n';
    }

    return iniContent;
}

// Convert and write to file
const iniContent = convertToIni(modelsData.models);
fs.writeFileSync('config.ini', iniContent);

console.log('Conversion completed. Check config.ini');

import path from 'path';
import { fileURLToPath } from 'url';

export function currDir(fileUrl) {
    const __filename = fileURLToPath(fileUrl);
    return path.dirname(__filename);
}

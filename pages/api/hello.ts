import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

let's puppeteer
production start
run start
Error: Failed to launch the browser process!
/tmp/chromium: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory


TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:193:20)
    at Interface.<anonymous> (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:183:68)
    at Interface.emit (node:events:529:35)
    at Interface.close (node:internal/readline/interface:534:10)
    at Socket.onend (node:internal/readline/interface:260:10)
    at Socket.emit (node:events:529:35)
    at endReadableNT (node:internal/streams/readable:1368:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
 ⨯ Error: Failed to launch the browser process!
/tmp/chromium: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory


TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:193:20)
    at Interface.<anonymous> (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:183:68)
    at Interface.emit (node:events:529:35)
    at Interface.close (node:internal/readline/interface:534:10)
    at Socket.onend (node:internal/readline/interface:260:10)
    at Socket.emit (node:events:529:35)
    at endReadableNT (node:internal/streams/readable:1368:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
Error: Failed to launch the browser process!
/tmp/chromium: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory


TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:193:20)
    at Interface.<anonymous> (/var/task/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserRunner.js:183:68)
    at Interface.emit (node:events:529:35)
    at Interface.close (node:internal/readline/interface:534:10)
    at Socket.onend (node:internal/readline/interface:260:10)
    at Socket.emit (node:events:529:35)
    at endReadableNT (node:internal/streams/readable:1368:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
Error: Runtime exited with error: exit status 1
Runtime.ExitError

# Non-Blocking-Async
### Project Overview

This Node.js application reads two text files asynchronously (**Non-Blocking Async**) using the built-in `fs` module without blocking the Event Loop. Once both files finish reading in parallel, a custom event is emitted via **`EventEmitter`** to merge their contents and write the combined result into a new third file (`output.txt`), complete with error handling.

**Key Highlights:**

* **Non-Blocking I/O:** Reads multiple files concurrently without freezing execution.
* **Event-Driven Architecture:** Triggers a custom event as soon as all file reads complete.
* **Safe File Writing:** Merges data cleanly and saves it into `output.txt` with error checks.

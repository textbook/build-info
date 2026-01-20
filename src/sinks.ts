import fs from "node:fs/promises";
import path from "node:path";

export interface Sink {
	write(data: string): Promise<void>;
}

export class ConsoleSink implements Sink {
	private readonly logger: Pick<Console, "log">;

	constructor(logger: Pick<Console, "log"> = console) {
		this.logger = logger;
	}

	// eslint-disable-next-line @typescript-eslint/require-await -- Promise required for the interface
	async write(data: string): Promise<void> {
		this.logger.log(data);
	}
}

export class FileSink implements Sink {
	private readonly filename: string;
	private readonly console: Sink;

	constructor(filename: string, console: Sink = new ConsoleSink()) {
		this.filename = filename;
		this.console = console;
	}

	async write(data: string): Promise<void> {
		if (this.filename === "-") {
			await this.console.write(data);
		} else {
			await fs.mkdir(path.dirname(this.filename), { recursive: true });
			await fs.writeFile(this.filename, data);
		}
	}
}

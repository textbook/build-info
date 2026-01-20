export default abstract class Env {
	protected env: NodeJS.ProcessEnv;

	constructor(env: NodeJS.ProcessEnv = process.env) {
		this.env = env;
	}
}

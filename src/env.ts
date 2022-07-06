export default abstract class Env {
	constructor(protected env: NodeJS.ProcessEnv = process.env) {}
}

package gg.blind.compiler;

public class CompileResult {
	private String output;
	private String error;

	public CompileResult(String output, String error) {
		this.output = output;
		this.error = error;
	}

	public String getOutput() {
		return output;
	}

	public String getError() {
		return error;
	}
}

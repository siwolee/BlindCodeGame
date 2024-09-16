package gg.blind.compiler;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.stereotype.Component;

@Component
public class CCompiler {
	public CompileResult compileAndRun(String sourceFileName, String... args) {
		StringBuilder outputBuilder = new StringBuilder();
		StringBuilder errorBuilder = new StringBuilder();

		try {
			// Compile the source code
			ProcessBuilder compileBuilder = new ProcessBuilder("gcc", sourceFileName, "-o", "a.out");
			Process compileProcess = compileBuilder.start();

			BufferedReader compileErrorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
			BufferedReader compileOutputReader = new BufferedReader(new InputStreamReader(compileProcess.getInputStream()));

			String line;
			while ((line = compileErrorReader.readLine()) != null) {
				errorBuilder.append(line).append(System.lineSeparator());
			}
			while ((line = compileOutputReader.readLine()) != null) {
				outputBuilder.append(line).append(System.lineSeparator());
			}

			int compileExitCode = compileProcess.waitFor();
			if (compileExitCode != 0) {
				return new CompileResult(outputBuilder.toString().trim(), errorBuilder.toString().trim());
			}

			// Run the compiled executable
			ProcessBuilder runBuilder = new ProcessBuilder("./a.out");
			runBuilder.command().addAll(java.util.Arrays.asList(args));
			Process runProcess = runBuilder.start();

			BufferedReader runErrorReader = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()));
			BufferedReader runOutputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));

			StringBuilder runOutputBuilder = new StringBuilder();
			StringBuilder runErrorBuilder = new StringBuilder();

			while ((line = runErrorReader.readLine()) != null) {
				runErrorBuilder.append(line).append(System.lineSeparator());
			}
			while ((line = runOutputReader.readLine()) != null) {
				runOutputBuilder.append(line).append(System.lineSeparator());
			}

			int runExitCode = runProcess.waitFor();

			return new CompileResult(runOutputBuilder.toString().trim(), runErrorBuilder.toString().trim());
		} catch (Exception e) {
			return new CompileResult("", e.getMessage());
		}
	}
}
